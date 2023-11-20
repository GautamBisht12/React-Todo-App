import { useState } from "react";
import { MdDelete,MdEdit } from "react-icons/md";
import styled from "styled-components";

import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);



  const submitHandler = (e) => {
    e.preventDefault();
    if (editIndex !== -1) {
      // If editIndex !== -1, it means it's an edit action
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = { title, desc };
      setTodos(updatedTodos);
      setTitle("");
      setDesc("");
      setEditIndex(-1);
    } else {
      if(title === ""  || desc === ""){
        alert("Title or Description cant't be empty" )
        return ;
      }
      // If editIndex === -1, it's a new todo
      setTodos([...todos, { title, desc }]);
      setTitle("");
      setDesc("");
    }
  };

  const handleDelete = (index) => {
    const copyTodos = [...todos];
    copyTodos.splice(index, 1);
    setTodos(copyTodos);
  };

  const handleEdit = (index) => {
    const todoToEdit = todos[index];
    setTitle(todoToEdit.title);
    setDesc(todoToEdit.desc);
    setEditIndex(index);
  };

  return (
    <>
      <div className="main">
        <h1>Todo List</h1>

        <div className="form">
          <form onSubmit={submitHandler}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="title"
              type="text"
              placeholder="Enter a Todo Title"
            />
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="desc"
              type="text"
              placeholder="Enter a Todo Description"
            />

            <button>Add</button>
          </form>
        </div>
        <div className="showTodo">
          <ul>
            { todos.length > 0 ? 
              todos.map((todo, index) => (
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={index}
              >
                <div>
                  <h3>{todo.title}</h3>
                  <p>{todo.desc}</p>
                </div>
                <div className="btn">
                  <DelButton  onClick={() => handleDelete(index)}>
                    <MdDelete color="red" size={30} />
                  </DelButton>
                  <DelButton onClick={() => handleEdit(index)}>
                    <MdEdit color="green" size={30} />
                  </DelButton>
                </div>
              </li>
            )) : <h3>No Todos here</h3>}
          </ul>
        </div>
      </div>
    </>
  );
}
const DelButton = styled("button")`
  margin-right: 5px;
  padding: 5px 20px;
  background-color: transparent;
  border: none;
  border-radius: 10px;

  &:hover {
    scale: 1.5;
    cursor: pointer;
  }
`;

export default App;
