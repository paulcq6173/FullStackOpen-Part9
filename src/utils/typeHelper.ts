// Refers https://stackoverflow.com/questions/58278652/generic-enum-type-guard
export const validStringEnum = <T extends { [key: string]: unknown }>(
  enumObj: T,
  param: unknown
): param is T[keyof T] => {
  if (typeof param === 'string' && Object.values(enumObj).includes(param)) {
    return true;
  }
  return false;
};

export const validNumberEnum = <T extends { [key: number]: unknown }>(
  enumObj: T,
  param: unknown
): param is T[keyof T] => {
  if (typeof param === 'number' && Object.values(enumObj).includes(param)) {
    return true;
  }
  return false;
};

// Currently not in use, 'cause backend had checked date.
export const isDate = (date: string) => Boolean(Date.parse(date));
