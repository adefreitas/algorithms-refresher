// O((N^2 + N) -> O(N^2)
// Because
// (N*(N +1)) / 2 
// N^2 + N
// N becomes insignificant compared with N^2 so
// = N^2
export default function bubble_sort(arr: number[]): void {
    for(let i = 0; i < arr.length ; i++) {
        for(let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                const pivot = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = pivot;
            }
        }
    }
}

