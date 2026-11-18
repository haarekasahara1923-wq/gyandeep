import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("🚀 Starting database seeding for Gyandeep Institute...");

  // 1. Seed or update Contact Info
  const existingContact = await db.select().from(schema.contactInfo).limit(1);
  const contactData = {
    phone: "+917828499519",
    whatsapp: "917828499519",
    email: "ajaat7828@gmail.com",
    address: "Baijal Kothi, Near Girls College, In Front of Cantonment Office, Morar Gwalior (MP)-474006",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14316.517336782298!2d78.1831!3d26.2124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c6b3e9458fcd%3A0xc6651261d7b05615!2sMorar%2C%20Gwalior%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  };

  if (existingContact.length > 0) {
    await db
      .update(schema.contactInfo)
      .set(contactData)
      .where(eq(schema.contactInfo.id, existingContact[0].id));
    console.log("✅ Contact info updated.");
  } else {
    await db.insert(schema.contactInfo).values(contactData);
    console.log("✅ Contact info inserted.");
  }

  // 2. Seed or update Site Settings
  const settingsList = [
    { key: "school_name", value: "Gyandeep Institute" },
    {
      key: "school_tagline",
      value: "Gwalior mein sabse trusted coaching center. Academic aur competitive exams ke liye expert coaching.",
    },
    {
      key: "about_school_text",
      value:
        "Gyandeep Institute — Gwalior ke Morar mein sthit ek trusted coaching center. Yahan academic se lekar competitive exams tak har student ko expert guidance milti hai.",
    },
    {
      key: "vision_text",
      value:
        "Hamari vision hai ki Gwalior ka har student confident bane aur apne academic aur career goals achieve kare.",
    },
    {
      key: "mission_text",
      value:
        "Hamari mission hai ki education ko simple, practical aur effective tarike se sikhayein — jisse students real-world mein confident hon.",
    },
  ];

  for (const s of settingsList) {
    const existing = await db
      .select()
      .from(schema.siteSettings)
      .where(eq(schema.siteSettings.key, s.key))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(schema.siteSettings)
        .set({ value: s.value })
        .where(eq(schema.siteSettings.key, s.key));
    } else {
      await db.insert(schema.siteSettings).values(s);
    }
    console.log(`✅ Setting [${s.key}] set.`);
  }

  // 3. Seed Announcements
  const announcementsList = await db.select().from(schema.announcements).limit(1);
  if (announcementsList.length === 0) {
    await db.insert(schema.announcements).values([
      {
        text: "🎉 Naya Batch Shuru Ho Raha Hai — Limited Seats! Call: +917828499519",
        isActive: true,
        displayOrder: 1,
      },
      {
        text: "📚 Spoken English, Grammar & Competitive Exams — Join Karein Aaj!",
        isActive: true,
        displayOrder: 2,
      },
      {
        text: "✨ Free Demo Class Available — WhatsApp: 917828499519 pe Sampark Karein",
        isActive: true,
        displayOrder: 3,
      },
    ]);
    console.log("✅ Announcements inserted.");
  }

  // 4. Seed Admin
  const adminUsers = await db.select().from(schema.admins).limit(1);
  if (adminUsers.length === 0) {
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "gyandeep@123";
    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(schema.admins).values({
      username,
      passwordHash,
    });
    console.log(`✅ Default admin created: ${username} / ${password}`);
  } else {
    // Update admin password to match current .env password
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "gyandeep@123";
    const passwordHash = await bcrypt.hash(password, 10);
    await db
      .update(schema.admins)
      .set({ username, passwordHash })
      .where(eq(schema.admins.id, adminUsers[0].id));
    console.log(`✅ Admin updated with credentials from .env (${username})`);
  }

  console.log("\n✨ Database setup & initial seed completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
