import TempEmailModel from "@/models/temp-email";
import { NextResponse } from "next/server";

export async function POST(request) {
	const body = await request.json();

	console.log(body);
	await TempEmailModel.create(body);

	return NextResponse.json({ status: true });
}
