import { X } from 'lucide-react'

const typeOptions = ['故障处理', '定期检修', '维护保养']
const priorityOptions = ['高', '中', '低']
const statusOptions = ['待处理', '进行中', '已完成']

export default function WorkOrderForm({ 
  formData, 
  onChange, 
  errors, 
  onSubmit, 
  onCancel, 
  title = '创建工单',
  submitText = '确认创建'
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">工单类型 <span className="text-red-500">*</span></label>
            <select
              name="type"
              value={formData.type}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {typeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">设备名称 <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="equipment"
              value={formData.equipment}
              onChange={onChange}
              placeholder="请输入设备名称"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.equipment ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.equipment && <p className="text-red-500 text-xs mt-1">{errors.equipment}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">任务描述 <span className="text-red-500">*</span></label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              placeholder="请输入任务描述"
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">执行人 <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="assignee"
              value={formData.assignee}
              onChange={onChange}
              placeholder="请输入执行人姓名"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.assignee ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.assignee && <p className="text-red-500 text-xs mt-1">{errors.assignee}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">优先级</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {priorityOptions.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
            <select
              name="status"
              value={formData.status}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">截止日期 <span className="text-red-500">*</span></label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={onChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.deadline ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.deadline && <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
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
