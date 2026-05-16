import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Topbar } from "../components/app/topbar";
import { Canvas } from "../components/app/canvas";
import { IntakeOverlay } from "../components/app/overlays/intake-overlay";
import { SimilarityOverlay } from "../components/app/overlays/similarity-overlay";
import { GenericOverlay } from "../components/app/overlays/generic-overlay";
import { stages, type StageId } from "../components/app/workflow-data";

export type RuntimeState = "pending" | "running" | "done" | "locked";
export type LogEntry = { t: string; tag: string; msg: string; level?: "info" | "warn" | "ok" };

const ORDER: StageId[] = stages.map((s) => s.id);
const PAUSE_STAGES = new Set<StageId>(["intake", "similarity"]);
const STAGE_LOGS: Record<StageId, string[]> = {
  trigger:    ["commercial agreement received · external"],
  intake:     ["product intake started", "awaiting upload · CSV / images"],
  validation: ["validating fields", "barcode verified · EAN-13", "1 warning · weight unit unclear"],
  similarity: ["running similarity search", "8 parallel agents dispatched", "match found · 94.6%"],
  forecast:   ["forecasting demand · 14-day window", "14,820 units across 42 branches"],
  costing:    ["computing landed cost", "retail recommendation · ₼ 4.49 · margin 22.4%"],
  allocation: ["checking store capacity", "2 branches filtered · shelf limits"],
  logistics:  ["assigning warehouse WH-N", "route optimized · −18% km"],
  approval:   ["approval requested · audit #84-9120", "awaiting human review"],
  execution:  ["execution started", "12 POs dispatched · 40 branches"],
  monitoring: ["monitoring active · 42 stores", "feedback loop → model v3.3"],
};

function clockNow() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")}`;
}

export default function AppPage() {
  const [running, setRunning] = useState(false);
  const [states, setStates] = useState<Record<StageId, RuntimeState>>(() => {
    const init = {} as Record<StageId, RuntimeState>;
    ORDER.forEach((id) => (init[id] = "pending"));
    init.trigger = "done";
    return init;
  });
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const [logs, setLogs] = useState<LogEntry[]>([
    { t: clockNow(), tag: "system", msg: "workflow ready · press Start to execute", level: "info" },
  ]);
  const [overlay, setOverlay] = useState<{ stageId: StageId; manual?: boolean } | null>(null);
  const timerRef = useRef<number | null>(null);

  const appendLog = useCallback((tag: string, msg: string, level: LogEntry["level"] = "info") => {
    setLogs((l) => [...l.slice(-80), { t: clockNow(), tag, msg, level }]);
  }, []);

  const reset = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    setRunning(false);
    setActiveIdx(-1);
    setStates(() => {
      const init = {} as Record<StageId, RuntimeState>;
      ORDER.forEach((id) => (init[id] = "pending"));
      init.trigger = "done";
      return init;
    });
    setLogs([{ t: clockNow(), tag: "system", msg: "workflow reset", level: "info" }]);
    setOverlay(null);
  }, []);

  /* ----- execution engine ------------------------------------------------ */
  const startStage = useCallback((idx: number) => {
    if (idx >= ORDER.length) {
      setRunning(false);
      setActiveIdx(-1);
      appendLog("system", "workflow completed · all stages done", "ok");
      return;
    }
    const id = ORDER[idx];
    if (id === "trigger") { startStage(idx + 1); return; }
    setActiveIdx(idx);
    setStates((s) => ({ ...s, [id]: "running" }));
    const stageLogs = STAGE_LOGS[id];
    stageLogs.forEach((m, i) => {
      window.setTimeout(() => appendLog(id, m, i === stageLogs.length - 1 ? "ok" : "info"), 250 + i * 600);
    });
    if (PAUSE_STAGES.has(id)) {
      setOverlay({ stageId: id });
      return;
    }
    const dur = 2400;
    timerRef.current = window.setTimeout(() => {
      setStates((s) => ({ ...s, [id]: "done" }));
      startStage(idx + 1);
    }, dur);
  }, [appendLog]);

  /* ----- top bar controls ----------------------------------------------- */
  const handleStart = useCallback(() => {
    if (running) return;
    setRunning(true);
    if (activeIdx === -1) {
      appendLog("system", "execution started", "ok");
      startStage(0);
    } else {
      // resume from current
      startStage(activeIdx);
    }
  }, [running, activeIdx, startStage, appendLog]);

  const handlePause = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    setRunning(false);
    appendLog("system", "execution paused", "info");
  }, [appendLog]);

  /* ----- overlay completion --------------------------------------------- */
  const completeActiveStage = useCallback(() => {
    if (activeIdx < 0) return;
    const id = ORDER[activeIdx];
    setStates((s) => ({ ...s, [id]: "done" }));
    setOverlay(null);
    appendLog(id, "stage complete · advancing", "ok");
    if (running) startStage(activeIdx + 1);
  }, [activeIdx, running, startStage, appendLog]);

  /* ----- double-click on node ------------------------------------------- */
  const openOverlay = useCallback((stageId: StageId) => {
    setOverlay({ stageId, manual: true });
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const activeId = activeIdx >= 0 ? ORDER[activeIdx] : null;
  const overlayStage = useMemo(() => stages.find((s) => s.id === overlay?.stageId) ?? null, [overlay]);

  return (
    <div className="h-screen w-full flex flex-col bg-neutral-50/60 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 overflow-hidden">
      <Topbar
        running={running}
        setRunning={(v) => (v ? handleStart() : handlePause())}
        onReset={reset}
      />
      <Canvas
        running={running}
        states={states}
        activeId={activeId}
        logs={logs}
        onOpenStage={openOverlay}
      />

      {overlay && overlayStage && overlay.stageId === "intake" && (
        <IntakeOverlay
          stage={overlayStage}
          onLog={appendLog}
          onComplete={completeActiveStage}
          onClose={() => overlay.manual ? setOverlay(null) : null}
          manual={!!overlay.manual}
        />
      )}
      {overlay && overlayStage && overlay.stageId === "similarity" && (
        <SimilarityOverlay
          stage={overlayStage}
          onLog={appendLog}
          onComplete={completeActiveStage}
          onClose={() => overlay.manual ? setOverlay(null) : null}
          manual={!!overlay.manual}
        />
      )}
      {overlay && overlayStage && overlay.stageId !== "intake" && overlay.stageId !== "similarity" && (
        <GenericOverlay
          stage={overlayStage}
          state={states[overlay.stageId]}
          onClose={() => setOverlay(null)}
        />
      )}
    </div>
  );
}
