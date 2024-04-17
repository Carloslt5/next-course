import { Footer } from "@/components/ui/Footer";
import { Sidebar } from "@/components/ui/Sidebar";
import { TopMenu } from "@/components/ui/TopMenu";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col">
      <TopMenu />
      <Sidebar />
      <main className="px-1 md:px-10">{children}</main>
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
