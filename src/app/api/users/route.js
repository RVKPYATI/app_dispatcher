import { NextResponse } from "next/server";
import { createUser } from "@/app/controllers/user/createUser";
import { getAllUsers } from "@/app/controllers/user/getAllUsers";
import { getUser } from '@/app/controllers/user/getUserAuth';

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams
  const phone = searchParams.get('phone')
  const password = searchParams.get('pass')

  if (phone && password) {
    const user = await getUser(phone);

    if (!user)
      return NextResponse.json({ status: 400, message: "Пользователь не найден" });
    if (user.password !== password)
      return NextResponse.json({ status: 400, message: "Неверный пароль" });
    if (user.password === password)
      return NextResponse.json({ status: 200, user} )

    return NextResponse.json({ status: 500 }, user)
  }

    const results = await getAllUsers();
    return NextResponse.json(results);



}

export async function POST(req, res) {
  const body = await req.json();
  const response = await createUser(body);
  return NextResponse.json({ response }, { status: 201 });
}
