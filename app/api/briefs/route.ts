import { NextResponse } from "next/server";
import {
  AMBITION_LABELS,
  DIRECTION_LABELS,
  TIMELINE_LABELS,
  createLead,
  makeReference,
  saveLeadFiles,
} from "@/lib/leads";
import { sendLeadEmail } from "@/lib/mail";

const MAX_FILE = 25 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const name = String(form.get("name") || "").trim();
    const company = String(form.get("company") || "").trim();
    const solo = String(form.get("solo") || "") === "1";
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const story = String(form.get("story") || "").trim();
    const ambition = String(form.get("ambition") || "").trim();
    const timeline = String(form.get("timeline") || "").trim();
    const directions = String(form.get("directions") || "")
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item in DIRECTION_LABELS);

    if (!name) return NextResponse.json({ error: "We’ll need something to call you." }, { status: 400 });
    if (!company && !solo) {
      return NextResponse.json({ error: "Add a company, or choose just you." }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ error: "Give that email another look." }, { status: 400 });
    }
    if (!directions.length) {
      return NextResponse.json({ error: "Mark at least one direction." }, { status: 400 });
    }
    if (!story) return NextResponse.json({ error: "Even one rough sentence helps." }, { status: 400 });
    if (!(ambition in AMBITION_LABELS)) {
      return NextResponse.json({ error: "Pick how ambitious this should be." }, { status: 400 });
    }
    if (!(timeline in TIMELINE_LABELS)) {
      return NextResponse.json({ error: "Choose a timeline." }, { status: 400 });
    }

    const incoming = form.getAll("files").filter((item): item is File => item instanceof File && item.size > 0);
    if (incoming.some((file) => file.size > MAX_FILE)) {
      return NextResponse.json({ error: "One of the files is over 25 MB." }, { status: 400 });
    }

    const reference = makeReference();
    const files = await saveLeadFiles(reference, incoming.slice(0, 8));

    let emailSent = false;
    try {
      await sendLeadEmail({
        reference,
        name,
        company,
        solo,
        email,
        phone,
        directions,
        story,
        ambition,
        timeline,
        files,
      });
      emailSent = true;
    } catch (error) {
      console.error("Lead email failed", error);
    }

    const lead = await createLead({
      reference,
      name,
      company,
      solo,
      email,
      phone,
      directions,
      story,
      ambition,
      timeline,
      files,
      emailSent,
    });

    return NextResponse.json({ ok: true, reference: lead.reference, id: lead.id });
  } catch (error) {
    console.error("Brief submit failed", error);
    return NextResponse.json({ error: "Could not send the brief. Try again." }, { status: 500 });
  }
}