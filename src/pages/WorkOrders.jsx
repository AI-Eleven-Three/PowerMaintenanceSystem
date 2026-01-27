import { useState } from 'react'
import { Plus, Search, Eye, Edit, CheckCircle, Clock, AlertCircle, Trash2 } from 'lucide-react'
import WorkOrderForm from '../components/WorkOrderForm'
import WorkOrderDetail from '../components/WorkOrderDetail'

const initialWorkOrders = [
  { id: 'WO-2024-001', type: '故障处理', equipment: '变压器-001', description: '变压器温度异常升高，需要紧急检修', assignee: '张三', status: '进行中', priority: '高', createTime: '2024-01-25 09:30', deadline: '2024-01-26' },
  { id: 'WO-2024-002', type: '定期检修', equipment: '开关柜-012', description: '季度例行检查和维护', assignee: '李四', status: '待处理', priority: '中', createTime: '2024-01-24 14:20', deadline: '2024-01-30' },
  { id: 'WO-2024-003', type: '维护保养', equipment: '电缆-023', description: '电缆绝缘性能检测', assignee: '王五', status: '已完成', priority: '低', createTime: '2024-01-23 10:00', deadline: '2024-01-25' },
  { id: 'WO-2024-004', type: '故障处理', equipment: '互感器-008', description: '互感器二次侧电压异常', assignee: '赵六', status: '进行中', priority: '高', createTime: '2024-01-25 11:15', deadline: '2024-01-26' },
  { id: 'WO-2024-005', type: '定期检修', equipment: '变压器-015', description: '年度大检修计划', assignee: '钱七', status: '待处理', priority: '中', createTime: '2024-01-24 16:45', deadline: '2024-02-01' },
  { id: 'WO-2024-006', type: '维护保养', equipment: '开关柜-025', description: '开关柜触头清洁和润滑', assignee: '孙八', status: '已完成', priority: '低', createTime: '2024-01-22 09:00', deadline: '2024-01-24' },
  { id: 'WO-2024-007', type: '故障处理', equipment: '电缆-031', description: '电缆接头过热处理', assignee: '周九', status: '进行中', priority: '高', createTime: '2024-01-25 13:30', deadline: '2024-01-27' },
  { id: 'WO-2024-008', type: '定期检修', equipment: '互感器-012', description: '互感器精度校验', assignee: '吴十', status: '待处理', priority: '中', createTime: '2024-01-24 10:30', deadline: '2024-01-31' },
]

