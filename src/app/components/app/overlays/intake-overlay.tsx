import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  X, Upload, FileSpreadsheet, FileText, Image as ImageIcon, Inbox, Sparkles,
  CheckCircle2, Loader2,
} from "lucide-react";
import type { Stage } from "../workflow-data";

type FormFields = {
  title: string; brand: string; category: string; subcategory: string; family: string;
  barcode: string; packaging: string; unitSize: string; weight: string; shelfLife: string;
  storage: string; origin: string; supplier: string; launchDate: string; description: string;
};

const EMPTY: FormFields = {
  title: "", brand: "", category: "", subcategory: "", family: "",
  barcode: "", packaging: "", unitSize: "", weight: "", shelfLife: "",
  storage: "", origin: "", supplier: "", launchDate: "", description: "",
};

const CSV_FILL: FormFields = {
  title: "Bravo Organic Yogurt 500g",
  brand: "Bravo Organic",
  category: "Dairy",
  subcategory: "Yogurt",
  family: "Chilled Dairy",
  barcode: "8690123456784",
  packaging: "Plastic cup · 500g",
  unitSize: "500",
  weight: "510 g",
  shelfLife: "21 days",
  storage: "Chilled · 2–6°C",
  origin: "Azerbaijan",
  supplier: "Bravo Dairy Co.",
  launchDate: "2026-03-22",
  description: "Organic creamy yogurt produced from grass-fed cows. Natural, no added sugar.",
};

