import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingValue, setEditingValue] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
      setShowConfirmation(true);
    }
  }

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setShowConfirmation(true);
  }

  const startEditing = (index, text) => {
    setEditingIndex(index);
    setEditingValue(text);
  }

  const saveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editingValue;
    setTasks(updatedTasks);
    setEditingIndex(-1);
  }

  const cancelEdit = () => {
    setEditingIndex(-1);
  }

  const handleClose = () => {
    setShowConfirmation(false);
  }

  return (
    <div>
      <h1>Todo list</h1>
      <div className="input-container">
        <input
          className="nueva_tarea"
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="agregar" onClick={addTask}>
          <FontAwesomeIcon icon={faCheck} /> Agregar
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={task.completed ? "completado" : ""}
          >
            {editingIndex === index ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                />
                <div className="edit-buttons">
                  <button onClick={() => saveEdit(index)}>
                    <FontAwesomeIcon icon={faSave} />
                  </button>
                  <button onClick={cancelEdit}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="task-container">
                <span
                  onClick={() => completeTask(index)}
                  style={{ textDecoration: task.completed ? "line-through" : "none", cursor: "pointer" }}
                >
                  {task.text}
                </span>
                <div className="task-buttons">
                  <button className="boton-eliminar" onClick={() => deleteTask(index)}>
                    <FontAwesomeIcon icon={faTimes}/>
                  </button>
                  <button className="boton-editar" onClick={() => startEditing(index, task.text)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <Modal show={showConfirmation} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tarea {tasks.length > 0 ? "agregada" : "eliminada"} con éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tasks.length > 0 ? (
            <p>¡La nueva tarea se agregó con éxito!</p>
          ) : (
            <p>¡La tarea se eliminó con éxito!</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Todo;

