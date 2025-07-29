import Contact from "@/models/contact";
import { connectToDB } from "@/utils/database";

export const GET = () => {
  return new Response("Invalid http method!", { status: 405 });
};

export const POST = async (req: Request) => {
  const { contName, contNumber, tag, userId } = await req.json();
  try {
    await connectToDB();
    const newContact = new Contact({
      contName,
      contNumber,
      tag,
      userId,
    });
    await newContact.save();
    return new Response(JSON.stringify(newContact), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create new contact", { status: 500 });
  }
};
