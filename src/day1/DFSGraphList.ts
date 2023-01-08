function walk(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[]
): boolean {
   if (seen[curr]) {
        return false;
    }
    seen[curr] = true;
    // pre
    path.push(curr);
    if (curr === needle) {
        return true;
    }
 
    // recurse
    const adjs = graph[curr];
    for (let i = 0; i < adjs.length; ++i) {
        const edge = adjs[i];
        if (walk(graph, edge.to, needle, seen, path)) { 
            return true;
        }
    } 

    // post 
    path.pop();
    return false;
};

export default function dfs(
    graph: WeightedAdjacencyList, 
    source: number, 
    needle: number
): number[] | null {
    const seen = new Array<boolean>(graph.length).fill(false);
    const path: Array<number> = [];

    walk(graph, source, needle, seen, path);
    if (path.length === 0) {
        return null;
    }
    return path;
}

