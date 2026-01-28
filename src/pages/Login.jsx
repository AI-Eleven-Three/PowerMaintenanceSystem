import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')

  const validateForm = () => {
    const newErrors = {}
    if (!username.trim()) newErrors.username = '请输入用户名'
    if (!password.trim()) newErrors.password = '请输入密码'
    if (!captcha.trim()) newErrors.captcha = '请输入验证码'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoginError('')
    if (validateForm()) {
      const success = login(username, password, captcha)
      if (success) {
        navigate('/')
      } else {
        setLoginError('用户名或密码错误')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6">
          <h1 className="text-2xl font-bold text-white text-center">电力设备运维管理系统</h1>
        </div>
        <div className="p-8">
          {loginError && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mb-4">
              <AlertCircle size={20} />
              <span>{loginError}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="请输入用户名"
                />
                {errors.username && (
                  <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.username}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="请输入密码"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.password}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">验证码</label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.captcha ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                    placeholder="请输入验证码"
                  />
                  {errors.captcha && (
                    <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.captcha}
                    </div>
                  )}
                </div>
                <div className="w-32 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
                  <span className="text-gray-600 font-mono">8X2L</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              登录
            </button>
          </form>
        </div>
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-600">
          <p>电力设备运维管理系统 © 2026</p>
          <p className="text-xs mt-1">技术支持：电力运维团队</p>
        </div>
      </div>
    </div>
  )
}
