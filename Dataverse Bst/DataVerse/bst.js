// DataVerse: Binary Search Tree logic (reference copy).
// The same code is embedded inside index.html. It has no rendering code.

class TreeNode {
  constructor(value) { this.value = value; this.left = null; this.right = null; this.view = null; /* slot for the visual layer only; the BST logic never reads it */ }
}

class BST {
  constructor() { this.root = null; this.size = 0; }

  // One comparison is counted each time the target is compared with a visited node.
  search(value) {
    let cur = this.root, comparisons = 0;
    const path = [], steps = [];
    while (cur) {
      comparisons++; path.push(cur.value);
      if (value === cur.value) return { found: true, path, steps, comparisons };
      const goLeft = value < cur.value;
      steps.push({ at: cur.value, dir: goLeft ? 'left' : 'right' });
      cur = goLeft ? cur.left : cur.right;
    }
    return { found: false, path, steps, comparisons };
  }

  insert(value) {
    if (!this.root) { this.root = new TreeNode(value); this.size = 1; return { ok: true, parent: null, side: null }; }
    let cur = this.root;
    while (true) {
      if (value === cur.value) return { ok: false };
      const goLeft = value < cur.value;
      const next = goLeft ? cur.left : cur.right;
      if (!next) {
        const node = new TreeNode(value);
        if (goLeft) cur.left = node; else cur.right = node;
        this.size++;
        return { ok: true, parent: cur.value, side: goLeft ? 'left' : 'right' };
      }
      cur = next;
    }
  }

  // Delete relinks nodes (no value copying): a node keeps its identity for its whole life.
  delete(value) {
    const s = this.search(value);
    if (!s.found) return { ok: false, ...s };
    let kind = '', successor = null, removed = null;
    const remove = (node, v) => {
      if (!node) return null;
      if (v < node.value) { node.left = remove(node.left, v); return node; }
      if (v > node.value) { node.right = remove(node.right, v); return node; }
      removed = node;
      if (!node.left && !node.right) { kind = 'leaf'; return null; }
      if (!node.left)  { kind = 'one child'; return node.right; }
      if (!node.right) { kind = 'one child'; return node.left; }
      // two children: detach the inorder successor (leftmost node of the right subtree)
      let parentOfS = node, s2 = node.right;
      while (s2.left) { parentOfS = s2; s2 = s2.left; }
      successor = s2.value;
      if (parentOfS !== node) { parentOfS.left = s2.right; s2.right = node.right; }
      s2.left = node.left;           // the successor takes the deleted node's place
      kind = 'two children';
      return s2;
    };
    this.root = remove(this.root, value);
    this.size--;
    return { ok: true, kind, successor, removed, ...s };
  }

  find(value) { let c = this.root; while (c && c.value !== value) c = value < c.value ? c.left : c.right; return c; }

  inorder()   { const o = []; const f = n => { if (!n) return; f(n.left); o.push(n.value); f(n.right); }; f(this.root); return o; }
  preorder()  { const o = []; const f = n => { if (!n) return; o.push(n.value); f(n.left); f(n.right); }; f(this.root); return o; }
  postorder() { const o = []; const f = n => { if (!n) return; f(n.left); f(n.right); o.push(n.value); }; f(this.root); return o; }

  minPath() { const p = []; let c = this.root; while (c) { p.push(c.value); c = c.left; } return p; }
  maxPath() { const p = []; let c = this.root; while (c) { p.push(c.value); c = c.right; } return p; }

  // Height counted in levels: a single node has height 1, an empty tree 0.
  height(n = this.root) { return n ? 1 + Math.max(this.height(n.left), this.height(n.right)) : 0; }

  deepestPath() {
    const walk = n => {
      if (!n) return [];
      const l = walk(n.left), r = walk(n.right);
      return [n.value, ...(r.length > l.length ? r : l)];
    };
    return walk(this.root);
  }
}
