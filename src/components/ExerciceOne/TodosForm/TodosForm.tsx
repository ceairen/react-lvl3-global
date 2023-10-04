import { useState } from "react";
import { useStorage } from "../../../store/StorageContext";

export default function TodosForm() {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoError, setTodoError] = useState<string | null>(null);

  const { setStorageItem } = useStorage();

  function checkTitle(): boolean {
    setTodoError((todoError) => null);
    if (todoTitle === "") {
      setTodoError((todoError) => "Title could not be null.");
      return false;
    }
    return true;
  }

  function handleUpdateTodosSecond() {
    if (!checkTitle()) return;
    setStorageItem({
      key: "todos2",
      value: todoTitle,
    });
  }

  function handleUpdateTodos() {
    if (!checkTitle()) return;
    setStorageItem({
      key: "todos",
      value: todoTitle,
    });
  }

  return (
    <div>
      <div>
        {todoError && <p>{todoError}</p>}
        <input
          type="text"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <button onClick={handleUpdateTodos}>Add todos</button>
        <button onClick={handleUpdateTodosSecond}>Add todos 2</button>
      </div>
    </div>
  );
}
