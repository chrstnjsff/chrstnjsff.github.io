// Home page content. Every figure comes from the resume or the author's
// own project records; the sidebar reads the counts from here too.
import {
  siAnsible,
  siApachekafka,
  siArgo,
  siClaude,
  siCloudflare,
  siDatadog,
  siDjango,
  siDocker,
  siElasticsearch,
  siGitlab,
  siGithubactions,
  siGnubash,
  siGooglecloud,
  siGrafana,
  siHelm,
  siJavascript,
  siJenkins,
  siKubernetes,
  siLinux,
  siModelcontextprotocol,
  siMongodb,
  siNodedotjs,
  siOpentelemetry,
  siOpentofu,
  siPostgresql,
  siPrometheus,
  siPulumi,
  siPython,
  siReact,
  siRedis,
  siSentry,
  siSonarqubeserver,
  siTerraform,
  type SimpleIcon,
} from "simple-icons";

export interface Company {
  name: string;
  src: string;
  /** Rendered logo height in px, tuned per mark so they read at one weight. */
  height: number;
}

export const companies: Company[] = [
  { name: "Iron Mountain", src: "/logos/ironmountain.svg", height: 28 },
  { name: "Nova Virtual Solutions", src: "/logos/nvs.webp", height: 28 },
  { name: "Nova Home Care", src: "/logos/nhc.svg", height: 30 },
  { name: "MRGE", src: "/logos/mrge.svg", height: 22 },
  { name: "Stratpoint", src: "/logos/stratpoint.webp", height: 30 },
  { name: "DXC Technology", src: "/logos/dxc.webp", height: 17 },
  { name: "Bosch Service Solutions", src: "/logos/bosch.webp", height: 26 },
];

/**
 * Stat values; `pre` and `long` are dropped on phones so each label stays on
 * one line. Their spaces are non-breaking because flex items trim plain ones.
 */
export const stats = [
  { v: "7+", short: "Years", long: "\u00a0in production" },
  { v: "148", pre: "Kubernetes\u00a0", short: "clusters" },
  { v: "99.95%", short: "Uptime", long: "\u00a0· 3 clouds", live: true },
];

/**
 * Projects drawn as small product screens, without company names, so a
 * visitor sees what each one does. `shot` picks the drawing in ProjectShot.
 */
export const projects = [
  {
    shot: "care",
    wide: true,
    title: "HIPAA home care platform",
    desc: "A multi-tenant portal for home care agencies in 5 US states: caregiver and client onboarding, e-signed admission documents, custom forms and visit verification, on AWS with every stack in OpenTofu.",
  },
  {
    shot: "cost",
    title: "Cloud cost dashboard",
    desc: "Daily cost per product across 3 AWS accounts and 14 software vendors, with budget meters, and invoices read by Claude for an editor to confirm.",
  },
  {
    shot: "status",
    title: "Uptime and delivery status page",
    desc: "One page for leadership: 27 endpoints checked every 5 minutes, next to project delivery pulled from Jira.",
  },
  {
    shot: "workforce",
    title: "Remote workforce monitoring",
    desc: "Consent-based live screen sharing for remote teams, with idle detection, shift summaries and single sign-on through Cognito and Microsoft Entra.",
  },
  {
    shot: "platform",
    title: "Self-service AWS platform",
    desc: "Golden paths on AWS Service Catalog that give 500+ engineers self-service AWS, backed by Terraform modules for 10+ services.",
  },
  {
    shot: "gitops",
    title: "GitOps delivery with observability",
    desc: "50 EKS and GKE clusters on ArgoCD, with Prometheus and Grafana Cloud alerting: 40% faster deploys at 99.99% availability.",
  },
  {
    shot: "fleet",
    wide: true,
    title: "Multi-cloud Kubernetes reliability",
    desc: "148 clusters on EKS, GKE and AKS for mission-critical platforms at 99.95% uptime, with infrastructure in OpenTofu and time to recover cut by 40%.",
  },
] as const;

export type ShotKind = (typeof projects)[number]["shot"];

export const experience = [
  { year: "2026", period: "Apr 2026 - Present", role: "Senior DevOps Engineer (Contractor)", org: "Nova Virtual Solutions" },
  { year: "2025", period: "Oct 2025 - Present", role: "Senior DevOps Engineer", org: "Iron Mountain Philippines" },
  { year: "2024", period: "May 2024 - Oct 2025", role: "Cloud & DevOps Engineer", org: "One Team Anywhere · MRGE" },
  { year: "2022", period: "Mar 2022 - May 2024", role: "Cloud Engineer III", org: "Stratpoint Global Outsourcing" },
  { year: "2020", period: "Oct 2020 - Mar 2022", role: "Service Information Developer III", org: "DXC Technology" },
  { year: "2018", period: "Dec 2018 - Oct 2020", role: "Service Desk Engineer", org: "Bosch Service Solutions" },
];

export const education = {
  year: "2017",
  role: "BS Information Technology",
  org: "Jose Rizal University",
};

export const systems = [
  { title: "ICM, Insight and DXP platforms", meta: "Iron Mountain · Kubernetes on AWS, Azure and GCP · 99.95% uptime" },
  { title: "148 Kubernetes clusters", meta: "Iron Mountain · EKS, GKE and AKS · MTTR down 40%" },
  { title: "44 Elasticsearch and 73 MongoDB clusters", meta: "Iron Mountain · Grafana, Loki, Mimir and OpenTelemetry" },
  { title: "50 EKS and GKE clusters on ArgoCD", meta: "MRGE · 99.99% availability · 40% faster deploys" },
  { title: "Atlas internal developer platform", meta: "Stratpoint · self-service AWS for 500+ engineers" },
  { title: "Telco app infrastructure", meta: "Stratpoint · 3.6M+ users · tech lead for 4 engineers" },
];

