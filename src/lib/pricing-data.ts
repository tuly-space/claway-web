export const pricingPlans = [
  {
    name: "LITE",
    monthly: "$16/mo",
    yearly: "$159/yr",
    specs: ["2 vCPU", "4 GB RAM", "40 GB SSD"],
  },
  {
    name: "PRO",
    monthly: "$33/mo",
    yearly: "$329/yr",
    specs: ["4 vCPU", "8 GB RAM", "80 GB SSD"],
    featured: true,
  },
  {
    name: "MAX",
    monthly: "$66/mo",
    yearly: "$659/yr",
    specs: ["8 vCPU", "16 GB RAM", "160 GB SSD"],
  },
];

export const includedFeatures = [
  "Private container",
  "24/7 uptime",
  "Auto-updates",
  "Daily backups",
  "Cancel anytime",
];

export const faqs = [
  {
    question: "What is OpenClaw?",
    answer:
      "OpenClaw is an open-source AI agent that can operate apps, browse the web, manage files, and handle real workflows on your behalf.",
  },
  {
    question: "Is this an official OpenClaw service?",
    answer:
      "No. Claway is an independent managed hosting platform built for people who want to use OpenClaw without handling infrastructure themselves.",
  },
  {
    question: "How do I get started?",
    answer:
      "Pick a plan, sign in with Google, and we provision your private instance so you can start using it from the dashboard.",
  },
  {
    question: "How does billing work?",
    answer:
      "Billing is subscription-based. You can choose monthly or yearly pricing and switch plans from your dashboard.",
  },
  {
    question: "How is my data handled?",
    answer:
      "Each workspace runs in a private environment with isolated storage, managed updates, and operational safeguards handled by Claway.",
  },
  {
    question: "What if I want a refund?",
    answer:
      "If something is off, contact support and we will review it quickly. The pricing is structured to stay straightforward and low-friction.",
  },
];
