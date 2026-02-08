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

export { formatDate };
