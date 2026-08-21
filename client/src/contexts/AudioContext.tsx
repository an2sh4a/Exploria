import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
} from "react";

import uiClick from "../assets/audio/ui-click.wav";
import uiInterface from "../assets/audio/ui-interface.wav";
import puzzleOpen from "../assets/audio/puzzle-open.wav";
import commandExtract from "../assets/audio/command-extract.wav";
import puzzleSuccess from "../assets/audio/puzzle-success.wav";
import itemPickup from "../assets/audio/item-pickup.wav";
import puzzleComplete from "../assets/audio/puzzle-complete.wav";

type SoundName =
  | "click"
  | "interface"
  | "open"
  | "extract"
  | "success"
  | "pickup"
  | "complete";

interface AudioContextType {
  playSound: (
    sound: SoundName,
    volume?: number
  ) => void;
}

const AudioContext =
  createContext<AudioContextType | null>(null);

export function AudioProvider({
  children,
}: {
  children: ReactNode;
}) {
  const sounds = useMemo(
    () => ({
      click: uiClick,
      interface: uiInterface,
      open: puzzleOpen,
      extract: commandExtract,
      success: puzzleSuccess,
      pickup: itemPickup,
      complete: puzzleComplete,
    }),
    []
  );

  function playSound(
    sound: SoundName,
    volume = 0.7
  ) {
    const source = sounds[sound];

    if (!source) {
      return;
    }

    const audio = new Audio(source);

    audio.volume = Math.max(
      0,
      Math.min(volume, 1)
    );

    audio.currentTime = 0;

    void audio.play().catch(() => {
      // Browser may block audio before user interaction.
    });
  }

  const value = useMemo(
    () => ({
      playSound,
    }),
    []
  );

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error(
      "useAudio must be used inside AudioProvider"
    );
  }

  return context;
}