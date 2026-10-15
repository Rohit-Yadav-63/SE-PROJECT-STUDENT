import React from 'react';
import { Clock, MapPin, User, Coffee, Info } from 'lucide-react';
import { DAYS_OF_WEEK, TIME_SLOTS } from '../data/timetable';

export default function TimetableGrid({
  schedule,
  viewMode = 'week', // 'week' or 'day'
  selectedDay = 'Monday',
  onSelectDay,
  onSelectClass,
  filterCourse = 'all',
  filterType = 'all'
}) {
  // Filter classes according to selected course and type
  const filteredSchedule = schedule.filter((item) => {
    if (filterCourse !== 'all' && item.code !== filterCourse) return false;
    if (filterType !== 'all' && item.type !== filterType) return false;
    return true;
  });

  // Helper to find classes for a given day and time slot
  const getClassesForSlot = (day, slot) => {
    if (slot.isBreak) return [];

    return filteredSchedule.filter((item) => {
      if (item.day !== day) return false;

      // Check time overlap:
      // A slot runs from slot.startTime to slot.endTime
      // A class runs from item.startTime to item.endTime
      // Overlap condition: item.startTime < slot.endTime && item.endTime > slot.startTime
      return item.startTime < slot.endTime && item.endTime > slot.startTime;
    });
  };

  // DAY VIEW
  if (viewMode === 'day') {
    const dayClasses = filteredSchedule
      .filter((item) => item.day === selectedDay)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    return (
      <div className="space-y-4">
        {/* Day selector tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
          {DAYS_OF_WEEK.map((d) => (
            <button
              key={d}
              onClick={() => onSelectDay(d)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedDay === d
                  ? 'bg-blue-800 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Day timeline */}
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
          {TIME_SLOTS.map((slot) => {
            if (slot.isBreak) {
              return (
                <div
                  key={slot.id}
                  className="px-4 py-2.5 bg-slate-50/80 text-slate-500 flex items-center gap-2 text-xs font-medium border-y border-dashed border-slate-200"
                >
                  <Coffee className="w-3.5 h-3.5 text-amber-600" />
                  <span className="font-semibold text-slate-700">{slot.title}</span>
                  <span className="text-slate-400 font-mono">({slot.label})</span>
                </div>
              );
            }

            const classesInSlot = getClassesForSlot(selectedDay, slot);

            // Avoid repeating multi-hour classes if not the start slot:
            const classesStartingInSlot = classesInSlot.filter(
              (c) => c.startTime === slot.startTime || (slot.startTime === '15:00' && c.startTime === '14:00' ? false : true)
            );

            return (
              <div key={slot.id} className="p-4 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                {/* Time Slot column */}
                <div className="sm:w-32 shrink-0">
                  <div className="text-xs font-bold text-slate-800 font-mono flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{slot.label}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {classesInSlot.length === 0 ? (
                    <div className="py-2 text-xs text-slate-400 italic flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      Free Period / Independent Study
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {classesInSlot.map((cls) => (
                        <div
                          key={cls.id + slot.id}
                          onClick={() => onSelectClass && onSelectClass(cls)}
                          className="p-3.5 rounded-lg border text-left cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-xs"
                          style={{
                            backgroundColor: cls.bgColor,
                            borderColor: cls.borderColor
                          }}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span
                              className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-white/80 border"
                              style={{ color: cls.textColor, borderColor: cls.borderColor }}
                            >
                              {cls.code}
                            </span>
                            <span
                              className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white/90 border"
                              style={{ color: cls.textColor, borderColor: cls.borderColor }}
                            >
                              {cls.type}
                            </span>
                          </div>

                          <h4
                            className="font-bold text-xs sm:text-sm line-clamp-1"
                            style={{ color: cls.textColor }}
                          >
                            {cls.title}
                          </h4>

                          <div className="mt-2 text-[11px] text-slate-600 space-y-1">
                            <div className="flex items-center gap-1.5 font-medium text-slate-700">
                              <Clock className="w-3 h-3 text-slate-500" />
                              <span>{cls.timeDisplay}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3 h-3 text-slate-500" />
                              <span className="font-semibold">{cls.room}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <User className="w-3 h-3 text-slate-500" />
                              <span>{cls.faculty}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // WEEK VIEW (Matrix View)
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden print-area">
      {/* Scrollable Container */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[850px] text-left">
          {/* Header Row: Days */}
          <thead>
            <tr className="bg-slate-900 text-white text-xs border-b border-slate-800">
              <th className="py-3 px-3.5 w-28 text-slate-300 font-semibold uppercase tracking-wider text-center border-r border-slate-800">
                Time Slot
              </th>
              {DAYS_OF_WEEK.map((day) => {
                const isCurrent = day === selectedDay;
                return (
                  <th
                    key={day}
                    className={`py-3 px-3 text-center font-bold tracking-wide border-r border-slate-800 last:border-r-0 ${
                      isCurrent ? 'bg-blue-800 text-white' : 'text-slate-200'
                    }`}
                  >
                    <div className="text-xs uppercase">{day.slice(0, 3)}</div>
                    <div className="text-[10px] text-slate-300 font-normal hidden sm:block">
                      {day}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200 text-xs">
            {TIME_SLOTS.map((slot) => {
              if (slot.isBreak) {
                return (
                  <tr key={slot.id} className="bg-slate-50 text-slate-500">
                    <td className="py-2 px-3 text-center font-mono text-[11px] font-semibold text-slate-600 bg-slate-100/70 border-r border-slate-200">
                      {slot.startTime}
                    </td>
                    <td
                      colSpan={DAYS_OF_WEEK.length}
                      className="py-1.5 px-4 text-center font-medium text-[11px] text-slate-500 tracking-wide bg-amber-50/30"
                    >
                      <div className="inline-flex items-center gap-2 text-amber-800 font-semibold">
                        <Coffee className="w-3.5 h-3.5 text-amber-600" />
                        <span>{slot.title} ({slot.label})</span>
                      </div>
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={slot.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Slot label */}
                  <td className="py-3 px-2 text-center font-mono text-[11px] font-semibold text-slate-700 bg-slate-50/70 border-r border-slate-200 whitespace-nowrap">
                    <div>{slot.startTime}</div>
                    <div className="text-[10px] text-slate-400 font-normal">to {slot.endTime}</div>
                  </td>

                  {/* Days cells */}
                  {DAYS_OF_WEEK.map((day) => {
                    const classes = getClassesForSlot(day, slot);

                    return (
                      <td
                        key={day + slot.id}
                        className="p-1.5 align-top border-r border-slate-200 last:border-r-0 min-w-[120px] max-w-[160px]"
                      >
                        {classes.length === 0 ? (
                          <div className="h-full min-h-[56px] flex items-center justify-center rounded border border-dashed border-slate-100 text-[10px] text-slate-300">
                            —
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            {classes.map((cls) => (
                              <div
                                key={cls.id}
                                onClick={() => onSelectClass && onSelectClass(cls)}
                                className="p-2 rounded-lg border text-left cursor-pointer transition-all hover:shadow-xs hover:scale-[1.01]"
                                style={{
                                  backgroundColor: cls.bgColor,
                                  borderColor: cls.borderColor
                                }}
                                title={`${cls.code}: ${cls.title} (${cls.room})`}
                              >
                                <div className="flex items-center justify-between gap-1 leading-none mb-1">
                                  <span
                                    className="font-mono text-[11px] font-bold"
                                    style={{ color: cls.textColor }}
                                  >
                                    {cls.code}
                                  </span>
                                  <span
                                    className="text-[9px] font-semibold px-1 py-0.2 rounded bg-white/90 border"
                                    style={{ color: cls.textColor, borderColor: cls.borderColor }}
                                  >
                                    {cls.type}
                                  </span>
                                </div>

                                <div
                                  className="font-semibold text-[11px] leading-tight line-clamp-1"
                                  style={{ color: cls.textColor }}
                                >
                                  {cls.title}
                                </div>

                                <div className="mt-1 flex items-center justify-between text-[10px] text-slate-600">
                                  <span className="font-semibold text-slate-700 truncate">
                                    {cls.room}
                                  </span>
                                  <span className="text-[9px] text-slate-500 truncate max-w-[65px]">
                                    {cls.faculty.split(' ').slice(-1)[0]}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
