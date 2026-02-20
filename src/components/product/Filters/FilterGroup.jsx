import React from 'react'

const FilterGroup = ({ title, options, value, onChange }) => {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-3">{title}</h4>

      <div className="flex flex-wrap gap-2">
        {["All", ...options].map(option => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`
              px-4 py-1 rounded-full text-xs transition
              ${
                value === option
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterGroup



