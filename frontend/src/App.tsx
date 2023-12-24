import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';

function App() {
    return (
        <>
            <Toaster />
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <p>Home Page</p>
                            </Layout>
                        }
                    />
                    <Route
                        path="/search"
                        element={
                            <Layout>
                                <p>Search Page</p>
                            </Layout>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <Layout>
                                <Register />
                            </Layout>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Layout>
                                <Login />
                            </Layout>
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
