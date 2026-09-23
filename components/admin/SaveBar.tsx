"use client";

export function SaveBar({
  saving,
  message,
  error,
  onSave,
}: {
  saving: boolean;
  message: string;
  error: string;
  onSave: () => void;
}) {
  return (
    <div className="admin__toolbar">
      <button type="button" className="admin__btn" onClick={onSave} disabled={saving}>
        {saving ? "Saving…" : "Save changes"}
      </button>
      {message ? <span className="admin__ok">{message}</span> : null}
      {error ? <span className="admin__err">{error}</span> : null}
    </div>
  );
}
