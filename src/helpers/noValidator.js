export const Validation = (num) => {
  let regexp = /^[0-9\b]+$/;

  if (num === "" || regexp.test(num)) {
    return true;
  } else {
    return false;
  }
};
