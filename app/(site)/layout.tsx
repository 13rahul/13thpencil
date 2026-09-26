import type { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/assets/css/styles.css?v=49" />
      {children}
    </>
  );
}
