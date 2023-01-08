type QueueNode<T> = {
    value: T;
    next?: QueueNode<T>;
    prev?: QueueNode<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: QueueNode<T>;
    private tail?: QueueNode<T>;
    

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        this.length++;
        const node = {value: item} as QueueNode<T>; 

        if (!this.tail) {
            this.tail = this.head = node; 
            return;
        }
         
        this.tail.next = node;
        this.tail = node;
    }

    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }
        this.length--;
        const oldHead = this.head;
        this.head = this.head?.next;
        oldHead.next = undefined;
        if (this.length === 0) {
            this.tail = undefined
        }
        return oldHead.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
