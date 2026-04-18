import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Todo from './Todo.jsx'
import Calculator from './components/Calculator.jsx'

function App() {
    const [menu, setMenu] = useState("app1");
    return (
    <div>
        <h1>React SPA</h1>
            <nav>
                <button onClick={() => setMenu("Todo")}>Feladatok</button>
                <button onClick={() => setMenu("calculator")}>Számológép</button>
            </nav>
            <h1><center><a href="index.html">Vissza a Főoldalra</a></center></h1>
            <hr />
            {menu === "Todo" && <Todo />}
            {menu === "calculator" && <Calculator />}
    </div>
  );
}

export default App
