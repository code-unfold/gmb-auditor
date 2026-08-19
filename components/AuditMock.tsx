/**
 * Decorative, CSS-only mock of a GMB Auditor report card for the hero section.
 */
export default function AuditMock() {
  const bars = [
    { label: "Categories", value: 92, color: "bg-brand-400" },
    { label: "Reviews", value: 78, color: "bg-accent-400" },
    { label: "Posts", value: 64, color: "bg-brand-300" },
    { label: "Rankings", value: 85, color: "bg-accent-500" },
  ];

  // 5x5 teleport grid: 1 = strong rank (green), 2 = mid (amber), 3 = weak (gray)
  const grid = [
    1, 1, 2, 1, 2,
    1, 1, 1, 2, 3,
    1, 1, 1, 1, 2,
    2, 1, 1, 1, 1,
    2, 3, 2, 1, 1,
  ];
  const gridColor = (v: number) =>
    v === 1 ? "bg-accent-400" : v === 2 ? "bg-amber-400" : "bg-brand-100";

  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      {/* Main audit card */}
      <div className="relative z-10 rounded-2xl border border-brand-100 bg-white p-6 shadow-lift">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-400">
              Audit Report
            </p>
            <h3 className="mt-1 text-lg font-bold text-brand-900">Bright Smile Dental</h3>
            <p className="text-xs text-brand-800/60">Gaithersburg, MD</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-brand-800">
              <span className="text-amber-500">★★★★★</span> 4.8 · 127 reviews
            </div>
          </div>

          {/* Score ring */}
          <div className="relative h-20 w-20 shrink-0">
            <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="#EDF4FC" strokeWidth="9" />
              <circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                stroke="#0F9960"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 34}
                strokeDashoffset={2 * Math.PI * 34 * (1 - 0.86)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-extrabold text-brand-900">86</span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-brand-400">
                Score
              </span>
            </div>
          </div>
        </div>

        {/* Category chips */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-brand-500 px-2.5 py-1 text-[11px] font-semibold text-white">
            Dentist
          </span>
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-600">
            Cosmetic dentist
          </span>
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-600">
            Dental clinic
          </span>
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-600">
            +3 more
          </span>
        </div>

        {/* Score bars */}
        <div className="mt-5 space-y-2.5">
          {bars.map((bar) => (
            <div key={bar.label} className="flex items-center gap-3">
              <span className="w-20 text-[11px] font-semibold text-brand-800/70">{bar.label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-brand-50">
                <div
                  className={`h-full rounded-full ${bar.color}`}
                  style={{ width: `${bar.value}%` }}
                />
              </div>
              <span className="w-7 text-right text-[11px] font-bold text-brand-900">
                {bar.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Teleport grid card */}
      <div className="absolute -left-6 -bottom-10 z-20 hidden rounded-xl border border-brand-100 bg-white p-3.5 shadow-lift sm:block">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-brand-400">
          Rank Grid · &ldquo;dentist near me&rdquo;
        </p>
        <div className="grid w-fit grid-cols-5 gap-1">
          {grid.map((v, i) => (
            <span key={i} className={`h-4 w-4 rounded ${gridColor(v)}`} />
          ))}
        </div>
      </div>

      {/* AI suggestion chip */}
      <div className="absolute -right-4 -top-6 z-20 hidden max-w-[220px] rounded-xl border border-accent-100 bg-white p-3.5 shadow-lift sm:block">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-accent-600">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.1 6.5H21l-5.5 4 2.1 6.5-5.6-4-5.6 4 2.1-6.5-5.5-4h6.9L12 2z" />
          </svg>
          AI Suggestion
        </p>
        <p className="mt-1.5 text-[11px] leading-snug text-brand-800/80">
          Add <b>&ldquo;Emergency dental service&rdquo;</b> as a secondary category — 3 of 5 top
          competitors rank with it.
        </p>
      </div>

      {/* Soft glow */}
      <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-tr from-brand-100 via-accent-50 to-transparent blur-2xl" />
    </div>
  );
}
