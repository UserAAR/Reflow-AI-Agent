export function Logo({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <div className={`flex items-center shrink-0 ${className}`}>
      <img
        src="/logo.png"
        alt="Reflow"
        style={{ height: size }}
        className="object-contain dark:brightness-[1.15] dark:contrast-[1.1]"
        draggable={false}
      />
    </div>
  );
}
