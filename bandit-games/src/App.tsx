import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import {Navigation} from '@/components/Navbar/index.tsx';
import {Home} from '@/pages/Home';
import {Catalog} from '@/pages/Catalog';

function App() {
    return (
        <Router>
            <div>
                <Navigation/>

                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/game-library" element={<Catalog/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
