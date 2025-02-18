import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Home from '@/pages/Home'
import Catalog from '@/pages/Catalog'
import SecurityContextProvider from './context/SecurityContextProvider'
import GameDetails from '@/pages/Game'
import Lobby from '@/pages/Lobby'
import {RouteGuard} from './components/RouteGuard'
import MyAccount from '@/pages/Account'
import UserInfo from '@/pages/UserInfo'
import Admin from "@/pages/Admin";
import {RoleBasedRouteGuard} from "@/components/RoleBasedRouteGuard.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FriendsPage from '@/pages/Friends'

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SecurityContextProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Public Route */}
                        <Route path="/" element={<Home/>}/>
                        {/* Protected Route */}
                        <Route path="/game-library" element={<Catalog/>}/>
                        <Route path="/game-library/game" element={<GameDetails/>}/>
                        <Route path="/lobby" element={<Lobby/>}/>
                        <Route
                            path="/admin"
                            element={
                                <RoleBasedRouteGuard requiredRoles={['admin']}>
                                    <Admin/>
                                </RoleBasedRouteGuard>
                            }
                        />
                        <Route
                            path="/my-account"
                            element={
                                <RouteGuard>
                                    <MyAccount/>
                                </RouteGuard>
                            }
                        />
                        <Route
                            path="/personal-info"
                            element={
                                <RouteGuard>
                                    <UserInfo/>
                                </RouteGuard>
                            }
                        />
                        <Route
                            path="/friends"
                            element={
                                <RouteGuard>
                                    <FriendsPage/>
                                </RouteGuard>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </SecurityContextProvider>
        </QueryClientProvider>
    )
}

export default App
