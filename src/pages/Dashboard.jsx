import { Activity, AlertTriangle, CheckCircle, Clock, TrendingUp, Users, Box } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const statsData = [
  { label: '设备总数', value: 156, icon: Box, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { label: '运行正常', value: 142, icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
  { label: '故障设备', value: 8, icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-100' },
  { label: '待处理工单', value: 23, icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
]

const energyData = [
  { name: '00:00', value: 120 },
  { name: '04:00', value: 98 },
  { name: '08:00', value: 180 },
  { name: '12:00', value: 220 },
  { name: '16:00', value: 195 },
  { name: '20:00', value: 160 },
  { name: '24:00', value: 140 },
]

const equipmentStatus = [
  { name: '变压器', value: 45, color: '#3b82f6' },
  { name: '开关柜', value: 38, color: '#10b981' },
  { name: '电缆', value: 42, color: '#f59e0b' },
  { name: '互感器', value: 31, color: '#ef4444' },
]

const recentWorkOrders = [
  { id: 'WO-2024-001', type: '故障处理', equipment: '变压器-001', status: '进行中', priority: '高' },
  { id: 'WO-2024-002', type: '定期检修', equipment: '开关柜-012', status: '待处理', priority: '中' },
  { id: 'WO-2024-003', type: '维护保养', equipment: '电缆-023', status: '已完成', priority: '低' },
  { id: 'WO-2024-004', type: '故障处理', equipment: '互感器-008', status: '进行中', priority: '高' },
  { id: 'WO-2024-005', type: '定期检修', equipment: '变压器-015', status: '待处理', priority: '中' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">能耗趋势</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">设备类型分布</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={equipmentStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {equipmentStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">最近工单</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">工单编号</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">类型</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">设备</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">状态</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">优先级</th>
              </tr>
            </thead>
            <tbody>
              {recentWorkOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.equipment}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === '已完成' ? 'bg-green-100 text-green-700' :
                      order.status === '进行中' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.priority === '高' ? 'bg-red-100 text-red-700' :
                      order.priority === '中' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {order.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
