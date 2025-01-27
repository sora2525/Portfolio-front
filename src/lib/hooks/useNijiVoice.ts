"use client";
import { useState, useCallback } from "react";
import WavEncoder from "wav-encoder";

export function useNijiVoice() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey =
    process.env.REACT_APP_NIJI_VOICE_API_KEY ||
    process.env.NEXT_PUBLIC_NIJI_VOICE_API_KEY;
  const voiceActorId =
    process.env.REACT_APP_NIJI_VOICE_ACTOR_ID ||
    process.env.NEXT_PUBLIC_NIJI_VOICE_ACTOR_ID;

  const generateVoice = useCallback(
    async (text: string): Promise<string | null> => {
      setIsLoading(true);
      setError(null);

      if (!apiKey || !voiceActorId) {
        setError("APIキーまたはVoice Actor IDが設定されていません。");
        setIsLoading(false);
        return null;
      }

      try {
        const requestBody = {
          script: text,
          speed: "1.0",
          format: "wav", // WAV形式を指定（圧縮の可能性あり）
        };

        const url = `https://api.nijivoice.com/api/platform/v1/voice-actors/${voiceActorId}/generate-encoded-voice`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(
            `にじボイスAPIの呼び出しに失敗しました (status: ${response.status})`
          );
        }

        const data = await response.json();
        const base64Audio = data?.generatedVoice?.base64Audio as string | undefined;
        if (!base64Audio) {
          throw new Error("音声データを取得できませんでした。");
        }

        const byteString = atob(base64Audio);
        const byteNumbers = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          byteNumbers[i] = byteString.charCodeAt(i);
        }
        const originalArrayBuffer = byteNumbers.buffer;

        const audioCtx = new AudioContext();
        const audioBuffer = await audioCtx.decodeAudioData(originalArrayBuffer);

        const wavData = {
          sampleRate: audioBuffer.sampleRate,
          channelData: [
            audioBuffer.getChannelData(0), 
            ...(audioBuffer.numberOfChannels > 1
              ? [audioBuffer.getChannelData(1)]
              : []),
          ],
        };
        const encodedWavArrayBuffer = await WavEncoder.encode(wavData);

        const blob = new Blob([encodedWavArrayBuffer], { type: "audio/wav" });
        const blobUrl = URL.createObjectURL(blob);

        console.log("Generated linear PCM WAV Blob URL:", blobUrl);

        return blobUrl;
      } catch (err: any) {
        console.error(err);
        setError(err.message || "音声生成に失敗しました");
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey, voiceActorId]
  );

  return {
    generateVoice,
    isLoading,
    error,
  };
}
