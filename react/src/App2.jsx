import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Todo from './Todo.jsx'
import App2 from './App2.jsx'

function App() {
    const [menu, setMenu] = useState("app1");
    return (
    <div>
        <h1>React SPA</h1>
            <nav>
                <button onClick={() => setMenu("Todo")}>Todo</button>
                <button onClick={() => setMenu("app2")}>App2</button>
            </nav>
            <hr />
            {menu === "Todo" && <Todo />}
            {menu === "app2" && <App2 />}
    </div>
  );
}

export default App
