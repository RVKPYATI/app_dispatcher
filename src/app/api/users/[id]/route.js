import { NextResponse } from "next/server";

import { deleteUser } from "@/app/controllers/user/deleteUser";
import { updateUser } from "@/app/controllers/user/updateUser";
import { getUserById } from "@/app/controllers/user/getUserById";

export async function GET(req, res) {
  const id = res.params.id;
  const results = await getUserById(id);

  return NextResponse.json(results);
}

export async function DELETE(req, res) {
  const id = res.params.id;
  deleteUser(id);

  return NextResponse.json({ "Удален водитель с id ": id });
}

export async function PUT(req, res) {
  const id = res.params.id;
  const body = await req.json();
  updateUser(body, id);

  return NextResponse.json({ "Обновление успешно": id }, { status: 201 });
}
