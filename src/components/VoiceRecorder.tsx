/// <reference types="@types/dom-mediacapture-record" />

import { Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  Mic as MicIcon,
  PlayArrow as PlayArrowIcon,
  Replay as ReplayIcon,
  Stop as StopIcon,
} from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useMediaRecorder } from "../hooks/media-recorder-hook";
import { useTimer } from "../hooks/timer-hook";

export default function VoiceRecorder({ value, onChange }) {
  const [state, setState] = useState<"idle" | "playing" | "recording">("idle");

  return (
    <>
      {state === "idle" && !value && (
        <Empty onStart={() => setState("recording")} />
      )}
      {state === "idle" && value && (
        <Stopped
          onPlay={() => setState("playing")}
          onRetry={() => setState("recording")}
        />
      )}
      {state === "recording" && (
        <Recording
          onStop={(media) => {
            onChange(media);
            setState("idle");
          }}
        />
      )}
      {state === "playing" && value && (
        <Playing source={value} onStop={() => setState("idle")} />
      )}
    </>
  );
}

const Empty = ({ onStart }) => (
  <Button
    disableElevation
    variant="contained"
    color="primary"
    startIcon={<MicIcon />}
    onClick={() => {
      onStart();
    }}
  >
    Record
  </Button>
);

const Stopped = ({ onPlay, onRetry }) => (
  <ButtonGroup disableElevation>
    <Button
      color="default"
      variant="contained"
      startIcon={<PlayArrowIcon />}
      onClick={() => onPlay()}
    >
      Play
    </Button>
    <Button
      color="primary"
      variant="contained"
      onClick={() => onRetry()}
      size="small"
    >
      <ReplayIcon />
    </Button>
  </ButtonGroup>
);

function Recording({ onStop }) {
  const { elapsed, start: startTimer, stop: stopTimer } = useTimer();

  const { error, ready, start, stop, media } = useMediaRecorder(
    { audio: true },
    { mimeType: "audio/webm" }
  );

  useEffect(() => {
    if (media) onStop(media);
  }, [media, onStop]);

  useEffect(() => {
    if (ready) {
      start();
      startTimer();
    }
  }, [ready, start, startTimer]);

  if (error) {
    return <Typography>Error: {error}. Try refreshing the browser.</Typography>;
  }

  return (
    <ButtonGroup disableElevation>
      <Button variant="text" disableRipple>
        Recording {Number(elapsed).toFixed(1)}
        <span style={{ textTransform: "lowercase" }}>s</span>
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          stop();
          stopTimer();
        }}
        size="small"
      >
        <StopIcon />
      </Button>
    </ButtonGroup>
  );
}

function Playing({ source, onStop }) {
  const audioRef = useRef(new Audio(source));

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    return () => audio.pause();
  }, []);

  useEffect(() => {
    // Because of weird error
    audioRef.current.muted = false;
    audioRef.current.play();

    audioRef.current.addEventListener("ended", () => onStop());

    const timer = setInterval(() => {
      setCurrentTime(audioRef.current.currentTime);
    }, 100);

    return () => clearInterval(timer);
  }, [onStop]);

  return (
    <ButtonGroup>
      <Button variant="text" disableRipple>
        Playing {Math.round(currentTime * 10) / 10}
        <span style={{ textTransform: "lowercase" }}>s</span>
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          onStop();
        }}
        size="small"
      >
        <StopIcon />
      </Button>
    </ButtonGroup>
  );
}
