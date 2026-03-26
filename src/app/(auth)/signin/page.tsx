"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const SignInPage = () => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden font-sans">

            {/* 🔥 Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[140px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/20 blur-[140px] rounded-full" />
            </div>

            {/* 🔥 Card */}
            <div className="relative w-full max-w-md">
                <div className="bg-card/60 backdrop-blur-2xl border border-border/50 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] space-y-8">

                    {/* 🔥 Header */}
                    <div className="text-center space-y-4">
                        <div className="mx-auto w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                            <span className="text-xl font-bold text-white">P</span>
                        </div>

                        <h1 className="text-3xl font-semibold tracking-tight bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
                            Welcome back
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Sign in to access your tunnels & manage your endpoints
                        </p>
                    </div>

                    {/* 🔥 Button */}
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="
              w-full group relative flex items-center justify-center gap-3
              px-6 py-4 rounded-2xl font-medium
              bg-white text-black
              hover:bg-white/90
              transition-all duration-200
              active:scale-[0.97]
              shadow-lg hover:shadow-xl
            "
                    >
                        <FcGoogle className="w-5 h-5" />
                        Continue with Google

                        {/* Glow hover */}
                        <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-linear-to-r from-primary/20 to-accent/20 blur-xl" />
                    </button>

                    {/* 🔥 Divider */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex-1 h-px bg-border" />
                        Secure authentication
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    {/* 🔥 Footer small text */}
                    <p className="text-xs text-center text-muted-foreground leading-relaxed">
                        By continuing, you agree to our{" "}
                        <a href="#" className="underline hover:text-foreground transition">
                            Terms
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline hover:text-foreground transition">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;