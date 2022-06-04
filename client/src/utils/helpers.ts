import { format, parseISO } from "date-fns";

export const parseDate = (date: string | number | Date) => {
	if (!date) return;

	try {
		if (typeof date === "string") {
			return format(parseISO(date), "yyyy-MM-dd");
		} else {
			return format(date, "yyyy-MM-dd");
		}
	} catch {
		return;
	}
};
