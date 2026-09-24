import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { defaultContent } from "../lib/default-content";

const prisma = new PrismaClient();

const HOME_KEYS = [
  "hero",
  "marquee",
  "erase",
  "principle",
  "capabilities",
  "comein",
  "work",
  "process",
  "studio",
  "contact",
] as const;

async function main() {
  const email = (process.env.ADMIN_EMAIL || "hello@13thpencil.com").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeMe13!";
  const passwordHash = await hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash, role: "admin" },
  });

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, content: defaultContent.settings },
  });

  for (const key of HOME_KEYS) {
    await prisma.pageSection.upsert({
      where: { page_sectionKey: { page: "home", sectionKey: key } },
      update: {},
      create: { page: "home", sectionKey: key, content: defaultContent[key] },
    });
  }

  await prisma.pageSection.upsert({
    where: { page_sectionKey: { page: "site", sectionKey: "notFound" } },
    update: {},
    create: { page: "site", sectionKey: "notFound", content: defaultContent.notFound },
  });

  await prisma.pageSection.upsert({
    where: { page_sectionKey: { page: "capabilities", sectionKey: "brandStrategy" } },
    update: {},
    create: {
      page: "capabilities",
      sectionKey: "brandStrategy",
      content: defaultContent.brandStrategy,
    },
  });

  console.log(`Seeded admin ${email} and default page copy.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
