// Single source of truth for identity, links and page navigation.
// Components import from here instead of hardcoding contact details.

export const SITE = {
  name: "Christian Josef Aquino",
  role: "Senior DevOps Engineer",
  url: "https://christianaquino.dev",
  email: "chrstnjsff@gmail.com",
  githubUser: "chrstnjsff",
  githubUrl: "https://github.com/chrstnjsff",
  linkedinUrl: "https://www.linkedin.com/in/cjosefaquino/",
  location: {
    locality: "Mandaluyong",
    region: "Metro Manila",
    country: "PH",
  },
  resumePath: "/resume.pdf",
  resumeFilename: "Christian-Josef-Aquino-Resume.pdf",
} as const;

export interface NavItem {
  href: string;
  label: string;
}

export const NAV_PAGES: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/how-to/", label: "How-to" },
  { href: "/contact/", label: "Contact" },
];

// Web3Forms access keys are public by design: the key only routes
// submissions to the owner's inbox and is meant to ship in client-side
// HTML ("You do not need to hide the access key", docs.web3forms.com).
export const WEB3FORMS_ACCESS_KEY = "d7b1c50e-774e-4028-8ae6-6dac07d1b43c";

// Spam protection beyond the botcheck honeypot. "hcaptcha" is the free
// captcha Web3Forms supports; enabling it also requires turning hCaptcha
// on in the Web3Forms dashboard, and it breaks the no-JS form path.
export const CONTACT_CAPTCHA: "none" | "hcaptcha" = "none";
