import { useState } from 'react'
import { Plus, Edit, Trash2, Shield, User, Check, X } from 'lucide-react'
import RoleForm from '../components/RoleForm'

const permissionCategories = [
  { id: 'equipment', name: '设备管理', permissions: [
    { key: 'view_equipment', name: '查看设备信息' },
    { key: 'edit_equipment', name: '编辑设备信息' },
    { key: 'add_equipment', name: '添加设备' },
    { key: 'delete_equipment', name: '删除设备' },
  ]},
  { id: 'workorder', name: '工单管理', permissions: [
    { key: 'view_workorder', name: '查看工单' },
    { key: 'create_workorder', name: '创建工单' },
    { key: 'update_workorder', name: '更新工单' },
    { key: 'approve_workorder', name: '审批工单' },
    { key: 'delete_workorder', name: '删除工单' },
  ]},
  { id: 'monitoring', name: '实时监控', permissions: [
    { key: 'view_monitoring', name: '查看监控数据' },
    { key: 'control_equipment', name: '远程控制设备' },
    { key: 'set_alerts', name: '设置告警规则' },
  ]},
  { id: 'analytics', name: '数据分析', permissions: [
    { key: 'view_analytics', name: '查看分析报表' },
    { key: 'export_data', name: '导出数据' },
    { key: 'create_report', name: '创建报表' },
  ]},
  { id: 'system', name: '系统管理', permissions: [
    { key: 'manage_users', name: '用户管理' },
    { key: 'manage_roles', name: '角色管理' },
    { key: 'system_settings', name: '系统设置' },
  ]},
]

const initialRoles = [
  { id: 1, name: '系统管理员', description: '拥有系统所有权限', userCount: 2, permissions: ['view_all', 'edit_all', 'delete_all', 'approve_all', 'export_data'] },
  { id: 2, name: '运维经理', description: '负责运维工单管理和审批', userCount: 5, permissions: ['view_all', 'edit_equipment', 'create_workorder', 'approve_workorder', 'view_monitoring'] },
  { id: 3, name: '运维工程师', description: '执行设备维护和故障处理', userCount: 15, permissions: ['view_equipment', 'edit_equipment', 'view_workorder', 'update_workorder', 'view_monitoring'] },
  { id: 4, name: '监控专员', description: '负责设备实时监控', userCount: 8, permissions: ['view_equipment', 'view_monitoring', 'view_analytics', 'export_data'] },
  { id: 5, name: '数据分析师', description: '负责数据分析和报表', userCount: 3, permissions: ['view_equipment', 'view_analytics', 'export_data'] },
  { id: 6, name: '普通用户', description: '仅查看权限', userCount: 25, permissions: ['view_equipment', 'view_workorder'] },
]

export default function Permissions() {
  const [roles, setRoles] = useState(initialRoles)
  const [selectedRole, setSelectedRole] = useState(initialRoles[0])
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    userCount: 0,
    permissions: []
  })
  const [formErrors, setFormErrors] = useState({})

  const hasPermission = (permissionKey) => {
    return selectedRole.permissions.includes(permissionKey)
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) {
      errors.name = '角色名称不能为空'
    }
    if (!formData.description.trim()) {
      errors.description = '角色描述不能为空'
    }
    if (formData.permissions.length === 0) {
      errors.permissions = '请至少选择一个权限'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCreateRole = () => {
    if (validateForm()) {
      const newId = Math.max(...roles.map(r => r.id)) + 1
      const newRole = {
        id: newId,
        ...formData
      }
      setRoles([...roles, newRole])
      closeFormModal()
    }
  }

  const handleEditRole = () => {
    if (validateForm()) {
      const updatedRoles = roles.map(role => 
        role.id === editingId 
          ? { ...role, ...formData }
          : role
      )
      setRoles(updatedRoles)
      
      if (selectedRole.id === editingId) {
        const updatedSelectedRole = updatedRoles.find(r => r.id === editingId)
        setSelectedRole(updatedSelectedRole)
      }
      
      closeFormModal()
    }
  }

  const handleDeleteRole = () => {
    setRoles(roles.filter(role => role.id !== deletingId))
    setShowDeleteConfirm(false)
    setDeletingId(null)
    if (selectedRole.id === deletingId) {
      setSelectedRole(roles.find(r => r.id !== deletingId) || roles[0])
    }
  }

  const openCreateModal = () => {
    setIsEditMode(false)
    setFormData({
      name: '',
      description: '',
      userCount: 0,
      permissions: []
    })
    setFormErrors({})
    setShowFormModal(true)
  }

  const openEditModal = (role) => {
    setIsEditMode(true)
    setEditingId(role.id)
    setFormData({
      name: role.name,
      description: role.description,
      userCount: role.userCount,
      permissions: [...role.permissions]
    })
    setFormErrors({})
    setShowFormModal(true)
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
      name: '',
      description: '',
      userCount: 0,
      permissions: []
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
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">权限矩阵管理</h3>
          <p className="text-sm text-gray-500">管理系统角色和权限配置</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          添加角色
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-semibold mb-4">角色列表</h4>
          <div className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedRole.id === role.id ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                    <Shield size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{role.name}</p>
                    <p className="text-xs text-gray-500">{role.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <User size={16} />
                      <span>{role.userCount}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openEditModal(role)
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openDeleteConfirm(role.id)
                      }}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-lg font-semibold">{selectedRole.name}</h4>
              <p className="text-sm text-gray-500">{selectedRole.description}</p>
            </div>
            <button
              onClick={() => openEditModal(selectedRole)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit size={18} />
              编辑权限
            </button>
          </div>

          <div className="space-y-6">
            {permissionCategories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3">
                  <h5 className="font-medium text-gray-900">{category.name}</h5>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.permissions.map((permission) => (
                      <div
                        key={permission.key}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          hasPermission(permission.key) ? 'bg-green-50' : 'bg-gray-50'
                        }`}
                      >
                        <span className="text-sm text-gray-700">{permission.name}</span>
                        <div className={`p-1 rounded-full ${
                          hasPermission(permission.key) ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
                        }`}>
                          {hasPermission(permission.key) ? <Check size={14} /> : <X size={14} />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h4 className="text-lg font-semibold mb-4">权限矩阵总览</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">角色</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">设备管理</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">工单管理</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">实时监控</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">数据分析</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">系统管理</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">用户数</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{role.name}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      role.permissions.some(p => p.includes('equipment')) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {role.permissions.some(p => p.includes('equipment')) ? '有权限' : '无权限'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      role.permissions.some(p => p.includes('workorder')) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {role.permissions.some(p => p.includes('workorder')) ? '有权限' : '无权限'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      role.permissions.some(p => p.includes('monitoring')) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {role.permissions.some(p => p.includes('monitoring')) ? '有权限' : '无权限'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      role.permissions.some(p => p.includes('analytics')) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {role.permissions.some(p => p.includes('analytics')) ? '有权限' : '无权限'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      role.permissions.some(p => p.includes('system')) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {role.permissions.some(p => p.includes('system')) ? '有权限' : '无权限'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">{role.userCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showFormModal && (
        <RoleForm
          title={isEditMode ? '编辑角色' : '添加角色'}
          submitText={isEditMode ? '保存更改' : '确认添加'}
          formData={formData}
          onChange={handleInputChange}
          errors={formErrors}
          onSubmit={isEditMode ? handleEditRole : handleCreateRole}
          onCancel={closeFormModal}
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
              确定要删除该角色吗？此操作无法撤销。
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
                onClick={handleDeleteRole}
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
