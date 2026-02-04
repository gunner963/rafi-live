"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { RafiVisualizer } from "@/components/rafi-visualizer";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-950">

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/likheJoKhatTujhe.mp3"
        onEnded={() => setIsPlaying(false)}
      />

      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center pb-2">

          {/* VISUALIZER COMPONENT */}
          <div className="mb-6">
            <RafiVisualizer audioRef={audioRef} isPlaying={isPlaying} />
          </div>

          <CardTitle className="text-2xl font-bold text-white tracking-tight">Likhe Jo Khat Tujhe</CardTitle>
          <CardDescription className="text-zinc-400">Mohammed Rafi • Kanyadaan (1968)</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="flex justify-center items-center gap-6">
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
              ⏮
            </Button>

            <Button
              onClick={togglePlay}
              size="lg"
              className="rounded-full w-16 h-16 text-2xl bg-white text-black hover:bg-zinc-200 transition-all hover:scale-105"
            >
              {isPlaying ? "⏸" : "▶"}
            </Button>

            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
              ⏭
            </Button>
          </div>

          <div className="text-center pt-2">
            <span className="text-xs font-mono text-green-500 animate-pulse">
              ● LIVE ON AIR
            </span>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}