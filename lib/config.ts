/**
 * Central place for links & company details.
 * Swap APP_URL for the real signup/app URL when it goes live.
 */
export const APP_URL = "https://app.auxiliumtechnology.com/gmb-auditor"; // TODO: replace with live app URL
export const SIGNUP_URL = `${APP_URL}/signup`;
export const LOGIN_URL = `${APP_URL}/login`;

export const COMPANY = {
  product: "GMB Auditor",
  name: "Auxilium Technology, Inc.",
  website: "https://auxiliumtechnology.com",
  address: "12154 Darnestown Rd., Suite 241, Gaithersburg, MD 20878",
  phone: "(301) 519-9622",
  phoneHref: "tel:+13015199622",
  tollFree: "(855) 572-5425",
  tollFreeHref: "tel:+18555725425",
};

export const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "AI Tools", href: "/ai" },
  { label: "FAQ", href: "/#faq" },
];
