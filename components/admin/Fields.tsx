"use client";

import type { ChangeEvent, ReactNode } from "react";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="admin__field">
      <label>{label}</label>
      {hint ? <p className="admin__hint">{hint}</p> : null}
      {children}
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  multiline,
}: {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  function handle(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    onChange(event.target.value);
  }
  if (multiline) {
    return <textarea className="admin__textarea" value={value} onChange={handle} />;
  }
  return <input className="admin__input" value={value} onChange={handle} />;
}

export function LineHint() {
  return <p className="admin__hint">Use a new line where the public page should break.</p>;
}
