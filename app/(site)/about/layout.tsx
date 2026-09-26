import type { ReactNode } from "react";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/assets/css/about.css?v=1" />
      {children}
    </>
  );
}
