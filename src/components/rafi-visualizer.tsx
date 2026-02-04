"use client";

import { useEffect, useRef } from "react";

interface VisualizerProps {
    audioRef: React.RefObject<HTMLAudioElement | null>;
    isPlaying: boolean;
}

export function RafiVisualizer({ audioRef, isPlaying }: VisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const contextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        if (!audioRef.current) return;

        // Initialize Audio Context (only runs once)
        if (!contextRef.current) {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            contextRef.current = new AudioContext();

            const analyser = contextRef.current.createAnalyser();
            analyser.fftSize = 256; // Controls bar count (256 = 128 bars)
            analyserRef.current = analyser;

            // Connect audio source to analyser
            const source = contextRef.current.createMediaElementSource(audioRef.current);
            source.connect(analyser);
            analyser.connect(contextRef.current.destination);
        }
    }, [audioRef]);

    // The Animation Loop
    useEffect(() => {
        if (!isPlaying || !analyserRef.current || !canvasRef.current) {
            cancelAnimationFrame(animationRef.current);
            return;
        }

        // Resume context if suspended (browser policy)
        if (contextRef.current?.state === "suspended") {
            contextRef.current.resume();
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const analyser = analyserRef.current;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const renderFrame = () => {
            animationRef.current = requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(dataArray);

            if (!ctx) return;

            ctx.fillStyle = 'rgba(9, 9, 11, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Config
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 60; // Inner dead space (where the photo goes)
            const bars = bufferLength;

            // Draw Bars
            for (let i = 0; i < bars; i++) {
                const barHeight = (dataArray[i] / 255) * 80; // Scale height

                // Convert to circular coordinates
                const rads = (Math.PI * 2) / bars;
                const angle = i * rads;

                // Start point (Inner circle)
                const x_start = centerX + Math.cos(angle) * radius;
                const y_start = centerY + Math.sin(angle) * radius;

                // End point (Outer burst)
                const x_end = centerX + Math.cos(angle) * (radius + barHeight);
                const y_end = centerY + Math.sin(angle) * (radius + barHeight);

                // Draw

                ctx.strokeStyle = `hsl(45, 100%, ${50 + (dataArray[i] / 255) * 50}%)`; // Gold/Yellow gradient
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x_start, y_start);
                ctx.lineTo(x_end, y_end);
                ctx.stroke();
            }
        };

        renderFrame();

        return () => cancelAnimationFrame(animationRef.current);
    }, [isPlaying]);

    return (
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
            {/* The Visualizer Canvas */}
            <canvas
                ref={canvasRef}
                width={300}
                height={300}
                className="absolute inset-0 w-full h-full z-10"
            />

            {/* The Static Image in the Center */}
            <div className="relative z-20 w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-900 shadow-2xl">
                <img
                    src="/rafi.jpg" // Put a rafi.jpg in public folder too!
                    alt="Mohammed Rafi"
                    className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? "scale-110" : "scale-100 grayscale"}`}
                />
            </div>
        </div>
    );
}