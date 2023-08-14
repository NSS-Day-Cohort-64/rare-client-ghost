import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateTag from './TagsCreate';
import TagsList from './tagsList'; 
import { NavBar } from '../nav/NavBar';
import "./TagsList.css";

const TagsPage = () => {
    return (
        <div>
            <div className='background-image'></div>
            <h1>
                <Link to="/TagsList">Tags</Link>
            </h1>
            <h2>Tags Page</h2>
            <CreateTag />
            <TagsList />
        </div>
    );
};

export default TagsPage;
