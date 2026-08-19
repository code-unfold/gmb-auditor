import Link from "next/link";
import Logo from "./Logo";
import { COMPANY, SIGNUP_URL } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="container-px grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-200">
            The all-in-one Google Business Profile audit tool — competitor research, review
            analysis, geo-grid rank checks and AI content, built by the local SEO team at{" "}
            <a
              href={COMPANY.website}
              className="font-semibold text-white underline decoration-brand-400 underline-offset-2 hover:decoration-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Auxilium Technology
            </a>
            .
          </p>
          <a href={SIGNUP_URL} className="btn-accent mt-6">
            Try GMB Auditor Free
          </a>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Product</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/#features" className="hover:text-white">Features</Link></li>
            <li><Link href="/#pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link href="/ai" className="hover:text-white">AI Tools</Link></li>
            <li><Link href="/#faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Auxilium Technology
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-brand-200">
            <li>{COMPANY.address}</li>
            <li>
              Office:{" "}
              <a href={COMPANY.phoneHref} className="font-semibold text-white hover:underline">
                {COMPANY.phone}
              </a>
            </li>
            <li>
              Toll-free:{" "}
              <a href={COMPANY.tollFreeHref} className="font-semibold text-white hover:underline">
                {COMPANY.tollFree}
              </a>
            </li>
            <li>
              <a
                href={COMPANY.website}
                className="hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                auxiliumtechnology.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-6 text-xs text-brand-300 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY.name} All rights reserved.
          </p>
          <p>
            GMB Auditor is an independent tool and is not affiliated with or endorsed by Google.
          </p>
        </div>
      </div>
    </footer>
  );
}
