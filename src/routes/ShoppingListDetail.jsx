// src/routes/ShoppingListDetail.js

import React, { useState } from 'react';
import './ShoppingListDetail.css';

// Mock data for the shopping list
const shoppingListData = {
  id: 1,
  name: 'Grocery List',
  owner: 'user1', // Set the owner as user1
  members: ['user1', 'user2', 'user3'], // List of members including the owner
  items: [
    { id: 1, name: 'Milk', completed: false },
    { id: 2, name: 'Bread', completed: true },
    { id: 3, name: 'Eggs', completed: false },
  ],
};

function ShoppingListDetail() {
  const [list, setList] = useState(shoppingListData);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(list.name);
  const [newMember, setNewMember] = useState('');
  const [newItem, setNewItem] = useState('');
  const [showResolved, setShowResolved] = useState(false);

  const currentUser = 'user2'; // Example current user

  const handleNameChange = () => {
    setList((prevList) => ({ ...prevList, name: newName }));
    setIsEditingName(false);
  };

  const handleAddMember = () => {
    if (newMember.trim() && !list.members.includes(newMember)) {
      setList((prevList) => ({
        ...prevList,
        members: [...prevList.members, newMember],
      }));
      setNewMember('');
    }
  };

  const handleRemoveMember = (member) => {
    setList((prevList) => ({
      ...prevList,
      members: prevList.members.filter((m) => m !== member),
    }));
  };

  const handleLeaveList = () => {
    setList((prevList) => ({
      ...prevList,
      members: prevList.members.filter((m) => m !== currentUser),
    }));
  };

  // Adding items
  const addItem = () => {
    if (newItem.trim()) {
      const newItemObj = { id: Date.now(), name: newItem, completed: false };
      setList((prevList) => ({
        ...prevList,
        items: [...prevList.items, newItemObj],
      }));
      setNewItem('');
    }
  };

  // Removing items
  const removeItem = (id) => {
    setList((prevList) => ({
      ...prevList,
      items: prevList.items.filter((item) => item.id !== id),
    }));
  };

  // Toggling item completion
  const toggleItemCompletion = (id) => {
    setList((prevList) => ({
      ...prevList,
      items: prevList.items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  // Filter items based on completion
  const filteredItems = list.items.filter(
    (item) => showResolved || !item.completed
  );

  return (
    <div className="shopping-list-container">
      <h1>
        {isEditingName && currentUser === list.owner ? (
          <>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleNameChange}>Save</button>
          </>
        ) : (
          list.name
        )}
        {currentUser === list.owner && !isEditingName && (
          <button onClick={() => setIsEditingName(true)}>Edit</button>
        )}
      </h1>

      {/* Section to manage members (only shown to the owner) */}
      {currentUser === list.owner && (
        <div className="member-management">
          <h2>Manage Members</h2>
          <input
            type="text"
            placeholder="Enter member name"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
          />
          <button onClick={handleAddMember}>Add Member</button>
          <ul>
            {list.members.map((member) => (
              <li key={member}>
                {member}
                {member !== list.owner && (
                  <button onClick={() => handleRemoveMember(member)}>
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* "Leave List" button for members who are not the owner */}
      {currentUser !== list.owner && list.members.includes(currentUser) && (
        <button className="leave-button" onClick={handleLeaveList}>
          Leave List
        </button>
      )}

      {/* Item Management Section */}
      <h2>Items</h2>
      <label>
        <input
          type="checkbox"
          checked={showResolved}
          onChange={(e) => setShowResolved(e.target.checked)}
        />
        Show Completed
      </label>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            {item.name} {item.completed && "✓"}
            <button onClick={() => toggleItemCompletion(item.id)}>
              {item.completed ? "Unmark" : "Mark"} as Done
            </button>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default ShoppingListDetail;
