import {Routes,Route} from "react-router-dom"
import {Dashboard,Login} from "./pages"
import {Overview,Transactions,Budgets,Pots,Recurring} from "./views"
import { AuthProvider } from "./context/AuthContext"
import './App.css'
import './Animations.css'

function App() {

  return (
    <div data-theme="dark" className="app">
      <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Dashboard/>}>
          <Route path="" element={<Overview/>}/>
          <Route path="transactions" element={<Transactions/>}/>
          <Route path="budgets" element={<Budgets/>}/>
          <Route path="pots" element={<Pots/>}/>
          <Route path="recurring" element={<Recurring/>}/>
        </Route>
      </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
