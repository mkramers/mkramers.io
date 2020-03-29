import React, {useEffect, useState} from 'react';
import {Classes, ITreeNode, Tree} from "@blueprintjs/core";
import {Post} from "../types/Post";
import {connect} from "react-redux";
import {State} from "../store";
import {selectPost} from "../store/posts/actions";

type PostListProps = {
    posts: Post[],
    selectPost: (id: number) => void,
    selectedPostId: number | undefined
};

let transformPosts = (posts: Post[], selectedPostId: number | undefined) => {
    let postNodes = posts.map((post) => getPostNode(post));

    postNodes.forEach((post: ITreeNode) => post.isSelected = post.id === selectedPostId);

    const state: ITreeNode[] = [
        {
            id: 0,
            hasCaret: true,
            isExpanded: true,
            icon: "folder-close",
            label: "Blogs",
            childNodes: postNodes
        }
    ];
    return state;
};

let getPostNode = (post: Post) => {
    let postTreeNode: ITreeNode = {
        id: post.postId,
        icon: "document",
        label: post.title
    };
    return postTreeNode;
};

function PostList({posts, selectedPostId, selectPost}: PostListProps) {
    const [nodes, setNodes] = useState<ITreeNode[]>([]);

    useEffect(() => {
        let nodes = transformPosts(posts, selectedPostId);
        setNodes(nodes);
    }, [posts, selectedPostId]);

    let handleNodeClick = (nodeData: ITreeNode, _nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
        const originallySelected = nodeData.isSelected;
        if (!e.shiftKey) {
            if (nodes) {
                forEachNode(nodes, n => (n.isSelected = false));
            }
        }
        nodeData.isSelected = originallySelected == null ? true : !originallySelected;

        selectPost(Number(nodeData.id));
    };

    let handleNodeCollapse = (nodeData: ITreeNode) => {
        nodeData.isExpanded = false;
    };

    let handleNodeExpand = (nodeData: ITreeNode) => {
        nodeData.isExpanded = true;
    };

    let forEachNode = (nodes: ITreeNode[] | undefined, callback: (node: ITreeNode) => void) => {
        if (nodes == null) {
            return;
        }

        for (const node of nodes) {
            callback(node);
            forEachNode(node.childNodes, callback);
        }
    };

    return (
        <Tree
            contents={nodes}
            onNodeClick={handleNodeClick}
            onNodeCollapse={handleNodeCollapse}
            onNodeExpand={handleNodeExpand}
            className={Classes.ELEVATION_0}
        />
    );
}

const mapState = (state: State) => ({
    posts: state.posts.posts.allIds.map(id => state.posts.posts.byId[id]),
    selectedPostId: state.posts.selectedPostId
});

const mapDispatch = {
    selectPost: (id: number) => selectPost(id)
};

const connector = connect(mapState, mapDispatch);

export default connector(PostList);