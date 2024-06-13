
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from "./component/landing";
import Table from "./component/table"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </Router>
  );
}

export default App;