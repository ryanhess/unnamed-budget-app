import { ReactNode } from "react";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <TopBar />

            <div className="flex-1 flex overflow-hidden">
                <Sidebar />
                {children}
            </div>
        </div>
    );
};

export default Layout;
