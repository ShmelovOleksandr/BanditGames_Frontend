import './App.css'
import {Main} from "./pages/Main";
import {RouteGuard} from "./context/RouteGuard.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import WebSocketContextProvider from "./context/WebSocket/WebSocketContextProvider.tsx";
import SecurityContextProvider from "./context/SecurityContextProvider.tsx";

function App() {

  return (
      <SecurityContextProvider>
          <WebSocketContextProvider>
              <BrowserRouter>
                  <Routes>
                      <Route
                          path="/:game_uuid"
                          element={
                              <RouteGuard>
                                  <Main/>
                              </RouteGuard>
                          }
                      />
                  </Routes>
              </BrowserRouter>
          </WebSocketContextProvider>
      </SecurityContextProvider>
  )
}

export default App
