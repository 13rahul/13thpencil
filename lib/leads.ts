import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { prisma } from "./db";

export const DIRECTION_LABELS: Record<string, string> = {
  brand: "Build a brand",
  ignore: "Make something impossible to ignore",
  exp: "Create an experience",
  ai: "Do something with AI",
  rethink: "Rethink something that already exists",
  unknown: "I don’t know yet — that’s why I’m here",
};

export const AMBITION_LABELS: Record<string, string> = {
  lean: "Keep it lean",
  proper: "Build it properly",
  statement: "Let’s make a statement",
  talk: "Let’s talk first",
};

export const TIMELINE_LABELS: Record<string, string> = {
  yesterday: "Yesterday",
  weeks: "Next few weeks",
  months: "Next few months",
  exploring: "We’re exploring",
};

export type LeadFile = {
  name: string;
  size: number;
  url: string;
};

export function makeReference() {
  const day = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const tail = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `13P-${day}-${tail}`;
}

export function labelList(keys: string[], map: Record<string, string>) {
  return keys.map((key) => map[key] || key).filter(Boolean);
}

export async function saveLeadFiles(reference: string, files: File[]): Promise<LeadFile[]> {
  if (!files.length) return [];
  const dir = path.join(process.cwd(), "public", "uploads", "leads", reference);
  await mkdir(dir, { recursive: true });
  const saved: LeadFile[] = [];
  for (const file of files) {
    const safe = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 80) || "file";
    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, safe), bytes);
    saved.push({
      name: file.name,
      size: file.size,
      url: `/uploads/leads/${reference}/${safe}`,
    });
  }
  return saved;
}

export async function listLeads() {
  return prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getLead(id: number) {
  return prisma.lead.findUnique({ where: { id } });
}

export async function createLead(data: {
  reference: string;
  name: string;
  company: string;
  solo: boolean;
  email: string;
  phone: string;
  directions: string[];
  story: string;
  ambition: string;
  timeline: string;
  files: LeadFile[];
  emailSent: boolean;
}) {
  return prisma.lead.create({
    data: {
      ...data,
      directions: data.directions,
      files: data.files,
    },
  });
}