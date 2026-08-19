import Link from "next/link";
import AuditMock from "@/components/AuditMock";
import FAQ, { type FaqItem } from "@/components/FAQ";
import { SIGNUP_URL, COMPANY } from "@/lib/config";

/* ---------------------------------- data --------------------------------- */

const steps = [
  {
    n: "1",
    title: "Create your free account",
    body: "Sign up in under a minute — no credit card required. Your dashboard works in any browser, nothing to install.",
  },
  {
    n: "2",
    title: "Search any business",
    body: "Paste a Google Maps link or search by name — yours or any competitor's, anywhere in the world.",
  },
  {
    n: "3",
    title: "Run your audit",
    body: "Categories, reviews, posts, rankings and AI-powered fixes — a complete GBP picture in seconds.",
  },
];

const features = [
  {
    icon: "tag",
    title: "Competitor Categories",
    desc: "See exactly which categories any competitor uses — including the hidden ones Google doesn't show.",
    points: [
      "Reveal any profile's primary category",
      "Uncover every hidden secondary category",
      "Always free to use",
    ],
  },
  {
    icon: "columns",
    title: "Local Scan",
    desc: "Compare multiple competitor profiles side by side and spot the gaps in yours.",
    points: [
      "Compare multiple competitors in one click",
      "Categories & services side by side",
      "Review counts & ratings across profiles",
    ],
  },
  {
    icon: "sparkles",
    title: "AI Tools",
    desc: "Generate on-brand GBP content in seconds — posts, replies, descriptions and more.",
    points: [
      "AI post & description generators",
      "AI review response generator",
      "Q&A, Facebook posts & image ideas",
    ],
    link: { href: "/ai", label: "Explore all AI tools" },
  },
  {
    icon: "search",
    title: "Category Finder",
    desc: "Research related categories backed by real-world data, not guesswork.",
    points: [
      "Related categories from real data",
      "Service suggestions for each category",
      "Traffic potential per category",
    ],
  },
  {
    icon: "clipboard",
    title: "Basic Audit",
    desc: "Every technical detail of a profile, extracted instantly.",
    points: [
      "Place ID, CID & knowledge panel data",
      "Services, attributes & categories",
      "40+ additional data points",
    ],
  },
  {
    icon: "star",
    title: "Review Audit",
    desc: "Understand what customers are really saying — and how it trends over time.",
    points: [
      "Review & rating trends over time",
      "Detailed sentiment breakdown",
      "Common keywords customers use",
    ],
  },
  {
    icon: "pin",
    title: "Teleport Rank Check",
    desc: "See how a profile ranks from any street corner on the planet.",
    points: [
      "Check rank from any location",
      "Any search term, any market",
      "Customizable grid & radius",
    ],
  },
  {
    icon: "calendar",
    title: "Post Audit",
    desc: "Track how often competitors post — and what actually gets engagement.",
    points: [
      "Post timeline visualization",
      "Frequency & cadence tracking",
      "Links & media monitoring",
    ],
  },
];

const comparisonRows = [
  { capability: "Competitor category research", typical: "$20–$50/mo" },
  { capability: "Geo-grid rank tracking", typical: "$25–$99/mo" },
  { capability: "Review analysis & monitoring", typical: "$40–$100/mo" },
  { capability: "AI content for GBP", typical: "$20–$50/mo" },
  { capability: "GBP post tracking", typical: "$15–$40/mo" },
  { capability: "Multi-profile local scans", typical: "$50–$200/mo" },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    blurb: "Everything you need to run your first audits.",
    features: [
      "5 audit views per month",
      "5 local scan views",
      "All 8 audit tools included",
      "AI generators included",
      "No credit card required",
    ],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Pro Annual",
    price: "$15",
    period: "/mo",
    blurb: "Billed annually at $180 — save 50% vs monthly.",
    features: [
      "Unlimited audits & scans",
      "Unlimited AI generations",
      "Unlimited teleport rank checks",
      "Unlimited profiles & locations",
      "Priority support from our team",
    ],
    cta: "Go Pro Annual",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Pro Monthly",
    price: "$30",
    period: "/mo",
    blurb: "Full power, cancel anytime.",
    features: [
      "Unlimited audits & scans",
      "Unlimited AI generations",
      "Unlimited teleport rank checks",
      "Unlimited profiles & locations",
      "No contract — cancel anytime",
    ],
    cta: "Go Pro Monthly",
    highlight: false,
  },
];
const faqItems: FaqItem[] = [
  {
    q: "Is GMB Auditor part of Google?",
    a: "No. GMB Auditor is an independent tool built by Auxilium Technology, Inc. and is not affiliated with or endorsed by Google. We help you research, audit and optimize Google Business Profiles using publicly available data.",
  },
  {
    q: "How does it work?",
    a: "Create a free account, then search for any business by name or paste a Google Maps link. GMB Auditor pulls the profile's categories, reviews, posts and ranking data into one report, with AI suggestions for what to fix first.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. GMB Auditor is fully web-based and runs in any modern browser — desktop or mobile. There's no extension or software to install.",
  },
  {
    q: "How can I view my account details?",
    a: "Log in to your dashboard and open Account Information. You'll find your plan, usage, billing history and invoices there.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "You can cancel at any time — there's no contract. Go to Dashboard → Account Information → Membership and click cancel. You'll keep Pro access until the end of your billing period.",
  },
  {
    q: "How can I get help or support?",
    a: `Use the chat bubble at the bottom-right of any page, or call the Auxilium Technology team directly at ${COMPANY.phone} (toll-free ${COMPANY.tollFree}). Most questions are answered the same business day.`,
  },
  {
    q: "Can Auxilium Technology run my local SEO for me?",
    a: "Yes. GMB Auditor is built by Auxilium Technology, a full-service digital marketing agency. If you'd rather have experts optimize your Google Business Profile for you, visit auxiliumtechnology.com or call for a free consultation.",
  },
];

