import ContactList from "@/components/ContactList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const AllContacts: React.FC = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <section className="w-full max-w-full flex flex-col items-center">
      <h1 className="head_text">All Your Contacts</h1>
      <ContactList />
    </section>
  );
};

export default AllContacts;
