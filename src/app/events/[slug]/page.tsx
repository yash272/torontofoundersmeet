import { notFound } from "next/navigation";
import { eventBySlug, eventState } from "@/content/events";
import { EventRecap, UpcomingEvent } from "@/components/event-detail";
import { metadata } from "@/lib/metadata";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const event = eventBySlug(slug);
  return event
    ? {
        ...metadata(event.title, event.description, `/events/${slug}`),
        ...(event.isDemo ? { robots: { index: false, follow: false } } : {}),
      }
    : { title: "Event not found" };
}
export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) notFound();
  return eventState(event) === "past" ? (
    <EventRecap event={event} />
  ) : (
    <UpcomingEvent event={event} />
  );
}
