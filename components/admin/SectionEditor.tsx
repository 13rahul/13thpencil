"use client";

import { useState } from "react";
import { saveHomeSectionAction } from "@/lib/actions";
import type { HomeSectionKey, SiteContent } from "@/lib/types";
import { Field, LineHint, TextInput } from "./Fields";
import { SaveBar } from "./SaveBar";

type Props<K extends HomeSectionKey> = {
  sectionKey: K;
  initial: SiteContent[K];
};

export function SectionEditor<K extends HomeSectionKey>({ sectionKey, initial }: Props<K>) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const setSection = (value: SiteContent[HomeSectionKey]) => setData(value as SiteContent[K]);

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await saveHomeSectionAction(sectionKey, data);
      setMessage("Saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {sectionKey === "hero" && <HeroForm data={data as SiteContent["hero"]} onChange={setSection} />}
      {sectionKey === "marquee" && (
        <MarqueeForm data={data as SiteContent["marquee"]} onChange={setSection} />
      )}
      {sectionKey === "erase" && <EraseForm data={data as SiteContent["erase"]} onChange={setSection} />}
      {sectionKey === "principle" && (
        <PrincipleForm data={data as SiteContent["principle"]} onChange={setSection} />
      )}
      {sectionKey === "capabilities" && (
        <CapabilitiesForm data={data as SiteContent["capabilities"]} onChange={setSection} />
      )}
      {sectionKey === "comein" && <ComeInForm data={data as SiteContent["comein"]} onChange={setSection} />}
      {sectionKey === "work" && <WorkForm data={data as SiteContent["work"]} onChange={setSection} />}
      {sectionKey === "process" && <ProcessForm data={data as SiteContent["process"]} onChange={setSection} />}
      {sectionKey === "studio" && <StudioForm data={data as SiteContent["studio"]} onChange={setSection} />}
      {sectionKey === "contact" && <ContactForm data={data as SiteContent["contact"]} onChange={setSection} />}
      <SaveBar saving={saving} message={message} error={error} onSave={save} />
    </>
  );
}

function HeroForm({
  data,
  onChange,
}: {
  data: SiteContent["hero"];
  onChange: (value: SiteContent["hero"]) => void;
}) {
  return (
    <>
      <div className="admin__row">
        <Field label="Headline before emphasis">
          <TextInput value={data.headlineLine1Before} onChange={(v) => onChange({ ...data, headlineLine1Before: v })} />
        </Field>
        <Field label="Emphasised word">
          <TextInput value={data.headlineEmphasis} onChange={(v) => onChange({ ...data, headlineEmphasis: v })} />
        </Field>
      </div>
      <Field label="Headline after emphasis">
        <TextInput value={data.headlineLine1After} onChange={(v) => onChange({ ...data, headlineLine1After: v })} />
      </Field>
      <Field label="Second headline line">
        <TextInput value={data.headlineLine2} onChange={(v) => onChange({ ...data, headlineLine2: v })} />
      </Field>
      <Field label="Subcopy">
        <TextInput multiline value={data.subcopy} onChange={(v) => onChange({ ...data, subcopy: v })} />
      </Field>
      <Field label="Scroll hint">
        <TextInput value={data.scrollHint} onChange={(v) => onChange({ ...data, scrollHint: v })} />
      </Field>
    </>
  );
}

function MarqueeForm({
  data,
  onChange,
}: {
  data: SiteContent["marquee"];
  onChange: (value: SiteContent["marquee"]) => void;
}) {
  return (
    <Field label="Words" hint="One word per line. The last word is the reversed one.">
      <TextInput
        multiline
        value={data.words.join("\n")}
        onChange={(v) => onChange({ words: v.split("\n").map((w) => w.trim()).filter(Boolean) })}
      />
    </Field>
  );
}

function EraseForm({
  data,
  onChange,
}: {
  data: SiteContent["erase"];
  onChange: (value: SiteContent["erase"]) => void;
}) {
  return (
    <>
      <Field label="Annotation">
        <TextInput value={data.annotation} onChange={(v) => onChange({ ...data, annotation: v })} />
      </Field>
      <Field label="Struck line">
        <TextInput value={data.struckLine} onChange={(v) => onChange({ ...data, struckLine: v })} />
      </Field>
      <Field label="Replacement line">
        <TextInput value={data.replacementLine} onChange={(v) => onChange({ ...data, replacementLine: v })} />
      </Field>
      <Field label="Paragraphs" hint="One paragraph per line.">
        <TextInput
          multiline
          value={data.paragraphs.join("\n")}
          onChange={(v) => onChange({ ...data, paragraphs: v.split("\n").filter((p) => p.trim()) })}
        />
      </Field>
      <Field label="Closing note">
        <TextInput multiline value={data.closingNote} onChange={(v) => onChange({ ...data, closingNote: v })} />
      </Field>
    </>
  );
}

