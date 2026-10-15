import React from 'react';

export default function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  badgeText,
  colorVariant = 'blue',
  onClick
}) {
  const colorStyles = {
    blue: {
      iconBg: 'bg-blue-50 text-blue-700 border-blue-200',
      badge: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    indigo: {
      iconBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    emerald: {
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-700 border-amber-200',
      badge: 'bg-amber-50 text-amber-700 border-amber-200'
    }
  };

  const currentStyle = colorStyles[colorVariant] || colorStyles.blue;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:border-slate-300 transition-all ${
        onClick ? 'cursor-pointer hover:shadow-sm' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            {value}
          </h3>
        </div>
        <div className={`p-2.5 rounded-lg border ${currentStyle.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
        <span className="text-slate-500 font-medium truncate">
          {subtitle}
        </span>
        {badgeText && (
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${currentStyle.badge} shrink-0`}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
