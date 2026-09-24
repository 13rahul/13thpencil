import { Fragment, type ReactNode } from "react";

export function Breaks({ text }: { text: string }) {
  const parts = text.split("\n");
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {part}
        </Fragment>
      ))}
    </>
  );
}

export function Marked({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <i key={i}>{part.slice(1, -1)}</i>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function enquiryMailto(_email?: string): string {
  return "/start-a-project";
}

export const startProjectHref = "/start-a-project";

export function asNode(value: ReactNode) {
  return value;
}
