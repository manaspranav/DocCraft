import FloatingNavbar from "@/components/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <FloatingNavbar />
      <main>{children}</main>
    </div>
  );
}
