import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Contact from "@/models/contact";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Unauthorized access!", { status: 401 });
  }

  try {
    await connectToDB();
    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .populate("userId");
    if (!contacts) {
      return new NextResponse("Contacts not found", { status: 404 });
    }
    return new NextResponse(JSON.stringify(contacts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database error", { status: 500 });
  }
};
