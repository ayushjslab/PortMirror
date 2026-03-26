"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, X, LayoutDashboard, LogOut, User as UserIcon, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * Navbar Component
 * A modern, responsive navigation bar with glassmorphic effects and premium interactions.
 */
export default function Navbar() {
    const { data: session, status } = useSession();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for navbar background
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Docs", href: "/docs" },
        { name: "Pricing", href: "/pricing" },
    ];

    return (
        <nav
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300 border-b",
                scrolled
                    ? "bg-background/80 backdrop-blur-xl border-border/50 py-2"
                    : "bg-transparent border-transparent py-4"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* 🔥 Logo */}
                <Link href="/" className="group flex items-center gap-2.5 outline-none">
                    <div className="relative w-10 h-10 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110 active:scale-95">
                        <span className="text-lg font-bold text-white select-none">P</span>
                        <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
                        PortMirror
                    </span>
                </Link>

                {/* 🔥 Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1 bg-muted/30 p-1 rounded-2xl border border-border/50 backdrop-blur-md">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="px-5 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* 🔥 Right Side Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {status === "loading" ? (
                        <div className="w-32 h-10 rounded-2xl bg-muted animate-pulse" />
                    ) : session ? (
                        <div className="flex items-center gap-3">
                            {/* Profile Chip */}
                            <div className="group relative flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-2xl bg-muted/50 border border-border/50 hover:bg-muted transition-colors cursor-pointer">
                                <div className="relative">
                                    <img
                                        src={session.user?.image || ""}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-xl object-cover ring-2 ring-background border border-border/50 shadow-sm"
                                    />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold leading-none text-foreground">
                                        {session.user?.name?.split(" ")[0]}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider font-bold">
                                        {session.user?.plan || "Free"}
                                    </span>
                                </div>
                                <ChevronDown size={14} className="text-muted-foreground group-hover:text-foreground transition-colors ml-1" />

                                {/* Desktop Dropdown (Simulated for beauty) */}
                                <div className="absolute top-[calc(100%+12px)] right-0 w-56 p-2 rounded-2xl bg-card border border-border shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-muted transition-colors">
                                        <LayoutDashboard size={18} className="text-primary" />
                                        Dashboard
                                    </Link>
                                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-muted transition-colors">
                                        <UserIcon size={18} className="text-secondary" />
                                        Profile Settings
                                    </Link>
                                    <div className="h-px bg-border/50 my-2 mx-2" />
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors"
                                    >
                                        <LogOut size={18} />
                                        Sign Out
                                    </button>
                                </div>
                            </div>

                            <Link
                                href="/dashboard"
                                className="px-6 py-2.5 rounded-2xl text-sm font-bold bg-foreground text-background hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-foreground/5"
                            >
                                Dashboard
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => signIn("google")}
                                className="px-6 py-2.5 rounded-2xl text-sm font-bold bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:opacity-95 transition-all active:scale-[0.98] border border-primary/50"
                            >
                                Get Started
                            </button>
                        </div>
                    )}
                </div>

                {/* 🔥 Mobile Toggle */}
                <button
                    className="md:hidden p-2.5 rounded-2xl bg-muted/50 border border-border/50 text-foreground active:scale-90 transition-transform"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* 🔥 Mobile Menu */}
            <div
                className={cn(
                    "md:hidden fixed inset-x-0 top-[65px] border-b border-border/50 bg-background/95 backdrop-blur-2xl transition-all duration-300 origin-top z-40 px-6 py-8 space-y-6 overflow-hidden",
                    open ? "opacity-100 scale-y-100 h-auto visible" : "opacity-0 scale-y-0 h-0 invisible"
                )}
            >
                <div className="space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="block text-lg font-medium text-muted-foreground hover:text-foreground py-2 transition-colors border-b border-border/30 last:border-0"
                            onClick={() => setOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="pt-4 space-y-4">
                    {session ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border/50 shadow-inner">
                                <img
                                    src={session.user?.image || ""}
                                    alt="avatar"
                                    className="w-12 h-12 rounded-xl"
                                />
                                <div>
                                    <h4 className="font-bold text-foreground">{session.user?.name}</h4>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-0.5">{session.user?.plan || "Free"} Plan</p>
                                </div>
                            </div>
                            <Link
                                href="/dashboard"
                                className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-secondary text-secondary-foreground font-bold shadow-lg shadow-secondary/10"
                                onClick={() => setOpen(false)}
                            >
                                <LayoutDashboard size={20} />
                                Go to Dashboard
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="w-full h-14 rounded-2xl border border-destructive/20 text-destructive font-bold bg-destructive/5 active:bg-destructive/10 transition-colors flex items-center justify-center gap-2"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn("google")}
                            className="w-full h-16 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-3 text-lg"
                        >
                            Start using PortMirror
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}