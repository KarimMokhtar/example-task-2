const binarySearch = (arr, n, target) => {
    // check the last and first elements
    if (target < new Date(arr[n - 1].time)) return arr[n - 1];
    if (target > new Date(arr[0].time)) return arr[0];

    // search for the required element
    let j = 0,
        i = n,
        mid = 0;
    while (i > j) {
        mid = Math.floor((i + j) / 2);
        if (new Date(arr[mid].time) === target) {
            return arr[mid];
        }

        // go to the right side if target less
        if (new Date(arr[mid].time) < target) {
            // check if it's in the middle of two elements
            // return the nearset to it
            if (mid < n - 1 && target < new Date(arr[mid + 1].time)) {
                return nearestElement(arr[mid], arr[mid + 1], target);
            }

            // if not repeat for the right side
            i = mid;
        }
        //if not got to the left side
        else {
            if (mid > 0 && target > new Date(arr[mid - 1].time)) {
                return nearestElement(arr[mid], arr[mid - 1], target);
            }
            j = mid + 1;
        }
    }
    return arr[mid];
};

const nearestElement = (ele1, ele2, target) => {
    const diff1 = Math.abs(new Date(ele1.time) - target),
        diff2 = Math.abs(new Date(ele2.time) - target);

    if (diff1 <= diff2) return ele1;

    return ele2;
};

module.exports = binarySearch;
