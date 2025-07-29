import { Route, BrowserRouter as Router, Routes } from 'react-router'
import './index.css'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { CreateBlogPage } from './pages/CreateBlogPage'
import { ErrorPage } from './pages/ErrorPage'

function App() {

	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/create-blog" element={<CreateBlogPage />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
