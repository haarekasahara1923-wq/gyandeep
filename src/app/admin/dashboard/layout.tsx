import AdminSidebar from "@/components/AdminSidebar";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";

export const revalidate = 0;

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settingsMap: Record<string, string> = {};
  try {
    const rows = await db.select().from(siteSettings);
    rows.forEach((s) => {
      if (s.key && s.value) settingsMap[s.key] = s.value;
    });
  } catch {
    // fallback if DB fails
  }

  const logoUrl = settingsMap["school_logo_url"] || "";
  const schoolName = settingsMap["school_name"] || "Gyandeep Institute";

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar logoUrl={logoUrl} schoolName={schoolName} />
      <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
