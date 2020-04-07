import React, {useMemo} from 'react';
import styled from 'styled-components'
import {State} from "../store";
import {connect} from "react-redux";
import {Post} from "../store/posts/types";
import "./PostsEditor.css"
import Table from "./Table";
import {deletePostsThunk} from "../store/posts/thunks";

PostsEditor.propTypes = {};

type PostsEditorProps = {
    posts: Post[]
    deletePosts: (posts: Post[]) => void;
};


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    width: 100%;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function PostsEditor({posts, deletePosts}: PostsEditorProps) {
    const columns = useMemo(
        () => [
            {
                Header: 'PostId',
                accessor: 'postId', // accessor is the "key" in the data
            },
            {
                Header: 'Author ID',
                accessor: 'authorUserId',
            },
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Content',
                accessor: 'content',
            },
        ],
        []
    );

    const data = React.useMemo(
        () => posts,
        [posts]
    );

    return (
        <div className="posts-table">
            <Styles>
                <Table data={data} columns={columns} deleteRows={deletePosts}/>
            </Styles>
        </div>
    );
}

const mapState = (state: State) => ({
    posts: state.posts.posts.allIds.map(id => state.posts.posts.byId[id]),
});

const mapDispatch = {
    deletePosts: (posts: Post[]) => deletePostsThunk(posts.map(post => post.id))
};

const connector = connect(mapState, mapDispatch);

export default connector(PostsEditor);