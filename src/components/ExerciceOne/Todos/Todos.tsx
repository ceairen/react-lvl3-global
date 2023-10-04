import { useEffect, useState } from "react";
import { useStorage } from "../../../store/StorageContext";

export default function Todos() {
  const { getStorageItem, rmStorageItem, storage } = useStorage();

  const [todos, setTodos] = useState<string[] | null>(null);
  const [todosSecond, setTodosSecond] = useState<string[] | null>(null);

  function loadTodos() {
    const item = getStorageItem("todos");
    setTodos((todos) => (item === null ? null : item.value));
    const item2 = getStorageItem("todos2");
    setTodosSecond((todosSecond) => (item2 === null ? null : item2.value));
  }

  useEffect(() => {
    if (storage === undefined) return;
    loadTodos();
  }, [storage]);

  function handleClearTodos() {
    rmStorageItem("todos");
  }

  function handleClearTodosSecond() {
    rmStorageItem("todos2");
  }

  return (
      <div>
        <div>
          {todos && (
            <>
              <h2>Todos 1</h2>
              <ul>
                {todos.map((todo, todoIndex) => {
                  return <li key={todoIndex}>{todo}</li>;
                })}
              </ul>
              <button onClick={handleClearTodos}>Clear</button>
            </>
          )}
        </div>
        <div>
          {todosSecond && (
            <>
              <h2>Todos 2</h2>
              <ul>
                {todosSecond.map((todo, todoIndex) => {
                  return <li key={todoIndex}>{todo}</li>;
                })}
              </ul>
              <button onClick={handleClearTodosSecond}>Clear</button>
            </>
          )}
        </div>
      </div>
  );
}
