import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './App.css'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import DashboardLayout from './components/DashboardLayout'
import LoginPage from './pages/LoginPage'
import DashboardOverview from './pages/DashboardOverview'
import DreamList from './pages/DreamList'
import AddDream from './pages/AddDream'
import Profile from './pages/Profile'
import FavouriteDreams from './pages/FavouriteDreams'
import { useSelector } from 'react-redux'

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          
          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* Protected dashboard routes */}
              <Route
                path="/my-dreams"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardOverview />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dreams"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DreamList />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-dream"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <AddDream />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favourites"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <FavouriteDreams />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Profile />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App
