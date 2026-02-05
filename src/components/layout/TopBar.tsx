import { Bell, Settings, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
    onAddTransaction?: () => void;
}

const TopBar = ({ onAddTransaction }: TopBarProps) => {
    return (
        <div className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
                <h1 className="text-xl font-semibold text-slate-900">Budget Tracker</h1>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={onAddTransaction}>
                    <Plus className="size-4 mr-2" />
                    Add Transaction
                </Button>

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
