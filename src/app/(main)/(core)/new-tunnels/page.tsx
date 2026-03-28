"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Zap,
    Globe,
    Terminal,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ArrowRight,
    Monitor
} from "lucide-react";

const NewTunnelsPage = () => {
    const router = useRouter();
    const [subdomain, setSubdomain] = useState("");
    const [localPort, setLocalPort] = useState("3000");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/tunnels", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subdomain,
                    localPort: parseInt(localPort),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create tunnel");
            }

            setSuccess(true);
            // Optional: redirect after some delay or show the token
            setTimeout(() => {
                router.push("/tunnels"); // Assuming there's a list page
            }, 2000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10">
            <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
                <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                    <Zap className="w-8 h-8 text-primary fill-primary/20" />
                    Create New Tunnel
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Expose your local server to the internet securely in seconds.
                </p>
            </div>

            <div className="grid md:grid-cols-5 gap-8">
                {/* Form Section */}
                <div className="md:col-span-3 space-y-6">
                    <div className="bg-card border border-border p-8 rounded-2xl shadow-xl shadow-black/20 overflow-hidden relative group">
                        {/* Subtle glow effect */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-colors duration-500" />

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label
                                    htmlFor="subdomain"
                                    className="text-sm font-medium text-foreground/80 flex items-center gap-2"
                                >
                                    <Globe className="w-4 h-4 text-accent" />
                                    Subdomain
                                </label>
                                <div className="flex items-center group/input">
                                    <div className="relative flex-1">
                                        <input
                                            id="subdomain"
                                            type="text"
                                            placeholder="my-awesome-app"
                                            value={subdomain}
                                            onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all pr-32"
                                            required
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium pointer-events-none select-none">
                                            .porthook.com
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Letters, numbers, and dashes only.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="localPort"
                                    className="text-sm font-medium text-foreground/80 flex items-center gap-2"
                                >
                                    <Monitor className="w-4 h-4 text-secondary" />
                                    Local Port
                                </label>
                                <input
                                    id="localPort"
                                    type="number"
                                    placeholder="3000"
                                    value={localPort}
                                    onChange={(e) => setLocalPort(e.target.value)}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                    required
                                />
                                <p className="text-xs text-muted-foreground">
                                    The port where your local application is running.
                                </p>
                            </div>

                            {error && (
                                <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl animate-in shake duration-300">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm font-medium">{error}</p>
                                </div>
                            )}

                            {success && (
                                <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl animate-in zoom-in-95 duration-500">
                                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm font-medium">Tunnel created successfully! Redirecting...</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading || success}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Create Tunnel
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Info/Guide Section */}
                <div className="md:col-span-2 space-y-4">
                    <div className="bg-secondary/5 border border-secondary/20 p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Terminal className="w-16 h-16 text-secondary" />
                        </div>
                        <h3 className="font-bold text-foreground mb-4 text-lg">How it works</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold">1</div>
                                <span className="text-muted-foreground">Configure your desired subdomain and the local port your app is using.</span>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold">2</div>
                                <span className="text-muted-foreground">Get your unique API token to authenticate your local client.</span>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 font-bold">3</div>
                                <span className="text-muted-foreground">Run the `porthook` CLI with your token to start the tunnel.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
                        <h4 className="font-semibold text-foreground/90 mb-2">Pro Tip</h4>
                        <p className="text-sm text-muted-foreground">
                            A private, encrypted tunnel is established between our edge servers and your machine. No incoming ports need to be opened on your firewall.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewTunnelsPage;