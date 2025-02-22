import { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import WavEncoder from "wav-encoder";
import { decode as base64ToArrayBuffer } from "base64-arraybuffer";
import { flashMessageState } from "@/lib/atom/flashMessageAtom";
import { useRecoilState } from "recoil";

export function useNijiVoice() {
  const [isLoading, setIsLoading] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [flashMessage, setFlashMessage] = useRecoilState(flashMessageState);

  const apiKey = process.env.NEXT_PUBLIC_NIJI_VOICE_API_KEY;
  const voiceActorId = process.env.NEXT_PUBLIC_NIJI_VOICE_ACTOR_ID;

  useEffect(() => {
    if (typeof window !== "undefined" && !audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
  }, []);

  const generateVoice = useCallback(async (text: string): Promise<string | null> => {
    setIsLoading(true);

    setBlobUrl((prevBlobUrl) => {
      if (prevBlobUrl) {
        URL.revokeObjectURL(prevBlobUrl);
      }
      return null;
    });

    if (!apiKey || !voiceActorId) {
      setFlashMessage({
        message: "APIキーまたは声優IDが設定されていません。",
        type: "error",
      });
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
        throw new Error("音声データの取得に失敗しました。");
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
      console.error("音声生成エラー:", err);
      
      let errorMessage = "音声の生成に失敗しました。";
      if (err instanceof Error) {
        errorMessage += ` 詳細: ${err.message}`;
      }

      setFlashMessage({
        message: errorMessage,
        type: "error",
      });

      return null;
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, voiceActorId,setFlashMessage]);

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
  };
}
