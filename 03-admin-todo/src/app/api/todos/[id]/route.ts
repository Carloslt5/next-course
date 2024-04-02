import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

type Segments = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) {
    return NextResponse.json({ messagge: `Todo by ID ${id} not found` }, { status: 400 });
  }
  return NextResponse.json({ data: todo });
}

const putTodoSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  try {
    const { id } = params;
    const todo = await prisma.todo.findFirst({ where: { id } });
    if (!todo) {
      return NextResponse.json({ messagge: `Todo by ID ${id} not found` }, { status: 400 });
    }

    const { description, complete } = await putTodoSchema.validate(await request.json());
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { description, complete },
    });
    return NextResponse.json({ data: updatedTodo });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
