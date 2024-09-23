
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from "./component/landing";
import Table from "./component/table"
import SignUp from './component/signUp';
import Login from './component/logIn';
import CameraConnection from './component/cameraConnection';
import Display from './component/display';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/table" element={<Table />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/display" element={<Display/>}/>

        <Route path="/camera" element={<CameraConnection/>}/>
      </Routes>
    </Router>
  );
}

export default App;