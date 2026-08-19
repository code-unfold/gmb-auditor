import type { Metadata } from "next";
import { APP_URL, SIGNUP_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "AI Tools — Audit and Update Your GBP Using AI | GMB Auditor",
  description:
    "Free AI tools for Google Business Profiles: generate GBP posts, review responses, business descriptions, Q&A sections, Facebook posts and images with GMB Auditor by Auxilium Technology.",
};

const tools = [
  {
    icon: "post",
    name: "GMB Post Generator",
    desc: "Turn a sentence about your offer or update into a polished, keyword-aware Google Business Profile post.",
    cta: "Generate GMB Post",
    path: "/tools/post-generator",
  },
  {
    icon: "category",
    name: "GMB Category Finder",
    desc: "Discover additional categories your profile qualifies for — based on what actually ranks in your market.",
    cta: "Find GMB Categories",
    path: "/tools/category-finder",
  },
  {
    icon: "services",
    name: "GMB Service Finder",
    desc: "Get a ready-to-paste list of services matched to your existing categories, so no searcher misses you.",
    cta: "Find GMB Services",
    path: "/tools/service-finder",
  },
  {
    icon: "reply",
    name: "GMB Review Response Generator",
    desc: "Draft thoughtful, on-brand replies to any review — glowing or scathing — in seconds.",
    cta: "Generate Review Response",
    path: "/tools/review-response",
  },
  {
    icon: "description",
    name: "GMB Description Generator",
    desc: "Craft a business description that uses all 750 characters wisely and reads like you wrote it.",
    cta: "Generate GMB Description",
    path: "/tools/description-generator",
  },
  {
    icon: "facebook",
    name: "Facebook Post Generator",
    desc: "Repurpose your GBP updates into scroll-stopping Facebook posts without starting from scratch.",
    cta: "Generate Facebook Post",
    path: "/tools/facebook-post",
  },
  {
    icon: "qa",
    name: "Q&A Section Generator",
    desc: "Pre-empt customer questions with a complete, search-friendly Q&A section for your profile.",
    cta: "Generate Q&A Section",
    path: "/tools/qa-generator",
  },
  {
    icon: "image",
    name: "GBP Image Generator",
    desc: "Create branded, on-theme images for posts and profile galleries — no designer required.",
    cta: "Generate Images",
    path: "/tools/image-generator",
    badge: "New",
  },
];

function ToolIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    post: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h4.5" />
      </>
    ),
    category: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        <path d="M17 13.5v7M13.5 17h7" />
      </>
    ),
    services: (
      <>
        <path d="M14.5 6.5a4 4 0 0 0-5.6 5L3.5 17v3.5H7l5.5-5.4a4 4 0 0 0 5-5.6l-2.6 2.6-2.5-.5-.5-2.5 2.6-2.6Z" />
      </>
    ),
    reply: (
      <>
        <path d="M21 11.5c0 4.1-4 7.5-9 7.5-1 0-2-.1-2.9-.4L3 20l1.6-3.8A7 7 0 0 1 3 11.5C3 7.4 7 4 12 4s9 3.4 9 7.5Z" />
        <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth="2.6" />
      </>
    ),
    description: (
      <>
        <path d="M6 3h9l5 5v13H6z" />
        <path d="M15 3v5h5M9.5 13h5M9.5 16.5h5" />
      </>
    ),
    facebook: (
      <path d="M15.5 4.5H13a3.5 3.5 0 0 0-3.5 3.5v3h-3v3.5h3v6h3.5v-6h3l.5-3.5h-3.5V8.5a1 1 0 0 1 1-1h2.5V4.5Z" />
    ),
    qa: (
      <>
        <path d="M9.3 9a2.8 2.8 0 0 1 5.4 1c0 1.8-2.7 2.2-2.7 3.6" />
        <path d="M12 17h.01" strokeWidth="2.6" />
        <circle cx="12" cy="12" r="9.5" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.8" />
        <path d="M21 16.5 16 11l-8.5 9" />
      </>
    ),
  };

  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-card">
      <svg
        width="23"
        height="23"
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
export default function AiToolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-grid [background-size:34px_34px]">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-50/60 via-white/70 to-white" />
        <div className="container-px relative py-16 text-center sm:py-20">
          <p className="section-kicker">
            <span className="mr-1.5" aria-hidden="true">✦</span>
            AI Tools
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-brand-900 sm:text-5xl">
            Audit and update your GBP{" "}
            <span className="bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
              using AI
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-800/75">
            Eight AI generators purpose-built for Google Business Profiles. Describe your business
            once — get posts, replies, descriptions, Q&As and images that are ready to publish.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <a href={SIGNUP_URL} className="btn-primary !px-7 !py-3.5 !text-base">
              Try the AI Tools Free
            </a>
          </div>
          <p className="mt-4 text-sm text-brand-800/60">
            Included in every plan — even Free
          </p>
        </div>
      </section>

      {/* Tool grid */}
      <section className="container-px py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="flex flex-col rounded-2xl border border-brand-100 bg-white p-7 shadow-card transition-shadow hover:shadow-lift"
            >
              <div className="flex items-center gap-4">
                <ToolIcon name={tool.icon} />
                <h2 className="text-lg font-bold text-brand-900">
                  {tool.name}
                  {tool.badge && (
                    <span className="ml-2 inline-block rounded-full bg-accent-500 px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wider text-white">
                      {tool.badge}
                    </span>
                  )}
                </h2>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-800/70">{tool.desc}</p>
              <a href={`${APP_URL}${tool.path}`} className="btn-secondary mt-5 w-fit !py-2.5">
                {tool.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* How it works note */}
        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-accent-100 bg-accent-50/60 p-7 text-center">
          <h2 className="text-lg font-bold text-brand-900">How the AI tools work</h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-800/75">
            Every generator is tuned for local SEO: tell it your business name, category and
            location, and it writes content that fits Google&apos;s guidelines and your keywords.
            Free accounts get 5 generations a month — Pro accounts are unlimited.
          </p>
        </div>
      </section>

      {/* CTA band */}
      <section className="container-px pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-brand-900 via-brand-700 to-accent-700 px-8 py-12 text-center shadow-lift">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Stop staring at a blank GBP post box
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-brand-100">
            Create your free GMB Auditor account and generate your first AI post in the next two
            minutes.
          </p>
          <a href={SIGNUP_URL} className="btn-accent mt-7 !px-8 !py-3.5 !text-base">
            Start Free
          </a>
        </div>
      </section>
    </>
  );
}
