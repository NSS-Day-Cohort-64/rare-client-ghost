import React, { useState, useEffect } from 'react';

const TagsList = () => {
    const [tags, setTags] = useState([]);
    const [editTagId, setEditTagId] = useState(null);
    const [editTagLabel, setEditTagLabel] = useState('');

    useEffect(() => {
        fetch('http://localhost:8088/tags')
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.label.localeCompare(b.label)); /* ordering tags by label, 
                                                             not name as in the previous example */
                setTags(data);
            });
    }, []);

    const handleEdit = (id, label) => {
        setEditTagId(id);
        setEditTagLabel(label);
    };

    const handleSave = (id) => {
        const updatedTag = {
            label: editTagLabel // Changing name to label as per new information about Tags
        };

        fetch(`http://localhost:8088/tags/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTag)
        })
            .then(response => response.json())
            .then(updatedTag => {
                setTags(prevTags =>
                    prevTags.map(tag =>
                        tag.id === updatedTag.id ? updatedTag : tag
                    )
                );
                setEditTagId(null);
                setEditTagLabel('');
                console.log('Tag updated successfully');
            })
            .catch(error => {
                console.error('Error updating tag:', error);
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8088/tags/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setTags(prevTags => prevTags.filter(tag => tag.id !== id));
                console.log('Tag deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting tag:', error);
            });
    };

    return (
        <div>
            <h3>Tag List</h3>
            <ul>
                {tags.map(tag => (
                    <li key={tag.id}>
                        {editTagId === tag.id ? (
                            <form onSubmit={() => handleSave(tag.id)}>
                                <input
                                    type="text"
                                    value={editTagLabel} /* Editing label, not name as in the previous example */
                                    onChange={e => setEditTagLabel(e.target.value)}
                                    autoFocus
                                />
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditTagId(null)}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                {tag.label} {/* Displaying tag label, not name as in the previous example */}
                                <button onClick={() => handleEdit(tag.id, tag.label)}>Edit</button>
                                <button onClick={() => handleDelete(tag.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TagsList;
