import { Helmet } from 'react-helmet';
import { Fragment, useCallback, useEffect } from 'react';

import CustomErrorBoundary from 'components/ErrorBoundary';
import useMidiDevice from 'hooks/useMidiDevice';
import useSynthesizer from 'hooks/useSynthesizer';
import { Button } from 'react-bootstrap';

export const ErrorBoundary = CustomErrorBoundary;

export function Component() {
  const { context } = useMidiDevice();
  const { initialize, startNote, stopNote } = useSynthesizer();
  const handleMidiMessage = useCallback(
    (event) => {
      const [action, note, velocity] = event.data;

      switch (action) {
        case 144:
          if (velocity <= 1) {
            stopNote(note);
          } else {
            startNote(note, velocity);
          }
          break;
        case 128:
          stopNote(note);
          break;
      }
    },
    [startNote, stopNote]
  );

  useEffect(() => {
    if (context) {
      const [device] = context.inputs.values();

      device.addEventListener('midimessage', handleMidiMessage);
    }

    return () => {
      if (!context) {
        return;
      }

      const [device] = context.inputs.values();

      if (device) {
        device.removeEventListener('midimessage', handleMidiMessage);
      }
    };
  }, [context, handleMidiMessage]);

  return (
    <Fragment>
      <Helmet title="Player" />
      <Button onClick={initialize} variant="primary">
        Start
      </Button>
    </Fragment>
  );
}
