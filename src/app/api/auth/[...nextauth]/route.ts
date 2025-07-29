import { connectToDB } from "@/utils/database";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";

type CustomProfile = {
  name: string;
  email: string;
  picture: string;
};

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: { params: { prompt: "select_account" } },
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });
      session.user.id = sessionUser!._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        // check if user already exists
        const userExists = await User.findOne({
          email: profile?.email,
        });
        // if not, create a new one
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: (profile as CustomProfile).picture,
          });
        }
        return true;
      } catch (error) {
        console.log("Error checking user: ", error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
