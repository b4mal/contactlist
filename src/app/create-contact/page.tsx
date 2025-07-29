"use client";

import ContactForm from "@/components/ContactForm";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ContactPost {
  contName: string;
  contNumber: string;
  tag: string;
}

const CreateContact: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<ContactPost>({
    contName: "",
    contNumber: "",
    tag: "",
  });

  if (status === "unauthenticated") {
    signIn();
    // router.replace("/");
    return null;
  }

  const contactCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const phoneRegex =
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    if (!phoneRegex.test(post.contNumber)) {
      alert("Please enter a valid phone number");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contacts/new", {
        method: "POST",
        body: JSON.stringify({
          contName: post.contName,
          contNumber: post.contNumber,
          tag: post.tag,
          userId: session?.user?.id,
        }),
      });
      if (response.ok) {
        setTimeout(() => {
          router.push("/all-contacts");
        }, 0);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setPost({
        contName: "",
        contNumber: "",
        tag: "",
      });
    }
    console.log("contactCreate function");
  };

  return (
    <section className="w-full max-w-full flex flex-col items-center">
      <h1 className="head_text">Create A New Contact</h1>
      <p className="desc text-center max-w-2xl">
        Create your connections, and let each new contact be a bridge to
        opportunity - because{" "}
        <span className="font-semibold">
          &lsquo;Your network is your net worth.&rsquo;
        </span>
      </p>
      <ContactForm
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={contactCreate}
      />
    </section>
  );
};

export default CreateContact;
