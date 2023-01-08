// O(N*log(N)) in a happy world or worst case O(N^2)

function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi];
    let idx = lo - 1;
    for (let i = lo; i < hi; ++i) {
        if (arr[i] <= pivot) {
            idx++;
            const tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }
    // Move the pivot to the right of the smallest item found, so we keep our rule of "everything to the right of the pivois bigger than the pivot"
    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;
    return idx;
}

function qs(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) {
        return;
    }
    const pivotIndex = partition(arr, lo, hi);
    qs(arr, lo, pivotIndex - 1);
    qs(arr, pivotIndex + 1, hi);
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length-1)
}
