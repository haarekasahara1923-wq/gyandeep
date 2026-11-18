"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import LeadForm from "@/components/LeadForm";

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

export default function Home() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const years    = useCountUp(10);
  const students = useCountUp(2500);
  const batches  = useCountUp(50);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={`${styles.heroBadge} animate-fade-in`}>
            🏆 &nbsp; Gwalior ka Premier Educational Institute — Morar, Gwalior
          </div>
          <h1 className={`${styles.heroTitle} animate-fade-in-2`}>
            <span className={styles.heroTitleHighlight}>Padhein, Seekhein Aur</span>
            <span className={styles.heroTitleBy}>Safal Banein with</span>{" "}
            <span className={styles.heroTitleAccent}>Gyandeep Institute</span>
          </h1>
          <p className={`${styles.heroSubtitle} animate-fade-in-3`}>
            Classes 1st to 12th (All Streams) • NEET • IIT-JEE • Sainik & Navodaya • Foundation Courses • Online Education. Morning 7:00 AM se Evening 7:00 PM tak batches uplabdh!
          </p>
          <div className={`${styles.ctaGroup} animate-fade-in-3`}>
            <button className="btn-primary" onClick={() => setIsLeadFormOpen(true)}>
              ✨ Free Demo Class Book Karein
            </button>
            <Link href="/courses" className="btn-secondary">
              Hamare Sabhi Courses Dekhein →
            </Link>
          </div>
        </div>
        <div className={styles.heroScrollIndicator}>
          <div className={styles.scrollDot} />
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className={styles.statsBar}>
        <div className={styles.statItem} ref={years.ref}>
          <div className={styles.statNumber}>{years.count}+</div>
          <div className={styles.statLabel}>Years of Excellence</div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem} ref={students.ref}>
          <div className={styles.statNumber}>{students.count}+</div>
          <div className={styles.statLabel}>Students Guided</div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem} ref={batches.ref}>
          <div className={styles.statNumber}>{batches.count}+</div>
          <div className={styles.statLabel}>Batches Completed</div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <div className={styles.statNumber}>100%</div>
          <div className={styles.statLabel}>Dedication & Support</div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className={styles.aboutSection}>
        <div className={`${styles.aboutText} animate-slide-left`}>
          <span className="section-label">Hamare Baare Mein</span>
          <h2 className={`section-title-display ${styles.aboutHeading}`}>
            Sarvashreshtha Shiksha, <span className="gradient-text">Ujjwal Bhavishya</span>
          </h2>
          <p className={styles.aboutPara}>
            Gyandeep Institute — Baijal Kothi, Near Girls College, Morar (Gwalior) mein sthit ek vishwasniya shaikshik sansthan hai. Yahan Classes 1st se 10th (CBSE & MP Board - All Subjects) evam Classes 11th & 12th ke sabhi streams (Arts, Biology, Mathematics, Commerce aur Agriculture) ki vyavasthit padhai karai jaati hai.
          </p>
          <p className={styles.aboutPara}>
            Saath hi NEET, IIT-JEE (Main & Advanced), Sainik School, Navodaya evam Excellence School entrance exams ke liye anubhavi teachers dwara margdarshan diya jaata hai. Hamara uddeshya har vidyarthi ki conceptual understanding ko mazboot banana aur unhe aatmanirbhar banana hai.
          </p>
          <div className={styles.aboutActions}>
            <Link href="/about" className="btn-outline">Sansthan ke Baare Mein Aur Jaanein →</Link>
          </div>
        </div>
        <div className={`${styles.aboutImageWrap} animate-slide-right`}>
          <img
            src="/images/school_activities.jpg"
            alt="Students studying in classroom at Gyandeep Institute"
            className={styles.aboutImg}
          />
          <div className={styles.aboutImageBadge}>
            <span className={styles.badgeIcon}>🎓</span>
            <div>
              <div className={styles.badgeNum}>10+</div>
              <div className={styles.badgeText}>Years of Trust</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES / COURSES OFFERED ===== */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresSectionHeader}>
          <span className="section-label">Hamare Pramukh Courses</span>
          <h2 className="section-title-display">
            Aapki Safalta ke Liye <span className="gradient-text">Special Offerings</span>
          </h2>
          <p className="section-subtitle">
            School foundation se lekar competitive entrance exams tak — har stage par behtareen tayyari.
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {[
            {
              image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
              title: "Classes 1st to 10th (All Subjects)",
              desc: "CBSE aur MP Board ke sabhi subjects — Mathematics, Science, Social Science, Hindi & English ki step-by-step padhai aur daily tests.",
            },
            {
              image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop",
              title: "Classes 11th & 12th (All Streams)",
              desc: "Mathematics (PCM), Biology (PCB), Commerce, Arts (Humanities) evam Agriculture stream ke liye visheshagya faculty dwara board tayyari.",
            },
            {
              image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
              title: "NEET & IIT-JEE (Main & Adv.)",
              desc: "Medical aur Engineering entrance exams ke liye intensive problem solving, previous year questions practice aur regular test series.",
            },
            {
              image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
              title: "Sainik School & Navodaya Prep",
              desc: "Sainik School, Jawahar Navodaya Vidyalaya aur Excellence School entrance exams ke liye targeted coaching aur mock test batches.",
            },
            {
              image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop",
              title: "Foundation & Personality Dev.",
              desc: "Hindi & English Foundation, Reading & Writing skills, Grammar mastery, Public Speaking aur overall Personality Development.",
            },
            {
              image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=600&auto=format&fit=crop",
              title: "Online Education & Test Series",
              desc: "Live online classes, recorded lecture library, digital study material aur online test series se kabhi bhi aur kahin se bhi padhein.",
            },
          ].map((f) => (
            <div key={f.title} className={`${styles.featureCard} card-hover`}>
              <img src={f.image} alt={f.title} className={styles.featureImage} />
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TIMING & ADMISSION BANNER ===== */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerContent}>
          <span className="section-label" style={{ color: "#D4AF37", borderColor: "rgba(212,175,55,0.4)" }}>
            ⏰ Batch Timing: Morning 7:00 AM to Evening 7:00 PM
          </span>
          <h2 className={styles.ctaBannerTitle}>Naye Batches Mein Pravesh Prarambh!</h2>
          <p className={styles.ctaBannerSub}>
            Apne bachhe ke shaikshik vikas ke liye aaj hi Gyandeep Institute me demo class book karein. Limited seats available!
          </p>
          <button className={styles.ctaBannerBtn} onClick={() => setIsLeadFormOpen(true)}>
            ✨ Free Demo Class Book Karein →
          </button>
        </div>
      </section>

      <LeadForm isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} />
    </>
  );
}
