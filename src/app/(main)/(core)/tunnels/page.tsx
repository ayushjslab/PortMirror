"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Zap,
  Globe,
  Copy,
  Check,
  ExternalLink,
  Loader2,
  Monitor,
  Calendar,
  Shield,
  Plus
} from "lucide-react";

interface TunnelData {
  _id: string;
  subdomain: string;
  localPort: number;
  token: string;
  status: "active" | "inactive";
  createdAt: string;
}

const TunnelsPage = () => {
  const [tunnels, setTunnels] = useState<TunnelData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTunnels = async () => {
      try {
        const response = await fetch("/api/tunnels");
        const data = await response.json();
        if (response.ok) {
          setTunnels(data);
        }
      } catch (error) {
        console.error("Error fetching tunnels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTunnels();
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="animate-in fade-in slide-in-from-left-4 duration-700">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Globe className="w-8 h-8 text-primary" />
            Active Tunnels
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your port forwarding tunnels.
          </p>
        </div>

        <Link
          href="/new-tunnels"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-95 text-sm"
        >
          <Plus className="w-4 h-4" />
          New Tunnel
        </Link>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-muted-foreground animate-pulse">Loading tunnels...</p>
        </div>
      ) : tunnels.length === 0 ? (
        <div className="bg-card/50 border border-dashed border-border rounded-3xl p-12 text-center space-y-6">
          <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
            <Zap className="w-10 h-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">No Tunnels Found</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              You haven't created any tunnels yet. Start by exposing your local port to the web.
            </p>
          </div>
          <Link
            href="/new-tunnels"
            className="inline-flex bg-primary text-primary-foreground px-8 py-3 rounded-2xl font-bold hover:opacity-90 transition-all"
          >
            Create Your First Tunnel
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {tunnels.map((tunnel) => (
            <div
              key={tunnel._id}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all shadow-sm hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Info Header */}
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${tunnel.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-600'}`} />
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {tunnel.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        {tunnel.subdomain}.portmirror.com
                        <a
                          href={`https://${tunnel.subdomain}.portmirror.com`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Monitor className="w-4 h-4" />
                          Local Port: <strong className="text-foreground">{tunnel.localPort}</strong>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          Created: {new Date(tunnel.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Section / Token */}
                  <div className="lg:w-96 space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Shield className="w-3 h-3" />
                      API ACCESS TOKEN
                    </label>
                    <div className="flex items-center gap-2 bg-background border border-border p-3 rounded-xl group/token">
                      <code className="flex-1 font-mono text-xs text-primary truncate">
                        {tunnel.token}
                      </code>
                      <button
                        onClick={() => copyToClipboard(tunnel.token, tunnel._id)}
                        className="p-2 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-lg transition-all"
                      >
                        {copiedId === tunnel._id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TunnelsPage;