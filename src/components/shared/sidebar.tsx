"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    LayoutDashboard,
    Key,
    Activity,
    Settings,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

/**
 * Sidebar Component
 * A premium, responsive sidebar with active state tracking and session integration.
 */
const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const pathname = usePathname();
    const { data: session } = useSession();

    const links = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Tunnels", href: "/tunnels", icon: Activity },
        { name: "API Keys", href: "/keys", icon: Key },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <aside
            className={cn(
                "h-screen sticky top-0 z-40 transition-all duration-500 ease-in-out border-r border-border/50 bg-card/40 backdrop-blur-2xl flex flex-col group/sidebar",
                open ? "w-64" : "w-20"
            )}
        >
            {/* 🔥 Brand Logo Section */}
            <div className="flex items-center h-20 px-4 relative">
                <Link href="/" className="flex items-center gap-3 overflow-hidden outline-none">
                    <div className="relative shrink-0 w-10 h-10 rounded-2xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                        <span className="text-lg font-bold text-white">P</span>
                        <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 hover:opacity-100 transition-opacity blur-sm" />
                    </div>
                    <div className={cn(
                        "flex flex-col transition-all duration-300 opacity-0 -translate-x-4",
                        open && "opacity-100 translate-x-0"
                    )}>
                        <span className="font-bold text-base tracking-tight text-foreground">
                            PortMirror
                        </span>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none">
                            Control Plane
                        </span>
                    </div>
                </Link>

                {/* Toggle Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-10 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all opacity-0 group-hover/sidebar:opacity-100 shadow-xl z-50"
                >
                    {open ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                </button>
            </div>

            {/* 🔥 Navigation Section */}
            <nav className="flex-1 px-3 py-4 space-y-1.5 custom-scrollbar overflow-y-auto overflow-x-hidden">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "group relative flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-medium transition-all duration-200 outline-none",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-inner"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                        >
                            <div className={cn(
                                "relative z-10 transition-transform duration-200 group-hover:scale-110",
                                isActive && "scale-110"
                            )}>
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            </div>

                            <span className={cn(
                                "relative z-10 transition-all duration-300 whitespace-nowrap",
                                !open && "opacity-0 translate-x-4 pointer-events-none"
                            )}>
                                {link.name}
                            </span>

                            {/* Active Indicator Bar */}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                            )}

                            {/* Hover Glow */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-linear-to-r from-primary/5 to-accent/5 transition-opacity" />
                        </Link>
                    );
                })}
            </nav>

            {/* 🔥 Pro Upsell (Only when open) */}
            {open && (
                <div className="px-4 py-4 m-3 rounded-3xl bg-linear-to-br from-primary/10 to-accent/10 border border-primary/20 relative overflow-hidden group/upsell">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <Zap size={14} className="text-primary fill-primary/20" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Pro Feature</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                            Unlock unlimited tunnels and custom domains.
                        </p>
                        <button className="w-full py-2 rounded-xl bg-primary text-primary-foreground text-[11px] font-bold hover:opacity-90 active:scale-95 transition-all">
                            Upgrade Now
                        </button>
                    </div>
                    <Sparkles className="absolute -right-2 -bottom-2 text-primary opacity-5 scale-150 rotate-12 group-hover/upsell:scale-[2] transition-transform duration-700" size={60} />
                </div>
            )}

            {/* 🔥 User Profile Section */}
            <div className="p-3 border-t border-border/50">
                <div className={cn(
                    "flex items-center gap-3 p-2 rounded-2xl hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border/50 group/user",
                    !open && "justify-center px-0"
                )}>
                    <div className="relative w-9 h-9 shrink-0">
                        {session?.user?.image ? (
                            <Image
                                src={session.user.image}
                                alt="Avatar"
                                fill
                                className="rounded-xl object-cover ring-2 ring-background border border-border/50"
                            />
                        ) : (
                            <div className="w-full h-full rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {session?.user?.name?.[0] || "U"}
                            </div>
                        )}
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-card rounded-full shadow-sm" />
                    </div>

                    <div className={cn(
                        "flex-1 flex flex-col min-w-0 transition-all duration-300",
                        !open && "opacity-0 w-0 -translate-x-4 overflow-hidden"
                    )}>
                        <span className="text-sm font-bold text-foreground truncate group-hover/user:text-primary transition-colors">
                            {session?.user?.name || "Guest User"}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">
                            {session?.user?.plan || "Free"} Plan
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;