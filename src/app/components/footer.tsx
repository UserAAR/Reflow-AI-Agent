import { Logo } from "./logo";

const cols = [
  { title: "Product", links: ["Workflow", "Intelligence", "Allocation", "Approvals", "Monitoring"] },
  { title: "Company", links: ["About", "Customers", "Careers", "Contact"] },
  { title: "Resources", links: ["Docs", "Changelog", "Security", "Status"] },
  { title: "Legal", links: ["Privacy", "Terms", "DPA", "Compliance"] },
];

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.08] py-12 sm:py-16 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(4,1fr)] gap-8 sm:gap-10">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Logo />
          <p className="mt-4 text-neutral-500 max-w-xs" style={{ fontSize: 13, lineHeight: 1.55 }}>
            AI-driven retail decision orchestration. Built for Bravo supermarkets.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-neutral-900 dark:text-neutral-100" style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "0.04em" }}>{c.title}</div>
            <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-2.5">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors" style={{ fontSize: 13 }}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14 pt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-500" style={{ fontSize: 12 }}>
        <span>© 2026 Reflow Inc. All rights reserved.</span>
        <span>Made for retail operators.</span>
      </div>
    </footer>
  );
}
