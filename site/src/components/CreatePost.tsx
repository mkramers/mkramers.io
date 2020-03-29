import React, {useState} from 'react';
import {connect} from "react-redux";
import "./CreatePost.css";
import {Button, Card, Elevation, InputGroup, TextArea} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import {createPostThunk} from "../store/posts/thunks";
import {Post} from "../store/posts/types";

type CreatePostProps = {
    createPost: (post: Post) => void
};

function CreatePost({createPost}: CreatePostProps) {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    let handleSubmit = () => {
        let post = {
            postId: 666,
            authorUserId: 1,
            title,
            content,
        };
        createPost(post);
    };

    return (
        <Card interactive={true} elevation={Elevation.TWO} className="main">
            <h5>Create post</h5>
            <InputGroup
                onChange={(e: any) => setTitle(e.target.value)}
                placeholder="Title"
                value={title}
            />
            <TextArea
                className="text-area"
                intent={Intent.PRIMARY}
                onChange={(e) => setContent(e.target.value)}
                value={content}
            />
            <Button onClick={handleSubmit}>Submit</Button>
        </Card>
    );
}

const mapState = () => ({});

const mapDispatch = {
    createPost: (post: Post) => createPostThunk(post)
};

const connector = connect(mapState, mapDispatch);

export default connector(CreatePost);