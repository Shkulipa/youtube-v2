const parseFunc = (num: number, step: number, characther: string) =>
	(num / step).toFixed(1).replace(/\.0$/, '') + characther;

export function formatNumberToK(num: number) {
	if (num >= 1e9) return parseFunc(num, 1e9, 'G');
	if (num >= 1e7) return parseFunc(num, 1e7, 'M');
	if (num >= 1e3) return parseFunc(num, 1e3, 'K');

	return num;
}
