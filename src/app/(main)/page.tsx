import Link from "next/link";
import { ArrowRight, ChevronRight, Zap, Shield, Globe } from "lucide-react";
import Navbar from "@/components/shared/navbar";

/**
 * HomePage Component
 * A high-conversion landing page for PortMirror.
 */
const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className="relative min-h-screen flex flex-col items-center overflow-hidden">
                {/* 🔥 Background Decoration */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full" />
                    <div className="absolute bottom-[20%] right-[5%] w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full" />
                    <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />
                </div>

                {/* 🔥 Hero Section */}
                <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
                    {/* Banner */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs font-semibold text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                        PortMirror is now in public beta
                        <ChevronRight size={14} className="text-muted-foreground" />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl text-balance">
                        Expose Local Ports to the{" "}
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
                            Public Web
                        </span>{" "}
                        Instantly
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl text-balance leading-relaxed">
                        The fastest way to test webhooks, demo local apps, and share your work
                        with the world. Secure, fast, and remarkably simple.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
                        <Link
                            href="/signin"
                            className="group px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold shadow-2xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 text-lg"
                        >
                            Start Tunneling
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/docs"
                            className="px-8 py-4 rounded-2xl border border-border bg-background/50 backdrop-blur-md font-bold hover:bg-muted transition-all active:scale-95 text-lg"
                        >
                            Read Documentation
                        </Link>
                    </div>

                    {/* Features Preview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-10">
                        {[
                            {
                                title: "Instant Setup",
                                desc: "Run a single command and your local server is live on a public URL.",
                                icon: <Zap className="text-primary" />,
                            },
                            {
                                title: "Secure by Default",
                                desc: "Fully encrypted traffic and customizable access controls for your tunnels.",
                                icon: <Shield className="text-secondary" />,
                            },
                            {
                                title: "Global Edge",
                                desc: "Low-latency connections from anywhere in the world thanks to our edge nodes.",
                                icon: <Globe className="text-accent" />,
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="p-8 rounded-3xl bg-card border border-border/50 text-left hover:border-primary/50 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default HomePage;