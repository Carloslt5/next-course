"use client";
import { authenticate } from "@/actions/auth/login";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state === "Success") {
      router.replace("/");
    }
  }, [state, router]);

  return (
    <form action={dispatch} className="flex flex-col w-full">
      <label htmlFor="email">Email</label>
      <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="email" name="email" />

      <label htmlFor="password">Password</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <div className="flex h-8 items-center my-2" aria-live="polite" aria-atomic="true">
        {state && state !== "Success" && (
          <>
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{state}</p>
          </>
        )}
      </div>

      <LoginButton />

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">Or</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/signup" className="btn-secondary text-center">
        Create account
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disable": pending,
      })}
      disabled={pending}
    >
      Login
    </button>
  );
}
