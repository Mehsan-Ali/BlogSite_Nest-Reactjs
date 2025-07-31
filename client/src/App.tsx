import { Navigate, Route, Router, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { CreateBlogPage } from './pages/CreateBlogPage'
import { ErrorPage } from './pages/ErrorPage'
import { Header } from './components/Header'
import { BlogPage } from './pages/BlogPage'
import type { ReactNode } from 'react'
import MainContextProvider, { useMainContext } from './context/mainContext'

function App() {
	// Wrapper for protecting routes (redirect if not logged in)
	const RequireAuth = ({ children }: { children: ReactNode }) => {
		const { user } = useMainContext()
		if (!user) {
			return <Navigate to="/login" replace />
		}
		return <>{children}</>
	}

	// Wrapper for redirecting logged-in users away from auth pages
	const RedirectIfAuthenticated = ({ children }: { children: ReactNode }) => {
		const { user } = useMainContext()
		if (user) {
			return <Navigate to="/" replace />
		}
		return <>{children}</>
	}

	return (
		<>
			<MainContextProvider>
				<Header />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/login"
						element={
							<RedirectIfAuthenticated>
								<LoginPage />
							</RedirectIfAuthenticated>
						} />


					<Route path="/create-blog" element={
						<RequireAuth>
							<CreateBlogPage />
						</RequireAuth>
					} />

					<Route path="/register" element={<RegisterPage />} />
					<Route path="/blog/:slug" element={<BlogPage />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</MainContextProvider>
		</>
	)
}

export default App
