export const parseDate = (date: string | number | Date) => {
	if (!date) return;

	const convDate = new Date(date);
	const convMonth = convDate.getMonth() + 1;
	const parsedMonth = convMonth < 10 ? `0${convMonth}` : convMonth;

	return `${convDate.getFullYear()}-${parsedMonth}-${convDate.getDate()}`;
};
