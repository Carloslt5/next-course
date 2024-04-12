import { Footer } from "@/components/ui/Footer";
import { Sidebar } from "@/components/ui/Sidebar";
import { TopMenu } from "@/components/ui/TopMenu";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="px-1 md:px-10">{children}</div>
      <Footer />
    </main>
  );
}
