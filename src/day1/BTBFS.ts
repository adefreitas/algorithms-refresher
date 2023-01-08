// O(N) when using a queue, O(N^2) with javascript arrays becasue of re allocation of underlying ArrayList
export default function bfs(head: BinaryNode<number>, needle: number): boolean {
  const q = [head];

  while (q.length) {
    const curr = q.shift();
    if (!curr) {
      throw new Error("Undefined found :(");
    }
    if (curr.value === needle) {
      return true;
    }
    if (curr.left) {
      q.push(curr.left);

    }
    if (curr.right) {
      q.push(curr.right);
    }
  }
  return false;
}
