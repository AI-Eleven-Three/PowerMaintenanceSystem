import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const monthlyEnergyData = [
  { month: '1月', consumption: 12500, cost: 85000 },
  { month: '2月', consumption: 11800, cost: 79000 },
  { month: '3月', consumption: 13200, cost: 91000 },
  { month: '4月', consumption: 12800, cost: 87000 },
  { month: '5月', consumption: 13500, cost: 93000 },
  { month: '6月', consumption: 14200, cost: 98000 },
  { month: '7月', consumption: 15800, cost: 112000 },
  { month: '8月', consumption: 16500, cost: 118000 },
  { month: '9月', consumption: 15200, cost: 105000 },
  { month: '10月', consumption: 13800, cost: 95000 },
  { month: '11月', consumption: 13000, cost: 89000 },
  { month: '12月', consumption: 12600, cost: 86000 },
]

const equipmentEfficiency = [
  { name: '变压器', efficiency: 96.5, count: 45 },
  { name: '开关柜', efficiency: 94.2, count: 38 },
  { name: '电缆', efficiency: 92.8, count: 42 },
  { name: '互感器', efficiency: 97.1, count: 31 },
]

const faultStatistics = [
  { name: '变压器', value: 12, color: '#3b82f6' },
  { name: '开关柜', value: 18, color: '#10b981' },
  { name: '电缆', value: 25, color: '#f59e0b' },
  { name: '互感器', value: 8, color: '#ef4444' },
]

const maintenanceTrend = [
  { month: '1月', completed: 45, pending: 12 },
  { month: '2月', completed: 52, pending: 8 },
  { month: '3月', completed: 48, pending: 15 },
  { month: '4月', completed: 55, pending: 10 },
  { month: '5月', completed: 62, pending: 7 },
  { month: '6月', completed: 58, pending: 12 },
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">月度能耗统计</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyEnergyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="consumption" fill="#3b82f6" name="能耗 (kWh)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">月度能耗成本</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyEnergyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={2} name="成本 (元)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">设备运行效率</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={equipmentEfficiency} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="efficiency" fill="#8b5cf6" name="效率 (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">故障类型分布</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={faultStatistics}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {faultStatistics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">维护工单趋势</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={maintenanceTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completed" fill="#10b981" name="已完成" />
            <Bar dataKey="pending" fill="#f59e0b" name="待处理" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
          <p className="text-sm opacity-80 mb-2">年度总能耗</p>
          <p className="text-3xl font-bold">165,000</p>
          <p className="text-sm mt-2">kWh</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm p-6 text-white">
          <p className="text-sm opacity-80 mb-2">年度总成本</p>
          <p className="text-3xl font-bold">1,136,000</p>
          <p className="text-sm mt-2">元</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
          <p className="text-sm opacity-80 mb-2">平均设备效率</p>
          <p className="text-3xl font-bold">95.2%</p>
          <p className="text-sm mt-2">较去年提升 2.1%</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-sm p-6 text-white">
          <p className="text-sm opacity-80 mb-2">故障总数</p>
          <p className="text-3xl font-bold">63</p>
          <p className="text-sm mt-2">较去年减少 15%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">设备效率详情</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">设备类型</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">数量</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">平均效率</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">故障次数</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">状态</th>
              </tr>
            </thead>
            <tbody>
              {equipmentEfficiency.map((item, index) => (
                <tr key={item.name} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{item.count}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{item.efficiency}%</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{faultStatistics[index].value}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.efficiency >= 95 ? 'bg-green-100 text-green-700' :
                      item.efficiency >= 90 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.efficiency >= 95 ? '优秀' : item.efficiency >= 90 ? '良好' : '需改进'}
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
