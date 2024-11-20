import {useState} from 'react';
import './App.css';
import {Navigation} from '@/components/Navbar/index.tsx';
import {Home} from '@/pages/home';

function App() {
    const [route, setRoute] = useState('/');

    const navigate = (path: string) => {
        setRoute(path);
    };

    return (
        <div>
            <Navigation navigate={navigate}/>

            <main>
                {route === '/' && <Home/>}
                {/*{route === '/my-account' && <Account/>}*/}
                {/*{route === '/game-library' && <Library/>}*/}
            </main>
        </div>
    );
}

export default App;
