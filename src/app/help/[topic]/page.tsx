import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getHelpTopic, helpTopics } from "@/lib/help/topics";
import { HelpTopicView } from "@/components/help/HelpTopicView";

interface HelpTopicPageProps {
  params: Promise<{ topic: string }>;
}

export function generateStaticParams() {
  return helpTopics.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({
  params,
}: HelpTopicPageProps): Promise<Metadata> {
  const { topic } = await params;
  const helpTopic = getHelpTopic(topic);
  if (!helpTopic) return { title: "غير موجود" };

  return {
    title: helpTopic.title,
    description: helpTopic.description,
  };
}

export default async function HelpTopicPage({ params }: HelpTopicPageProps) {
  const { topic } = await params;
  const helpTopic = getHelpTopic(topic);
  if (!helpTopic) notFound();

  return <HelpTopicView topic={helpTopic} />;
}
