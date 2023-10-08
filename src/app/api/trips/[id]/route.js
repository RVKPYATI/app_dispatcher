import { NextResponse } from "next/server";
import { updateTrip } from "@/app/controllers/trips/updateTrip";
import { deleteTrip } from "@/app/controllers/trips/deleteTrip";
import { getTripById } from "@/app/controllers/trips/getTripById";

export async function GET(req, res) {
  const id = res.params.id;
  const results = await getTripById(id);
  return NextResponse.json(results);
}

export async function DELETE(req, res) {
  const id = res.params.id;
  deleteTrip(id);

  return NextResponse.json({ "Удалена поездка с id ": id });
}

export async function PUT(req, res) {
  const id = res.params.id;
  const body = await req.json();
  updateTrip(body, id);

  return NextResponse.json({ "Обновление успешно": id }, { status: 201 });
}
