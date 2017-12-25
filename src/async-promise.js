import axios from 'axios';

const getNumberFromRandomORG = "https://www.random.org/integers/?num=1&min=1&max=3&format=plain&col=1&base=10"

const axiosToNumber = () => axios(getNumberFromRandomORG).then(r => parseInt(r.data));

export const addSubMultDivAsyncPromise = (a, mult) =>
  Promise.all([axiosToNumber(), axiosToNumber(), axiosToNumber()])
    .then(([add, sub, div]) => ((a + add - sub) * mult / div));