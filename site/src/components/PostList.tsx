import React from 'react';
import {Classes, ITreeNode, Tree} from "@blueprintjs/core";
import {Post} from "../types/Post";
import {connect} from "react-redux";
import {State} from "../store";
import {selectPost} from "../store/posts/actions";

export interface PostListState {
    nodes: ITreeNode[];
}

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

export class PostList extends React.Component<PostListProps, PostListState> {
    state: PostListState = {
        nodes: transformPosts(this.props.posts, this.props.selectedPostId)
    };

    handleNodeClick = (nodeData: ITreeNode, _nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
        const originallySelected = nodeData.isSelected;
        if (!e.shiftKey) {
            if (this.state?.nodes) {
                this.forEachNode(this.state.nodes, n => (n.isSelected = false));
            }
        }
        nodeData.isSelected = originallySelected == null ? true : !originallySelected;
        this.setState(this.state);

        this.props.selectPost(Number(nodeData.id));
    };

    handleNodeCollapse = (nodeData: ITreeNode) => {
        nodeData.isExpanded = false;
        this.setState(this.state);
    };

    handleNodeExpand = (nodeData: ITreeNode) => {
        nodeData.isExpanded = true;
        this.setState(this.state);
    };

    forEachNode = (nodes: ITreeNode[] | undefined, callback: (node: ITreeNode) => void) => {
        if (nodes == null) {
            return;
        }

        for (const node of nodes) {
            callback(node);
            this.forEachNode(node.childNodes, callback);
        }
    };

    render() {
        return (
            <Tree
                contents={this.state.nodes}
                onNodeClick={this.handleNodeClick}
                onNodeCollapse={this.handleNodeCollapse}
                onNodeExpand={this.handleNodeExpand}
                className={Classes.ELEVATION_0}
            />
        );
    }
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