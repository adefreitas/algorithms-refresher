type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
}

function createNode<V>(value: V): Node<V> {
    return {value};
}

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;
    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;


    constructor(private capacity: number = 10) {
        this.length = 0;
        this.lookup = new Map();
        this.reverseLookup = new Map();
        this.head = this.tail = undefined;
    }

    update(key: K, value: V): void {
        // does it exist?
        // if it doesn't it should be inserted
        //     - if inserting should check capacity and evict extra
        // if it does it should be moved to front of list and value should be updated
        let node = this.lookup.get(key);
        if (!node) {
            node = createNode(value);
            this.length++;
            this.prepend(node);
            this.trimCache();
            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } else {
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }
    }
    private trimCache() {
        if (this.length <= this.capacity) {
            return;
        }
        const tail = this.tail!;
        this.detach(tail);
        const key = this.reverseLookup.get(tail)!;
        this.lookup.delete(key);
        this.length--;
    }

    get(key: K): V | undefined {
        // check cache for existance
        const node = this.lookup.get(key);
        if (!node) {
            return undefined;
        }
        this.detach(node);
        this.prepend(node);
        // update found value and move it to front since it's the most recently used
    
        // return value found or undefined if doesnt exists
        return node.value;
    }

    private detach(node: Node<V>): void {
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.head === node) {
            this.head = this.head.next;
        }

        if (this.tail === node) {
            this.tail = this.tail.prev;
        }

        node.next = undefined;
        node.prev = undefined;
    }

    private prepend(node: Node<V>) {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }
}
