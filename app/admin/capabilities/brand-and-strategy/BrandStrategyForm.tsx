"use client";

import { useState, type ReactNode } from "react";
import { saveBrandStrategyAction } from "@/lib/actions";
import { Field, TextInput } from "@/components/admin/Fields";
import { SaveBar } from "@/components/admin/SaveBar";
import type { BrandStrategyContent } from "@/lib/types";

function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <div className="admin__block">
      <p>
        <strong>{title}</strong>
        {hint ? ` — ${hint}` : ""}
      </p>
      {children}
    </div>
  );
}

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
      <p className="admin__lede">
        Public copy for /capabilities/brand-and-strategy. Wrap a word in *asterisks* to paint it coral in a caption.
      </p>

      <Section title="SEO" hint="browser title and search description">
        <Field label="Browser title">
          <TextInput value={data.metaTitle} onChange={(v) => setData({ ...data, metaTitle: v })} />
        </Field>
        <Field label="Meta description">
          <TextInput multiline value={data.metaDescription} onChange={(v) => setData({ ...data, metaDescription: v })} />
        </Field>
      </Section>

      <Section title="Hero" hint="kinetic opening">
        <Field label="Number">
          <TextInput value={data.number} onChange={(v) => setData({ ...data, number: v })} />
        </Field>
        <Field label="Practice name">
          <TextInput value={data.practiceName} onChange={(v) => setData({ ...data, practiceName: v })} />
        </Field>
        <Field label="Hero line 1">
          <TextInput value={data.heroLine1} onChange={(v) => setData({ ...data, heroLine1: v })} />
        </Field>
        <Field label="Says prefix">
          <TextInput value={data.heroSaysPrefix} onChange={(v) => setData({ ...data, heroSaysPrefix: v })} />
        </Field>
        <Field label="Cycling adjectives (one per line)">
          <TextInput
            multiline
            value={(data.cycleWords || []).join("\n")}
            onChange={(v) =>
              setData({
                ...data,
                cycleWords: v
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </Field>
        <Field label="Subcopy">
          <TextInput multiline value={data.subcopy} onChange={(v) => setData({ ...data, subcopy: v })} />
        </Field>
        <Field label="Scroll hint">
          <TextInput value={data.scrollHint} onChange={(v) => setData({ ...data, scrollHint: v })} />
        </Field>
      </Section>

      <Section title="The field" hint="scroll stage claims and captions">
        <Field label="Claim words (one per line)">
          <TextInput
            multiline
            value={(data.claims || []).join("\n")}
            onChange={(v) =>
              setData({
                ...data,
                claims: v
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </Field>
        <Field label="Stage hint">
          <TextInput value={data.stageHint} onChange={(v) => setData({ ...data, stageHint: v })} />
        </Field>
        {(data.captions || []).map((cap, index) => (
          <div key={index}>
            <Field label={`Caption ${index + 1} heading`}>
              <TextInput
                value={cap.heading}
                onChange={(v) => {
                  const captions = data.captions.slice();
                  captions[index] = { ...cap, heading: v };
                  setData({ ...data, captions });
                }}
              />
            </Field>
            <Field label={`Caption ${index + 1} body`}>
              <TextInput
                multiline
                value={cap.body}
                onChange={(v) => {
                  const captions = data.captions.slice();
                  captions[index] = { ...cap, body: v };
                  setData({ ...data, captions });
                }}
              />
            </Field>
          </div>
        ))}
      </Section>

      <Section title="Five moves">
        <Field label="Heading">
          <TextInput value={data.movesHeading} onChange={(v) => setData({ ...data, movesHeading: v })} />
        </Field>
        {(data.moves || []).map((move, index) => (
          <div key={index}>
            <Field label={`Move ${index + 1} number`}>
              <TextInput
                value={move.number}
                onChange={(v) => {
                  const moves = data.moves.slice();
                  moves[index] = { ...move, number: v };
                  setData({ ...data, moves });
                }}
              />
            </Field>
            <Field label={`Move ${index + 1} title`}>
              <TextInput
                value={move.title}
                onChange={(v) => {
                  const moves = data.moves.slice();
                  moves[index] = { ...move, title: v };
                  setData({ ...data, moves });
                }}
              />
            </Field>
            <Field label={`Move ${index + 1} detail`}>
              <TextInput
                multiline
                value={move.detail}
                onChange={(v) => {
                  const moves = data.moves.slice();
                  moves[index] = { ...move, detail: v };
                  setData({ ...data, moves });
                }}
              />
            </Field>
          </div>
        ))}
      </Section>

      <Section title="Next" hint="capability hand-offs">
        <Field label="Heading">
          <TextInput value={data.nextHeading} onChange={(v) => setData({ ...data, nextHeading: v })} />
        </Field>
        {(data.connects || []).map((cc, index) => (
          <div key={index}>
            <Field label={`Link ${index + 1} name`}>
              <TextInput
                value={cc.name}
                onChange={(v) => {
                  const connects = data.connects.slice();
                  connects[index] = { ...cc, name: v };
                  setData({ ...data, connects });
                }}
              />
            </Field>
            <Field label={`Link ${index + 1} href`}>
              <TextInput
                value={cc.href}
                onChange={(v) => {
                  const connects = data.connects.slice();
                  connects[index] = { ...cc, href: v };
                  setData({ ...data, connects });
                }}
              />
            </Field>
          </div>
        ))}
      </Section>

      <Section title="CTA">
        <Field label="Contact line 1">
          <TextInput value={data.contactLine1} onChange={(v) => setData({ ...data, contactLine1: v })} />
        </Field>
        <Field label="Contact line 2">
          <TextInput value={data.contactLine2} onChange={(v) => setData({ ...data, contactLine2: v })} />
        </Field>
      </Section>

      <SaveBar saving={saving} message={message} error={error} onSave={save} />
    </>
  );
}
