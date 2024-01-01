import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from './AppHeader';
import ProjectAPI from '../requests/ProjectApi';

function ManageProjects() {

    const [projects, setProjects] = useState([]);
    const [newProject, addProjectDetail]  = useState({});
    const [error, setError] = useState('');

    const onChange = (e) => {
        const { id, value } = e.target;
        addProjectDetail({ ...newProject, [id]: value });
    }

    const addProject = (e) => {
        e.preventDefault();
        ProjectAPI.createProject(localStorage.getItem('token'), newProject, (response, error) => {
            if(response) {
                setProjects([...projects, newProject]);
                addProjectDetail({ name : '', description : '' });
                setError('');
            } else {
                setError(error);
            }
        });
    }

    const deleteProject = (projectId) => {
        ProjectAPI.deleteProject(localStorage.getItem('token'), projectId, (response, error) => {
            if(response) {
                setError('');
            } else {
                setError(error);
            }
        });
    }

    useEffect(() => {
        ProjectAPI.getProjects(localStorage.getItem('token'), (projects) => {
            setProjects(projects);
        });
    }, []);
    
    return (
        <div className="container">
            <AppHeader />
            <div className="row mt-2">
                <div className="col-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title"><Link to="/projects">Projects</Link> &#62; Manage Projects</h2>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Project Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project, index) => (
                                        <tr key={index}>
                                            <td>{project.name}</td>
                                            <td>{project.description}</td>
                                            <td>
                                                <button type="button" className="btn btn-danger" onClick={e => deleteProject(project.id)}>Delete</button>
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
                            <h2 className='card-title'>Add Project</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="projectName">Project Name</label>
                                    <input type="text" className="form-control" id="name" value={newProject.name} onChange={onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="projectDescription">Project Description</label>
                                    <textarea className="form-control" id="description" rows="3" value={newProject.description} onChange={onChange}></textarea>
                                </div>
                                <button type="button" className="btn btn-primary mt-2" onClick={addProject}>Add Project</button>

                                {error && <div className="alert alert-danger mt-2">{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageProjects;