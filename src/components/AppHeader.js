import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from 'react-bootstrap-icons';
import { BoxArrowLeft } from 'react-bootstrap-icons';

function AppHeader() {
    return (
        <div className="row mt-5">
            <div className="col-10">
                <h1>Welcome to Timesheet manager</h1>
            </div>
            <div className="col-2">
                <Link to="/logout" className='float-end'><BoxArrowLeft size={56}/></Link>
                <Link to="/profile" className='float-end'><Person size={56}/></Link>
            </div>
        </div>
    );
}

export default AppHeader;