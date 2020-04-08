import React, {useEffect, useState} from 'react';
import {Post} from "../store/posts/types";
import PostView from "./PostView";
import {useParams} from "react-router";
import {State} from "../store";
import {connect} from "react-redux";
import {denormalizePosts} from "../store/posts/normalizePosts";
import {selectPost} from "../store/posts/actions";

type PostViewByIdProps = {
    postsById: { [key: string]: Post };
    selectPost: (postId: number) => void;
}

function SelectedPostView({postsById, selectPost}: PostViewByIdProps) {
    const [post, setPost] = useState<Post | undefined>(undefined);

    let {id} = useParams();

    useEffect(() => {
        if (!id) {
            return;
        }

        let postId: number = parseInt(id);
        if (postsById.hasOwnProperty(postId)) {
            let posts = denormalizePosts(postsById, [postId]);
            setPost(posts[0]);
            selectPost(posts[0].id)
        }
    }, [id]);

    if (!post) {
        return (
            <div>Invalid post ID</div>
        );
    }

    return (
      <PostView post={post}/>
    );
}

const mapState = (state: State) => ({
    postsById: state.posts.posts.byId
});

const mapDispatch = {
    selectPost: (id: number) => selectPost(id)
};

const connector = connect(mapState, mapDispatch);

export default connector(SelectedPostView);