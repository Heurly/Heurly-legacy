type ApiFilter<T> = {
  equals?: T | undefined;
  greater?: T | undefined;
  lower?: T | undefined;
  in?: T[] | undefined;
};

export default ApiFilter;
