"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./AdminSidebar.module.css";

interface AdminSidebarProps {
  logoUrl?: string;
  schoolName?: string;
}

export default function AdminSidebar({
  logoUrl: initialLogoUrl,
  schoolName = "Gyandeep Institute",
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>(initialLogoUrl || "");

  // Update logoUrl if prop changes or fetch if initially empty
  useEffect(() => {
    if (initialLogoUrl) {
      setLogoUrl(initialLogoUrl);
    } else {
      fetch("/api/settings")
        .then((r) => r.json())
        .then((data) => {
          if (data.success && data.settings) {
            const found = data.settings.find(
              (s: { key: string; value: string }) => s.key === "school_logo_url"
            );
            if (found?.value) {
              setLogoUrl(found.value);
            }
          }
        })
        .catch(() => {});
    }
  }, [initialLogoUrl]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const closeMenu = () => setMobileOpen(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Courses", path: "/admin/dashboard/courses", icon: "📚" },
    { name: "Gallery", path: "/admin/dashboard/gallery", icon: "🖼️" },
    { name: "Announcements", path: "/admin/dashboard/announcements", icon: "📢" },
    { name: "About Us", path: "/admin/dashboard/about", icon: "👥" },
    { name: "Contact Info", path: "/admin/dashboard/contact", icon: "📞" },
    { name: "Settings", path: "/admin/dashboard/settings", icon: "⚙️" },
  ];

  return (
    <>
      <button 
        className={styles.hamburger} 
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      <div 
        className={`${styles.overlay} ${mobileOpen ? styles.open : ''}`} 
        onClick={closeMenu}
      />

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              margin: "0 auto",
              overflow: "hidden",
              border: "2px solid rgba(201, 162, 39, 0.5)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img 
              src={logoUrl || "/images/logo.jpg"} 
              alt={`${schoolName} Logo`} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <h2>Admin Panel</h2>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              onClick={closeMenu}
              className={`${styles.link} ${pathname === item.path ? styles.active : ''}`}
            >
              <span>{item.icon}</span> {item.name}
            </Link>
          ))}
        </nav>

        <a
          href="https://coachpro.wapiflow.site"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.manageSchoolBtn}
        >
          🏫 Manage Institute
        </a>

        <button onClick={handleLogout} className={styles.logoutBtn}>
          🚪 Logout
        </button>
      </aside>
    </>
  );
}
