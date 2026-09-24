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
      <p className="admin__lede">Pencil-scroll copy for /capabilities/brand-and-strategy.</p>
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
      <Field label="Hero before">
        <TextInput value={data.heroBefore} onChange={(v) => setData({ ...data, heroBefore: v })} />
      </Field>
      <Field label="Hero emphasis">
        <TextInput value={data.heroEmphasis} onChange={(v) => setData({ ...data, heroEmphasis: v })} />
      </Field>
      <Field label="Hero after">
        <TextInput value={data.heroAfter} onChange={(v) => setData({ ...data, heroAfter: v })} />
      </Field>
      <Field label="Subcopy">
        <TextInput multiline value={data.subcopy} onChange={(v) => setData({ ...data, subcopy: v })} />
      </Field>
      <Field label="Strike heading">
        <TextInput value={data.strikeHeading} onChange={(v) => setData({ ...data, strikeHeading: v })} />
      </Field>
      {(data.strikeLines || []).map((line, index) => (
        <Field key={index} label={`Struck line ${index + 1}${line.keep ? " (kept)" : ""}`}>
          <TextInput
            value={line.text}
            onChange={(v) => {
              const strikeLines = data.strikeLines.slice();
              strikeLines[index] = { ...line, text: v };
              setData({ ...data, strikeLines });
            }}
          />
        </Field>
      ))}
      {(data.verbs || []).map((verb, index) => (
        <div className="admin__block" key={index}>
          <Field label={`Verb ${index + 1}`}>
            <TextInput
              value={verb.label}
              onChange={(v) => {
                const verbs = data.verbs.slice();
                verbs[index] = { ...verb, label: v };
                setData({ ...data, verbs });
              }}
            />
          </Field>
          <Field label="Line">
            <TextInput
              multiline
              value={verb.body}
              onChange={(v) => {
                const verbs = data.verbs.slice();
                verbs[index] = { ...verb, body: v };
                setData({ ...data, verbs });
              }}
            />
          </Field>
        </div>
      ))}
      <Field label="Path heading">
        <TextInput value={data.pathHeading} onChange={(v) => setData({ ...data, pathHeading: v })} />
      </Field>
      {(data.pathSteps || []).map((step, index) => (
        <div className="admin__block" key={index}>
          <Field label={`Stop ${index + 1}`}>
            <TextInput
              value={step.title}
              onChange={(v) => {
                const pathSteps = data.pathSteps.slice();
                pathSteps[index] = { ...step, title: v };
                setData({ ...data, pathSteps });
              }}
            />
          </Field>
          <Field label="Body">
            <TextInput
              multiline
              value={step.body}
              onChange={(v) => {
                const pathSteps = data.pathSteps.slice();
                pathSteps[index] = { ...step, body: v };
                setData({ ...data, pathSteps });
              }}
            />
          </Field>
        </div>
      ))}
      <Field label="Other practices heading">
        <TextInput value={data.othersHeading} onChange={(v) => setData({ ...data, othersHeading: v })} />
      </Field>
      {(data.others || []).map((item, index) => (
        <div className="admin__block" key={index}>
          <Field label="Name">
            <TextInput
              value={item.name}
              onChange={(v) => {
                const others = data.others.slice();
                others[index] = { ...item, name: v };
                setData({ ...data, others });
              }}
            />
          </Field>
          <Field label="Line">
            <TextInput
              value={item.line}
              onChange={(v) => {
                const others = data.others.slice();
                others[index] = { ...item, line: v };
                setData({ ...data, others });
              }}
            />
          </Field>
        </div>
      ))}
      <Field label="Close before">
        <TextInput value={data.contactBefore} onChange={(v) => setData({ ...data, contactBefore: v })} />
      </Field>
      <Field label="Close emphasis">
        <TextInput value={data.contactEmphasis} onChange={(v) => setData({ ...data, contactEmphasis: v })} />
      </Field>
      <Field label="Close after">
        <TextInput value={data.contactAfter} onChange={(v) => setData({ ...data, contactAfter: v })} />
      </Field>
      <SaveBar saving={saving} message={message} error={error} onSave={save} />
    </>
  );
}
