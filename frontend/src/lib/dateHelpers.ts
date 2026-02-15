const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date("2026-02-02");
    const yesterday = new Date("2026-02-01");

    if (date.toDateString() === today.toDateString()) {
        return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    } else {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }
};

const getMonthAndYearFromOffset = (monthOffset: number): { monthName: string; year: number } => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + monthOffset);

    const monthName = currentDate.toLocaleString("en-US", { month: "long" });
    const year = currentDate.getFullYear();
    return { monthName, year };
};

export { formatDate, getMonthAndYearFromOffset };
