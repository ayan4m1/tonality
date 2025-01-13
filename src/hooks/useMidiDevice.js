import { useEffect, useState } from 'react';

export default function useMidiDevice() {
  const [context, setContext] = useState(null);

  useEffect(() => {
    if (!window.navigator.requestMIDIAccess) {
      return;
    }

    async function connectToKeyboard() {
      setContext(await window.navigator.requestMIDIAccess());
    }

    connectToKeyboard();
  }, []);

  return { context };
}
