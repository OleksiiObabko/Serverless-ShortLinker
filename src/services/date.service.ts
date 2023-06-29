const oneDayInMs = 86400000;

const getSomeDaysAfter = (days: number): number => Date.now() + oneDayInMs * days;

export {getSomeDaysAfter};
