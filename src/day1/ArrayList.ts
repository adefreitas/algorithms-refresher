// Implementing ArrayList at midnight to refresh my memory :D 
const EXTRA_CAPACITY = 3;

export default class ArrayList<T> {
    public length: number;
    public capacity: number;
    private array: Array<T>;
    

    constructor(length: number) {
        this.length = 0;
        this.capacity = length;
        this.array = new Array(length);
    }

    prepend(item: T): void {
        if (this.length +1 === this.capacity) {
            const newArray = new Array(this.length + EXTRA_CAPACITY);
            this.length++;
            this.capacity += EXTRA_CAPACITY;
            for(let i = 0; i < this.length; i++) {
                newArray[i+1] = this.array[i];
            }
            newArray[0] = item;
            this.array = newArray;
        } else {
            for(let i = 0; i < this.length; i++) {
                this.array[i+1] = this.array[i];
            }
            this.length++;
            this.array[0] = item;
        }

    }

    insertAt(item: T, idx: number): void {
        if (idx === this.length -1) {
            return this.append(item);
        }
        if (idx === 0) {
            return this.prepend(item);
        }
        if (this.length + 1 === this.capacity) {
            const newArray = new Array(this.length + EXTRA_CAPACITY);
            this.capacity += EXTRA_CAPACITY;

            for (let i = 0; i < idx; i++) {
                newArray[i] = this.array[i];
            }

            for (let i = idx + 1; i < this.length; i++) {
                newArray[i + 1] = newArray[i];
            }
            this.length++;
            newArray[idx] = item;
        } else {
            for (let i = idx +1; i <this.length; i++) {
                this.array[i + 1] = this.array[i];
            }
            this.length++;
            this.array[idx] = item;
        }

    }

    append(item: T): void {
        if (this.length + 1 > this.capacity) {
            const newArray = new Array(this.length + EXTRA_CAPACITY);
            this.length++;
            this.capacity += EXTRA_CAPACITY;
            for (let i = 0; i < this.length; i++) {
                newArray[i] = this.array[i];
            }
            newArray[this.length - 1] = item;
            this.array = newArray;
        } else {
            this.array[this.length] = item;
            this.length++;

        }
    }

    remove(item: T): T | undefined {
        let indexOf = -1;
        let i = 0;
        let value;
        for(; i < this.length; i++) {
            if (this.array[i] === item) {
                indexOf = i;
                value = this.array[i];
                break;
            }
        }
        if (indexOf === -1) {
            return;
        }
        return this.removeAt(indexOf);
    }

    get(idx: number): T | undefined {
        return this.array[idx];
    }

    removeAt(idx: number): T | undefined {
        let val = this.array[idx];
        for (let j = idx; j < this.length; j++) {
            this.array[j] = this.array[j+1];
        }
        this.array[this.length -1] = null as any as T;
        this.length--;
        return val;

    }
}
