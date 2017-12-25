import axios from 'axios';

const getNumberFromRandomORG = "https://www.random.org/integers/?num=1&min=1&max=3&format=plain&col=1&base=10"

export const addSubMultDivAsyncAwait = async (a, mult) => {
  const add = await axios(getNumberFromRandomORG);
  const sub = await axios(getNumberFromRandomORG);
  const div = await axios(getNumberFromRandomORG);
  return (a + parseInt(add.data) - parseInt(sub.data)) * mult / parseInt(div.data);
}