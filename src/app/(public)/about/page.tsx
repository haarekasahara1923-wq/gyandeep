import styles from "./about.module.css";
import { db } from "@/db";
import { aboutContent, siteSettings } from "@/db/schema";

export const revalidate = 0;

export default async function AboutPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let items: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let settings: any[] = [];

  try {
    [items, settings] = await Promise.all([
      db.select().from(aboutContent),
      db.select().from(siteSettings),
    ]);
  } catch {
    // DB error — fallback to empty, show defaults
  }

  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    if (s.value) settingsMap[s.key] = s.value;
  });

  const director = items.find((i) => i.role === "director");
  const principal = items.find((i) => i.role === "principal");

  const aboutText =
    settingsMap["about_school_text"] ||
    "Gyandeep Institute — Morar, Gwalior mein sthit ek premier educational coaching institute. Yahan Classes 1st se 10th (All Subjects - CBSE & MP Board), Classes 11th & 12th (Arts, Bio, Math, Commerce, Agriculture), Competitive Exams (NEET, IIT-JEE, Sainik School, Navodaya, Excellence School), Foundation Courses aur Online Education ke liye expert guidance milti hai.";
  const visionText =
    settingsMap["vision_text"] ||
    "Hamari vision hai ki har vidyarthi ko quality education, conceptual clarity aur unke academic evam career goals ko achieve karne ke liye best learning environment mile.";
  const missionText =
    settingsMap["mission_text"] ||
    "Hamara mission hai ki education ko accessible, practical aur result-oriented banayein — jisse school board exams se lekar NEET, JEE aur entrance exams mein students top ranks hasil karein.";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>About Gyandeep Institute</h1>
        <p
          className={styles.subtitle}
          style={{ whiteSpace: "pre-wrap", maxWidth: "800px", margin: "0 auto" }}
        >
          {aboutText}
        </p>
      </div>

      <section className={styles.contentSection}>
        {/* Director / Head Teacher */}
        <div className={styles.messageCard}>
          <div className={styles.imagePlaceholder}>
            {director?.photoUrl ? (
              <img
                src={director.photoUrl}
                alt={director.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
              />
            ) : (
              <span>Director Photo</span>
            )}
          </div>
          <div className={styles.textContent}>
            <h2 className={styles.roleTitle}>Founder &amp; Head Teacher</h2>
            <h3 className={styles.name}>{director?.name || "Director, Gyandeep Institute"}</h3>
            {director?.designation && (
              <p style={{ color: "#777", marginBottom: "10px", fontStyle: "italic" }}>
                {director.designation}
              </p>
            )}
            <p className={styles.message}>
              {director?.message ||
                "Gyandeep Institute mein hamara goal hai ki aap sirf padhai nahi, balki real-world mein confidently apply karein. Sahi guidance aur practice se koi bhi apna sapna poora kar sakta hai."}
            </p>
          </div>
        </div>

        {/* Co-Teacher / Second card — only show if data exists */}
        {principal && (
          <div className={`${styles.messageCard} ${styles.reverseCard}`}>
            <div className={styles.imagePlaceholder}>
              {principal.photoUrl ? (
                <img
                  src={principal.photoUrl}
                  alt={principal.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                />
              ) : (
                <span>Teacher Photo</span>
              )}
            </div>
            <div className={styles.textContent}>
              <h2 className={styles.roleTitle}>Senior Faculty</h2>
              <h3 className={styles.name}>{principal.name || "—"}</h3>
              {principal.designation && (
                <p style={{ color: "#777", marginBottom: "10px", fontStyle: "italic" }}>
                  {principal.designation}
                </p>
              )}
              <p className={styles.message}>
                {principal.message || "Message coming soon..."}
              </p>
            </div>
          </div>
        )}
      </section>

      <section className={styles.missionVision}>
        <div className={styles.mvCard}>
          <h3>Hamari Vision</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{visionText}</p>
        </div>
        <div className={styles.mvCard}>
          <h3>Hamara Mission</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{missionText}</p>
        </div>
      </section>
    </div>
  );
}
