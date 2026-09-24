import nodemailer, { type Transporter } from "nodemailer";
import {
  AMBITION_LABELS,
  DIRECTION_LABELS,
  TIMELINE_LABELS,
  labelList,
  type LeadFile,
} from "./leads";

const STUDIO = process.env.LEAD_NOTIFY_EMAIL || "prabu@13thpencil.com";
const FROM = process.env.SMTP_FROM || "13th Pencil <hello@13thpencil.com>";

type LeadMail = {
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
};

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

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

export async function sendLeadEmails(input: LeadMail) {
  const mailer = transporter();
  if (!mailer) {
    throw new Error("SMTP is not configured");
  }

  await sendStudioNotice(mailer, input);
  await sendThankYou(mailer, input);
}

async function sendStudioNotice(mailer: Transporter, input: LeadMail) {
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
    from: FROM,
    to: STUDIO,
    replyTo: input.email,
    subject: `New brief ${input.reference} — ${input.name}`,
    text: lines.join("\n"),
    attachments: input.files.map((file) => ({
      filename: file.name,
      path: `${process.cwd()}/public${file.url}`,
    })),
  });
}

async function sendThankYou(mailer: Transporter, input: LeadMail) {
  const name = firstName(input.name);
  const text = [
    `Hello ${name},`,
    "",
    `We have your brief (${input.reference}). Thank you for sending it.`,
    "",
    "Someone from 13th Pencil will write back shortly — usually within a working day.",
    "If anything is urgent, reply to this email.",
    "",
    "13th Pencil",
    "hello@13thpencil.com",
  ].join("\n");

  await mailer.sendMail({
    from: FROM,
    to: input.email,
    replyTo: "hello@13thpencil.com",
    subject: "We have your brief — 13th Pencil",
    text,
  });
}
