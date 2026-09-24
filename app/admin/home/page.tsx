import Link from "next/link";
import { HOME_SECTIONS } from "@/lib/default-content";

export default function AdminHomeHub() {
  return (
    <>
      <p className="admin__lede">
        Pick a homepage section to edit. Changes appear on the public site after save.
      </p>
      <div className="admin__cards">
        {HOME_SECTIONS.map((section) => (
          <Link key={section.key} className="admin__card" href={`/admin/home/${section.key}`}>
            <strong>{section.label}</strong>
            <span>{section.hint}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
