import { auth } from "@/auth";
import { Footer } from "@/components/ui/Footer";
import { Sidebar } from "@/components/ui/Sidebar";
import { TopMenu } from "@/components/ui/TopMenu";

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <main className="min-h-screen flex flex-col">
      <TopMenu />
      <Sidebar session={session} />
      <main className="px-1 md:px-10">{children}</main>
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