/* --------------------------------- icons --------------------------------- */

function FeatureIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    tag: (
      <>
        <path d="M20.6 13.4 12 22 2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8Z" />
        <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
      </>
    ),
    columns: (
      <>
        <rect x="3" y="4" width="7.5" height="16" rx="1.5" />
        <rect x="13.5" y="4" width="7.5" height="16" rx="1.5" />
      </>
    ),
    sparkles: (
      <>
        <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
        <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M15.5 15.5 21 21" />
      </>
    ),
    clipboard: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 2.5h6v3H9zM9 12l2.2 2.2L15.5 10" />
      </>
    ),
    star: (
      <path d="M12 2.5l2.9 5.9 6.6 1-4.7 4.6 1.1 6.5-5.9-3.1-5.9 3.1 1.1-6.5L2.5 9.4l6.6-1L12 2.5Z" />
    ),
    pin: (
      <>
        <path d="M12 21s-7-5.8-7-11a7 7 0 0 1 14 0c0 5.2-7 11-7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 2.5V7M16 2.5V7M3 10h18M8 14.5h2.5M13.5 14.5H16M8 17.5h2.5" />
      </>
    ),
  };

  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-card">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {paths[name]}
      </svg>
    </span>
  );
}

function Check() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-accent-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12.5 9.5 18 20 6.5" />
    </svg>
  );
}
/* ---------------------------------- page --------------------------------- */

