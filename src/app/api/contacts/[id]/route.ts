import Contact from "@/models/contact";
import { connectToDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function GET() {
  return new Response("Bad Request!", { status: 405 });
}

export async function DELETE(
  req: NextRequest,
  segmentData: { params: Params }
) {
  try {
    await connectToDB();
    await Contact.deleteOne({
      _id: new ObjectId((await segmentData.params).id),
    });
    return NextResponse.json({ message: "Contact deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete failed:", error);
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, segmentData: { params: Params }) {
  try {
    const { contName, contNumber, tag } = await req.json();
    await connectToDB();
    await Contact.updateOne(
      { _id: new ObjectId((await segmentData.params).id) },
      { $set: { contName, contNumber, tag } }
    );
    return NextResponse.json("Contact Updated", { status: 200 });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}
