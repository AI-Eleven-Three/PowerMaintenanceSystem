import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react'
import EquipmentForm from '../components/EquipmentForm'

const equipmentData = [
  { id: 'EQ-001', name: '变压器-001', type: '变压器', location: 'A区-1号变电站', status: '运行中', voltage: '110kV', lastMaintenance: '2024-01-15' },
  { id: 'EQ-002', name: '开关柜-012', type: '开关柜', location: 'A区-2号配电室', status: '运行中', voltage: '10kV', lastMaintenance: '2024-01-10' },
  { id: 'EQ-003', name: '电缆-023', type: '电缆', location: 'B区-主干线路', status: '故障', voltage: '35kV', lastMaintenance: '2024-01-05' },
  { id: 'EQ-004', name: '互感器-008', type: '互感器', location: 'C区-3号变电站', status: '运行中', voltage: '220kV', lastMaintenance: '2024-01-20' },
  { id: 'EQ-005', name: '变压器-015', type: '变压器', location: 'A区-4号变电站', status: '维护中', voltage: '110kV', lastMaintenance: '2024-01-18' },
  { id: 'EQ-006', name: '开关柜-025', type: '开关柜', location: 'B区-1号配电室', status: '运行中', voltage: '10kV', lastMaintenance: '2024-01-12' },
  { id: 'EQ-007', name: '电缆-031', type: '电缆', location: 'C区-2号线路', status: '运行中', voltage: '35kV', lastMaintenance: '2024-01-08' },
  { id: 'EQ-008', name: '互感器-012', type: '互感器', location: 'A区-5号变电站', status: '运行中', voltage: '220kV', lastMaintenance: '2024-01-22' },
]

export default function Equipment() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('全部')
  const [filterStatus, setFilterStatus] = useState('全部')
  const [filterVoltage, setFilterVoltage] = useState('全部')
  const [showModal, setShowModal] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    type: '变压器',
    location: '',
    status: '运行中',
    voltage: '110kV',
    lastMaintenance: new Date().toISOString().split('T')[0]
  })
  const [formErrors, setFormErrors] = useState({})

  const equipmentTypes = ['全部', '变压器', '开关柜', '电缆', '互感器']
  const statusOptions = ['全部', '运行中', '故障', '维护中']
  const voltageOptions = ['全部', '10kV', '35kV', '110kV', '220kV', '500kV']

  const filteredData = equipmentData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === '全部' || item.type === filterType
    const matchesStatus = filterStatus === '全部' || item.status === filterStatus
    const matchesVoltage = filterVoltage === '全部' || item.voltage === filterVoltage
    return matchesSearch && matchesType && matchesStatus && matchesVoltage
  })

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) {
      errors.name = '设备名称不能为空'
    }
    if (!formData.location.trim()) {
      errors.location = '设备位置不能为空'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddEquipment = () => {
    if (validateForm()) {
      const newId = `EQ-${String(equipmentData.length + 1).padStart(3, '0')}`
      const newEquipment = {
        id: newId,
        ...formData
      }
      equipmentData.push(newEquipment)
      closeModal()
    }
  }

  const handleEditEquipment = () => {
    if (validateForm()) {
      const index = equipmentData.findIndex(item => item.id === editingId)
      if (index !== -1) {
        equipmentData[index] = {
          ...equipmentData[index],
          ...formData
        }
      }
      closeModal()
    }
  }

  const handleDeleteEquipment = () => {
    const index = equipmentData.findIndex(item => item.id === deletingId)
    if (index !== -1) {
      equipmentData.splice(index, 1)
    }
    setShowDeleteConfirm(false)
    setDeletingId(null)
  }

  const openAddModal = () => {
    setIsEditMode(false)
    setFormData({
      name: '',
      type: '变压器',
      location: '',
      status: '运行中',
      voltage: '110kV',
      lastMaintenance: new Date().toISOString().split('T')[0]
    })
    setFormErrors({})
    setShowModal(true)
  }

  const openEditModal = (equipment) => {
    setIsEditMode(true)
    setEditingId(equipment.id)
    setFormData({
      name: equipment.name,
      type: equipment.type,
      location: equipment.location,
      status: equipment.status,
      voltage: equipment.voltage,
      lastMaintenance: equipment.lastMaintenance
    })
    setFormErrors({})
    setShowModal(true)
  }

  const openDeleteConfirm = (id) => {
    setDeletingId(id)
    setShowDeleteConfirm(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setIsEditMode(false)
    setEditingId(null)
    setFormData({
      name: '',
      type: '变压器',
      location: '',
      status: '运行中',
      voltage: '110kV',
      lastMaintenance: new Date().toISOString().split('T')[0]
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end gap-4">
        <div className="flex gap-4 flex-1 items-end">
          <div className="relative flex-1 max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-1">搜索设备</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜索设备名称或编号..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">设备类型</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {equipmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">设备状态</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">电压等级</label>
            <select
              value={filterVoltage}
              onChange={(e) => setFilterVoltage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {voltageOptions.map(voltage => (
                <option key={voltage} value={voltage}>{voltage}</option>
              ))}
            </select>
          </div>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          添加设备
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">设备编号</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">设备名称</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">类型</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">位置</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">状态</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">电压等级</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">上次维护</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.id}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{item.name}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{item.type}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{item.location}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === '运行中' ? 'bg-green-100 text-green-700' :
                    item.status === '故障' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">{item.voltage}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{item.lastMaintenance}</td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openEditModal(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => openDeleteConfirm(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
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
        <span>显示 {filteredData.length} 条记录，共 {equipmentData.length} 条</span>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">上一页</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">下一页</button>
        </div>
      </div>

      {showModal && (
        <EquipmentForm
          title={isEditMode ? '编辑设备' : '添加新设备'}
          submitText={isEditMode ? '保存更改' : '确认添加'}
          formData={formData}
          onChange={handleInputChange}
          errors={formErrors}
          onSubmit={isEditMode ? handleEditEquipment : handleAddEquipment}
          onCancel={closeModal}
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
              确定要删除该设备吗？此操作无法撤销。
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
                onClick={handleDeleteEquipment}
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
