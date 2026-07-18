"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MUTE_KEY = "the-one-porcent:tts-muted";

function pickVoice(voices: SpeechSynthesisVoice[]) {
  const ptVoices = voices.filter((v) => v.lang.toLowerCase().startsWith("pt"));
  const pool = ptVoices.length > 0 ? ptVoices : voices;
  const male = pool.find((v) => /male|masculin|ricardo|daniel|felipe/i.test(v.name));
  return male ?? pool[0] ?? null;
}

export function useSpeech() {
  const [muted, setMuted] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(MUTE_KEY) === "1";
  });
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function loadVoices() {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) voiceRef.current = pickVoice(voices);
    }
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      if (muted) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";
      utterance.rate = 0.98;
      utterance.pitch = 0.85;
      if (voiceRef.current) utterance.voice = voiceRef.current;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [muted],
  );

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (next) stop();
      if (typeof window !== "undefined") {
        window.localStorage.setItem(MUTE_KEY, next ? "1" : "0");
      }
      return next;
    });
  }, [stop]);

  return { speak, stop, muted, toggleMuted, speaking };
}
