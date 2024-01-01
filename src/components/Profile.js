import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from './AppHeader';
import UserAPI from '../requests/UserApi';

function Profile() {

    const [profileDetails, setProfileDetails] = useState({
        username : '',
        email : '',
        password : ''
    });
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [userId, setUserid] = useState('');
    
    const onChange = (e) => {
        const { id, value } = e.target;
        if(id === 'confirmpassword'){
            setConfirmPassword(value);
        }
        else {
            setProfileDetails({ ...profileDetails, [id]: value });
        }
    }

    const updateProfile = (e) => {
        e.preventDefault();

        if(profileDetails.password !== confirmpassword) {
            setSuccess('');
            setError('Passwords do not match!');
        } else {
            
            UserAPI.updateProfile(localStorage.getItem('token'), userId, profileDetails, (response, error) => {
                if(response) {
                    setSuccess('Profile updated successfully!');
                    setConfirmPassword('');
                    setError('');
                } else {
                    setSuccess('');
                    setError(error);
                }
            });
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        
        UserAPI.getProfile(token, id, (profileDetails) => {
            setUserid(id);
            setProfileDetails(profileDetails);
        });
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <AppHeader />
            <div className="row mt-2">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                        <h2 className="card-title"><Link to="/projects">Projects</Link> &#62; Profile</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="usernam">Username</label>
                                    <input type="text" className="form-control" value={profileDetails.username} id="username" onChange={onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" value={profileDetails.email} id="email" onChange={onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" value={profileDetails.password} id="password" onChange={onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmpassword">Confirm Password</label>
                                    <input type="password" className="form-control" id="confirmpassword" value={confirmpassword} onChange={onChange}/>
                                </div>
                                <button type="submit" className="btn btn-primary mt-2" onClick={updateProfile}>Update Profile</button>

                                {error && <div className="alert alert-danger mt-2">{error}</div>}
                                {success && <div className="alert alert-success mt-2">{success}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;