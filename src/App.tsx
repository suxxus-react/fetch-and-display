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

// components
// ----------

function RenderDataTable({ users }: State): JSX.Element {
  const headerKeys = [...new Set(users.map(Object.keys).flat())];

  return (
    <table>
      <thead>
        <tr>
          {headerKeys.map((k, i) => (
            <td key={`h_${i}`}>{k}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={`user_${user.id}`}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user?.roles?.map((r) => r.role).join(", ")}</td>
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
