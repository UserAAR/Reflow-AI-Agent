export type StageId =
  | "trigger" | "intake" | "validation" | "similarity" | "forecast"
  | "costing" | "allocation" | "logistics" | "approval" | "execution" | "monitoring";

export type NodeState = "done" | "running" | "queued" | "locked" | "warning";
export type NodeKind = "trigger" | "main" | "core" | "shield" | "monitor";

export type Sub = { id: string; label: string; icon?: string; tone?: "ok" | "warn" | "muted" };

export type Stage = {
  id: StageId;
  step: number;
  row: 0 | 1 | 2;
  x: number; y: number;
  title: string;
  desc: string;
  state: NodeState;
  kind: NodeKind;
  icon: string;
  metrics?: { label: string; value: string }[];
  subs?: Sub[];
};

const ROW_Y = [200, 720, 1240];
const COL_X = [120, 520, 920, 1320];

export const stages: Stage[] = [
  {
    id: "trigger", step: 1, row: 0, x: COL_X[0], y: ROW_Y[0],
    title: "Commercial Agreement", desc: "Contract signed · external trigger",
    state: "locked", kind: "trigger", icon: "Zap",
  },
  {
    id: "intake", step: 2, row: 0, x: COL_X[1], y: ROW_Y[0],
    title: "Product Intake", desc: "Multi-source ingestion",
    state: "done", kind: "main", icon: "Inbox",
    metrics: [{ label: "sources", value: "8" }, { label: "ingest", value: "2.3s" }],
    subs: [
      { id: "csv", label: "CSV / Excel", icon: "FileSpreadsheet", tone: "ok" },
      { id: "img", label: "Product Images", icon: "Image", tone: "ok" },
      { id: "form", label: "Manual Form", icon: "FormInput", tone: "ok" },
      { id: "supplier", label: "Supplier Meta", icon: "Database", tone: "ok" },
      { id: "barcode", label: "Barcode · GS1", icon: "ScanBarcode", tone: "ok" },
      { id: "docs", label: "Tech Docs", icon: "FileText", tone: "ok" },
    ],
  },
  {
    id: "validation", step: 3, row: 0, x: COL_X[2], y: ROW_Y[0],
    title: "Data Validation", desc: "AI verification gateway",
    state: "done", kind: "main", icon: "ShieldCheck",
    metrics: [{ label: "rules", value: "11/12" }, { label: "conf", value: "98.2%" }],
    subs: [
      { id: "missing", label: "Missing Fields", icon: "AlertCircle", tone: "warn" },
      { id: "ean", label: "Barcode Verify", icon: "BadgeCheck", tone: "ok" },
      { id: "units", label: "Unit Standardize", icon: "Ruler", tone: "ok" },
      { id: "cat", label: "Category Check", icon: "Tag", tone: "ok" },
    ],
  },
  {
    id: "similarity", step: 4, row: 0, x: COL_X[3], y: ROW_Y[0],
    title: "Similarity Engine", desc: "AI matching core · parallel agents",
    state: "running", kind: "core", icon: "Brain",
    metrics: [{ label: "match", value: "94.6%" }, { label: "similar", value: "247" }],
    subs: [
      { id: "cat", label: "Category Match", icon: "Layers", tone: "ok" },
      { id: "subcat", label: "Subcategory", icon: "Layers", tone: "ok" },
      { id: "price", label: "Price Band", icon: "BadgePercent", tone: "ok" },
      { id: "pack", label: "Packaging", icon: "Package", tone: "ok" },
      { id: "brand", label: "Brand Position", icon: "Sparkles", tone: "ok" },
      { id: "desc", label: "Description Emb.", icon: "Type", tone: "ok" },
      { id: "history", label: "Historical Match", icon: "History", tone: "ok" },
      { id: "season", label: "Seasonal Sim.", icon: "Snowflake", tone: "ok" },
    ],
  },

  {
    id: "forecast", step: 5, row: 1, x: COL_X[3], y: ROW_Y[1],
    title: "Demand Forecast", desc: "14-day predictive model",
    state: "running", kind: "main", icon: "TrendingUp",
    metrics: [{ label: "units", value: "14.8k" }, { label: "conf", value: "91%" }],
    subs: [
      { id: "hist", label: "Historical Sim.", icon: "History", tone: "ok" },
      { id: "season", label: "Seasonal Demand", icon: "Snowflake", tone: "ok" },
      { id: "region", label: "Regional Demand", icon: "MapPin", tone: "ok" },
      { id: "store", label: "Store-Type", icon: "Store", tone: "ok" },
      { id: "launch", label: "Launch Volume", icon: "Rocket", tone: "ok" },
      { id: "replen", label: "Replenishment", icon: "RefreshCw", tone: "ok" },
    ],
  },
  {
    id: "costing", step: 6, row: 1, x: COL_X[2], y: ROW_Y[1],
    title: "Costing & Margin", desc: "Landed cost · price recommendation",
    state: "done", kind: "main", icon: "Calculator",
    metrics: [{ label: "retail", value: "₼4.49" }, { label: "margin", value: "22.4%" }],
    subs: [
      { id: "import", label: "Import Cost", icon: "Truck", tone: "ok" },
      { id: "logistics", label: "Logistics Cost", icon: "Boxes", tone: "ok" },
      { id: "tax", label: "Tax Impact", icon: "Percent", tone: "ok" },
      { id: "wh", label: "Warehouse Cost", icon: "Warehouse", tone: "ok" },
    ],
  },
  {
    id: "allocation", step: 7, row: 1, x: COL_X[1], y: ROW_Y[1],
    title: "Branch Allocation", desc: "Capacity-aware · 42 branches",
    state: "running", kind: "main", icon: "Network",
    metrics: [{ label: "eligible", value: "40/42" }, { label: "units", value: "14.8k" }],
    subs: [
      { id: "cap", label: "Store Capacity", icon: "Building2", tone: "ok" },
      { id: "shelf", label: "Shelf Space", icon: "LayoutGrid", tone: "ok" },
      { id: "sku", label: "Active SKU Limit", icon: "Hash", tone: "warn" },
      { id: "foot", label: "Footfall Analysis", icon: "Users", tone: "ok" },
      { id: "profile", label: "Customer Profile", icon: "UserCheck", tone: "ok" },
      { id: "rank", label: "Branch Ranking", icon: "BarChart3", tone: "ok" },
    ],
  },
  {
    id: "logistics", step: 8, row: 1, x: COL_X[0], y: ROW_Y[1],
    title: "Logistics Planning", desc: "Warehouse · dispatch · routing",
    state: "queued", kind: "main", icon: "Truck",
    metrics: [{ label: "warehouse", value: "WH-N" }, { label: "waves", value: "3" }],
    subs: [
      { id: "wh", label: "Warehouse Assign", icon: "Warehouse", tone: "muted" },
      { id: "dispatch", label: "Dispatch Plan", icon: "Send", tone: "muted" },
      { id: "route", label: "Route Optimize", icon: "Route", tone: "muted" },
      { id: "risk", label: "Shipment Risk", icon: "AlertTriangle", tone: "muted" },
    ],
  },

  {
    id: "approval", step: 9, row: 2, x: COL_X[0], y: ROW_Y[2],
    title: "Human Approval", desc: "Audited checkpoint · AI conf 94%",
    state: "queued", kind: "shield", icon: "ShieldAlert",
    metrics: [{ label: "reviewers", value: "3" }, { label: "audit", value: "#84-9120" }],
  },
  {
    id: "execution", step: 10, row: 2, x: COL_X[1], y: ROW_Y[2],
    title: "Execution Engine", desc: "Decisions become operational tasks",
    state: "queued", kind: "main", icon: "PlayCircle",
    metrics: [{ label: "POs", value: "12" }, { label: "go-live", value: "22 Mar" }],
    subs: [
      { id: "po", label: "Purchase Orders", icon: "FileText", tone: "muted" },
      { id: "wh", label: "Warehouse Tasks", icon: "Warehouse", tone: "muted" },
      { id: "store", label: "Store Operations", icon: "Store", tone: "muted" },
      { id: "delivery", label: "Delivery Flow", icon: "Truck", tone: "muted" },
    ],
  },
  {
    id: "monitoring", step: 11, row: 2, x: COL_X[2], y: ROW_Y[2],
    title: "Monitoring & Feedback", desc: "Continuous learning loop",
    state: "queued", kind: "monitor", icon: "Activity",
    metrics: [{ label: "stores", value: "42" }, { label: "model", value: "v3.3" }],
    subs: [
      { id: "sales", label: "Sales Tracking", icon: "LineChart", tone: "muted" },
      { id: "waste", label: "Wastage Monitor", icon: "Trash2", tone: "muted" },
      { id: "stock", label: "Stock Depletion", icon: "PackageMinus", tone: "muted" },
      { id: "replen", label: "Replenishment", icon: "RefreshCw", tone: "muted" },
      { id: "learn", label: "AI Feedback Learn", icon: "Brain", tone: "muted" },
    ],
  },
];

export const NODE_W = 240;
export const NODE_H = 92;

export const WORLD_W = 1600;
export const WORLD_H = 1640;

export const edges: { from: StageId; to: StageId; active?: boolean; condition?: string; feedback?: boolean }[] = [
  { from: "trigger", to: "intake" },
  { from: "intake", to: "validation" },
  { from: "validation", to: "similarity", active: true },
  { from: "similarity", to: "forecast", active: true },
  { from: "forecast", to: "costing" },
  { from: "costing", to: "allocation", active: true },
  { from: "allocation", to: "logistics" },
  { from: "logistics", to: "approval" },
  { from: "approval", to: "execution", condition: "approved" },
  { from: "execution", to: "monitoring" },
  { from: "monitoring", to: "similarity", feedback: true },
];
