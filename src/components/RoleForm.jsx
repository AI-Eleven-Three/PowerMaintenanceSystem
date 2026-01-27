import { X, Shield } from 'lucide-react'

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

export default function RoleForm({ 
  formData, 
  onChange, 
  errors, 
  onSubmit, 
  onCancel, 
  title = '添加角色',
  submitText = '确认添加'
}) {
  const hasPermission = (permissionKey) => {
    return formData.permissions.includes(permissionKey)
  }

  const handlePermissionToggle = (permissionKey) => {
    const newPermissions = hasPermission(permissionKey)
      ? formData.permissions.filter(p => p !== permissionKey)
      : [...formData.permissions, permissionKey]
    onChange({ target: { name: 'permissions', value: newPermissions } })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
              <Shield size={24} />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">角色名称 <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="请输入角色名称"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">角色描述 <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={onChange}
                placeholder="请输入角色描述"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">用户数量</label>
            <input
              type="number"
              name="userCount"
              value={formData.userCount}
              onChange={onChange}
              placeholder="请输入用户数量"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">权限配置 <span className="text-red-500">*</span></h4>
            {errors.permissions && <p className="text-red-500 text-xs mb-4">{errors.permissions}</p>}
            <div className="space-y-4">
              {permissionCategories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3">
                    <h5 className="font-medium text-gray-900">{category.name}</h5>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {category.permissions.map((permission) => (
                        <label
                          key={permission.key}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                        >
                          <span className="text-sm text-gray-700">{permission.name}</span>
                          <input
                            type="checkbox"
                            checked={hasPermission(permission.key)}
                            onChange={() => handlePermissionToggle(permission.key)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-white">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            取消
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  )
}
