export const parseDate = (date: string | number | Date) => {
	if (!date) return;

	const convDate = new Date(date);
	const parsedMonth =
		convDate.getMonth() < 10 ? `0${convDate.getMonth()}` : convDate.getMonth();

	return date
		? `${convDate.getFullYear()}-${parsedMonth}-${convDate.getDate()}`
		: "";
};
