"use client";

import { useState, type ReactNode } from "react";
import { saveAboutOurStoryAction } from "@/lib/actions";
import { Field, TextInput } from "@/components/admin/Fields";
import { SaveBar } from "@/components/admin/SaveBar";
import type { AboutOurStoryContent } from "@/lib/types";

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

export function AboutOurStoryForm({ initial }: { initial: AboutOurStoryContent }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await saveAboutOurStoryAction(data);
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
        Public copy for /about/our-story. Wrap emphasis in *asterisks* inside letter paragraphs.
      </p>
      <Section title="SEO">
        <Field label="Browser title">
          <TextInput value={data.metaTitle} onChange={(v) => setData({ ...data, metaTitle: v })} />
        </Field>
        <Field label="Meta description">
          <TextInput multiline value={data.metaDescription} onChange={(v) => setData({ ...data, metaDescription: v })} />
        </Field>
      </Section>
      <Section title="Hero">
        <Field label="Crumb label">
          <TextInput value={data.crumbLabel} onChange={(v) => setData({ ...data, crumbLabel: v })} />
        </Field>
        <Field label="Hero line 1">
          <TextInput value={data.heroLine1} onChange={(v) => setData({ ...data, heroLine1: v })} />
        </Field>
        <Field label="Hero line 2">
          <TextInput value={data.heroLine2} onChange={(v) => setData({ ...data, heroLine2: v })} />
        </Field>
        <Field label="Subcopy">
          <TextInput multiline value={data.heroSub} onChange={(v) => setData({ ...data, heroSub: v })} />
        </Field>
        <Field label="Video aria label">
          <TextInput value={data.videoAriaLabel} onChange={(v) => setData({ ...data, videoAriaLabel: v })} />
        </Field>
      </Section>
      <Section title="Letter">
        <Field label="From line">
          <TextInput value={data.letterFrom} onChange={(v) => setData({ ...data, letterFrom: v })} />
        </Field>
        <Field label="Paragraphs (one per line)">
          <TextInput
            multiline
            value={(data.letterParagraphs || []).join("\n")}
            onChange={(v) =>
              setData({
                ...data,
                letterParagraphs: v
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </Field>
        <Field label="Closing paragraph">
          <TextInput multiline value={data.letterClosing} onChange={(v) => setData({ ...data, letterClosing: v })} />
        </Field>
        <Field label="Sign label">
          <TextInput value={data.signLabel} onChange={(v) => setData({ ...data, signLabel: v })} />
        </Field>
      </Section>
      <Section title="Made by us">
        <Field label="Heading">
          <TextInput value={data.madeHeading} onChange={(v) => setData({ ...data, madeHeading: v })} />
        </Field>
        <Field label="Lede">
          <TextInput multiline value={data.madeLede} onChange={(v) => setData({ ...data, madeLede: v })} />
        </Field>
        {(data.artworks || []).map((art, index) => (
          <div key={index}>
            <Field label={`Artwork ${index + 1} caption`}>
              <TextInput
                value={art.caption}
                onChange={(v) => {
                  const artworks = data.artworks.slice();
                  artworks[index] = { ...art, caption: v };
                  setData({ ...data, artworks });
                }}
              />
            </Field>
            <Field label={`Artwork ${index + 1} alt`}>
              <TextInput
                multiline
                value={art.alt}
                onChange={(v) => {
                  const artworks = data.artworks.slice();
                  artworks[index] = { ...art, alt: v };
                  setData({ ...data, artworks });
                }}
              />
            </Field>
          </div>
        ))}
        <Field label="Note">
          <TextInput multiline value={data.madeNote} onChange={(v) => setData({ ...data, madeNote: v })} />
        </Field>
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
