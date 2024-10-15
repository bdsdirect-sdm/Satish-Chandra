import React from 'react'
import './App.css';
//import RegistrationForm from './components/RegistrationForm';
//import LoginForm from './components/personLogin';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './components/LoginForm';
//import ProfileForm from './components/ProfileForm';
//import ViewUsers from './components/ViewUsers';
//import EditUserForm from './components/EditUserForm';
import RegistrationForm from './components/RegistrationForm';
import EditUserForm from './components/EditUserForm';
import ViewUsers from './components/ViewUsers';
import Dashboard from './components/UserDashboard';

//import UserProfile from './components/UserProfile';
const App = () => {
  return (
    <div>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/view' element={<ViewUsers />} />
          <Route path='/' element={<RegistrationForm />} />
          <Route path='/Edit/:id' element={<EditUserForm />} />
          {/*<Route path='/Display' element={<UserProfile />} />*
        </Routes>
      </BrowserRouter> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegistrationForm />} />
          <Route path='/login' element={<LoginForm />} />
          {/* <Route path='/view' element={<ViewUsers />} /> */}
          <Route path='/dashboard' element={<Dashboard userRole={''} agencyId={''} />} />
        </Routes>
      </BrowserRouter>
    </div >
  )
}

export default App;  