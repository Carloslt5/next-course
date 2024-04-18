import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  console.log("🚀 --------- session", session);

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="flex justify-center min-h-screen">
      <div className="w-full sm:w-[600px]">{children}</div>
    </main>
  );
}
