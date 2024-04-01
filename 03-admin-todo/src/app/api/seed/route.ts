import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      { description: "Learn NextJS" },
      { description: "Learn Zustand" },
      { description: "Read a chapter of a book" },
      { description: "Clean the kitchen", complete: true },
      { description: "Schedule dentist" },
    ],
  });

  return NextResponse.json({ message: "Seed execued" });
}
