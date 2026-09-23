import { Lockup } from "@/components/site/Lockup";
import { getSiteContent } from "@/lib/content";
import { Breaks } from "@/lib/text";
import "./not-found.css";

export default async function NotFound() {
  const { notFound, settings } = await getSiteContent();

  return (
    <>
      <link rel="stylesheet" href="/assets/css/styles.css" />
      <title>{notFound.title}</title>
      <meta name="robots" content="noindex" />
      <meta name="theme-color" content={settings.themeColor} />
      <main className="nf">
        <a className="nf__logo" href="/" aria-label="13th Pencil, home">
          <Lockup />
        </a>
        <div className="nf__mid">
          <h1 className="nf__h">
            <Breaks text={notFound.heading} />
          </h1>
          <p className="nf__p">{notFound.body}</p>
          <a className="nf__back" href="/">
            {notFound.buttonLabel}
          </a>
        </div>
        <p className="nf__foot">{notFound.footerLine}</p>
      </main>
    </>
  );
}
