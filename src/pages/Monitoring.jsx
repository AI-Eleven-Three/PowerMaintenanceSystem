import { useState, useEffect } from 'react'
import { Zap, Thermometer, Activity, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const monitoringData = [
  { time: '00:00', voltage: 110.2, current: 45.3, temperature: 42, load: 65 },
  { time: '04:00', voltage: 109.8, current: 38.7, temperature: 40, load: 58 },
  { time: '08:00', voltage: 110.5, current: 52.1, temperature: 45, load: 72 },
  { time: '12:00', voltage: 111.2, current: 58.9, temperature: 48, load: 85 },
  { time: '16:00', voltage: 110.8, current: 55.4, temperature: 46, load: 78 },
  { time: '20:00', voltage: 110.3, current: 48.2, temperature: 43, load: 68 },
  { time: '24:00', voltage: 110.0, current: 42.6, temperature: 41, load: 62 },
]

const equipmentMonitoring = [
  { id: 'EQ-001', name: '变压器-001', voltage: 110.5, current: 52.3, temperature: 45, load: 78, status: '正常' },
  { id: 'EQ-002', name: '开关柜-012', voltage: 10.2, current: 125.6, temperature: 38, load: 65, status: '正常' },
  { id: 'EQ-003', name: '电缆-023', voltage: 35.1, current: 89.4, temperature: 52, load: 88, status: '警告' },
  { id: 'EQ-004', name: '互感器-008', voltage: 220.3, current: 28.7, temperature: 41, load: 72, status: '正常' },
  { id: 'EQ-005', name: '变压器-015', voltage: 110.8, current: 48.9, temperature: 55, status: '维护中' },
]

export default function Monitoring() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getStatusBadge = (status) => {
    switch (status) {
      case '正常':
        return <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"><CheckCircle size={14} />正常</span>
      case '警告':
        return <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium"><AlertTriangle size={14} />警告</span>
      case '维护中':
        return <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"><Activity size={14} />维护中</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">实时监控</h3>
          <p className="text-sm text-gray-500">最后更新: {currentTime.toLocaleString('zh-CN')}</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Activity size={20} />
          刷新数据
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <Zap size={24} />
            </div>
            <span className="text-sm text-green-600 font-medium">+2.3%</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">平均电压</p>
          <p className="text-3xl font-bold text-gray-900">110.5 kV</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
              <Activity size={24} />
            </div>
            <span className="text-sm text-green-600 font-medium">+1.8%</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">平均电流</p>
          <p className="text-3xl font-bold text-gray-900">52.3 A</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 text-red-600 p-3 rounded-lg">
              <Thermometer size={24} />
            </div>
            <span className="text-sm text-red-600 font-medium">+3.2%</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">平均温度</p>
          <p className="text-3xl font-bold text-gray-900">45.2 °C</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <span className="text-sm text-green-600 font-medium">+5.1%</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">平均负载</p>
          <p className="text-3xl font-bold text-gray-900">72.6 %</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">电压/电流趋势</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monitoringData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="voltage" stroke="#3b82f6" strokeWidth={2} name="电压 (kV)" />
              <Line type="monotone" dataKey="current" stroke="#10b981" strokeWidth={2} name="电流 (A)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">温度/负载趋势</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monitoringData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="temperature" stackId="1" stroke="#ef4444" fill="#ef4444" name="温度 (°C)" />
              <Area type="monotone" dataKey="load" stackId="2" stroke="#f59e0b" fill="#f59e0b" name="负载 (%)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">设备实时状态</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">设备编号</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">设备名称</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">电压</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">电流</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">温度</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">负载</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">状态</th>
              </tr>
            </thead>
            <tbody>
              {equipmentMonitoring.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{item.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{item.voltage} kV</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{item.current} A</td>
                  <td className="py-4 px-6">
                    <span className={`text-sm ${item.temperature > 50 ? 'text-red-600 font-medium' : 'text-gray-700'}`}>
                      {item.temperature} °C
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-sm ${item.load > 80 ? 'text-red-600 font-medium' : 'text-gray-700'}`}>
                      {item.load} %
                    </span>
                  </td>
                  <td className="py-4 px-6">{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">系统警告</h4>
            <ul className="space-y-1 text-sm text-yellow-700">
              <li>• 电缆-023 温度超过阈值 (52°C)</li>
              <li>• 变压器-015 正在进行维护，监控数据暂停</li>
              <li>• 电缆-023 负载率达到 88%，建议关注</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
