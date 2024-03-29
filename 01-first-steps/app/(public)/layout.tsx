import { Navigation } from "@/components/Navigation";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
}
