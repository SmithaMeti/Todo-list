// import React from "react";

// function Edit() {
//     return (
//         <></>
//     )
// }
// export default Edit;

// src/components/Edit.js
import React, { useState, useEffect } from 'react';

function Edit({
    item,         // The text of the todo item
    index,        // The index of the item in the parent's array (or a unique ID)
    isEditing,    // Boolean from parent: is THIS item currently the one being edited?
    onDelete,     // Function from parent to delete this item
    onEditClick,  // Function from parent to signal that this item should enter edit mode
    onSave,       // Function from parent to save the edited text
    onCancel      // Function from parent to cancel editing
}) {
    // Local state for the input field value ONLY when in edit mode
    const [currentEditText, setCurrentEditText] = useState(item);

    // Effect to update local state if the parent changes the item text (e.g., initial load or after save/cancel)
    useEffect(() => {
      setCurrentEditText(item);
    }, [item]);


    // Handle input change within the edit field
    const handleInputChange = (e) => {
        setCurrentEditText(e.target.value);
    };

    // Handle saving (calls the parent's onSave function)
    const handleSave = () => {
        // Optionally add validation here before calling onSave
        if (currentEditText.trim() !== "") {
            onSave(index, currentEditText); // Pass index and the new text up to parent
        } else {
             // Handle empty save (e.g., delete the item or alert)
             onDelete(index); // Example: delete if saved as empty
        }
    };

    // Handle deleting (calls the parent's onDelete function)
    const handleDelete = () => {
        onDelete(index); // Pass index up to parent
    };

    // Handle initiating edit mode (calls the parent's onEditClick function)
    const handleEdit = () => {
        onEditClick(index); // Pass index up to parent
    };

    // Handle canceling edit mode (calls the parent's onCancel function)
     const handleCancel = () => {
        // Reset local state to original item text on cancel
        setCurrentEditText(item);
        onCancel(); // Signal parent to exit edit mode
    };


    return (
        <li className="todo-item"> {/* Still use <li> here */}
            {isEditing ? ( // Check the prop from parent
                // --- Render in Edit Mode ---
                <>
                    <input
                        type="text"
                        value={currentEditText} // Controlled by local state
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                // --- Render in Display Mode ---
                <>
                    <p>{item}</p> {/* Display the item text */}
                    <button onClick={handleEdit}>edit</button> {/* Calls local handler which calls parent prop */}
                    <button onClick={handleDelete}>delete</button> {/* Calls local handler which calls parent prop */}
                </>
            )}
        </li>
    );
}

export default Edit;