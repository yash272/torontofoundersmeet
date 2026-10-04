import { ButtonLink, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="container not-found">
      <Eyebrow>404 · A wrong turn</Eyebrow>
      <h1>
        Not this room.
        <br />
        <span>Try the next one.</span>
      </h1>
      <p>That page doesn’t exist. There are better conversations this way.</p>
      <ButtonLink href="/events">Find an event</ButtonLink>
    </section>
  );
}
