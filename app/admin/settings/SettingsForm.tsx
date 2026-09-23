"use client";

import { useState } from "react";
import { saveSettingsAction } from "@/lib/actions";
import { Field, TextInput } from "@/components/admin/Fields";
import { SaveBar } from "@/components/admin/SaveBar";
import type { SiteSettings } from "@/lib/types";

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await saveSettingsAction(data);
      setMessage("Saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <p className="admin__lede">These values appear in the header, footer, contact links and search previews.</p>
      <Field label="Site name">
        <TextInput value={data.siteName} onChange={(v) => setData({ ...data, siteName: v })} />
      </Field>
      <Field label="Meta title">
        <TextInput value={data.metaTitle} onChange={(v) => setData({ ...data, metaTitle: v })} />
      </Field>
      <Field label="Meta description">
        <TextInput multiline value={data.metaDescription} onChange={(v) => setData({ ...data, metaDescription: v })} />
      </Field>
      <div className="admin__row">
        <Field label="OG title">
          <TextInput value={data.ogTitle} onChange={(v) => setData({ ...data, ogTitle: v })} />
        </Field>
        <Field label="Theme colour">
          <TextInput value={data.themeColor} onChange={(v) => setData({ ...data, themeColor: v })} />
        </Field>
      </div>
      <Field label="OG description">
        <TextInput multiline value={data.ogDescription} onChange={(v) => setData({ ...data, ogDescription: v })} />
      </Field>
      <Field label="OG image URL">
        <TextInput value={data.ogImage} onChange={(v) => setData({ ...data, ogImage: v })} />
      </Field>
      <Field label="Canonical URL">
        <TextInput value={data.canonicalUrl} onChange={(v) => setData({ ...data, canonicalUrl: v })} />
      </Field>
      <div className="admin__row">
        <Field label="Primary email">
          <TextInput value={data.primaryEmail} onChange={(v) => setData({ ...data, primaryEmail: v })} />
        </Field>
        <Field label="Careers email">
          <TextInput value={data.careersEmail} onChange={(v) => setData({ ...data, careersEmail: v })} />
        </Field>
      </div>
      <div className="admin__row">
        <Field label="Header CTA">
          <TextInput value={data.ctaLabel} onChange={(v) => setData({ ...data, ctaLabel: v })} />
        </Field>
        <Field label="Invert button">
          <TextInput value={data.invertLabel} onChange={(v) => setData({ ...data, invertLabel: v })} />
        </Field>
      </div>
      <Field label="Loader caption">
        <TextInput value={data.loaderCaption} onChange={(v) => setData({ ...data, loaderCaption: v })} />
      </Field>
      <Field label="Menu description">
        <TextInput value={data.menuDesc} onChange={(v) => setData({ ...data, menuDesc: v })} />
      </Field>
      <Field label="Footer line">
        <TextInput multiline value={data.footerLegal} onChange={(v) => setData({ ...data, footerLegal: v })} />
      </Field>
      {data.navItems.map((item, index) => (
        <div className="admin__block" key={index}>
          <p>Nav item {index + 1}</p>
          <div className="admin__row">
            <Field label="Label">
              <TextInput
                value={item.label}
                onChange={(v) => {
                  const navItems = data.navItems.slice();
                  navItems[index] = { ...item, label: v };
                  setData({ ...data, navItems });
                }}
              />
            </Field>
            <Field label="Anchor">
              <TextInput
                value={item.href}
                onChange={(v) => {
                  const navItems = data.navItems.slice();
                  navItems[index] = { ...item, href: v };
                  setData({ ...data, navItems });
                }}
              />
            </Field>
          </div>
        </div>
      ))}
      <SaveBar saving={saving} message={message} error={error} onSave={save} />
    </>
  );
}
