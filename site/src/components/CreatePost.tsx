import React, {useState} from 'react';
import {connect} from "react-redux";
import "./CreatePost.css";
import {Button, Card, Elevation, InputGroup, TextArea} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";

type CreatePostProps = {};

function CreatePost({}: CreatePostProps) {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    let handleSubmit = () => {

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

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

export default connector(CreatePost);