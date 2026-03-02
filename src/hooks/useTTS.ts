import { useState, useEffect, useCallback, useRef } from 'react';

const SPANISH_VOICE_PRIORITY = [
  'Microsoft Dalia Online (Natural)',
  'Microsoft Jorge Online (Natural)',
  'Microsoft Sabina Online',
  'Microsoft Raul Online',
  'Paulina',
  'Monica',
  'Google español',
  'Google Spanish',
];

const ENGLISH_VOICE_PRIORITY = [
  'Microsoft Aria Online (Natural)',
  'Microsoft Jenny Online (Natural)',
  'Microsoft Guy Online (Natural)',
  'Samantha',
  'Karen',
  'Google US English',
];

function pickBestVoice(
  voices: SpeechSynthesisVoice[],
  langPrefix: string,
  priorityNames: string[]
): SpeechSynthesisVoice | null {
  for (const name of priorityNames) {
    const match = voices.find(
      (v) => v.name.toLowerCase().includes(name.toLowerCase()) && v.lang.startsWith(langPrefix)
    );
    if (match) return match;
  }
  return voices.find((v) => v.lang.startsWith(langPrefix)) ?? null;
}

export function useTTS() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const spanishVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const englishVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    setIsSupported(true);

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return;
      spanishVoiceRef.current = pickBestVoice(voices, 'es', SPANISH_VOICE_PRIORITY);
      englishVoiceRef.current = pickBestVoice(voices, 'en-US', ENGLISH_VOICE_PRIORITY);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback(
    (text: string, lang: 'es' | 'en') => {
      if (!isSupported) return;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'es' ? 'es-MX' : 'en-US';
      utterance.voice = lang === 'es' ? spanishVoiceRef.current : englishVoiceRef.current;
      utterance.rate = 0.85;
      utterance.pitch = 1.1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [isSupported]
  );

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  return { speak, stop, isSpeaking, isSupported };
}
