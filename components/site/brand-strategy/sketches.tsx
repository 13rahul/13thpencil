/** Twelve expected category lines — slightly uneven, like a deck of obvious answers. */
const TEMPLATE_LINES: { d: string; annot: string | null; desk: boolean; y: number }[] = [
  { d: "M 120 72 H 1480", annot: null, desk: false, y: 72 },
  { d: "M 168 118 H 1420", annot: "Positioning", desk: false, y: 118 },
  { d: "M 96 164 H 1508", annot: null, desk: false, y: 164 },
  { d: "M 210 210 H 1380", annot: "Architecture", desk: true, y: 210 },
  { d: "M 140 256 H 1460", annot: null, desk: false, y: 256 },
  { d: "M 188 302 H 1410", annot: "Naming", desk: false, y: 302 },
  { d: "M 110 348 H 1490", annot: null, desk: true, y: 348 },
  { d: "M 230 394 H 1360", annot: "Messaging", desk: false, y: 394 },
  { d: "M 154 440 H 1440", annot: null, desk: true, y: 440 },
  { d: "M 200 486 H 1400", annot: "Insight", desk: false, y: 486 },
  { d: "M 128 532 H 1470", annot: null, desk: true, y: 532 },
  { d: "M 176 578 H 1430", annot: null, desk: false, y: 578 },
];

export function HeroField() {
  return (
    <svg className="bs-hero__field-svg" viewBox="0 0 1600 700" preserveAspectRatio="xMaxYMin slice" aria-hidden="true">
      <g className="bs-hero__twelve">
        {TEMPLATE_LINES.map((line, index) => (
          <g key={line.d} className={line.desk ? "bs-hero__rule bs-hero__desk" : "bs-hero__rule"}>
            {line.annot ? (
              <text className="bs-hero__annot" x={index % 2 === 0 ? 1180 : 120} y={line.y - 12}>
                {line.annot}
              </text>
            ) : null}
            <path className="draw bs-hero__template" d={line.d} />
          </g>
        ))}
      </g>

      <g className="bs-hero__thirteen">
        <path
          className="draw draw--coral bs-hero__pencil-stroke"
          d="M 180 420 C 420 280, 680 200, 960 260 S 1280 420, 1420 180"
        />
        <g className="bs-hero__pencil-tip">
          <path className="draw draw--coral" d="M 1412 190 L 1464 144" />
          <path className="draw draw--coral" d="M 1452 152 L 1488 120" />
          <path className="draw draw--coral" d="M 1456 160 L 1480 156" />
          <circle className="draw draw--dot draw--coral" cx="1488" cy="120" r="4" />
        </g>
      </g>
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
