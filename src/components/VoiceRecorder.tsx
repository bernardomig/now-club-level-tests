/// <reference types="@types/dom-mediacapture-record" />

import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import {
  Mic as MicIcon,
  PlayArrow as PlayArrowIcon,
  Replay as ReplayIcon,
  Stop as StopIcon,
} from "@material-ui/icons";

export default function VoiceRecorder({ value, onChange }) {
  const [state, setState] = useState("empty");
  const [audio, setAudio] = useState(null);

  if (state === "empty") {
    return <EmptyRecordingButton onStart={() => setState("recording")} />;
  } else if (state === "recording") {
    return (
      <RecordingButton
        onStop={(data) => {
          setAudio(data);
          setState("done");
          if (onChange) onChange(data);
        }}
      />
    );
  } else if (state === "done") {
    return (
      <StoppedButton
        onPlay={() => setState("playing")}
        onRetry={() => setState("recording")}
      />
    );
  } else if (state === "playing") {
    return <PlayingButton source={audio} onStop={() => setState("done")} />;
  }
}

function EmptyRecordingButton({ onStart }) {
  return (
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
}

function StoppedButton({ onPlay, onRetry }) {
  return (
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
}

function RecordingButton({ onStop }) {
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(undefined);

  const audioStream = useRef<MediaStream>(undefined);
  const mediaRecorder = useRef<MediaRecorder>();
  const chunks = useRef([]);

  useEffect(() => {
    if (started) {
      const timer = setInterval(() => {
        setElapsed((Date.now() - started) / 1000);
      }, 100);

      return () => clearInterval(timer);
    }
  }, [started]);

  useEffect(() => {
    const constraints = { audio: true, video: false };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        audioStream.current = stream;

        mediaRecorder.current = new MediaRecorder(audioStream.current, {
          mimeType: "audio/ogg",
        });

        mediaRecorder.current.addEventListener("dataavailable", (event) => {
          if (event.data.size > 0) {
            chunks.current.push(event.data);
          }
        });
        mediaRecorder.current.addEventListener("stop", (event) => {
          const audioBuffer = new Blob(chunks.current, { type: "audio/ogg" });
          const objectUrl = window.URL.createObjectURL(audioBuffer);
          onStop(objectUrl);
        });

        mediaRecorder.current.addEventListener("start", (event) => {
          setStarted(Date.now());
        });

        mediaRecorder.current.start();
      })
      .catch(() => {
        onStop(null);
      });
  }, [onStop]);

  return (
    <ButtonGroup disableElevation>
      <Button variant="text" disableRipple>
        Recording {Number(elapsed).toFixed(1)}
        <span style={{ textTransform: "lowercase" }}>s</span>
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={() => mediaRecorder.current.stop()}
        size="small"
      >
        <StopIcon />
      </Button>
    </ButtonGroup>
  );
}

function PlayingButton({ source, onStop }) {
  const audioRef = useRef(new Audio(source));

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // Because of weird error
    audioRef.current.muted = false;
    audioRef.current.play();

    audioRef.current.addEventListener("ended", () => {
      onStop();
    });

    const timer = setInterval(() => {
      setCurrentTime(audioRef.current.currentTime);
    }, 100);

    return () => clearInterval(timer);
  }, [onStop]);

  return (
    <>
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
    </>
  );
}