function PrincipleForm({
  data,
  onChange,
}: {
  data: SiteContent["principle"];
  onChange: (value: SiteContent["principle"]) => void;
}) {
  return (
    <>
      <Field label="Heading">
        <LineHint />
        <TextInput multiline value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      </Field>
      <Field label="Lede">
        <TextInput multiline value={data.lede} onChange={(v) => onChange({ ...data, lede: v })} />
      </Field>
      <Field label="Note">
        <TextInput multiline value={data.note} onChange={(v) => onChange({ ...data, note: v })} />
      </Field>
    </>
  );
}

function CapabilitiesForm({
  data,
  onChange,
}: {
  data: SiteContent["capabilities"];
  onChange: (value: SiteContent["capabilities"]) => void;
}) {
  return (
    <>
      <Field label="Heading">
        <LineHint />
        <TextInput multiline value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      </Field>
      <Field label="Intro">
        <TextInput multiline value={data.intro} onChange={(v) => onChange({ ...data, intro: v })} />
      </Field>
      {data.items.map((item, index) => (
        <div className="admin__block" key={item.slug}>
          <p>
            {item.number} — {item.slug}
          </p>
          <Field label="Name">
            <TextInput
              value={item.name}
              onChange={(v) => {
                const items = data.items.slice();
                items[index] = { ...item, name: v };
                onChange({ ...data, items });
              }}
            />
          </Field>
          <Field label="For line">
            <TextInput
              value={item.forLine}
              onChange={(v) => {
                const items = data.items.slice();
                items[index] = { ...item, forLine: v };
                onChange({ ...data, items });
              }}
            />
          </Field>
          <Field label="Description">
            <TextInput
              multiline
              value={item.description}
              onChange={(v) => {
                const items = data.items.slice();
                items[index] = { ...item, description: v };
                onChange({ ...data, items });
              }}
            />
          </Field>
          <Field label="Canvas caption">
            <TextInput
              value={item.canvasCaption}
              onChange={(v) => {
                const items = data.items.slice();
                items[index] = { ...item, canvasCaption: v };
                onChange({ ...data, items });
              }}
            />
          </Field>
          <Field label="Practice page URL (optional)">
            <TextInput
              value={item.pageHref || ""}
              onChange={(v) => {
                const items = data.items.slice();
                items[index] = { ...item, pageHref: v || undefined };
                onChange({ ...data, items });
              }}
            />
          </Field>
        </div>
      ))}
    </>
  );
}

function ComeInForm({
  data,
  onChange,
}: {
  data: SiteContent["comein"];
  onChange: (value: SiteContent["comein"]) => void;
}) {
  return (
    <>
      <Field label="Heading">
        <LineHint />
        <TextInput multiline value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      </Field>
      <Field label="Intro">
        <TextInput multiline value={data.intro} onChange={(v) => onChange({ ...data, intro: v })} />
      </Field>
      <p className="admin__hint">Wrap a phrase in *asterisks* to italicise it.</p>
      {data.items.map((item, index) => (
        <div className="admin__block" key={index}>
          <p>Row {index + 1}</p>
          <Field label="Quote">
            <TextInput
              multiline
              value={item.quote}
              onChange={(v) => {
                const items = data.items.slice();
                items[index] = { ...item, quote: v };
                onChange({ ...data, items });
              }}
            />
          </Field>
          <div className="admin__row">
            <Field label="Answer heading">
              <TextInput
                value={item.answerHeading}
                onChange={(v) => {
                  const items = data.items.slice();
                  items[index] = { ...item, answerHeading: v };
                  onChange({ ...data, items });
                }}
              />
            </Field>
            <Field label="Answer detail">
              <TextInput
                value={item.answerDetail}
                onChange={(v) => {
                  const items = data.items.slice();
                  items[index] = { ...item, answerDetail: v };
                  onChange({ ...data, items });
                }}
              />
            </Field>
          </div>
        </div>
      ))}
    </>
  );
}

function WorkForm({
  data,
  onChange,
}: {
  data: SiteContent["work"];
  onChange: (value: SiteContent["work"]) => void;
}) {
  return (
    <>
      <Field label="Heading">
        <TextInput value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      </Field>
      <Field label="Intro">
        <TextInput multiline value={data.intro} onChange={(v) => onChange({ ...data, intro: v })} />
      </Field>
      {data.tiles.map((tile, index) => (
        <div className="admin__block" key={tile.variant}>
          <p>Tile {tile.variant.toUpperCase()}</p>
          <div className="admin__row">
            <Field label="Format">
              <TextInput
                value={tile.format}
                onChange={(v) => {
                  const tiles = data.tiles.slice();
                  tiles[index] = { ...tile, format: v };
                  onChange({ ...data, tiles });
                }}
              />
            </Field>
            <Field label="Status">
              <TextInput
                value={tile.status}
                onChange={(v) => {
                  const tiles = data.tiles.slice();
                  tiles[index] = { ...tile, status: v };
                  onChange({ ...data, tiles });
                }}
              />
            </Field>
          </div>
          <Field label="Description">
            <TextInput
              multiline
              value={tile.description}
              onChange={(v) => {
                const tiles = data.tiles.slice();
                tiles[index] = { ...tile, description: v };
                onChange({ ...data, tiles });
              }}
            />
          </Field>
          <div className="admin__row">
            <Field label="Title">
              <TextInput
                value={tile.title}
                onChange={(v) => {
                  const tiles = data.tiles.slice();
                  tiles[index] = { ...tile, title: v };
                  onChange({ ...data, tiles });
                }}
              />
            </Field>
            <Field label="Kind">
              <TextInput
                value={tile.kind}
                onChange={(v) => {
                  const tiles = data.tiles.slice();
                  tiles[index] = { ...tile, kind: v };
                  onChange({ ...data, tiles });
                }}
              />
            </Field>
          </div>
          <Field label="Link">
            <TextInput
              value={tile.link}
              onChange={(v) => {
                const tiles = data.tiles.slice();
                tiles[index] = { ...tile, link: v };
                onChange({ ...data, tiles });
              }}
            />
          </Field>
        </div>
      ))}
    </>
  );
}

