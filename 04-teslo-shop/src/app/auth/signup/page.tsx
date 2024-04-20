import { RegisterForm } from "@/components/auth/RegisterForm";
import { titleFont } from "@/config/fonts";

export default function Signup() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-4 px-4">
      <h1 className={`${titleFont.className} text-4xl`}>Sign up</h1>

      <RegisterForm />
    </div>
  );
}
