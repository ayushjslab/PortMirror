import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { connectDB } from "@/lib/connectDb";
import { Tunnel } from "@/models/tunnel";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { subdomain, localPort } = await req.json();

        if (!subdomain || !localPort) {
            return NextResponse.json(
                { error: "Subdomain and local port are required" },
                { status: 400 }
            );
        }

        await connectDB();

        // Check if subdomain is already taken
        const existingTunnel = await Tunnel.findOne({ subdomain });
        if (existingTunnel) {
            return NextResponse.json(
                { error: "Subdomain already in use" },
                { status: 400 }
            );
        }

        // Auto-generate a secure token
        const token = `pm_${nanoid(32)}`;

        const newTunnel = await Tunnel.create({
            userId: session.user.id,
            token,
            subdomain,
            localPort: parseInt(localPort),
            status: "inactive",
        });

        return NextResponse.json(newTunnel, { status: 201 });
    } catch (error: any) {
        console.error("Error creating tunnel:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const tunnels = await Tunnel.find({ userId: session.user.id }).sort({
            createdAt: -1,
        });

        return NextResponse.json(tunnels);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
