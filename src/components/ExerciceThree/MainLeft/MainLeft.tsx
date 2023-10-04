import { useEffect, useState } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import "./MainLeft.css";

export type CustomUser = {
  name: string;
};

export default function MainLeft() {
  const [users, setUsers] = useState<CustomUser[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<CustomUser | null>(null);

  async function loadUsers() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url);
    const responseUsers = await response.json();
    setUsers(
      responseUsers.map((response: CustomUser) => {
        return {
          name: response.name,
        };
      })
    );
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <div>
        <label>
          {selectedUser === null ? "Choisir un user" : selectedUser.name}
        </label>
        {users !== null && (
          <CustomSelect
            customPlaceholder="Search any user..."
            data={users}
            dataFilteredKey={"name"}
            dataSelected={setSelectedUser}
          />
        )}
      </div>
    </div>
  );
}
