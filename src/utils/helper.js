export const groupString = (str) => {
  let string = "";
  string += str[0];
  for (let i = 1; i < str.length; i++) {
    if (i % 5 === 0) {
      string += "\xa0";
    }
    string += str[i];
  }
  return string;
};

export const createAffineKey = (_m, _b) => {
  const obj = { m: parseInt(_m), b: parseInt(_b) };
  return JSON.stringify(obj);
};

export const createHillKey = (arr) => {
  const obj = { key: arr.split`,`.map((x) => +x) };
  return JSON.stringify(obj);
};
