type StackElement<T> = {
    value: T;
    prev?: StackElement<T>;
}

export default class Stack<T> {
    public length: number;
    private head?: StackElement<T>;
    

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const element = {value: item} as StackElement<T>;
        this.length++;
        if (!this.head) {
            element;
        }
        element.prev = this.head;
        this.head = element;
    }

    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1);
        if (this.length === 0) {
            const head = this.head;
            this.head = undefined;
            return head?.value;
        }
        const node = this.head;
        this.head = node?.prev;
        return node?.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
