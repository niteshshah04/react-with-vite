import './App.css'
import AgGridTable from './AgGrid/AgGridTable'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // or another theme


function App() {
  // const [count, setCount] = useState(0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div>Ag grid table</div>
      <AgGridTable />
    </div>
  )
}

export default App
