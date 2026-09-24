import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AMBITION_LABELS,
  DIRECTION_LABELS,
  TIMELINE_LABELS,
  getLead,
  labelList,
  type LeadFile,
} from "@/lib/leads";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await getLead(Number(id));
  if (!lead) notFound();

  const dirs = labelList(Array.isArray(lead.directions) ? (lead.directions as string[]) : [], DIRECTION_LABELS);
  const files = Array.isArray(lead.files) ? (lead.files as LeadFile[]) : [];

  return (
    <>
      <p className="admin__lede">
        <Link href="/admin/leads">← All leads</Link>
      </p>
      <div className="admin__block">
        <p>
          {lead.reference} · {lead.createdAt.toLocaleString("en-GB")} ·{" "}
          {lead.emailSent ? "Email sent to Prabu" : "Saved, email not sent"}
        </p>
        <dl className="admin__dl">
          <div>
            <dt>Name</dt>
            <dd>{lead.name}</dd>
          </div>
          <div>
            <dt>Company</dt>
            <dd>{lead.solo ? "Just me, for now" : lead.company || "—"}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${lead.email}`}>{lead.email}</a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{lead.phone || "—"}</dd>
          </div>
          <div>
            <dt>Direction</dt>
            <dd>{dirs.join(" + ") || "—"}</dd>
          </div>
          <div>
            <dt>Ambition</dt>
            <dd>{AMBITION_LABELS[lead.ambition] || lead.ambition}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{TIMELINE_LABELS[lead.timeline] || lead.timeline}</dd>
          </div>
          <div>
            <dt>The messy version</dt>
            <dd className="admin__story">{lead.story}</dd>
          </div>
          <div>
            <dt>Attachments</dt>
            <dd>
              {files.length ? (
                <ul>
                  {files.map((file) => (
                    <li key={file.url}>
                      <a href={file.url} target="_blank" rel="noreferrer">
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                "None"
              )}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}