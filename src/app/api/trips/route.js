import { NextResponse } from "next/server";
import { createTrip } from "@/app/controllers/trips/createTrip";
import { getAllTrips } from "@/app/controllers/trips/getAllTrips";

export async function GET(req) {
  const results = await getAllTrips();
  return NextResponse.json(results);
}

export async function POST(req) {
  const body = await req.json();
  const results = await createTrip(body);

  return NextResponse.json(results, { status: 201 });
}
