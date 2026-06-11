export default function Tabs({
  tabs,
  activeTab,
  onChange,
}) {
  return (
    <div className="border-b">
      <div className="flex gap-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`
              py-4 border-b-2 whitespace-nowrap
              transition
              ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}