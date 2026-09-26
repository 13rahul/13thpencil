import { ABOUT_LINKS } from "./about-links";

export function AboutSubnav({ current }: { current: string }) {
  return (
    <nav className="about-nav" aria-label="About sections">
      <div className="about-nav__in">
        {ABOUT_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={link.href === current ? "page" : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
