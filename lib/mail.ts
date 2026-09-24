import nodemailer from "nodemailer";
import {
  AMBITION_LABELS,
  DIRECTION_LABELS,
  TIMELINE_LABELS,
  labelList,
  type LeadFile,
} from "./leads";

const TO = process.env.LEAD_NOTIFY_EMAIL || "prabu@13thpencil.com";

function transporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 465),
    secure: (process.env.SMTP_PORT || "465") === "465",
    auth: { user, pass },
  });
}

export async function sendLeadEmail(input: {
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
}) {
  const mailer = transporter();
  if (!mailer) {
    throw new Error("SMTP is not configured");
  }

  const dirs = labelList(input.directions, DIRECTION_LABELS).join(" + ") || "—";
  const company = input.solo ? "Just me, for now" : input.company || "—";
  const lines = [
    `New project brief ${input.reference}`,
    "",
    `Name: ${input.name}`,
    `Company: ${company}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || "—"}`,
    `Direction: ${dirs}`,
    `Ambition: ${AMBITION_LABELS[input.ambition] || input.ambition}`,
    `Timeline: ${TIMELINE_LABELS[input.timeline] || input.timeline}`,
    `Attachments: ${input.files.length ? input.files.map((f) => f.name).join(", ") : "None"}`,
    "",
    "The messy version:",
    input.story,
  ];

  await mailer.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: TO,
    replyTo: input.email,
    subject: `New brief ${input.reference} — ${input.name}`,
    text: lines.join("\n"),
    attachments: input.files.map((file) => ({
      filename: file.name,
      path: `${process.cwd()}/public${file.url}`,
    })),
  });
}