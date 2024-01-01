import '../css/App.css';
import Login from './Login';
import ProjectList from './ProjectList';
import ProjectTimesheet from './ProjectTimesheet';
import ManageProjects from './ManageProjects';
import ManageUsers from './ManageUsers';
import React from 'react';
import Report from './Report';
import Profile from './Profile';
import PrivateRoutes from './PrivateRoutes';
import Logout from './Logout';

import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [{
      path: '/projects',
      element: <ProjectList />
    }, {
      path: '/projects/:id',
      element: <ProjectTimesheet />
    }, {
      path: '/manage/projects',
      element: <ManageProjects />
    }, {
      path: '/manage/users',
      element: <ManageUsers />
    }, {
      path: '/report',
      element: <Report />
    }, {
      path: '/profile',
      element: <Profile />
    }]
  }, {
    path: '/login',
    element: <Login />
  }, {
    path: '/logout',
    element: <Logout />
  }
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;