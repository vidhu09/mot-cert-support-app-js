import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from './AppHeader';
import ProjectAPI from '../requests/ProjectApi';
import { useParams } from 'react-router-dom';

function ProjectTimesheet() {

    const [project, setProject] = useState({
        total : 0,
        name : 'unknown',
        description : 'unknown',
        entries : []
    });

    const [entry, setEntry] = useState({
        date : '',
        hours : 0,
        description : ''
    });

    const [error, setError] = useState('');

    let { id } = useParams();

    const getProjectDetails = () => {
        ProjectAPI.getProjectById(localStorage.getItem('token'), id, (projectDetails) => {
            setProject(projectDetails);
        });
    }
    
    const onChange = (e) => {
        const { id, value } = e.target;
        setEntry({ ...entry, [id]: value });
    }

    const addEntry = (e) => {
        e.preventDefault();
        
        ProjectAPI.postEntry(localStorage.getItem('token'), id, entry, (response, error) => {
            if(response) {
                getProjectDetails();
                setEntry({
                    date : '',
                    hours : 0,
                    description : ''
                });
                setError('');
            } else {
                setError(error);
            }
        });
    }

    const doDelete = (entryId) => {
        ProjectAPI.deleteEntry(localStorage.getItem('token'), id, entryId, (response, error) => {
            if(response) {
                getProjectDetails();
                setError('');
            } else {
                setError(error);
            }
        });
    };

    useEffect(() => {
        getProjectDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <AppHeader />
            <div className="row mt-2">
                <div className="col-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title"><Link to="/projects">Projects</Link> &#62; {project.name}</h2>
                            <p>{project.description}</p>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Hours</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {project.entries.map((entry) => {
                                        return (
                                            <tr key={entry.id}>
                                                <td>{entry.date}</td>
                                                <td>{entry.hours}</td>
                                                <td>{entry.description}</td>
                                                <td><button className="btn btn-danger" onClick={e => doDelete(entry.id)}>Delete</button></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <h3>Total Hours: {project.total}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className='card'>
                        <div className='card-body'>
                            <h2 className='card-title'>Add Timesheet Entry</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="date">Date</label>
                                    <input type="date" className="form-control" id="date" value={entry.date} onChange={onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="hours">Hours</label>
                                    <input type="number" className="form-control" id="hours" value={entry.hours} onChange={onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" id="description" value={entry.description} onChange={onChange}/>
                                </div>
                                <button type="button" className="btn btn-primary mt-2" onClick={addEntry}>Add Entry</button>

                                {error && <div className="alert alert-danger mt-2">{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default ProjectTimesheet;