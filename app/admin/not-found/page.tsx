import { getSiteContent } from "@/lib/content";
import { NotFoundForm } from "./NotFoundForm";

export const dynamic = "force-dynamic";

export default async function AdminNotFoundPage() {
  const { notFound } = await getSiteContent();
  return <NotFoundForm initial={notFound} />;
}
