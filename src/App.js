import './App.css';
import Register from './components/Register';
import {Routes, Route} from "react-router-dom"
import Login from './components/Login';
import Layout from './components/Layout';
import Home from './components/Home';
import Unauthorized from './components/Unauthorized';
import Missing from "./components/Missing"
import RequireAuth from './components/RequireAuth';
import EditGoal from './components/EditGoal';
import Editor from './components/Editor';
import Admin from './components/Admin';


function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes*/}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="edit/:id" element={<EditGoal />} />
          {/* <Route path="/" element={<Home />} /> */}
          
          
          {/* private routes, we want to protect these routes  */}

          <Route element={<RequireAuth allowedRoles={[2001]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[1984]}/>}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[5150]}/>}>
            <Route path="admin" element={<Admin />} />
          </Route>
        </Route>

        

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </main>
  );
}

export default App;
