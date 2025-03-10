import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export default function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [editing, setEditing] = useState(null);
  const [editingField, setEditingField] = useState(""); // Field being edited
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) return;
    try {
      await axios.post(API_URL, newUser);
      setNewUser({ name: "", email: "", password: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async (id, field) => {
    if (!updatedUser[field]) return;
    try {
      await axios.put(`${API_URL}/${id}`, { [field]: updatedUser[field] });
      setEditing(null);
      setEditingField("");
      setUpdatedUser({ ...updatedUser, [field]: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">
            User Management
          </h1>
          <p className="text-gray-600">
            Create, Read, Update, and Delete Users
          </p>
        </header>

        <div className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-indigo-100">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600 border-b pb-2">
            Add New User
          </h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={addUser}
              className="bg-indigo-600 text-white py-3 px-4 rounded-md w-full hover:bg-indigo-700 transition-all font-medium"
            >
              Add User
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-600 border-b pb-2">
            Users List
          </h2>

          {users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No users found. Add a new user to get started.
            </div>
          ) : (
            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition-all border border-gray-200"
                >
                  {editing === user._id ? (
                    <div className="flex flex-col md:flex-row items-center gap-3">
                      {editingField === "name" && (
                        <input
                          type="text"
                          value={updatedUser.name}
                          onChange={(e) =>
                            setUpdatedUser({
                              ...updatedUser,
                              name: e.target.value,
                            })
                          }
                          className="border border-indigo-300 p-2 rounded-md flex-1 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      )}
                      {editingField === "email" && (
                        <input
                          type="email"
                          value={updatedUser.email}
                          onChange={(e) =>
                            setUpdatedUser({
                              ...updatedUser,
                              email: e.target.value,
                            })
                          }
                          className="border border-indigo-300 p-2 rounded-md flex-1 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      )}
                      {editingField === "password" && (
                        <input
                          type="password"
                          value={updatedUser.password}
                          onChange={(e) =>
                            setUpdatedUser({
                              ...updatedUser,
                              password: e.target.value,
                            })
                          }
                          className="border border-indigo-300 p-2 rounded-md flex-1 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateUser(user._id, editingField)}
                          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditing(null);
                            setEditingField("");
                          }}
                          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {user.name}
                        </h3>
                        <p className="text-gray-600 text-sm">{user.email}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            setEditing(user._id);
                            setEditingField("name");
                            setUpdatedUser({
                              name: user.name,
                              email: user.email,
                              password: user.password,
                            });
                          }}
                          className="bg-amber-500 text-white py-1 px-3 rounded-md hover:bg-amber-600 transition-all text-sm"
                        >
                          Edit Name
                        </button>
                        <button
                          onClick={() => {
                            setEditing(user._id);
                            setEditingField("email");
                            setUpdatedUser({
                              name: user.name,
                              email: user.email,
                              password: user.password,
                            });
                          }}
                          className="bg-amber-500 text-white py-1 px-3 rounded-md hover:bg-amber-600 transition-all text-sm"
                        >
                          Edit Email
                        </button>
                        <button
                          onClick={() => {
                            setEditing(user._id);
                            setEditingField("password");
                            setUpdatedUser({
                              name: user.name,
                              email: user.email,
                              password: user.password,
                            });
                          }}
                          className="bg-amber-500 text-white py-1 px-3 rounded-md hover:bg-amber-600 transition-all text-sm"
                        >
                          Edit Password
                        </button>
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-all text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