export default function WorkOrders() {
  const [workOrders, setWorkOrders] = useState(initialWorkOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('全部')
  const [filterPriority, setFilterPriority] = useState('全部')
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [formData, setFormData] = useState({
    type: '故障处理',
    equipment: '',
    description: '',
    assignee: '',
    priority: '中',
    status: '待处理',
    deadline: new Date().toISOString().split('T')[0]
  })
  const [formErrors, setFormErrors] = useState({})

  const statusOptions = ['全部', '待处理', '进行中', '已完成']
  const priorityOptions = ['全部', '高', '中', '低']

  const filteredOrders = workOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.equipment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === '全部' || order.status === filterStatus
    const matchesPriority = filterPriority === '全部' || order.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const validateForm = () => {
    const errors = {}
    if (!formData.equipment.trim()) {
      errors.equipment = '设备名称不能为空'
    }
    if (!formData.description.trim()) {
      errors.description = '任务描述不能为空'
    }
    if (!formData.assignee.trim()) {
      errors.assignee = '执行人不能为空'
    }
    if (!formData.deadline) {
      errors.deadline = '截止日期不能为空'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCreateOrder = () => {
    if (validateForm()) {
      const newId = `WO-2024-${String(workOrders.length + 1).padStart(3, '0')}`
      const newOrder = {
        id: newId,
        ...formData,
        createTime: new Date().toLocaleString('zh-CN', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      }
      setWorkOrders([newOrder, ...workOrders])
      closeFormModal()
    }
  }

  const handleEditOrder = () => {
    if (validateForm()) {
      setWorkOrders(workOrders.map(order => 
        order.id === editingId 
          ? { ...order, ...formData }
          : order
      ))
      closeFormModal()
    }
  }

  const handleDeleteOrder = () => {
    setWorkOrders(workOrders.filter(order => order.id !== deletingId))
    setShowDeleteConfirm(false)
    setDeletingId(null)
  }

  const openCreateModal = () => {
    setIsEditMode(false)
    setFormData({
      type: '故障处理',
      equipment: '',
      description: '',
      assignee: '',
      priority: '中',
      status: '待处理',
      deadline: new Date().toISOString().split('T')[0]
    })
    setFormErrors({})
    setShowFormModal(true)
  }

  const openEditModal = (order) => {
    setIsEditMode(true)
    setEditingId(order.id)
    setFormData({
      type: order.type,
      equipment: order.equipment,
      description: order.description,
      assignee: order.assignee,
      priority: order.priority,
      status: order.status,
      deadline: order.deadline
    })
    setFormErrors({})
    setShowFormModal(true)
  }

  const openDetailModal = (order) => {
    setSelectedOrder(order)
    setShowDetailModal(true)
  }

  const openDeleteConfirm = (id) => {
    setDeletingId(id)
    setShowDeleteConfirm(true)
  }

  const closeFormModal = () => {
    setShowFormModal(false)
    setIsEditMode(false)
    setEditingId(null)
    setFormData({
      type: '故障处理',
      equipment: '',
      description: '',
      assignee: '',
      priority: '中',
      status: '待处理',
      deadline: new Date().toISOString().split('T')[0]
    })
    setFormErrors({})
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case '已完成':
        return <CheckCircle size={16} className="text-green-600" />
      case '进行中':
        return <Clock size={16} className="text-blue-600" />
      default:
        return <AlertCircle size={16} className="text-yellow-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="搜索工单编号或设备..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {priorityOptions.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>
        <button onClick={openCreateModal} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          创建工单
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">待处理</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {workOrders.filter(o => o.status === '待处理').length}
              </p>
            </div>
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
              <AlertCircle size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">进行中</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {workOrders.filter(o => o.status === '进行中').length}
              </p>
            </div>
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <Clock size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">已完成</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {workOrders.filter(o => o.status === '已完成').length}
              </p>
            </div>
            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <CheckCircle size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">工单编号</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">类型</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">设备</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">描述</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">执行人</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">状态</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">优先级</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">截止日期</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6 text-sm font-medium text-gray-900">{order.id}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{order.type}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{order.equipment}</td>
                <td className="py-4 px-6 text-sm text-gray-700 max-w-xs truncate">{order.description}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{order.assignee}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="text-sm">{order.status}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.priority === '高' ? 'bg-red-100 text-red-700' :
                    order.priority === '中' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {order.priority}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">{order.deadline}</td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    <button onClick={() => openDetailModal(order)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye size={18} />
                    </button>
                    <button onClick={() => openEditModal(order)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => openDeleteConfirm(order.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>显示 {filteredOrders.length} 条记录，共 {workOrders.length} 条</span>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">上一页</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">下一页</button>
        </div>
      </div>

      {showFormModal && (
        <WorkOrderForm
          title={isEditMode ? '编辑工单' : '创建工单'}
          submitText={isEditMode ? '保存更改' : '确认创建'}
          formData={formData}
          onChange={handleInputChange}
          errors={formErrors}
          onSubmit={isEditMode ? handleEditOrder : handleCreateOrder}
          onCancel={closeFormModal}
        />
      )}

      {showDetailModal && selectedOrder && (
        <WorkOrderDetail
          order={selectedOrder}
          onClose={() => setShowDetailModal(false)}
          onEdit={(order) => {
            setShowDetailModal(false)
            openEditModal(order)
          }}
          onDelete={(id) => {
            setShowDetailModal(false)
            openDeleteConfirm(id)
          }}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 text-red-600 p-3 rounded-full">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-semibold">确认删除</h3>
            </div>
            <p className="text-gray-600 mb-6">
              确定要删除该工单吗？此操作无法撤销。
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false)
                  setDeletingId(null)
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleDeleteOrder}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
