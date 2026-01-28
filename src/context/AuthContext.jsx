import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // 检查本地存储中的登录状态
    const token = localStorage.getItem('authToken')
    if (token) {
      setIsAuthenticated(true)
      setUser({ username: 'admin' })
    }
  }, [])

  const login = (username, password, captcha) => {
    // 模拟登录验证
    if (username === 'admin' && password === '123456' && captcha) {
      localStorage.setItem('authToken', 'mock-token')
      setIsAuthenticated(true)
      setUser({ username })
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
