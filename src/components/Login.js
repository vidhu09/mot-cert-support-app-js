import React, { useEffect, useState } from 'react';
import { AuthAPI } from '../requests/AuthApi';
import { Navigate, useLocation } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);
    const [error, setError] = useState('');
    const location = useLocation();

    useEffect(() => {
        if(localStorage.getItem('token') !== null) {
            setLogin(true);
        }
    }, []);

    const onSubmit = () => {
        AuthAPI.sendLogin(email, password, (response) => {
            if(response !== null) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('admin', response.admin);
                localStorage.setItem('id', response.id);
                setLogin(true);
            } else { 
                setError('Invalid email or password!');
            }
        });

    }

    const onChange = (e) => {
        const { name, value } = e.target;
        if(name === 'email') {
            setEmail(value);
        } else if(name === 'password') {
            setPassword(value);
        }
    }


    if(login) {
        return <Navigate to="/projects" replace state={{ from: location }} />;
    } else {
        return <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form noValidate>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" data-testid="email" className="form-control" name="email" placeholder="Enter Email" value={email} onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" data-testid="password" className="form-control" name="password" placeholder="Enter Password" value={password} onChange={onChange} />
                        </div>
                        <button type="button" data-testid="sign-in" className="btn btn-lg btn-primary btn-block mt-2" onClick={onSubmit}>Sign in</button>

                        {error && <div className="alert alert-danger mt-2">{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    }
}

export default Login;