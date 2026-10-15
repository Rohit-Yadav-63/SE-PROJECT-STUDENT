import React from 'react';
import { Clock, MapPin, User, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ClassCard({
  classItem,
  status = 'Upcoming',
  isNext = false,
  onSelectCourse
}) {
  const getTypeBadge = (type) => {
    switch (type) {
      case 'Lecture':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Lab':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Tutorial':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadge = (s) => {
    switch (s) {
      case 'Ongoing':
        return {
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold flex items-center gap-1.5',
          dot: 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse',
          text: 'In Session'
        };
      case 'Completed':
        return {
          badge: 'bg-slate-100 text-slate-500 border-slate-200',
          dot: null,
          text: 'Completed'
        };
      default: // Upcoming
        return {
          badge: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: null,
          text: 'Upcoming'
        };
    }
  };

  const statusInfo = getStatusBadge(status);

  return (
    <div
      className={`rounded-xl border transition-all p-4 relative ${
        isNext
          ? 'bg-gradient-to-r from-blue-50/70 to-white border-blue-300 ring-2 ring-blue-100 shadow-xs'
          : status === 'Ongoing'
          ? 'bg-emerald-50/30 border-emerald-300 shadow-xs'
          : status === 'Completed'
          ? 'bg-slate-50/80 border-slate-200 opacity-80'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      {/* Top Banner tag for Next class */}
      {isNext && (
        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full mb-2">
          <Clock className="w-3 h-3" />
          <span>Next Scheduled Class</span>
        </div>
      )}

      {/* Main Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Code, Name, Faculty */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
              {classItem.code}
            </span>
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${getTypeBadge(classItem.type)}`}>
              {classItem.type}
            </span>
            <span className={`text-[11px] px-2 py-0.5 rounded border ${statusInfo.badge}`}>
              {statusInfo.dot && <span className={statusInfo.dot} />}
              {statusInfo.text}
            </span>
          </div>

          <h4 className="text-sm sm:text-base font-semibold text-slate-900 truncate">
            {classItem.title}
          </h4>

          <div className="flex items-center gap-4 mt-2 text-xs text-slate-600 flex-wrap">
            <div className="flex items-center gap-1 text-slate-700 font-medium">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>{classItem.timeDisplay}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{classItem.room}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{classItem.faculty}</span>
            </div>
          </div>
        </div>

        {/* Right Action */}
        {onSelectCourse && (
          <div className="sm:self-center shrink-0">
            <button
              onClick={() => onSelectCourse(classItem.courseId || classItem.code)}
              className="text-xs font-medium text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              Course Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
