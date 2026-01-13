// Header receives active tab and onTabChange from parent to control view
export type Tab = 'overview' | 'patients' | 'medicine'

export default function DashboardHeader({
  activeTab,
  onTabChange,
}: {
  activeTab: Tab
  onTabChange: (t: Tab) => void
}) {

  const btnClass = (tab: Tab) =>
    `px-3 py-1 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300 ` +
    (activeTab === tab ? 'bg-teal-700 text-white' : 'text-teal-700 hover:bg-teal-700 hover:text-white')

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-10xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-teal-800 tracking-tight">MediFlow</h1>
          </div>

          <div className="max-w-10xl mx-auto px-6 py-2">
            <nav className="flex items-center gap-3">
              <button
                type="button"
                className={btnClass('overview')}
                aria-current={activeTab === 'overview' ? 'page' : undefined}
                title="Dashboard Overview"
                onClick={() => onTabChange('overview')}
              >
                Dashboard Overview
              </button>

              <button
                type="button"
                className={btnClass('patients')}
                aria-current={activeTab === 'patients' ? 'page' : undefined}
                title="Patient Management"
                onClick={() => onTabChange('patients')}
              >
                Patient Management
              </button>

              <button
                type="button"
                className={btnClass('medicine')}
                aria-current={activeTab === 'medicine' ? 'page' : undefined}
                title="Medicine Coordination"
                onClick={() => onTabChange('medicine')}
              >
                Medicine Coordination
              </button>
            </nav>
          </div>

          <div className="text-right">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 bg-teal-800 text-white text-sm font-medium rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              onClick={() => {
                console.log('Logout clicked')
              }}
              aria-label="Logout"
              title="Logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
// ...existing code...