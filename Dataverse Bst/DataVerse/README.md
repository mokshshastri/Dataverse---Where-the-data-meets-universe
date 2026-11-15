# DataVerse
Where Data Meets the Universe. An interactive 3D visualization of Binary Search Tree operations.

## Run
Open `index.html` in a modern browser (Chrome, Edge, Firefox, Safari). An internet connection is needed
the first time because Three.js and the fonts load from a CDN. No install or build step.

## Files
- `index.html`  the complete app (UI, 3D scene, BST logic, planet textures embedded)
- `bst.js`      reference copy of the BST class, with no rendering code (for explaining the algorithms)
- `textures/`   the Sun, Mercury, Mars and Jupiter maps (resized to 1024x512, already embedded in index.html)

## BST operation -> universe
| Operation | Universe |
|---|---|
| Insert | A new planet is born |
| Search | Spaceship travels to the planet |
| Delete | Planet fades away (for two children the inorder successor node is relinked into its place) |
| Inorder / Preorder / Postorder | Ship visits planets in that order |
| Minimum / Maximum | Ship flies to the leftmost / rightmost planet |
| Height | Ship flies the deepest path; height is counted in levels |

## Sections
Explore Universe, Create Universe, Space Navigation, Universe Explorer, Mission Control.

## Notes for the viva
- `BST` in `bst.js` is independent of the visuals. One comparison is counted each time the target is compared with a visited node.
- Delete handles leaf, one child and two children (the inorder successor node is relinked, not copied).
- The binary tree is the only data structure: each node has a `view` slot holding its planet, position and depth. Planets are found by BST search or by walking the tree. No Map or Set is used; arrays hold only short result lists and graphics buffers.
- Limits: whole numbers 0-999, no duplicates, up to 40 planets.
- Planet textures cycle by level: level 2 Mercury, level 3 Mars, level 4 Jupiter, then repeat.
