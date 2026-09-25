"use client";

import { useState } from "react";
import { saveBrandStrategyAction } from "@/lib/actions";
import { Field, TextInput } from "@/components/admin/Fields";
import { SaveBar } from "@/components/admin/SaveBar";
import type { BrandStrategyContent } from "@/lib/types";

export function BrandStrategyForm({ initial }: { initial: BrandStrategyContent }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await saveBrandStrategyAction(data);
      setMessage("Saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <p className="admin__lede">Copy for /capabilities/brand-and-strategy.</p>
      <Field label="Browser title">
        <TextInput value={data.metaTitle} onChange={(v) => setData({ ...data, metaTitle: v })} />
      </Field>
      <Field label="Meta description">
        <TextInput multiline value={data.metaDescription} onChange={(v) => setData({ ...data, metaDescription: v })} />
      </Field>
      <Field label="Number">
        <TextInput value={data.number} onChange={(v) => setData({ ...data, number: v })} />
      </Field>
      <Field label="Practice name">
        <TextInput value={data.practiceName} onChange={(v) => setData({ ...data, practiceName: v })} />
      </Field>
      <Field label="Hero line 1">
        <TextInput value={data.heroLine1} onChange={(v) => setData({ ...data, heroLine1: v })} />
      </Field>
      <Field label="Hero line 2 before">
        <TextInput value={data.heroLine2Before} onChange={(v) => setData({ ...data, heroLine2Before: v })} />
      </Field>
      <Field label="Hero emphasis">
        <TextInput value={data.heroEmphasis} onChange={(v) => setData({ ...data, heroEmphasis: v })} />
      </Field>
      <Field label="Hero line 2 after">
        <TextInput value={data.heroLine2After} onChange={(v) => setData({ ...data, heroLine2After: v })} />
      </Field>
      <Field label="Hero tick">
        <TextInput value={data.heroTick} onChange={(v) => setData({ ...data, heroTick: v })} />
      </Field>
      <Field label="Subcopy">
        <TextInput multiline value={data.subcopy} onChange={(v) => setData({ ...data, subcopy: v })} />
      </Field>
      <Field label="Heard heading (use \\n for breaks)">
        <TextInput multiline value={data.heardHeading} onChange={(v) => setData({ ...data, heardHeading: v })} />
      </Field>
      <Field label="Heard note">
        <TextInput multiline value={data.heardNote} onChange={(v) => setData({ ...data, heardNote: v })} />
      </Field>
      {(data.heard || []).map((item, index) => (
        <div className="admin__block" key={index}>
          <Field label={`Heard ${index + 1} quote`}>
            <TextInput
              multiline
              value={item.quote}
              onChange={(v) => {
                const heard = data.heard.slice();
                heard[index] = { ...item, quote: v };
                setData({ ...data, heard });
              }}
            />
          </Field>
          <Field label="Label">
            <TextInput
              value={item.label}
              onChange={(v) => {
                const heard = data.heard.slice();
                heard[index] = { ...item, label: v };
                setData({ ...data, heard });
              }}
            />
          </Field>
        </div>
      ))}
      <Field label="Workstreams heading">
        <TextInput multiline value={data.workHeading} onChange={(v) => setData({ ...data, workHeading: v })} />
      </Field>
      {(data.workstreams || []).map((ws, index) => (
        <div className="admin__block" key={index}>
          <Field label={`Stream ${ws.number}`}>
            <TextInput
              value={ws.title}
              onChange={(v) => {
                const workstreams = data.workstreams.slice();
                workstreams[index] = { ...ws, title: v };
                setData({ ...data, workstreams });
              }}
            />
          </Field>
          <Field label="Body">
            <TextInput
              multiline
              value={ws.body}
              onChange={(v) => {
                const workstreams = data.workstreams.slice();
                workstreams[index] = { ...ws, body: v };
                setData({ ...data, workstreams });
              }}
            />
          </Field>
        </div>
      ))}
      <Field label="CTA line 1">
        <TextInput value={data.contactLine1} onChange={(v) => setData({ ...data, contactLine1: v })} />
      </Field>
      <Field label="CTA line 2">
        <TextInput value={data.contactLine2} onChange={(v) => setData({ ...data, contactLine2: v })} />
      </Field>
      <SaveBar saving={saving} message={message} error={error} onSave={save} />
    </>
  );
}
