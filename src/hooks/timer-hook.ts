import { useEffect, useState } from "react";

export function useTimer() {
  const [started, setStarted] = useState<number | undefined>();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (started) {
      const timer = setInterval(() => {
        setElapsed((Date.now() - started) / 1000);
      }, 100);

      return () => clearInterval(timer);
    }
  }, [started]);

  const start = () => setStarted(Date.now());
  const stop = () => setStarted(undefined);

  return { elapsed, start, stop };
}
