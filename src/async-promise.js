import axios from 'axios';

const getNumberFromRandomORG = "https://www.random.org/integers/?num=1&min=1&max=3&format=plain&col=1&base=10"

export const addSubMultDivAsyncPromise = (a, mult) =>
  Promise.all([
    axios(getNumberFromRandomORG),
    axios(getNumberFromRandomORG),
    axios(getNumberFromRandomORG)
  ])
    .then(r => Promise.resolve((a + parseInt(r[0].data) - parseInt(r[1].data)) * mult / parseInt(r[2].data)));