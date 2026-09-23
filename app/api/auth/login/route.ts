import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { setSessionCookie, signSession, verifyPassword } from "@/lib/auth";

const schema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const user = await prisma.user.findUnique({
      where: { email: body.email.trim().toLowerCase() },
    });

    if (!user || !(await verifyPassword(body.password, user.passwordHash))) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
    }

    const token = await signSession({
      sub: String(user.id),
      email: user.email,
      role: user.role,
    });
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      data: { user: { id: user.id, email: user.email, role: user.role } },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
