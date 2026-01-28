import { Link, useLocation, Outlet } from 'react-router-dom'
import { LayoutDashboard, Settings, Box, FileText, Activity, BarChart3, Shield, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const menuItems = [
  { path: '/', label: '仪表盘', icon: LayoutDashboard },
  { path: '/equipment', label: '电力设备', icon: Box },
  { path: '/work-orders', label: '运维工单', icon: FileText },
  { path: '/monitoring', label: '实时监控', icon: Activity },
  { path: '/analytics', label: '数据可视化', icon: BarChart3 },
  { path: '/permissions', label: '权限矩阵', icon: Shield },
]

export default function Layout() {
  const location = useLocation()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-slate-800 text-white flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold">电力运维系统</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">管</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">管理员</p>
              <p className="text-xs text-gray-400">系统管理员</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              title="退出登录"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}
