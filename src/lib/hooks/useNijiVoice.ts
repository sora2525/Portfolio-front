import { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import WavEncoder from "wav-encoder";
import { decode as base64ToArrayBuffer } from "base64-arraybuffer";

export function useNijiVoice() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_NIJI_VOICE_API_KEY;
  const voiceActorId = process.env.NEXT_PUBLIC_NIJI_VOICE_ACTOR_ID;

  useEffect(() => {
    if (typeof window !== "undefined" && !audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
  }, []);

  const generateVoice = useCallback(async (text: string): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    setBlobUrl((prevBlobUrl) => {
      if (prevBlobUrl) {
        URL.revokeObjectURL(prevBlobUrl);
      }
      return null;
    });

    if (!apiKey || !voiceActorId) {
      setError("APIキーまたはVoice Actor IDが設定されていません。");
      setIsLoading(false);
      return null;
    }

    try {
      const requestBody = {
        script: text,
        speed: "1.0",
        format: "wav",
      };

      const url = `https://api.nijivoice.com/api/platform/v1/voice-actors/${voiceActorId}/generate-encoded-voice`;
      const response = await axios.post(url, requestBody, {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "x-api-key": apiKey,
        },
      });

      if (response.status !== 200 || !response.data?.generatedVoice?.base64Audio) {
        throw new Error("音声データを取得できませんでした。");
      }

      const base64Audio = response.data.generatedVoice.base64Audio;
      const originalArrayBuffer = base64ToArrayBuffer(base64Audio);

      if (!audioCtxRef.current) {
        throw new Error("AudioContext が利用できません。");
      }
      const audioBuffer = await audioCtxRef.current.decodeAudioData(originalArrayBuffer);

      const channelData = Array.from({ length: audioBuffer.numberOfChannels }, (_, i) =>
        audioBuffer.getChannelData(i)
      );

      const wavData = {
        sampleRate: audioBuffer.sampleRate,
        channelData,
      };

      const encodedWavArrayBuffer = await WavEncoder.encode(wavData);
      const blob = new Blob([encodedWavArrayBuffer], { type: "audio/wav" });
      const newBlobUrl = URL.createObjectURL(blob);

      setBlobUrl(newBlobUrl);

      console.log("Generated WAV Blob URL:", newBlobUrl);
      return newBlobUrl;
    } catch (err: unknown) {
      console.error(err);
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || "APIエラーが発生しました"
          : err instanceof Error
          ? err.message
          : "不明なエラーが発生しました"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, voiceActorId]);

  useEffect(() => {
    const cleanup = () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        console.log("Blob URL を解放しました:", blobUrl);
      }
    };

    window.addEventListener("beforeunload", cleanup);

    return () => {
      cleanup(); 
      window.removeEventListener("beforeunload", cleanup);
    };
  }, [blobUrl]);

  return {
    generateVoice,
    isLoading,
    error,
  };
}
