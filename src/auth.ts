import { NextAuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/connectDb";
import { User } from "@/models/user";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            plan: "free" | "pro";
        } & DefaultSession["user"];
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    await connectDB();
                    const existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        await User.create({
                            email: user.email,
                            name: user.name,
                            profilePic: user.image,
                            plan: "free",
                        });
                    } else {
                        // Optionally update profile pic or name
                        existingUser.name = user.name || existingUser.name;
                        existingUser.profilePic = user.image || existingUser.profilePic;
                        await existingUser.save();
                    }
                    return true;
                } catch (error) {
                    console.error("Error saving user to DB:", error);
                    return false;
                }
            }
            return true;
        },
        async session({ session }) {
            if (session.user) {
                await connectDB();
                const dbUser = await User.findOne({ email: session.user.email });
                if (dbUser) {
                    session.user.id = dbUser._id.toString();
                    session.user.plan = dbUser.plan;
                }
            }
            return session;
        },
    },
};
