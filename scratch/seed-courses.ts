import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seedCoursesAndSettings() {
  console.log("🚀 Starting Gyandeep Institute Course & Settings Seeding...");

  // 1. Delete old courses and insert all official courses
  await db.delete(schema.courses);
  console.log("Deleted old courses.");

  const coursesList = [
    {
      name: "Classes 1st to 10th — All Subjects (CBSE & MP Board)",
      description: "Complete academic preparation for all subjects including Mathematics, Science, Social Science, English & Hindi. Comprehensive conceptual teaching with weekly tests and personal attention.",
      fee: "Affordable / Contact for Details",
      batchTimings: "Morning & Evening Batches (7:00 AM - 7:00 PM)",
      duration: "Full Academic Year",
      isActive: true,
      displayOrder: 1,
    },
    {
      name: "Class 11th & 12th — Mathematics (PCM)",
      description: "Physics, Chemistry, and Advanced Mathematics for CBSE & MP Board. Conceptual problem solving, numerical mastery, and board examination excellence.",
      fee: "Contact for Fee Structure",
      batchTimings: "Morning: 7:00 AM - 11:00 AM | Evening: 3:00 PM - 7:00 PM",
      duration: "1 Year / Academic Session",
      isActive: true,
      displayOrder: 2,
    },
    {
      name: "Class 11th & 12th — Biology (PCB)",
      description: "Physics, Chemistry, and Biology with in-depth NCERT coverage, diagrams, theory, and competitive medical foundation.",
      fee: "Contact for Fee Structure",
      batchTimings: "Morning & Evening Batches",
      duration: "1 Year / Academic Session",
      isActive: true,
      displayOrder: 3,
    },
    {
      name: "Class 11th & 12th — Commerce Stream",
      description: "Accountancy, Business Studies, Economics, and Applied Mathematics with practical case studies, ledger practice, and board preparation.",
      fee: "Contact for Fee Structure",
      batchTimings: "Morning & Evening Batches",
      duration: "1 Year / Academic Session",
      isActive: true,
      displayOrder: 4,
    },
    {
      name: "Class 11th & 12th — Arts (Humanities)",
      description: "History, Political Science, Geography, Sociology, and Languages with structured answer-writing techniques and regular mock examinations.",
      fee: "Contact for Fee Structure",
      batchTimings: "Flexible Batches",
      duration: "1 Year / Academic Session",
      isActive: true,
      displayOrder: 5,
    },
    {
      name: "Class 11th & 12th — Agriculture Stream",
      description: "Specialized coaching covering Crop Production, Animal Husbandry, Horticulture, and Elements of Science for Agriculture students.",
      fee: "Contact for Fee Structure",
      batchTimings: "Dedicated Batches",
      duration: "1 Year / Academic Session",
      isActive: true,
      displayOrder: 6,
    },
    {
      name: "NEET (Medical Entrance Preparation)",
      description: "Targeted preparation for Physics, Chemistry & Biology. Daily Practice Problems (DPPs), mock test series, and dedicated doubt-clearing sessions.",
      fee: "Contact for Details",
      batchTimings: "Morning & Evening Batches",
      duration: "Target / Foundation (1-2 Years)",
      isActive: true,
      displayOrder: 7,
    },
    {
      name: "IIT-JEE Main & Advanced Preparation",
      description: "Concept-driven preparation in Physics, Chemistry & Mathematics with rigorous problem solving, speed tests, and previous year papers.",
      fee: "Contact for Details",
      batchTimings: "Morning & Evening Batches",
      duration: "Target / Foundation (1-2 Years)",
      isActive: true,
      displayOrder: 8,
    },
    {
      name: "Sainik School & Navodaya Entrance Exam",
      description: "Specialized coaching for Class 6th & 9th entrance exams for Sainik School, Jawahar Navodaya Vidyalaya & Military Schools with IQ, Maths & Language prep.",
      fee: "Contact for Details",
      batchTimings: "Morning & Evening Batches",
      duration: "Target Session / Crash Course",
      isActive: true,
      displayOrder: 9,
    },
    {
      name: "Excellence School Entrance Preparation",
      description: "Focused entrance exam preparation for admission to prestigious Excellence (Utkrisht) and Model Schools across MP.",
      fee: "Affordable Session Fee",
      batchTimings: "Dedicated Batches",
      duration: "Target Session",
      isActive: true,
      displayOrder: 10,
    },
    {
      name: "Foundation & Personality Development",
      description: "English & Hindi Foundation, Reading & Writing improvement, Grammar mastery, Public Speaking, and Personality Development.",
      fee: "Contact for Fee Structure",
      batchTimings: "Flexible Morning / Evening Batches",
      duration: "3 to 6 Months",
      isActive: true,
      displayOrder: 11,
    },
    {
      name: "Online Education & Digital Test Series",
      description: "Live interactive online classes, recorded video library, comprehensive digital study material, and online test series with instant performance analytics.",
      fee: "Student-Friendly Subscription",
      batchTimings: "Live & On-Demand 24x7",
      duration: "Annual / Term Subscription",
      isActive: true,
      displayOrder: 12,
    },
  ];

  for (const c of coursesList) {
    await db.insert(schema.courses).values(c);
  }
  console.log(`✅ Successfully inserted ${coursesList.length} courses!`);

  // 2. Update site settings
  const settings = [
    { key: "school_name", value: "Gyandeep Institute" },
    {
      key: "school_tagline",
      value: "Classes 1st to 12th (All Streams) | NEET | IIT-JEE | Sainik & Navodaya | Online Education",
    },
    {
      key: "about_school_text",
      value:
        "Gyandeep Institute — Morar, Gwalior mein sthit ek premier educational coaching institute hai. Yahan Classes 1st to 10th (All Subjects - CBSE & MP Board), Classes 11th & 12th (Arts, Bio, Math, Commerce, Agriculture), Competitive Exams (NEET, IIT-JEE, Sainik School, Navodaya, Excellence School), Foundation Courses aur Online Education ke liye expert faculty dwara margdarshan diya jaata hai.",
    },
    {
      key: "vision_text",
      value:
        "Hamari vision hai ki har student ko quality education, conceptual clarity aur unke career goals ko achieve karne ke liye best learning environment mile.",
    },
    {
      key: "mission_text",
      value:
        "Hamara mission hai ki education ko accessible, practical aur result-oriented banayein — jisse school board exams se lekar NEET, JEE aur entrance exams mein students top ranks hasil karein.",
    },
  ];

  for (const s of settings) {
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
  }
  console.log("✅ Updated Site Settings.");

  // 3. Update announcements
  await db.delete(schema.announcements);
  await db.insert(schema.announcements).values([
    {
      text: "🎉 New Batches Started: Classes 1st to 12th (CBSE & MP Board) | Call: +917828499519",
      isActive: true,
      displayOrder: 1,
    },
    {
      text: "🎯 Target Batches for NEET & IIT-JEE (Main & Advanced) — Admissions Open!",
      isActive: true,
      displayOrder: 2,
    },
    {
      text: "🏫 Sainik School & Navodaya Entrance Exam Special Preparation Batches Available!",
      isActive: true,
      displayOrder: 3,
    },
    {
      text: "💻 Live Online Classes & Digital Test Series Available — WhatsApp: 917828499519",
      isActive: true,
      displayOrder: 4,
    },
  ]);
  console.log("✅ Updated Announcements.");

  console.log("\n🎉 All courses and settings seeded successfully!");
  process.exit(0);
}

seedCoursesAndSettings().catch((err) => {
  console.error("❌ Seeding error:", err);
  process.exit(1);
});
