"use client";

import { useState, type ReactNode } from "react";
import { saveAboutApproachAction } from "@/lib/actions";
import { Field, TextInput } from "@/components/admin/Fields";
import { SaveBar } from "@/components/admin/SaveBar";
import type { AboutApproachContent } from "@/lib/types";

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

export function AboutApproachForm({ initial }: { initial: AboutApproachContent }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await saveAboutApproachAction(data);
      setMessage("Saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <p className="admin__lede">Public copy for /about/our-approach. Slider version notes stay in code.</p>
      <Section title="SEO">
        <Field label="Browser title">
          <TextInput value={data.metaTitle} onChange={(v) => setData({ ...data, metaTitle: v })} />
        </Field>
        <Field label="Meta description">
          <TextInput multiline value={data.metaDescription} onChange={(v) => setData({ ...data, metaDescription: v })} />
        </Field>
      </Section>
      <Section title="Lab">
        <Field label="Crumb label">
          <TextInput value={data.crumbLabel} onChange={(v) => setData({ ...data, crumbLabel: v })} />
        </Field>
        <Field label="Heading">
          <TextInput value={data.heroHeading} onChange={(v) => setData({ ...data, heroHeading: v })} />
        </Field>
        <Field label="Hint">
          <TextInput value={data.heroHint} onChange={(v) => setData({ ...data, heroHint: v })} />
        </Field>
        <Field label="Poster eyebrow">
          <TextInput value={data.posterEyebrow} onChange={(v) => setData({ ...data, posterEyebrow: v })} />
        </Field>
        <Field label="Poster line 1">
          <TextInput value={data.posterLine1} onChange={(v) => setData({ ...data, posterLine1: v })} />
        </Field>
        <Field label="Poster line 2">
          <TextInput value={data.posterLine2} onChange={(v) => setData({ ...data, posterLine2: v })} />
        </Field>
        <Field label="Poster footer">
          <TextInput value={data.posterFooter} onChange={(v) => setData({ ...data, posterFooter: v })} />
        </Field>
        <Field label="Slider start label">
          <TextInput value={data.sliderStartLabel} onChange={(v) => setData({ ...data, sliderStartLabel: v })} />
        </Field>
        <Field label="Slider end label">
          <TextInput value={data.sliderEndLabel} onChange={(v) => setData({ ...data, sliderEndLabel: v })} />
        </Field>
      </Section>
      <Section title="What the distance buys">
        <Field label="Heading">
          <TextInput value={data.buysHeading} onChange={(v) => setData({ ...data, buysHeading: v })} />
        </Field>
        {(data.buys || []).map((buy, index) => (
          <div key={index}>
            <Field label={`Card ${index + 1} key`}>
              <TextInput
                value={buy.key}
                onChange={(v) => {
                  const buys = data.buys.slice();
                  buys[index] = { ...buy, key: v };
                  setData({ ...data, buys });
                }}
              />
            </Field>
            <Field label={`Card ${index + 1} title`}>
              <TextInput
                value={buy.title}
                onChange={(v) => {
                  const buys = data.buys.slice();
                  buys[index] = { ...buy, title: v };
                  setData({ ...data, buys });
                }}
              />
            </Field>
            <Field label={`Card ${index + 1} body`}>
              <TextInput
                multiline
                value={buy.body}
                onChange={(v) => {
                  const buys = data.buys.slice();
                  buys[index] = { ...buy, body: v };
                  setData({ ...data, buys });
                }}
              />
            </Field>
          </div>
        ))}
      </Section>
      <Section title="Pager + CTA">
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
