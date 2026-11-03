import { Lockup } from "./Lockup";

export function SiteLoader({ caption }: { caption: string }) {
  return (
    <>
      <noscript>
        <style>{`#loader{display:none!important}`}</style>
      </noscript>
      <div
        className="loader"
        id="loader"
        role="progressbar"
        aria-label="Loading"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
      >
        <div className="loader__strokes" id="loaderStrokes" />
        <div className="loader__cap annot">{caption}</div>
        <div className="loader__pct annot" id="loaderPct" aria-hidden="true">
          0%
        </div>
        <div className="loader__logo" id="loaderLogo">
          <Lockup />
        </div>
      </div>
    </>
  );
}
