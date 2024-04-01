import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? 10);
  const skip = Number(searchParams.get("skip") ?? 0);

  if (isNaN(take)) {
    return NextResponse.json({ messagge: "Take required a number" }, { status: 400 });
  }
  if (isNaN(take)) {
    return NextResponse.json({ messagge: "Skip required a number" }, { status: 400 });
  }

  const todos = await prisma.todo.findMany({
    take: take,
    skip: skip,
  });

  return NextResponse.json({ data: todos });
}
