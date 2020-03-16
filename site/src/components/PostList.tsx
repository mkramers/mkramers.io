import React from 'react';
import {Classes, ITreeNode, Tree} from "@blueprintjs/core";
import {Post} from "../types/Post";
import {connect} from "react-redux";
import {RootState} from "../store";
import {selectPost} from "../store/posts/actions";

export interface PostListState {
    nodes: ITreeNode[];
}

type PostListProps = {
    posts: Post[],
    selectPost: (id: number) => void

};

let transformPosts = (posts: Post[]) => {
    let postNodes = posts.map((post, index) => {
        let postTreeNode: ITreeNode = {
            id: index,
            icon: "document",
            label: post.title
        };
        return postTreeNode;
    });

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

export class PostList extends React.Component<PostListProps, PostListState> {
    state: PostListState = {
        nodes: transformPosts(this.props.posts)
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
            <div>
                <Tree
                    contents={this.state.nodes}
                    onNodeClick={this.handleNodeClick}
                    onNodeCollapse={this.handleNodeCollapse}
                    onNodeExpand={this.handleNodeExpand}
                    className={Classes.ELEVATION_0}
                />
            </div>
        );
    }
}

const mapState = (state: RootState) => ({
    posts: state.main.posts
});

const mapDispatch = {
    selectPost: (id: number) => selectPost(id)
};

const connector = connect(mapState, mapDispatch);

export default connector(PostList);