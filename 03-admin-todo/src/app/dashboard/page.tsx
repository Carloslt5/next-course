import { WidgetItem } from "@/components/WidgetItem";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashBoardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid grid-cols-1  gap-2">
      <WidgetItem title="User connect server side">
        <div className="flex flex-col">
          <span>{session.user?.name}</span>
          <span>{session.user?.image}</span>
          <span>{session.user?.email}</span>
        </div>
        <div className="flex flex-col">{JSON.stringify(session)}</div>
      </WidgetItem>
    </div>
  );
}
