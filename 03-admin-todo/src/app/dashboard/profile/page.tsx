"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(" profile data client");
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <span>{session?.user?.name ?? "No name"}</span>
        <span>{session?.user?.image ?? "No image"}</span>
        <span>{session?.user?.email ?? "No email"}</span>
      </div>
    </div>
  );
}
