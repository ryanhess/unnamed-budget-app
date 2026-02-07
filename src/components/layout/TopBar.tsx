import { Bell, Settings, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/layout/Logo";

const TopBar = () => {
    return (
        <div className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between">
            <Logo />

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Download className="size-4" />
                </Button>

                <Button variant="ghost" size="icon">
                    <Bell className="size-4" />
                </Button>

                <Button variant="ghost" size="icon">
                    <Settings className="size-4" />
                </Button>
            </div>
        </div>
    );
};

export default TopBar;
