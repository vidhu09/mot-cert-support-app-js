import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import AppHeader from './AppHeader';
import ReportAPI from '../requests/ReportApi';

function Report() {

    const [chartData, setChartData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        ReportAPI.getChartData(localStorage.getItem('token'), (chartData) => {
            setChartData(chartData.projects);
            setTotal(chartData.total);
        });
    }, []);

    return (
        <div className="container">
            <AppHeader />
            <div className="row mt-2">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                        <h2 className="card-title"><Link to="/projects">Projects</Link> &#62; Report</h2>
                        <div className='mt-5'>
                            <BarChart width={1200} height={400} data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="hours" fill="#8884d8" />
                            </BarChart>
                        </div>
                            <h3>Total Hours: {total}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Report;