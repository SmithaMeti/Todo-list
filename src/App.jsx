import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [search, setSearch] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    document.body.className = darkTheme ? "dark-theme" : "light-theme";
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handle = (e) => {
    setInputText(e.target.value);
  };

  const handleAdd = () => {
    if (inputText.trim() !== "") {
      const now = new Date();
      setTodo((prev) => [...prev, { text: inputText, completed: false, createdAt: now, updatedAt: now }]);
      setInputText("");
    }
  };

  const delItem = (e) => {
    const updateTodo = todo.filter((_, index) => index !== e);
    setTodo(updateTodo);
  };

  const editItem = (indexToEdit) => {
    setEditingIndex(indexToEdit);
    setEditText(todo[indexToEdit].text);
  };

  const handleEditText = (e) => {
    setEditText(e.target.value);
  };

  const handleSaveEdit = (indexToSave) => {
    if (editText.trim() !== "") {
      const update = todo.map((item, index) => {
        if (index === indexToSave) {
          return { ...item, text: editText, updatedAt: new Date() };
        }
        return item;
      });
      setTodo(update);
      setEditText("");
      setEditingIndex(null);
    } else {
      delItem(indexToSave);
    }
  };

  const handleCancel = () => {
    setEditText("");
    setEditingIndex(null);
  };

  const clearIt = () => {
    setTodo([]);
  };

  const handleToggleComplete = (indexToToggle) => {
    const update = todo.map((item, index) => {
      if (index === indexToToggle) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodo(update);
  };

  const handleMarkAll = () => {
    const update = todo.map((item) => {
      return { ...item, completed: true };
    });
    setTodo(update);
  };

  const formatTimeStamp = (timeStamp) => {
    if(!timeStamp)
      return '';
    const date = new Date(timeStamp)
    return date.toLocaleString();
  }

  return (
    <>
      <div className="container">
        <header>
          <h2>Todo List</h2>
          <button onClick={toggleTheme}>{darkTheme ? "☀️" : "🌙"}</button>
        </header>
        <input
          type="text"
          placeholder="search ur item"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Enter ur todolist here"
          onChange={handle}
          value={inputText}
          name="items"
        />
        <button onClick={handleAdd}>add to the list</button>
        <br />
        {todo.length > 2 ? (
          <button onClick={handleMarkAll}>Mark All</button>
        ) : (
          ""
        )}
        <ul>
          {todo.map((item, index) => {
            const match = item.text
              .toLowerCase()
              .includes(search.toLowerCase());

            if (!match) {
              return null;
            }
            return (
              <div
                className={`items ${item.completed ? "completed" : ""}`}
                key={index}
              >
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={handleEditText}
                    />
                    <button onClick={() => handleSaveEdit(index)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <p key={index}>
                    <div>
                      <input
                        type="checkbox"
                        className="done"
                        onChange={() => handleToggleComplete(index)}
                        checked={item.completed}
                      />
                      <span className={item.completed ? "completed-text" : ""}>
                        {item.text}
                      </span>
                      <div className="timestamps">
                        {item.createdAt && item.createdAt.getTime() === item.updatedAt.getTime() ? (
                            <span>Added: {formatTimeStamp(item.createdAt)}</span>
                        ) :  <span> Edited: {formatTimeStamp(item.updatedAt)}</span> }
                    </div>
                      {!item.completed && (
                        <button onClick={() => editItem(index)}>edit</button>
                      )}
                      <button onClick={() => delItem(index)}>delete</button>
                    </div>
                  </p>
                )}
              </div>
            );
          })}
        </ul>
        {todo.length > 2 ? <button onClick={clearIt}>Clear All</button> : ""}
      </div>
    </>
  );
}

export default App;
