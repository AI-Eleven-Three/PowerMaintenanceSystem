import { X, Clock, AlertCircle, CheckCircle, User, Calendar, FileText, Flag } from 'lucide-react'

export default function WorkOrderDetail({ order, onClose, onEdit, onDelete }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case '已完成':
        return <CheckCircle size={20} className="text-green-600" />
      case '进行中':
        return <Clock size={20} className="text-blue-600" />
      default:
        return <AlertCircle size={20} className="text-yellow-600" />
    }
  }

  const getPriorityBadge = (priority) => {
    const colors = {
      '高': 'bg-red-100 text-red-700',
      '中': 'bg-yellow-100 text-yellow-700',
      '低': 'bg-green-100 text-green-700'
    }
    return colors[priority] || colors['中']
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">工单详情</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getStatusIcon(order.status)}
              <span className="font-medium">{order.status}</span>
            </div>
            <div className="flex-1"></div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityBadge(order.priority)}`}>
              {order.priority}优先级
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <FileText size={16} />
                  <span>工单编号</span>
                </div>
                <p className="font-medium text-gray-900">{order.id}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <FileText size={16} />
                  <span>工单类型</span>
                </div>
                <p className="font-medium text-gray-900">{order.type}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <FileText size={16} />
                  <span>设备名称</span>
                </div>
                <p className="font-medium text-gray-900">{order.equipment}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <User size={16} />
                  <span>执行人</span>
                </div>
                <p className="font-medium text-gray-900">{order.assignee}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <Calendar size={16} />
                  <span>创建时间</span>
                </div>
                <p className="font-medium text-gray-900">{order.createTime}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <Calendar size={16} />
                  <span>截止日期</span>
                </div>
                <p className="font-medium text-gray-900">{order.deadline}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <FileText size={16} />
              <span>任务描述</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">{order.description}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => {
                onClose()
                onEdit(order)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              编辑工单
            </button>
            <button
              onClick={() => {
                onClose()
                onDelete(order.id)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              删除工单
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
