type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node = {value: item} as Node<T>;
        this.length++;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("Can't inser past length + 1");
        }
        if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
        }
        this.length++ 
        const node: Node<T> = {value: item};
        const curr = this.getAt(idx) as Node<T>; 
        node.next = curr;
        node.prev = curr.prev;
        curr.prev = node;
        if (node.prev) {
            node.prev.next = curr;
        }
    }

    append(item: T): void {
        this.length++;
        const node: Node<T> = {value: item};
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        if (!this.head) {
            return;
        }
        let curr = this.head;
        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value === item) {
               break; 
            }
            curr = curr.next as Node<T>;
        }

        if (!curr) {
            return;
        }
        return this.removeNode(curr);

    }

    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
        
    }

    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);

        if (!node) {
            return undefined;
        }

        return this.removeNode(node);
    }

    private removeNode(node: Node<T>): T {
        this.length--;
        if (this.length === 0) {
            this.head = this.tail = undefined;
            return node.value;
        }
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
        if (node === this.head) {
            this.head = node.next;
        } 
        node.prev = node.next = undefined;
        return node.value;

    }

    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head;
        for (let i = 0; i < idx; i++) {
            curr = curr?.next;
        }
        return curr;
    }

}
