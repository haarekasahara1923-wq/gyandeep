"use client";
import { useState, useEffect, useMemo } from "react";
import styles from "./page.module.css";
import LeadForm from "@/components/LeadForm";

interface Course {
  id: number;
  name: string;
  description: string | null;
  fee: string | null;
  batchTimings: string | null;
  duration: string | null;
  isActive: boolean;
  displayOrder: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setCourses(data.courses);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Helper to determine category & icon for each course
  const getCourseMeta = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("1st to 10th") || lower.includes("1st")) {
      return { category: "School (1st-10th)", icon: "🎒", badge: "CBSE & MP Board" };
    }
    if (lower.includes("11th") || lower.includes("12th")) {
      if (lower.includes("math")) return { category: "11th & 12th", icon: "📐", badge: "Science (PCM)" };
      if (lower.includes("bio")) return { category: "11th & 12th", icon: "🧬", badge: "Medical (PCB)" };
      if (lower.includes("commerce")) return { category: "11th & 12th", icon: "📊", badge: "Commerce" };
      if (lower.includes("arts")) return { category: "11th & 12th", icon: "🎨", badge: "Humanities" };
      if (lower.includes("agriculture")) return { category: "11th & 12th", icon: "🌾", badge: "Agriculture" };
      return { category: "11th & 12th", icon: "📚", badge: "Senior Secondary" };
    }
    if (lower.includes("neet") || lower.includes("jee") || lower.includes("iit")) {
      return { category: "Competitive Exams", icon: "🎯", badge: "Target Batch" };
    }
    if (lower.includes("sainik") || lower.includes("navodaya") || lower.includes("excellence")) {
      return { category: "Entrance Exams", icon: "🎖️", badge: "Entrance Prep" };
    }
    if (lower.includes("online") || lower.includes("digital")) {
      return { category: "Online Education", icon: "💻", badge: "Digital / Live" };
    }
    if (lower.includes("foundation") || lower.includes("personality")) {
      return { category: "Foundation & Skills", icon: "🌟", badge: "Skill Builder" };
    }
    return { category: "Other", icon: "📖", badge: "Gyandeep Special" };
  };

  const categories = ["All", "School (1st-10th)", "11th & 12th", "Competitive Exams", "Entrance Exams", "Online Education"];

  const filteredCourses = useMemo(() => {
    if (activeCategory === "All") return courses;
    return courses.filter((c) => {
      const meta = getCourseMeta(c.name);
      return meta.category === activeCategory;
    });
  }, [courses, activeCategory]);

  return (
    <>
      {/* ===== HERO BANNER ===== */}
      <section className={styles.heroBanner}>
        <div className={styles.heroBannerContent}>
          <span className="section-label">Gyandeep Institute Academic Offerings</span>
          <h1 className={`${styles.heroBannerTitle} animate-fade-in`}>
            Apna Shaikshik Bhavishya <span>Ujjwal Banayein</span>
          </h1>
          <p className={`${styles.heroBannerSub} animate-fade-in-2`}>
            Classes 1st to 12th (All Streams) • NEET & IIT-JEE • Sainik & Navodaya School • Foundation Courses • Online Education.
          </p>
          <div className={styles.timingPill}>
            ⏰ Batch Timings: <strong>Morning 7:00 AM to Evening 7:00 PM</strong>
          </div>
        </div>
      </section>

      {/* ===== COURSES SECTION ===== */}
      <section className={styles.coursesSection}>
        <div className={styles.sectionHeader}>
          <span className="section-label">Chuniye Apna Course</span>
          <h2>
            Hamare <span className="gradient-text">Pramukh Courses</span>
          </h2>
          <p>
            Har program anubhavi faculty, conceptual clarity, weekly test series aur vyaktigat margdarshan ke saath sanchalit hota hai.
          </p>
        </div>

        {/* Category Filters */}
        <div className={styles.filterBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat} {cat === "All" ? `(${courses.length})` : ""}
            </button>
          ))}
        </div>

        {loading ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>⏳</span>
            <h3>Courses Load Ho Rahe Hain...</h3>
            <p>Kripya pratiksha karein.</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📚</span>
            <h3>No Courses Found in this Category</h3>
            <p>Please check other categories or contact our helpline.</p>
          </div>
        ) : (
          <div className={styles.coursesGrid}>
            {filteredCourses.map((course) => {
              const meta = getCourseMeta(course.name);
              return (
                <div key={course.id} className={`${styles.courseCard} animate-fade-in`}>
                  {/* Decorative glowing top accent */}
                  <div className={styles.cardHeaderStrip}>
                    <span className={styles.cardBadge}>{meta.badge}</span>
                    <span className={styles.admissionsOpen}>Admissions Open</span>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.iconTitleRow}>
                      <div className={styles.iconWrap}>
                        <span className={styles.courseIcon}>{meta.icon}</span>
                      </div>
                      <h3 className={styles.courseName}>{course.name}</h3>
                    </div>

                    {course.description && (
                      <p className={styles.courseDescription}>{course.description}</p>
                    )}

                    {/* Quick Badges Row */}
                    <div className={styles.badgesRow}>
                      {course.duration && (
                        <span className={styles.durationBadge}>
                          ⏱️ {course.duration}
                        </span>
                      )}
                      {course.fee && (
                        <span className={styles.feeBadge}>
                          💰 {course.fee}
                        </span>
                      )}
                    </div>

                    {/* Batch Timings */}
                    {course.batchTimings && (
                      <div className={styles.batchTimings}>
                        <span className={styles.batchIcon}>⏰</span>
                        <div className={styles.batchText}>
                          <span className={styles.batchLabel}>Timing:</span>
                          <span className={styles.batchValue}>{course.batchTimings}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={styles.cardFooter}>
                    <button className={styles.enquireBtn} onClick={() => setIsLeadFormOpen(true)}>
                      <span className={styles.btnIcon}>📱</span> Enquire / Free Demo
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <span className={styles.ctaTag}>Admission Helpline</span>
          <h2>Admission Ya Demo Class Ke Liye Sampark Karein</h2>
          <p>
            Gyandeep Institute — Baijal Kothi, Near Girls College, Morar Gwalior. Hamare anubhavi teachers se seedhi baat karein.
          </p>
          <div className={styles.ctaBtnRow}>
            <button className={styles.ctaBtn} onClick={() => setIsLeadFormOpen(true)}>
              ✨ Book Free Demo Class
            </button>
            <a href="tel:7828499519" className={styles.ctaCallBtn}>
              📞 Call: 7828499519
            </a>
          </div>
        </div>
      </section>

      <LeadForm isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} />
    </>
  );
}
