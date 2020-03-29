import React from 'react';
import {connect} from "react-redux";
import "./MainPage.css";

type CreatePostProps = {
};

function CreatePost({}: CreatePostProps) {
    return (
        <div className="page-main">
            Create!
        </div>
    );
}

const mapState = () => ({
});

const mapDispatch = {
};

const connector = connect(mapState, mapDispatch);

export default connector(CreatePost);