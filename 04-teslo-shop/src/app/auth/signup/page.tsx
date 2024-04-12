import { titleFont } from "@/config/fonts";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-4 px-4">
      <h1 className={`${titleFont.className} text-4xl`}>Sign up</h1>

      <div className="flex flex-col w-full">
        <label htmlFor="name">Full Name</label>
        <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="text" />

        <label htmlFor="email">Email</label>
        <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="email" />

        <label htmlFor="password">Password</label>
        <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="password" />

        <button className="btn-primary">Sign up</button>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">Or</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/login" className="btn-secondary text-center">
          Log in
        </Link>
      </div>
    </div>
  );
}
