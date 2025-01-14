import { useEffect, useState } from 'react';

export default function useMidiDevice() {
  const [context, setContext] = useState(null);

  useEffect(() => {
    if (!window.navigator.requestMIDIAccess) {
      return;
    }

    async function connectToKeyboard() {
      try {
        setContext(await window.navigator.requestMIDIAccess());
      } catch (error) {
        console.error(error);
      }
    }

    connectToKeyboard();
  }, []);

  return { context };
}
