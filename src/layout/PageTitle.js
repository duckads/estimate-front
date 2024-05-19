import React, { } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTags} from "@fortawesome/free-solid-svg-icons";


const PageTitle = (props) => {
    return (
        <div style={{
            border: '1px solid rgb(235, 237, 240)',
            padding : 5,
            textAlign : "left",
            marginBottom : 10
        }}>
            <div><FontAwesomeIcon icon={faTags} style={{marginRight:10}} />{props.title}</div>
            <span>{props.subtitle}</span>
        </div>
    );
};
export default PageTitle;