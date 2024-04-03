import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

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

const postTodoSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const { description, complete } = await postTodoSchema.validate(await request.json());
    const createTodo = await prisma.todo.create({ data: { description, complete } });
    return NextResponse.json({ data: createTodo });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } });
    return NextResponse.json({ data: "Todos Deleted" });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
