import React from 'react';
import {Classes, Icon, ITreeNode, Tooltip, Tree} from "@blueprintjs/core";

export interface ITreeExampleState {
    nodes: ITreeNode[];
}

export class PostList extends React.Component<ITreeExampleState> {
    public state: ITreeExampleState = {nodes: INITIAL_STATE};

    handleNodeClick = (nodeData: ITreeNode, _nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
        const originallySelected = nodeData.isSelected;
        if (!e.shiftKey) {
            if (this.state?.nodes) {
                this.forEachNode(this.state.nodes, n => (n.isSelected = false));
            }
        }
        nodeData.isSelected = originallySelected == null ? true : !originallySelected;
        this.setState(this.state);
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
                {/*{posts.map(post => {*/}
                {/*    return (*/}
                {/*        <div>post.content</div>*/}
                {/*    )*/}
                {/*})}*/}
            </div>
        );
    }
}

/* tslint:disable:object-literal-sort-keys so childNodes can come last */
const INITIAL_STATE: ITreeNode[] = [
    {
        id: 0,
        hasCaret: true,
        isExpanded: true,
        icon: "folder-close",
        label: "Blogs",
        childNodes: [
            {
                id: 0,
                icon: "document",
                label: "Mar 15, 2020"
            }
        ]
    },
    {
        id: 1,
        icon: "folder-close",
        isExpanded: true,
        label: "Releases",
        childNodes: [
            {
                id: 1,
                icon: "document",
                label: "v1.0.0",
                secondaryLabel: (
                    <Tooltip content="An eye!">
                        <Icon icon="eye-open"/>
                    </Tooltip>
                ),
            },
        ],
    },
];
/* tslint:enable:object-literal-sort-keys */

export default PostList;