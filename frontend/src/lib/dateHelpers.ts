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

function getMonthAndYearFromOffset(
    asType: "string",
    monthOffset: number
): { month: string; year: number };

function getMonthAndYearFromOffset(
    asType: "number",
    monthOffset: number
): { month: number; year: number };

function getMonthAndYearFromOffset(
    asType: "number" | "string",
    monthOffset: number
): { month: string | number; year: number } {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + monthOffset);

    let month;
    if (asType === "number") {
        month = currentDate.toLocaleString("en-US", { month: "long" });
    } else {
        month = currentDate.toLocaleString("en-US", { month: "numeric" });
    }
    const year = currentDate.getFullYear();
    return { month, year };
}

const getMonthAsNumberAndYearFromOffset = (
    monthOffset: number
): { month: number; year: number } => {
    return getMonthAndYearFromOffset("number", monthOffset);
};

const getMonthNameAndYearFromOffset = (
    monthOffset: number
): { monthName: string; year: number } => {
    const { month: monthName, year } = getMonthAndYearFromOffset("string", monthOffset);
    return { monthName, year };
};

export { formatDate, getMonthNameAndYearFromOffset, getMonthAsNumberAndYearFromOffset };
