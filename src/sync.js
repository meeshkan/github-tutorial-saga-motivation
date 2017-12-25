const randInt = () => Math.floor(Math.random() * 3 + 1)

export const addSubMultDiv = (a, mult) => (a + randInt() - randInt()) * mult / randInt();
