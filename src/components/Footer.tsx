"use client";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { data: session } = useSession();
  return (
    <footer className="mx-auto p-4 sm:px-6 lg:px-8">
      <p className="text-center leading-5 text-gray-500">
        &copy; {new Date().getFullYear()} All rights reserved. Specially curated
        for{" "}
        <span className="font-semibold text-sm">
          {session?.user.name ? session.user.name : "you"}
        </span>
        .
      </p>
    </footer>
  );
};

export default Footer;
