const oneDayInMs = 86400000;

const getCurrentDate = () => Date.now();

const getSomeDaysAfter = (days: number): number => {
	if (days === 0) {
		return 0;
	} else {
		return Date.now() + oneDayInMs * days;
	}
};

export {getSomeDaysAfter, getCurrentDate};
