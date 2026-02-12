import { Dispatch, SetStateAction } from "react";

const getMonthAndYearFromState = (monthOffset: number): { monthName: string; year: number } => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + monthOffset);

    const monthName = currentDate.toLocaleString("en-US", { month: "long" });
    const year = currentDate.getFullYear();
    return { monthName, year };
};

const goToPreviousMonth = (setter: Dispatch<SetStateAction<number>>) => {
    setter((prev) => prev - 1);
};

const goToNextMonth = (setter: Dispatch<SetStateAction<number>>) => {
    setter((prev) => prev + 1);
};

export { getMonthAndYearFromState, goToPreviousMonth, goToNextMonth };
