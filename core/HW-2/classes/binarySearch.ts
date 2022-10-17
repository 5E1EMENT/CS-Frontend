export const binarySearch = (item: number, arr: number[]) => {
  let first = 0;
  let last = arr.length - 1;
  let middle = Math.floor((first + last) / 2);

  while (arr[middle] !== item && first <= last) {
    if (item === middle) return middle;
    if (item < arr[middle]) {
      last = middle - 1;
    } else {
      first = middle + 1;
    }

    middle = Math.floor((first + last) / 2);
  }

  return arr[middle] == item ? middle : -1;
};