export function IntakeOverlay({
  stage, onLog, onComplete, onClose, manual,
}: {
  stage: Stage;
  onLog: (tag: string, msg: string, level?: "info" | "warn" | "ok") => void;
  onComplete: () => void;
  onClose: () => void;
  manual: boolean;
}) {
  const [fields, setFields] = useState<FormFields>(EMPTY);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; kind: "csv" | "xlsx" | "image" } | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [extracting, setExtracting] = useState(false);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    const name = file.name.toLowerCase();
    if (name.endsWith(".csv") || name.endsWith(".xlsx") || name.endsWith(".xls")) {
      const kind: "csv" | "xlsx" = name.endsWith(".csv") ? "csv" : "xlsx";
      setUploadedFile({ name: file.name, kind });
      onLog(stage.id, `parsing upload · ${file.name}`, "info");
      setExtracting(true);
      window.setTimeout(() => {
        setFields(CSV_FILL);
        setExtracting(false);
        onLog(stage.id, "fields auto-filled from upload", "ok");
      }, 1200);
    } else if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImages((arr) => [...arr, url]);
      setUploadedFile({ name: file.name, kind: "image" });
      onLog(stage.id, `image attached · ${file.name}`, "info");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    Array.from(e.dataTransfer.files).forEach(handleFile);
  };

  const submit = () => {
    setDone(true);
    onLog(stage.id, "intake submitted · advancing pipeline", "ok");
    window.setTimeout(() => onComplete(), 600);
  };

  return (
    <Backdrop>
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="relative w-[min(1180px,94vw)] h-[min(760px,88vh)] rounded-2xl bg-white dark:bg-neutral-950 border border-black/[0.06] dark:border-white/[0.08] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="h-14 px-5 flex items-center gap-3 border-b border-black/[0.05] dark:border-white/[0.06] shrink-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
            <Inbox size={15} strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-neutral-400" style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.12em" }}>
              STAGE 02 · PRODUCT INTAKE
              {!manual && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400" style={{ fontSize: 9.5 }}>
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> awaiting input
                </span>
              )}
            </div>
            <div className="text-neutral-950 dark:text-white" style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>
              Upload product data · {stage.desc}
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={!manual && !done}
            className="w-8 h-8 rounded-lg text-neutral-500 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
            title={!manual && !done ? "close after submission" : "close"}
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] min-h-0">
          {/* LEFT — uploads */}
          <div className="p-6 border-r border-black/[0.05] dark:border-white/[0.06] overflow-y-auto space-y-4">
            <SectionTitle>Files & images</SectionTitle>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="rounded-2xl border-2 border-dashed border-emerald-300/60 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/10 p-6 text-center hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20 transition-colors cursor-pointer"
              onClick={() => fileRef.current?.click()}
            >
              <div className="mx-auto w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-center text-emerald-600">
                <Upload size={18} strokeWidth={1.8} />
              </div>
              <div className="mt-2 text-neutral-900 dark:text-white" style={{ fontSize: 13, fontWeight: 600 }}>
                Drop CSV / Excel / images
              </div>
              <div className="text-neutral-500" style={{ fontSize: 11.5 }}>
                or click to browse · auto-extract on upload
              </div>
              <input ref={fileRef} type="file" multiple accept=".csv,.xlsx,.xls,image/*"
                className="hidden"
                onChange={(e) => e.target.files && Array.from(e.target.files).forEach(handleFile)}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <UploadChip icon={<FileSpreadsheet size={13} />} label="CSV upload" onClick={() => fileRef.current?.click()} />
              <UploadChip icon={<FileSpreadsheet size={13} />} label="Excel upload" onClick={() => fileRef.current?.click()} />
              <UploadChip icon={<ImageIcon size={13} />} label="Product images" onClick={() => imageRef.current?.click()} />
              <UploadChip icon={<FileText size={13} />} label="Tech documents" onClick={() => fileRef.current?.click()} />
            </div>
            <input ref={imageRef} type="file" multiple accept="image/*" className="hidden"
              onChange={(e) => e.target.files && Array.from(e.target.files).forEach(handleFile)} />

            {uploadedFile && (
              <div className="rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-neutral-50/60 dark:bg-white/[0.02] px-3 py-2.5 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  {uploadedFile.kind === "image" ? <ImageIcon size={13} /> : <FileSpreadsheet size={13} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-neutral-900 dark:text-white" style={{ fontSize: 12, fontWeight: 550 }}>{uploadedFile.name}</div>
                  <div className="text-neutral-500" style={{ fontSize: 10.5 }}>
                    {extracting ? "extracting fields…" : "parsed · ready"}
                  </div>
                </div>
                {extracting ? <Loader2 size={14} className="text-emerald-500 animate-spin" /> : <CheckCircle2 size={14} className="text-emerald-500" />}
              </div>
            )}

            {images.length > 0 && (
              <div>
                <SectionTitle>Images · {images.length}</SectionTitle>
                <div className="grid grid-cols-4 gap-2">
                  {images.map((src, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden border border-black/[0.06] dark:border-white/[0.08] bg-neutral-100 dark:bg-white/[0.03]">
                      <img src={src} className="w-full h-full object-cover" alt="" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-xl border border-black/[0.05] dark:border-white/[0.06] bg-neutral-50/60 dark:bg-white/[0.02] px-3 py-2.5">
              <div className="text-neutral-500" style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Tip</div>
              <div className="mt-0.5 text-neutral-700 dark:text-neutral-300" style={{ fontSize: 11.5, lineHeight: "1.45" }}>
                Upload a CSV/Excel to auto-fill product fields, or images only and let AI extraction fill what it can.
              </div>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <SectionTitle>Product fields</SectionTitle>
              <button
                onClick={() => { setFields(CSV_FILL); onLog(stage.id, "fields auto-filled by AI extraction", "ok"); }}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/60"
                style={{ fontSize: 11, fontWeight: 600 }}
              >
                <Sparkles size={11} /> AI auto-fill
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Title"        v={fields.title}       set={(v) => setFields({...fields, title: v})} />
              <Field label="Brand"        v={fields.brand}       set={(v) => setFields({...fields, brand: v})} />
              <Field label="Category"     v={fields.category}    set={(v) => setFields({...fields, category: v})} />
              <Field label="Subcategory"  v={fields.subcategory} set={(v) => setFields({...fields, subcategory: v})} />
              <Field label="Family"       v={fields.family}      set={(v) => setFields({...fields, family: v})} />
              <Field label="Barcode (EAN)" v={fields.barcode}    set={(v) => setFields({...fields, barcode: v})} />
              <Field label="Packaging"    v={fields.packaging}   set={(v) => setFields({...fields, packaging: v})} />
              <Field label="Unit size (g/ml)" v={fields.unitSize} set={(v) => setFields({...fields, unitSize: v})} />
              <Field label="Weight"       v={fields.weight}      set={(v) => setFields({...fields, weight: v})} />
              <Field label="Shelf life"   v={fields.shelfLife}   set={(v) => setFields({...fields, shelfLife: v})} />
              <Field label="Storage"      v={fields.storage}     set={(v) => setFields({...fields, storage: v})} />
              <Field label="Origin"       v={fields.origin}      set={(v) => setFields({...fields, origin: v})} />
              <Field label="Supplier"     v={fields.supplier}    set={(v) => setFields({...fields, supplier: v})} />
              <Field label="Launch date"  v={fields.launchDate}  set={(v) => setFields({...fields, launchDate: v})} type="date" />
              <div className="col-span-2">
                <Field label="Description" v={fields.description} set={(v) => setFields({...fields, description: v})} textarea />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="h-14 px-5 flex items-center gap-2 border-t border-black/[0.05] dark:border-white/[0.06] shrink-0">
          <div className="text-neutral-500" style={{ fontSize: 11.5 }}>
            {done ? "submitted · advancing" : Object.values(fields).filter(Boolean).length + " of 15 fields filled"}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={onClose}
              className="h-9 px-3 rounded-lg border border-black/[0.06] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.04]"
              style={{ fontSize: 12.5 }}
              disabled={!manual && !done}
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={done}
              className="h-9 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white inline-flex items-center gap-1.5 disabled:opacity-60"
              style={{ fontSize: 12.5, fontWeight: 550 }}
            >
              {done ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={12} />}
              {done ? "Submitting…" : "Extract & Continue"}
            </button>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
}

function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/55 backdrop-blur-sm"
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 text-neutral-400 uppercase tracking-[0.14em]" style={{ fontSize: 10.5, fontWeight: 600 }}>{children}</div>
  );
}

function UploadChip({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="h-9 px-3 rounded-lg border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-white/[0.02] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.04] inline-flex items-center gap-2 transition-colors" style={{ fontSize: 12 }}>
      <span className="text-emerald-600 dark:text-emerald-400">{icon}</span>
      {label}
    </button>
  );
}

function Field({ label, v, set, textarea, type }: { label: string; v: string; set: (v: string) => void; textarea?: boolean; type?: string }) {
  return (
    <label className="block">
      <span className="text-neutral-500" style={{ fontSize: 11, fontWeight: 500 }}>{label}</span>
      {textarea ? (
        <textarea
          value={v}
          onChange={(e) => set(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-lg border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-white/[0.02] px-3 py-2 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400/40 resize-none"
          style={{ fontSize: 12.5 }}
        />
      ) : (
        <input
          value={v}
          type={type ?? "text"}
          onChange={(e) => set(e.target.value)}
          className="mt-1 block w-full h-9 rounded-lg border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-white/[0.02] px-3 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400/40"
          style={{ fontSize: 12.5 }}
        />
      )}
    </label>
  );
}
