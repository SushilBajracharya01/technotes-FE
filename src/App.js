import { Routes, Route } from 'react-router-dom';

//
import Layout from './components/Layout';

//
import Login from './pages/Login';
import Notes from './pages/Notes';
import Users from './pages/Users';
import Public from './pages/Public';
import Welcome from './pages/Welcome';
import EditUser from './pages/Users/EditUser';
import Prefetch from './pages/Prefetch/Prefetch';
import DashLayout from './components/DashLayout';
import NewUserForm from './pages/Users/NewUserForm';
import EditNote from './pages/Notes/EditNote';
import NewNote from './pages/Notes/NewNote';
import PersistLogin from './pages/PersistLogin/PersistLogin';
import RequireAuth from './pages/RequireAuth';

import { ROLES } from './config/roles'
/**
 * 
 */
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />} >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route path="notes">
                  <Route index element={<Notes />} />
                  <Route path={`:id`} element={<EditNote />} />
                  <Route path={`new`} element={<NewNote />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<Users />} />
                    <Route path={`:id`} element={<EditUser />} />
                    <Route path={`new`} element={<NewUserForm />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
