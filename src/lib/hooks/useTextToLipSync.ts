"use client";
import { useState } from "react";
import { useNijiVoice } from "@/lib/hooks/useNijiVoice";
import { useLipSyncHandler } from "./useLipSyncHandler";

export function useTextToLipSync() {
  const { generateVoice, isLoading: isGenerating, error } = useNijiVoice();
  const { startLipSync } = useLipSyncHandler();
  const [isLipSyncing, setIsLipSyncing] = useState(false);

  const speakAndLipSync = async (text: string) => {
    setIsLipSyncing(true);
    try {
      const linearPcmWavUrl = await generateVoice(text);
      if (!linearPcmWavUrl) {
        console.error("Failed to generate linear PCM WAV from text.");
        setIsLipSyncing(false);
        return;
      }

      await startLipSync(linearPcmWavUrl);
    } catch (err) {
      console.error("Error in speakAndLipSync:", err);
    } finally {
      setIsLipSyncing(false);
    }
  };

  return {
    speakAndLipSync,
    isGenerating, 
    error,        
    isLipSyncing, 
  };
}
