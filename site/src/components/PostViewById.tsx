import React, {useEffect, useState} from 'react';
import {Post} from "../store/posts/types";
import PostView from "./PostView";
import {useParams} from "react-router";
import {State} from "../store";
import {connect} from "react-redux";

type PostViewByIdProps = {
    postsById: { [key: string]: Post }
}

function PostViewById({postsById}: PostViewByIdProps) {
    const [post, setPost] = useState<Post | undefined>(undefined);

    let {id} = useParams();

    useEffect(() => {
        if (!id) {
            return;
        }

        let postId: string = id;
        if (postsById.hasOwnProperty(postId)) {
            let post = postsById[postId];
            setPost(post);
        }
    }, [id]);

    if (!post) {
        return (
            <div>Invalid post ID</div>
        );
    }
    console.log("RENDER POST: ", post)
    return (
      <PostView post={post}/>
    );
}

const mapState = (state: State) => ({
    postsById: state.posts.posts.byId
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

export default connector(PostViewById);