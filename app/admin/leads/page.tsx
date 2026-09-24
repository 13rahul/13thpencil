import Link from "next/link";
import { DIRECTION_LABELS, labelList, listLeads } from "@/lib/leads";

function when(date: Date) {
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function LeadsPage() {
  const leads = await listLeads();

  return (
    <>
      <p className="admin__lede">
        Briefs from the Start a project wizard. The sender gets a thank-you from hello@13thpencil.com; the details go to prabu@13thpencil.com.
      </p>
      {!leads.length ? (
        <p className="admin__hint">No briefs yet. Send one from /start-a-project to see it here.</p>
      ) : (
        <div className="admin__table-wrap">
          <table className="admin__table">
            <thead>
              <tr>
                <th>Received</th>
                <th>Reference</th>
                <th>Name</th>
                <th>Company</th>
                <th>Direction</th>
                <th>Mail</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const dirs = labelList(
                  Array.isArray(lead.directions) ? (lead.directions as string[]) : [],
                  DIRECTION_LABELS,
                );
                return (
                  <tr key={lead.id}>
                    <td>{when(lead.createdAt)}</td>
                    <td>
                      <Link href={`/admin/leads/${lead.id}`}>{lead.reference}</Link>
                    </td>
                    <td>
                      <Link href={`/admin/leads/${lead.id}`}>{lead.name}</Link>
                    </td>
                    <td>{lead.solo ? "Just me" : lead.company || "—"}</td>
                    <td>{dirs[0] || "—"}</td>
                    <td>{lead.emailSent ? "Sent" : "Saved only"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}