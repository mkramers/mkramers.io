import React, {useEffect, useState} from 'react';
import {Classes, IconName, ITreeNode, Tree} from "@blueprintjs/core";
import {connect} from "react-redux";
import {State} from "../store";
import {Post} from "../store/posts/types";
import {postsSelector} from "../store/posts/selectors";
import {selectPostThunk} from "../store/posts/thunks";

type PostListProps = {
    posts: Post[],
    selectPost: (postId: number) => void,
    selectedPostId: number | undefined
};

let transformPosts = (posts: Post[], selectedPostId: number | undefined) => {
    let postNodes = posts.map((post: Post) => getRootPostTreeNode(post, selectedPostId));
    return postNodes
};

let getRootPostTreeNode = (post: Post, selectedPostId: number | undefined) => {
    let childNodes = post.children.map(childPost => {
        return getRootPostTreeNode(childPost, selectedPostId)
    });

    let postTreeNode: ITreeNode = {
        childNodes,
        disabled: false,
        hasCaret: false,
        icon: post.icon as IconName,
        id: post.id,
        isExpanded: true,
        isSelected: post.id === selectedPostId,
        label: post.label,
        secondaryLabel: post.secondaryLabel,
        nodeData: post.content
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
    posts: postsSelector(state),
    selectedPostId: state.posts.selectedPostId
});

const mapDispatch = {
    selectPost: (postId: number) => selectPostThunk(postId)
};

const connector = connect(mapState, mapDispatch);

export default connector(PostList);