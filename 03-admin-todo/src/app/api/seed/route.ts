import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: "test@email.com",
      password: bcrypt.hashSync("1234", 10),
      roles: ["admin"],
      todos: {
        create: [
          { description: "Learn NextJS" },
          { description: "Learn Zustand" },
          { description: "Read a chapter of a book" },
          { description: "Clean the kitchen", complete: true },
          { description: "Schedule dentist" },
        ],
      },
    },
  });

  return NextResponse.json({ message: "Seed execued" });
}
