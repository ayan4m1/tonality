import { useCallback, useState } from 'react';
import { noteToFreq } from 'utils';

export default function useSynthesizer() {
  const [audioContext, setAudioContext] = useState(null);
  const [oscillators] = useState(new Map());
  const initialize = useCallback(
    () => setAudioContext(new AudioContext()),
    [setAudioContext]
  );
  const startNote = useCallback(
    (note, velocity) => {
      if (!audioContext) {
        return;
      }

      const osc = audioContext.createOscillator();
      const mod = audioContext.createOscillator();
      const modGain = audioContext.createGain();
      const gain = audioContext.createGain();
      const frequency = noteToFreq(note);

      osc.type = 'sine';
      mod.type = 'square';

      mod.frequency.setValueAtTime(frequency / 4, 0);
      osc.frequency.setValueAtTime(frequency, 0);
      modGain.gain.setValueAtTime(80, 0);
      gain.gain.setValueAtTime(
        5 + 5 * parseFloat((velocity / 127).toFixed(2)),
        0
      );

      mod.connect(modGain);
      modGain.connect(osc.frequency);
      osc.connect(gain);
      gain.connect(audioContext.destination);

      mod.start();
      osc.start();

      oscillators.set(note, [osc, gain]);
    },
    [audioContext, oscillators]
  );
  const stopNote = useCallback(
    (note) => {
      if (!oscillators.has(note)) {
        return;
      }

      const [osc, gain] = oscillators.get(note);

      gain.disconnect();
      osc.disconnect();
      osc.stop();

      oscillators.delete(note);
    },
    [oscillators]
  );

  return {
    initialize,
    startNote,
    stopNote
  };
}
