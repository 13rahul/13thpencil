"use client";

import { useState, type ReactNode } from "react";
import { saveAboutWhyAction } from "@/lib/actions";
import { Field, TextInput } from "@/components/admin/Fields";
import { SaveBar } from "@/components/admin/SaveBar";
import type { AboutWhyContent } from "@/lib/types";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="admin__block">
      <p>
        <strong>{title}</strong>
      </p>
      {children}
    </div>
  );
}

export function AboutWhyForm({ initial }: { initial: AboutWhyContent }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await saveAboutWhyAction(data);
      setMessage("Saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <p className="admin__lede">
        Public copy for /about/why-13th-pencil. Wrap a strong phrase in *asterisks* in the first turn paragraph.
      </p>
      <Section title="SEO">
        <Field label="Browser title">
          <TextInput value={data.metaTitle} onChange={(v) => setData({ ...data, metaTitle: v })} />
        </Field>
        <Field label="Meta description">
          <TextInput multiline value={data.metaDescription} onChange={(v) => setData({ ...data, metaDescription: v })} />
        </Field>
      </Section>
      <Section title="Generator">
        <Field label="Crumb label">
          <TextInput value={data.crumbLabel} onChange={(v) => setData({ ...data, crumbLabel: v })} />
        </Field>
        <Field label="Label">
          <TextInput multiline value={data.genLabel} onChange={(v) => setData({ ...data, genLabel: v })} />
        </Field>
        <Field label="Initial line">
          <TextInput value={data.genInitialLine} onChange={(v) => setData({ ...data, genInitialLine: v })} />
        </Field>
        <Field label="Button label">
          <TextInput value={data.genButton} onChange={(v) => setData({ ...data, genButton: v })} />
        </Field>
        <Field label="Idle count text">
          <TextInput value={data.genCountIdle} onChange={(v) => setData({ ...data, genCountIdle: v })} />
        </Field>
      </Section>
      <Section title="The turn">
        <Field label="Heading">
          <TextInput value={data.turnHeading} onChange={(v) => setData({ ...data, turnHeading: v })} />
        </Field>
        <Field label="Left paragraph 1">
          <TextInput multiline value={data.turnLeft1} onChange={(v) => setData({ ...data, turnLeft1: v })} />
        </Field>
        <Field label="Left paragraph 2">
          <TextInput multiline value={data.turnLeft2} onChange={(v) => setData({ ...data, turnLeft2: v })} />
        </Field>
        <Field label="Right paragraph">
          <TextInput multiline value={data.turnRight1} onChange={(v) => setData({ ...data, turnRight1: v })} />
        </Field>
        <Field label="Note">
          <TextInput multiline value={data.turnNote} onChange={(v) => setData({ ...data, turnNote: v })} />
        </Field>
      </Section>
      <Section title="Trio">
        {(data.trio || []).map((item, index) => (
          <div key={index}>
            <Field label={`Item ${index + 1} number`}>
              <TextInput
                value={item.number}
                onChange={(v) => {
                  const trio = data.trio.slice();
                  trio[index] = { ...item, number: v };
                  setData({ ...data, trio });
                }}
              />
            </Field>
            <Field label={`Item ${index + 1} title`}>
              <TextInput
                value={item.title}
                onChange={(v) => {
                  const trio = data.trio.slice();
                  trio[index] = { ...item, title: v };
                  setData({ ...data, trio });
                }}
              />
            </Field>
            <Field label={`Item ${index + 1} body`}>
              <TextInput
                multiline
                value={item.body}
                onChange={(v) => {
                  const trio = data.trio.slice();
                  trio[index] = { ...item, body: v };
                  setData({ ...data, trio });
                }}
              />
            </Field>
          </div>
        ))}
      </Section>
      <Section title="Artwork + CTA">
        <Field label="Art caption">
          <TextInput value={data.artCaption} onChange={(v) => setData({ ...data, artCaption: v })} />
        </Field>
        <Field label="Art alt">
          <TextInput multiline value={data.artAlt} onChange={(v) => setData({ ...data, artAlt: v })} />
        </Field>
        <Field label="Pager label">
          <TextInput value={data.pagerLabel} onChange={(v) => setData({ ...data, pagerLabel: v })} />
        </Field>
        <Field label="Pager title">
          <TextInput value={data.pagerTitle} onChange={(v) => setData({ ...data, pagerTitle: v })} />
        </Field>
        <Field label="Pager href">
          <TextInput value={data.pagerHref} onChange={(v) => setData({ ...data, pagerHref: v })} />
        </Field>
        <Field label="CTA heading">
          <TextInput value={data.ctaHeading} onChange={(v) => setData({ ...data, ctaHeading: v })} />
        </Field>
      </Section>
      <SaveBar saving={saving} message={message} error={error} onSave={save} />
    </>
  );
}
