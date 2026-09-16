import { useEffect, useReducer } from "react";
import { executionCases } from "@/lib/data/execution-cases";

type Playback = { caseIndex: number; step: number; playing: boolean; reduced: boolean };
type PlaybackEvent =
  | { type: "motion"; reduced: boolean }
  | { type: "select"; caseIndex: number }
  | { type: "inspect"; step: number }
  | { type: "replay" }
  | { type: "toggle" }
  | { type: "advance" };

const timing = { initial: 2200, step: 2600, outcome: 4500 };
const initialState: Playback = { caseIndex: 0, step: 0, playing: false, reduced: false };

function playbackReducer(state: Playback, event: PlaybackEvent): Playback {
  const stepCount = executionCases[state.caseIndex].steps.length;
  switch (event.type) {
    case "motion":
      return { ...state, reduced: event.reduced, playing: !event.reduced, step: event.reduced ? stepCount : 0 };
    case "select":
      return { ...state, caseIndex: event.caseIndex, step: 0, playing: false };
    case "inspect":
      return { ...state, step: event.step, playing: false };
    case "replay":
      return { ...state, step: 0, playing: !state.reduced };
    case "toggle":
      return { ...state, playing: !state.reduced && !state.playing };
    case "advance":
      if (state.step < stepCount) return { ...state, step: state.step + 1 };
      // Keep a manually completed outcome visible; only playback cycles cases.
      return state.playing && !state.reduced
        ? { ...state, caseIndex: (state.caseIndex + 1) % executionCases.length, step: 0 }
        : state;
  }
}

/** Owns playback and timer cleanup; the execution component only renders state. */
export function useExecutionPlayback(runId: number) {
  const [state, dispatch] = useReducer(playbackReducer, initialState);
  const { caseIndex, step, playing, reduced } = state;
  const example = executionCases[caseIndex];
  const complete = step === example.steps.length;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => dispatch({ type: "motion", reduced: media.matches });
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (runId === 0) return;
    const timer = window.setTimeout(() => dispatch({ type: "replay" }), 0);
    return () => window.clearTimeout(timer);
  }, [runId]);

  useEffect(() => {
    if (!playing || reduced) return;
    const delay = complete ? timing.outcome : step === 0 ? timing.initial : timing.step;
    const timer = window.setTimeout(() => dispatch({ type: "advance" }), delay);
    return () => window.clearTimeout(timer);
  }, [caseIndex, step, playing, reduced, complete]);

  return {
    ...state, example, complete,
    current: example.steps[Math.min(step, example.steps.length - 1)],
    selectCase: (caseIndex: number) => dispatch({ type: "select", caseIndex }),
    inspectStep: (step: number) => dispatch({ type: "inspect", step }),
    replay: () => dispatch({ type: "replay" }),
    togglePlayback: () => dispatch({ type: "toggle" }),
    nextStep: () => dispatch({ type: "advance" }),
  };
}
