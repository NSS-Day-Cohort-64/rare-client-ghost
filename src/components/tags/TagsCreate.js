import React, { useState } from "react";

const CreateTag = () => {
    const [tagName, setTagName] = useState("");

    const CreateTagName = (event) => {
        setTagName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create the new tag object
        const newTag = {
            label: tagName,
        };

        // Send a POST request to the API to add the new tag
        fetch("http://localhost:8088/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTag),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Tag added successfully:", data);
                // Reset the form fields after successful submission
                setTagName("");
            })
            .catch((error) => {
                console.error("Error adding tag:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <label>
                Tag Name:
                <input
                    type="text"
                    value={tagName}
                    onChange={CreateTagName}
                />
            </label>
            <br />
            <div className="button-container">
                <button type="submit">Create</button>
            </div>
        </form>
    );
};

export default CreateTag;
