import React, { useState } from 'react';
import { Users , LogOut, SquarePen, Trash2, UserRoundCog, House, CircleUserRound, BadgeHelp, PersonStanding, UserSearch } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [UserId, setUserId] = useState([]);
  const [roles, setRoles] = useState([
    { id: 1, name: 'DA-Manager', permissions: ['manager'] },
    { id: 2, name: 'Claims', permissions: [ 'admin'] },
    { id: 3, name: 'DA & Claims', permissions: ['super admin'] },
    { id: 4, name: 'Help desk', permissions: ['tech support'] },
    { id: 5, name: 'Networks', permissions: ['admin'] },
    { id: 6, name: 'Directory', permissions: ['super admin']},
    { id: 7, name: 'CTO', permissions: ['manager']}
  ]);
  const [activeTab, setActiveTab] = useState('users');
  const [newUser  , setNewUser  ] = useState({ id: null, name: '', email: '', role: '', dateTimeAdded: '' });
  const [newRole, setNewRole] = useState({ id: null, name: '', permissions: [] });
  const [editUserId, setEditUserId] = useState(null);
  const [editRoleId, setEditRoleId] = useState(null);
  const [searchUser  , setSearchUser  ] = useState('');
  const [searchRole, setSearchRole] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  const allPermissions = ['user', 'admin', 'manager', 'super admin','tech support'];

  // User Management Functions
  const generateUserId = () => {
    const existingIds = users.map(user => user.id); // Get existing user IDs
    let userId;
  
    do {
      const letters = String.fromCharCode(Math.floor(Math.random() * 26) + 65) + 
                      String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Generate two random uppercase letters
      const numbers = Math.floor(1000 + Math.random() * 9000); // Generate a random four-digit number
      userId = letters + numbers; // Combine letters and numbers
    } while (existingIds.includes(userId)); // Ensure uniqueness
  
    return userId;
  };
  
  const addUser   = (e) => {
    e.preventDefault();
    if (!newUser  .name || !newUser  .email || !newUser  .role) {
      toast.error("All fields are required!");
      return;
    }
    
    const currentDateTime = new Date().toLocaleString(); // Capture current date and time

    if (editUserId !== null) {
      setUsers(users.map(user => (user.id === editUserId ? { ...newUser  , id: editUserId, dateTimeAdded: currentDateTime } : user)));
      toast.success("User   updated successfully!");
      setEditUserId(null);
    } else {
      const UserId = generateUserId();
      setUsers([...users, { ...newUser  , id: UserId, dateTimeAdded: currentDateTime }]);
      toast.success("User   added successfully!");
    }
    setNewUser  ({ id: null, name: '', email: '', role: '', dateTimeAdded: '' });
  };

  const deleteUser   = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== userId));
      toast.success("User   deleted successfully!");
    }
  };

  const editUser  = (user) => {
    setNewUser  (user);
    setEditUserId(user.id);
  };

  // Role Management Functions
  const addRole = (e) => {
    e.preventDefault();
    if (!newRole.name || newRole.permissions.length === 0) {
      toast.error("Role name and permissions are required!");
      return;
    }
      

    if (editRoleId !== null) {
      setRoles(roles.map(role => (role.id === editRoleId ? { ...newRole, id: editRoleId } : role)));
      toast.success("Role updated successfully!");
      setEditRoleId(null);
    } else {
      setRoles([...roles, { ...newRole, id: roles.length + 1 }]);
      toast.success("Role added successfully!");
    }
    setNewRole({ id: null, name: '', permissions: [] });
  };

  const deleteRole = (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter(role => role.id !== roleId));
      toast.success("Role deleted successfully!");
    }
  };

  const editRole = (role) => {
    setNewRole(role);
    setEditRoleId(role.id);
  };

  const togglePermission = (permission) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen dashboard-background font-sans">
      <ToastContainer />
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4"><center>
              <UserRoundCog size={60} className="h-30 w-30 text-blue-500" />&nbsp;&nbsp;&nbsp;
              <span className="enlarged-text text-3xl font-bold text-gray-800">Admin Dashboard</span></center>
            </div>
            <nav class="navbar">
              <div class="navbar-menu">
                <div class="hamburger" onclick="toggleMenu()">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <ul class="nav-links">
                  <House className="h-5 w-5" />
                  <li><a href="App">Home</a></li>
                  <CircleUserRound className="h-5 w-5" />
                  <li><a href="Admin.">Admin Data</a></li>
                  <UserRoundCog className="h-5 w-5" />
                  <li><a href="Props">Control props</a></li>
                  <BadgeHelp className="h-5 w-5" />
                  <li><a href="Support" >Tech support</a></li>
                </ul>
              </div>
            </nav>
            <script src="script.js"></script>
          <div className="flex items-center space-x-2">
            <LogOut size={40} className="h-5 w-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <center>
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out ${
              activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-100'
            }`}
          >
            <Users size={35} className="h-5 w-5" />
            <span class="usersmenu">&nbsp;&nbsp;Users</span>
          </button>
          &nbsp;&nbsp;
          <button 
            onClick={() => setActiveTab('roles')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out ${
              activeTab === 'roles' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-100'
            }`}
          >
            <PersonStanding size={35} className="h-5 w-5" />
            <span class="rolesmenu">&nbsp;&nbsp;Roles</span>
          </button>
          </center>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white w-full border rounded-lg rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6"><center>Manage Users</center></h2>
            {/* Search User */}
            <input
              type="text"
              placeholder="Search Users"
              value={searchUser }
              onChange={(e) => setSearchUser (e.target.value)}
              className="border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-300"
            />
            <br></br>
            <br></br>
            {/* Add/Edit User Form */}
            <form onSubmit={addUser } className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
              <input
                type="text"
                placeholder="Name"
                value={newUser .name}
                onChange={(e) => setNewUser ({ ...newUser , name: e.target.value })}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser  .email}
                onChange={(e) => setNewUser  ({ ...newUser  , email: e.target.value })}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300"
              />
              <select
                value={newUser  .role}
                onChange={(e) => setNewUser  ({ ...newUser  , role: e.target.value })}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select Role</option>
                {roles.map(role => (
                  <option key={role.id} value={role.name}>{role.name}</option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-md"
              >
                {editUserId ? 'Update User' : 'Add User'}
              </button>
            </form>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full border rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium w-1/4">USER ID</th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium w-1/4">NAME</th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium w-1/4">EMAIL</th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium w-1/4">ROLE</th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium w-1/4">ADDED DATE & TIME</th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium w-1/4">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(user => user.name.toLowerCase().includes(searchUser .toLowerCase())).map(user => (
                    <tr key={user.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-6 py-3">{user.id}</td>
                      <td className="px-6 py-3">{user.name}</td>
                      <td className="px-6 py-3">{user.email}</td>
                      <td className="px-6 py-3">{user.role}</td>
                      <td className="px-6 py-3">{user.dateTimeAdded}</td>
                      <td className="px-6 py-3 space-x-2">
                        <button
                          onClick={() => editUser (user)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <SquarePen className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => deleteUser (user.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6"><center>Manage Roles</center></h2>
            {/* Search Role */}
            <input
              type="text"
              placeholder="Search Roles"
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
              className="border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-300"
            />
            <br></br>
            <br></br>
            {/* Add/Edit Role Form */}
            <form onSubmit={addRole} className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <input
                type="text"
                placeholder="Role Name"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                className="border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-300"
              />
              <br></br>

              {/* Permissions Section */}
              <div>
                <h3 className="text-sm font-medium text-gray-800 mb-2">Access Level</h3>
                <div className="grid grid-cols-2 gap-2">
                  {allPermissions.map(permission => (
                    <label key={permission} className="flex items-center space-x- 2">
                      <input
                        type="radio"
                        name="permission"
                        value={permission}
                        checked={newRole.permissions.includes(permission)}
                        onChange={() => togglePermission(permission)}
                        className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400 rounded"
                      />

                      <span className="text-sm">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
              <br></br>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-2 py-1 text-l w-24 rounded-md hover:bg-blue-600 shadow-sm"
              >
                {editRoleId ? 'Update Role' : 'Add Role'}
              </button>
            </form>

            {/* Roles Table */}
            <div className="overflow-x-auto">
              <table className="w-full border rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium">Role Name</th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium">Access Level</th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.filter(role => role.name.toLowerCase().includes(searchRole.toLowerCase())).map(role => (
                    <tr key={role.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-6 py-3">{role.name}</td>
                      <td className="px-6 py-3">
                        {role.permissions.length > 0
                          ? role.permissions.join(', ')
                          : 'No Permissions'}
                      </td>
                      <td className="px-6 py-3 space-x-2">
                        <button
                          onClick={() => editRole(role)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <SquarePen className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => deleteRole(role.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;