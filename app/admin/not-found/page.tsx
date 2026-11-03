import { loadSiteContent } from "@/lib/content";
import { NotFoundForm } from "./NotFoundForm";

export const dynamic = "force-dynamic";

export default async function AdminNotFoundPage() {
  const { notFound } = await loadSiteContent();
  return <NotFoundForm initial={notFound} />;
}
