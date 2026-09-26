export function AboutPager({
  label,
  href,
  title,
  flush,
}: {
  label: string;
  href: string;
  title: string;
  flush?: boolean;
}) {
  return (
    <div className={`about-pager${flush ? " about-pager--flush" : ""}`}>
      <span className="about-pager__l">{label}</span>
      <a className="about-pager__a" href={href}>
        {title} <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
