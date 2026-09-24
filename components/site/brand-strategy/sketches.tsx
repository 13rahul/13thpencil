export function HeroStroke() {
  return (
    <svg className="bs-hero__stroke" viewBox="0 0 1200 160" aria-hidden="true">
      <path
        className="draw"
        d="M40 110 C 180 40, 320 150, 480 80 S 760 30, 920 100 S 1100 140, 1160 70"
      />
    </svg>
  );
}

export function PositioningSketch() {
  return (
    <svg viewBox="0 0 480 320" aria-hidden="true">
      <path className="draw" d="M40 260 C 140 180, 180 80, 240 150" />
      <path className="draw" d="M440 250 C 340 170, 300 70, 240 150" />
      <circle className="draw draw--dot" cx="240" cy="150" r="7" />
    </svg>
  );
}

export function ArchitectureSketch() {
  return (
    <svg viewBox="0 0 480 320" aria-hidden="true">
      <rect className="draw" x="90" y="70" width="220" height="50" />
      <rect className="draw" x="70" y="140" width="260" height="50" />
      <rect className="draw" x="50" y="210" width="300" height="50" />
      <path className="draw draw--coral" d="M390 40 L 430 90" />
    </svg>
  );
}

export function NamingSketch() {
  return (
    <svg viewBox="0 0 480 320" aria-hidden="true">
      <path className="draw" d="M36 150 H 280" />
      <path className="draw" d="M30 128 H 300" />
      <path className="draw draw--coral" d="M330 200 C 380 160, 420 190, 450 150" />
    </svg>
  );
}

export function MessagingSketch() {
  return (
    <svg viewBox="0 0 480 320" aria-hidden="true">
      <path className="draw" d="M40 200 C 120 80, 240 80, 360 160 S 430 240, 450 120" />
    </svg>
  );
}

export function InsightSketch() {
  return (
    <svg viewBox="0 0 480 320" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} className="draw" d={`M ${48 + i * 46} 230 V 90`} />
      ))}
      <path className="draw draw--coral" d="M430 200 L 458 70" />
    </svg>
  );
}

export function PathSketch() {
  return (
    <svg className="bs-path__line" viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true">
      <path className="draw" d="M20 160 C 180 160, 220 40, 400 70 S 680 200, 860 90 S 1080 40, 1180 80" />
    </svg>
  );
}
