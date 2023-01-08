// O(log(N)) to O(N) depending on how balanced the tree is 
export default function dfs(head: BinaryNode<number> | null, needle: number): boolean {
  if (!head) {
    return false;
  }
  if (head.value === needle) {
    return true;
  }
  if (head.value <= needle) {
    return dfs(head.right, needle)
  } else {
    return dfs(head.left, needle);
  }
}