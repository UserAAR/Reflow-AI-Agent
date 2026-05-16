import { useRef, useState, useEffect } from "react";
import {
  Plus, Minus, Maximize2, Search, Map, FileText,
  GitBranch, Filter, Layers, MessageSquare, ChevronDown, GripVertical,
} from "lucide-react";

type Props = {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
  showLogs: boolean;
  toggleLogs: () => void;
  showMinimap: boolean;
  toggleMinimap: () => void;
};

export function FloatingToolbar(props: Props) {
  const [pos, setPos] = useState({ x: 24, y: 24 });
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragRef = useRef<{ sx: number; sy: number; px: number; py: number } | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    return (
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 select-none">
        <div className="flex items-center gap-1 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] p-1.5">
          <ToolBtn onClick={props.onZoomOut} title="Zoom out"><Minus size={16} /></ToolBtn>
          <div className="px-2 text-neutral-500 tabular-nums text-center" style={{ fontSize: 11, lineHeight: "36px" }}>
            {Math.round(props.zoom * 100)}%
          </div>
          <ToolBtn onClick={props.onZoomIn} title="Zoom in"><Plus size={16} /></ToolBtn>
          <ToolBtn onClick={props.onFit} title="Fit view"><Maximize2 size={15} /></ToolBtn>
          <span className="w-px h-5 bg-black/[0.06] dark:bg-white/[0.08] mx-0.5" />
          <ToolBtn active={props.showLogs} onClick={props.toggleLogs} title="AI logs"><FileText size={15} /></ToolBtn>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute z-20 select-none" style={{ left: pos.x, top: pos.y }}>
      <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
        <div
          onMouseDown={(e) => {
            dragRef.current = { sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y };
            const move = (ev: MouseEvent) => {
              if (!dragRef.current) return;
              setPos({
                x: Math.max(8, dragRef.current.px + ev.clientX - dragRef.current.sx),
                y: Math.max(8, dragRef.current.py + ev.clientY - dragRef.current.sy),
              });
            };
            const up = () => {
              dragRef.current = null;
              window.removeEventListener("mousemove", move);
              window.removeEventListener("mouseup", up);
            };
            window.addEventListener("mousemove", move);
            window.addEventListener("mouseup", up);
          }}
          className="flex items-center justify-between px-2.5 py-1.5 border-b border-black/[0.05] dark:border-white/[0.06] cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-1.5 text-neutral-500" style={{ fontSize: 11 }}>
            <GripVertical size={11} /> workflow tools
          </div>
          <button onClick={() => setCollapsed((c) => !c)} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
            <ChevronDown size={12} className={`transition-transform ${collapsed ? "-rotate-90" : ""}`} />
          </button>
        </div>
        {!collapsed && (
          <div className="p-1.5 grid grid-cols-1 gap-0.5">
            <Group>
              <ToolBtn onClick={props.onZoomIn} title="Zoom in"><Plus size={14} /></ToolBtn>
              <ToolBtn onClick={props.onZoomOut} title="Zoom out"><Minus size={14} /></ToolBtn>
              <ToolBtn onClick={props.onFit} title="Fit view"><Maximize2 size={13} /></ToolBtn>
              <div className="px-2 text-neutral-500 tabular-nums text-center" style={{ fontSize: 10.5, lineHeight: "28px" }}>
                {Math.round(props.zoom * 100)}%
              </div>
            </Group>
            <Divider />
            <Group>
              <ToolBtn title="Search nodes"><Search size={13} /></ToolBtn>
              <ToolBtn title="Node navigator"><GitBranch size={13} /></ToolBtn>
              <ToolBtn title="Filter"><Filter size={13} /></ToolBtn>
              <ToolBtn title="Layers"><Layers size={13} /></ToolBtn>
            </Group>
            <Divider />
            <Group>
              <ToolBtn active={props.showLogs} onClick={props.toggleLogs} title="AI logs"><FileText size={13} /></ToolBtn>
              <ToolBtn active={props.showMinimap} onClick={props.toggleMinimap} title="Mini-map"><Map size={13} /></ToolBtn>
              <ToolBtn title="Comments"><MessageSquare size={13} /></ToolBtn>
            </Group>
          </div>
        )}
      </div>
    </div>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>;
}

function Divider() {
  return <div className="my-1 h-px bg-black/[0.05] dark:bg-white/[0.06]" />;
}

function ToolBtn({ children, onClick, title, active }: { children: React.ReactNode; onClick?: () => void; title?: string; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-9 h-9 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors ${
        active
          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.05]"
      }`}
    >
      {children}
    </button>
  );
}