export default function Home() {
  return (
    <>
      {/* ================================ HERO ================================ */}
      <section className="relative overflow-hidden bg-hero-grid [background-size:34px_34px]">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/70 via-white/60 to-white" />
        <div className="container-px relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="section-kicker">GMB Audit for Local SEO</p>
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-900 sm:text-5xl lg:text-[3.4rem]">
              The All-in-One{" "}
              <span className="bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
                Google Business Profile
              </span>{" "}
              Tool
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-800/75">
              Audit any business on Google Maps in seconds — categories, reviews, posts, rankings
              and AI-powered fixes. Rank higher on Google Maps with GMB Auditor, built by the local
              SEO team at Auxilium Technology.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a href={SIGNUP_URL} className="btn-primary !px-7 !py-3.5 !text-base">
                Start Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <Link href="/ai" className="btn-secondary !px-7 !py-3.5 !text-base">
                Explore AI Tools
              </Link>
            </div>
            <p className="mt-4 text-sm text-brand-800/60">
              Free plan available · No credit card required · Cancel anytime
            </p>
          </div>

          <AuditMock />
        </div>
      </section>

      {/* ============================ TRUST STRIP ============================ */}
      <section className="border-y border-brand-900/5 bg-white">
        <div className="container-px grid gap-6 py-8 text-center sm:grid-cols-3">
          {[
            ["10+ years", "of local SEO expertise behind the tool"],
            ["94%", "client retention at Auxilium Technology"],
            ["8-in-1", "audit toolkit — one login, one price"],
          ].map(([stat, label]) => (
            <div key={label as string}>
              <p className="text-2xl font-extrabold text-brand-600">{stat}</p>
              <p className="mt-1 text-sm text-brand-800/65">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================ HOW IT WORKS =========================== */}
      <section className="container-px py-20" id="how-it-works">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">How it works</p>
          <h2 className="section-title">Up and auditing in under a minute</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.n}
              className="relative rounded-2xl border border-brand-100 bg-white p-7 shadow-card"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-base font-extrabold text-white">
                {step.n}
              </span>
              <h3 className="mt-4 text-lg font-bold text-brand-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-800/70">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================== FEATURES ============================= */}
      <section className="bg-brand-50/50 py-20" id="features">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker">Features</p>
            <h2 className="section-title">Eight tools. One complete GBP picture.</h2>
            <p className="mt-4 text-brand-800/70">
              Everything you&apos;d normally stitch together from half a dozen point tools —
              audits, competitor research, rank checks and AI content — in a single dashboard.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-brand-100 bg-white p-7 shadow-card transition-shadow hover:shadow-lift"
              >
                <div className="flex items-center gap-4">
                  <FeatureIcon name={f.icon} />
                  <h3 className="text-lg font-bold text-brand-900">{f.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-brand-800/70">{f.desc}</p>
                <ul className="mt-4 space-y-2">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-brand-800/85">
                      <Check />
                      {p}
                    </li>
                  ))}
                </ul>
                {f.link && (
                  <Link
                    href={f.link.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 hover:text-brand-600"
                  >
                    {f.link.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ============================= COMPARISON ============================ */}
      <section className="container-px py-20" id="comparison">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Why GMB Auditor</p>
          <h2 className="section-title">One subscription replaces the whole stack</h2>
          <p className="mt-4 text-brand-800/70">
            Buying these capabilities as separate point tools adds up fast. GMB Auditor bundles
            them for one flat price.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-brand-100 shadow-card">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-brand-900 text-white">
                <th className="px-6 py-4 font-semibold">Capability</th>
                <th className="px-6 py-4 text-right font-semibold">
                  Typical standalone tool<sup>*</sup>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100 bg-white">
              {comparisonRows.map((row) => (
                <tr key={row.capability}>
                  <td className="px-6 py-3.5 font-medium text-brand-900">{row.capability}</td>
                  <td className="px-6 py-3.5 text-right text-brand-800/70">{row.typical}</td>
                </tr>
              ))}
              <tr className="bg-brand-50/70">
                <td className="px-6 py-4 font-bold text-brand-900">Stacked together</td>
                <td className="px-6 py-4 text-right font-bold text-red-600/90">$170–$540+/mo</td>
              </tr>
              <tr className="bg-accent-50">
                <td className="px-6 py-4 font-extrabold text-brand-900">
                  GMB Auditor — all of it
                </td>
                <td className="px-6 py-4 text-right font-extrabold text-accent-600">
                  Free or $30/mo
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mx-auto mt-3 max-w-3xl text-right text-xs text-brand-800/50">
          *Typical published pricing for standalone local SEO point tools; actual prices vary.
        </p>
      </section>

      {/* =============================== PRICING ============================= */}
      <section className="bg-brand-50/50 py-20" id="pricing">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker">Pricing</p>
            <h2 className="section-title">Start free. Upgrade when you&apos;re ready.</h2>
            <p className="mt-4 text-brand-800/70">
              Per-user licenses, no contracts, cancel anytime. Bulk licensing for agencies
              available on request.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl bg-white p-8 ${
                  plan.highlight
                    ? "border-2 border-brand-500 shadow-lift"
                    : "border border-brand-100 shadow-card"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-lg font-bold text-brand-900">{plan.name}</h3>
                <p className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-brand-900">
                    {plan.price}
                  </span>
                  <span className="text-sm font-semibold text-brand-800/60">{plan.period}</span>
                </p>
                <p className="mt-2 text-sm text-brand-800/65">{plan.blurb}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-brand-800/85">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={SIGNUP_URL}
                  className={`mt-8 w-full ${plan.highlight ? "btn-primary" : "btn-secondary"}`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================= FAQ ================================ */}
      <section className="container-px py-20" id="faq">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">FAQ</p>
          <h2 className="section-title">Frequently asked questions</h2>
        </div>
        <div className="mt-12">
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* ============================== FINAL CTA ============================= */}
      <section className="container-px pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-700 to-accent-700 px-8 py-14 text-center shadow-lift sm:px-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent-400/20 blur-2xl" />
          <h2 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to rank higher on Google Maps?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-brand-100">
            Run your first Google Business Profile audit free — and see exactly what your top
            competitors are doing differently.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <a href={SIGNUP_URL} className="btn-accent !px-8 !py-3.5 !text-base">
              Start Free
            </a>
            <Link
              href="/ai"
              className="btn !border !border-white/25 !bg-white/10 !px-8 !py-3.5 !text-base text-white hover:!bg-white/20"
            >
              See the AI Tools
            </Link>
          </div>
          <p className="relative mt-4 text-sm text-brand-200">
            Free plan · No credit card · Cancel anytime
          </p>
        </div>
      </section>
    </>
  );
}
