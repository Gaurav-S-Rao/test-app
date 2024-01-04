import "./App.css";
import CreateEmployeeForm from "./components/CreateEmployeeForm";
import SearchEmployeeForm from "./components/SearchEmployeeForm";

import Typography from "@mui/material/Typography";

function App() {
  return (
    <div className="App">
      <Typography variant="h2">Employee Dashboard App</Typography>

      <CreateEmployeeForm />

      <SearchEmployeeForm />
    </div>
  );
}

export default App;
