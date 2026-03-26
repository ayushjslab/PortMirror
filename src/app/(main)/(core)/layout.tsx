import React from "react";
import Sidebar from "@/components/shared/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen bg-background text-foreground">

            {/* Sidebar */}
            <Sidebar />

            {/* Content */}
            <div className="flex-1 flex flex-col">
                <main className="flex-1 p-6">{children}</main>
            </div>

        </div>
    );
};

export default MainLayout;