function ProcessForm({
  data,
  onChange,
}: {
  data: SiteContent["process"];
  onChange: (value: SiteContent["process"]) => void;
}) {
  return (
    <>
      <Field label="Heading">
        <TextInput value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      </Field>
      {data.steps.map((step, index) => (
        <div className="admin__block" key={index}>
          <p>Step {index + 1}</p>
          <Field label="Label">
            <TextInput
              value={step.label}
              onChange={(v) => {
                const steps = data.steps.slice();
                steps[index] = { ...step, label: v };
                onChange({ ...data, steps });
              }}
            />
          </Field>
          <Field label="Title">
            <TextInput
              value={step.title}
              onChange={(v) => {
                const steps = data.steps.slice();
                steps[index] = { ...step, title: v };
                onChange({ ...data, steps });
              }}
            />
          </Field>
          <Field label="Body">
            <TextInput
              multiline
              value={step.body}
              onChange={(v) => {
                const steps = data.steps.slice();
                steps[index] = { ...step, body: v };
                onChange({ ...data, steps });
              }}
            />
          </Field>
        </div>
      ))}
    </>
  );
}

function StudioForm({
  data,
  onChange,
}: {
  data: SiteContent["studio"];
  onChange: (value: SiteContent["studio"]) => void;
}) {
  return (
    <>
      <Field label="Heading">
        <LineHint />
        <TextInput multiline value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      </Field>
      <Field label="Paragraphs" hint="One paragraph per line.">
        <TextInput
          multiline
          value={data.paragraphs.join("\n")}
          onChange={(v) => onChange({ ...data, paragraphs: v.split("\n").filter((p) => p.trim()) })}
        />
      </Field>
      {data.facts.map((fact, index) => (
        <div className="admin__block" key={index}>
          <p>Fact {index + 1}</p>
          <Field label="Label">
            <TextInput
              value={fact.label}
              onChange={(v) => {
                const facts = data.facts.slice();
                facts[index] = { ...fact, label: v };
                onChange({ ...data, facts });
              }}
            />
          </Field>
          <Field label="Value">
            <TextInput
              multiline
              value={fact.value}
              onChange={(v) => {
                const facts = data.facts.slice();
                facts[index] = { ...fact, value: v };
                onChange({ ...data, facts });
              }}
            />
          </Field>
        </div>
      ))}
    </>
  );
}

function ContactForm({
  data,
  onChange,
}: {
  data: SiteContent["contact"];
  onChange: (value: SiteContent["contact"]) => void;
}) {
  return (
    <>
      <div className="admin__row">
        <Field label="Headline before">
          <TextInput value={data.headlineBefore} onChange={(v) => onChange({ ...data, headlineBefore: v })} />
        </Field>
        <Field label="Headline mid">
          <TextInput value={data.headlineMid} onChange={(v) => onChange({ ...data, headlineMid: v })} />
        </Field>
      </div>
      <Field label="Rotating phrases" hint="One phrase per line.">
        <TextInput
          multiline
          value={data.swapPhrases.join("\n")}
          onChange={(v) =>
            onChange({ ...data, swapPhrases: v.split("\n").map((p) => p.trim()).filter(Boolean) })
          }
        />
      </Field>
      <Field label="CTA label">
        <TextInput value={data.ctaLabel} onChange={(v) => onChange({ ...data, ctaLabel: v })} />
      </Field>
      <div className="admin__row">
        <Field label="New business label">
          <TextInput
            value={data.newBusinessLabel}
            onChange={(v) => onChange({ ...data, newBusinessLabel: v })}
          />
        </Field>
        <Field label="Careers label">
          <TextInput value={data.careersLabel} onChange={(v) => onChange({ ...data, careersLabel: v })} />
        </Field>
      </div>
      <Field label="Supporting note">
        <TextInput
          multiline
          value={data.supportingNote}
          onChange={(v) => onChange({ ...data, supportingNote: v })}
        />
      </Field>
    </>
  );
}