export const certs = [
  {
    year: "2025",
    title: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    badge: "valid to 2027",
    href: "https://developer.hashicorp.com/certifications/infrastructure-automation",
  },
  { year: "2021", title: "ITIL 4 Foundation", issuer: "Skillsoft · AXELOS" },
];

export interface Chip {
  label: string;
  /** A Simple Icons mark, or short text where no brand icon exists. */
  icon?: SimpleIcon;
  text?: string;
  /** Overrides the brand colour where it would vanish on the light chip. */
  color?: string;
}

/** Shown first; the rest open behind "+N more". */
export const stack: Chip[] = [
  { label: "Google Cloud", icon: siGooglecloud },
  { label: "AWS", text: "AWS", color: "#b35c00" },
  { label: "Azure", text: "Az", color: "#0078d4" },
  { label: "Kubernetes", icon: siKubernetes },
  { label: "Terraform", icon: siTerraform },
  { label: "OpenTofu", icon: siOpentofu, color: "#a68a0d" },
  { label: "Pulumi", icon: siPulumi },
  { label: "Docker", icon: siDocker },
  { label: "Helm", icon: siHelm },
  { label: "ArgoCD", icon: siArgo },
  { label: "GitLab CI", icon: siGitlab },
  { label: "GitHub Actions", icon: siGithubactions },
  { label: "Jenkins", icon: siJenkins },
  { label: "Prometheus", icon: siPrometheus },
  { label: "Grafana", icon: siGrafana },
  { label: "OpenTelemetry", icon: siOpentelemetry, color: "#425cc7" },
  { label: "Elasticsearch", icon: siElasticsearch },
  { label: "MongoDB", icon: siMongodb },
  { label: "Ansible", icon: siAnsible },
  { label: "Python", icon: siPython },
  { label: "Bash", icon: siGnubash },
  { label: "Linux", icon: siLinux, color: "#111111" },
  { label: "Claude Code", icon: siClaude },
];

export const stackMore: Chip[] = [
  { label: "Atlantis", text: "At", color: "#5c6bc0" },
  { label: "Karpenter", text: "K", color: "#b35c00" },
  { label: "SonarQube", icon: siSonarqubeserver },
  { label: "Loki", icon: siGrafana },
  { label: "Mimir", icon: siGrafana },
  { label: "Datadog", icon: siDatadog },
  { label: "Sentry", icon: siSentry },
  { label: "Django", icon: siDjango },
  { label: "React", icon: siReact, color: "#149eca" },
  { label: "Node.js", icon: siNodedotjs },
  { label: "JavaScript", icon: siJavascript, color: "#b59f00" },
  { label: "PowerShell", text: "PS", color: "#2671be" },
  { label: "MCP", icon: siModelcontextprotocol },
  { label: "Kafka", icon: siApachekafka },
  { label: "Redis", icon: siRedis },
  { label: "PostgreSQL", icon: siPostgresql },
  { label: "Cloudflare", icon: siCloudflare },
  { label: "ServiceNow", text: "SN", color: "#1f7a3a" },
];

// Only recommendations the author wrote or approved. Brackets mark the
// one editorial insertion, per quoting convention.
export const reviews = [
  {
    year: "2021",
    quote:
      "Cj is a fast learner and easy to work with. Even [though] I am a senior to him, he also helped me with difficulties at work. He is very cooperative and hardworking.",
    name: "Danica Capistrano",
    role: "Support Analyst 2, Koerber Supply Chain Software",
  },
];

export interface LinkItem {
  title: string;
  desc: string;
  href: string;
}

export const reading: { label: string; items: LinkItem[] }[] = [
  {
    label: "DevOps reading",
    items: [
      { title: "Google SRE Book", desc: "How Google runs production systems", href: "https://sre.google/books/" },
      { title: "Kubernetes the Hard Way", desc: "Build a cluster by hand to learn every part", href: "https://github.com/kelseyhightower/kubernetes-the-hard-way" },
      { title: "CNCF Landscape", desc: "The map of the cloud-native ecosystem", href: "https://landscape.cncf.io/" },
      { title: "DevOps Roadmap", desc: "A map of what to learn next", href: "https://roadmap.sh/devops" },
      { title: "Terraform Registry", desc: "Providers and modules worth borrowing from", href: "https://registry.terraform.io/" },
    ],
  },
  {
    label: "AI reading",
    items: [
      { title: "Anthropic Docs", desc: "Building with Claude: API, agents, MCP", href: "https://docs.anthropic.com/" },
      { title: "Anthropic Cookbook", desc: "Working patterns for LLM applications", href: "https://github.com/anthropics/anthropic-cookbook" },
      { title: "Simon Willison's Weblog", desc: "A running commentary on the LLM era", href: "https://simonwillison.net/" },
      { title: "Prompt Engineering Guide", desc: "Techniques, papers and model quirks", href: "https://www.promptingguide.ai/" },
      { title: "Hugging Face", desc: "Models, datasets and spaces", href: "https://huggingface.co/" },
      { title: "Ollama", desc: "Run open models on your own machine", href: "https://ollama.com/" },
    ],
  },
];

export const gear: LinkItem[] = [
  { title: "MacBook Pro (M5 Pro)", desc: "Daily driver", href: "https://www.apple.com/macbook-pro/" },
  { title: "NuPhy keyboard", desc: "Low-profile mechanical", href: "https://nuphy.com/" },
  { title: "Shokz bone-conduction headphones", desc: "Calls without blocking the room", href: "https://shokz.com/" },
  { title: "Apple Watch Series 11", desc: "On-call alerts on the wrist", href: "https://www.apple.com/watch/" },
];
