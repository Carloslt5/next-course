import { LoginForm } from "@/components/auth/LoginForm";
import { titleFont } from "@/config/fonts";

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-4 px-4">
      <h1 className={`${titleFont.className} text-4xl`}>Log in</h1>

      <LoginForm />
    </div>
  );
}
