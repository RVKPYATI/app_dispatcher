import { NextResponse } from "next/server";
import { getTripsByDayTime } from "@/app/controllers/trips/getAllTrips";

export async function GET(req) {
  const currentDay = new Date();
  const tomorow = new Date(currentDay.getTime() + 24 * 60 * 60 * 1000);
  const url = req.nextUrl;
  const date = url.searchParams.get("date");

  if (date === "today") {
    const results = await getTripsByDayTime(currentDay);
    return NextResponse.json(results);
  }

  if (date === "tomorrow") {
    const results = await getTripsByDayTime(tomorow);
    return NextResponse.json(results);
  }

  const results = await getTripsByDayTime(currentDay);
  return NextResponse.json(results);
}
