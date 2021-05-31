export const fixCommentFilter = (id, arr) => {
  // let filteredArr: any = [];
  // arr.forEach((item: any) => {
  //   if (item.comment_type === id) {
  //     filteredArr.push(item);
  //   }
  // });
  var filtered = arr.filter((a) => a.comment_type === id);
  return filtered;
};

export const doctorFilter = (id, arr) => {
  var filtered = arr.filter((a) => a.center === id);
  return filtered;
};
