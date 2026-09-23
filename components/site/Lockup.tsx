export function Lockup() {
  return (
    <span className="lockup">
      <svg className="mark" viewBox="0 0 100 100" aria-hidden="true">
        <rect className="frame" x="9" y="9" width="82" height="82" />
        <path className="shaft" d="M32 20h17v40l-8.5 15L32 60z" />
        <path className="lead" d="M41 78c14 7 27 2 49-14" />
      </svg>
      <span className="wordmark">
        <span className="wm__num">
          <svg className="wm__one" viewBox="0 0 30 78" aria-hidden="true">
            <path d="M4 0h22v58l-11 20L4 58z" />
          </svg>
          3<span className="wm__th">th</span>
        </span>
        <span>Pencil</span>
      </span>
    </span>
  );
}
