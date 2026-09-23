"use client";

import { useState } from "react";
import { saveNotFoundAction } from "@/lib/actions";
import { Field, LineHint, TextInput } from "@/components/admin/Fields";
import { SaveBar } from "@/components/admin/SaveBar";
import type { NotFoundContent } from "@/lib/types";

export function NotFoundForm({ initial }: { initial: NotFoundContent }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await saveNotFoundAction(data);
      setMessage("Saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <p className="admin__lede">This copy is shown when a visitor hits an address that does not exist.</p>
      <Field label="Browser title">
        <TextInput value={data.title} onChange={(v) => setData({ ...data, title: v })} />
      </Field>
      <Field label="Heading">
        <LineHint />
        <TextInput multiline value={data.heading} onChange={(v) => setData({ ...data, heading: v })} />
      </Field>
      <Field label="Body">
        <TextInput multiline value={data.body} onChange={(v) => setData({ ...data, body: v })} />
      </Field>
      <Field label="Button label">
        <TextInput value={data.buttonLabel} onChange={(v) => setData({ ...data, buttonLabel: v })} />
      </Field>
      <Field label="Footer line">
        <TextInput value={data.footerLine} onChange={(v) => setData({ ...data, footerLine: v })} />
      </Field>
      <SaveBar saving={saving} message={message} error={error} onSave={save} />
    </>
  );
}
