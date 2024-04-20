"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const { name, email, password } = data;
    console.log("🚀 --------- name", { name, email, password });
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Full Name</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="text"
        {...register("name")}
        autoFocus
        required
      />

      <label htmlFor="email">Email</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        {...register("email")}
        autoFocus
        required
      />

      <label htmlFor="password">Password</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        {...register("password")}
        autoFocus
        required
      />

      <button type="submit" className="btn-primary">
        Sign up
      </button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">Or</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Log in
      </Link>
    </form>
  );
};
