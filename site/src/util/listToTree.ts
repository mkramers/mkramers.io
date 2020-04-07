import {TreeChild} from "../store/posts/types";

export function listToTree<T extends TreeChild<T>>(list: T[]): T[] {
    let map: any = {};
    let node = null;
    let roots: T[] = [];

    let i;

    for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parentId) {
            // if you have dangling branches check that map[node.parentId] exists
            list[map[node.parentId]].children.push(node);
        } else {
            roots.push(node as T);
        }
    }
    return roots;
}