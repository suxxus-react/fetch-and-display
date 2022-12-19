import { useState, useEffect } from "react";

import "./App.css";
import "./styles.scss";

// types
// ------

type Role = {
  id: number;
  role: string;
};

type User = {
  name: string;
  id: number;
  roles?: Role[];
};

type Users = User[];

type State = {
  users: Users;
  setUsers: React.Dispatch<React.SetStateAction<Users>>;
};

// helpers
// --------

// components
// ----------

function RenderDataTable({ users }: State): JSX.Element {
  console.log(users);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Roles</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={`user_${user.id}`}>
            <td>{user.name}</td>
            {user?.roles && user.roles.length >= 1 ? (
              <td>{user.roles.map((r) => r.role).join(", ")}</td>
            ) : (
              <td>-</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  const [users, setUsers] = useState<Users>([]);

  const p: State = {
    users,
    setUsers,
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await fetch("/data.json");
      const response: Users = await data.json();
      setUsers(response);
    };

    fetchUserData();
  }, []);

  return (
    <div className="App">
      <RenderDataTable {...p} />
      <img
        className="App-avatar"
        src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
      />
    </div>
  );
}

export default App;
