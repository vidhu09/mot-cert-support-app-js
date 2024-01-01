import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from './AppHeader';
import UserAPI from '../requests/UserApi';

function ManageUsers() {

    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username : '',
        email : '',
        password : '',
        role : 'user'
    });
    const [error, setError] = useState(null);

    const onChange = (e) => {
        const { id, value } = e.target;
        setNewUser({ ...newUser, [id]: value });
    }

    const createUser = (e) => {
        e.preventDefault();
        UserAPI.createUser(localStorage.getItem('token'), newUser, (user, error) => {
            if(error) {
                setError(error);
            } else {
                setNewUser({
                    username : '',
                    email : '',
                    password : '',
                    role : 'User'
                });
                setError(null);
            }
        });
    }

    const deleteUser = (userId) => {
        UserAPI.deleteUser(localStorage.getItem('token'), userId, (response, error) => {
            if(response) {
                setError('');
            } else {
                setError(error);
            }
        });
    }

    useEffect(() => {
        UserAPI.getUsers(localStorage.getItem('token'), (users) => setUsers(users));
    }, []);

    return (
        <div className="container">
            <AppHeader />
            <div className="row mt-2">
                <div className="col-8">
                    <div className="card">
                        <div className="card-body">
                        <h2 className="card-title"><Link to="/projects">Projects</Link> &#62; Manage Users</h2>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">User Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className='card'>
                        <div className='card-body'>
                            <h2 className='card-title'>Add User</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="username">User Name</label>
                                    <input type="text" className="form-control" id="username" value={newUser.username} onChange={onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" value={newUser.email} onChange={onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" value={newUser.password} onChange={onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role">Role</label>
                                    <select className="form-control" id="role" value={newUser.role} onChange={onChange}>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={createUser}>Create</button>

                                {error && <div className="alert alert-danger mt-2">{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageUsers;