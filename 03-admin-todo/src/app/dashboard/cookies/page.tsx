import { TabBar } from "@/components/TabBar";
import { cookies } from "next/headers";

export const metadata = {
  title: "Cookies Page",
  description: "Cokkies exercise",
};

export default function CookiesPage() {
  const cookieStore = cookies();
  const cookieTab = cookieStore.get("selected-tab")?.value ?? "1";

  return (
    <div>
      <h1 className="text-2xl mb-2">Tabs</h1>
      <TabBar currentTab={+cookieTab} />
    </div>
  );
}
