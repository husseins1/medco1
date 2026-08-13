import type { LucideIcon } from "lucide-react";

export type HelpCalloutTone = "info" | "warning" | "success";

export type HelpSection =
  | { kind: "paragraph"; title?: string; body: string }
  | { kind: "steps"; title?: string; steps: { title?: string; body: string }[] }
  | { kind: "list"; title?: string; items: string[] }
  | {
      kind: "callout";
      tone: HelpCalloutTone;
      title?: string;
      body: string;
    };

export type HelpTopic = {
  slug: string;
  title: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  icon: LucideIcon;
  featureHref?: string;
  sections: HelpSection[];
  related?: string[];
};

export type HelpCategory = {
  label: string;
  topics: HelpTopic[];
};
