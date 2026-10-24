import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Printer,
  LayoutGrid,
  List,
  Filter,
  Coffee,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { WEEKLY_SCHEDULE, DAYS_OF_WEEK, TIME_SLOTS } from '../data/timetable';
import { COURSES } from '../data/courses';

export default function Timetable() {
  const [activeDay, setActiveDay] = useState('Monday');
  const [viewMode, setViewMode] = useState('daywise'); // 'daywise' or 'grid'
  const [filterType, setFilterType] = useState('all');

  // Filter classes for the active day
  const dayClasses = WEEKLY_SCHEDULE.filter((c) => {
    if (c.day !== activeDay) return false;
    if (filterType !== 'all' && c.type !== filterType) return false;
    return true;
  }).sort((a, b) => a.startTime.localeCompare(b.startTime));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <CalendarDays className="w-3.5 h-3.5 text-blue-600" />
            <span>Academic Session 2026–2027</span>
          </div> */}
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Weekly Timetable (Day-wise)
          </h1>
          {/* <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete schedule of lectures, laboratory practicals, and tutorial sessions.
          </p> */}
        </div>

        {/* View mode toggle & Print button */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {/* <button
              onClick={() => setViewMode('daywise')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${viewMode === 'daywise'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Day-wise View</span>
            </button> */}

            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${viewMode === 'grid'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Full Week Grid</span>
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Print Timetable</span>
          </button>
        </div>
      </div>

      {/* Day Navigation Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5">
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = activeDay === day;
              const count = WEEKLY_SCHEDULE.filter((c) => c.day === day).length;

              return (
                <button
                  key={day}
                  onClick={() => {
                    setActiveDay(day);
                    setViewMode('daywise');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${isSelected && viewMode === 'daywise'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                >
                  <span>{day}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isSelected && viewMode === 'daywise'
                      ? 'bg-blue-800 text-white'
                      : 'bg-slate-200 text-slate-600'
                      }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Type Filter */}
          <div className="hidden lg:flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Type:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Sessions</option>
              <option value="Lecture">Lectures</option>
              <option value="Lab">Labs Only</option>
              <option value="Tutorial">Tutorials</option>
            </select>
          </div>
        </div>
      </div>

      {/* VIEW 1: DAY-WISE DETAILED SCHEDULE */}
      {viewMode === 'daywise' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>{activeDay}’s Timetable</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {dayClasses.length} {dayClasses.length === 1 ? 'Session' : 'Sessions'}
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Detailed day schedule with lecture halls, laboratory venues, and faculty instructors.
              </p>
            </div>
          </div>

          {/* Day's Timeline Cards */}
          <div className="space-y-3.5">
            {dayClasses.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                No classes scheduled for {activeDay} under current filter.
              </div>
            ) : (
              dayClasses.map((cls, idx) => {
                const isLab = cls.type === 'Lab';
                const isTutorial = cls.type === 'Tutorial';

                return (
                  <React.Fragment key={cls.id || idx}>
                    {/* Morning Break separator on Monday/Wednesday/Friday around 11:00 */}
                    {cls.startTime === '11:15' && (
                      <div className="flex items-center gap-3 py-1 px-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-800">
                        <Coffee className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="font-semibold">Morning Break (11:00 AM – 11:15 AM)</span>
                        <span className="text-[11px] text-amber-600 ml-auto">15 Minutes Recess</span>
                      </div>
                    )}

                    {/* Lunch Break separator if class starts at 14:00 (2:00 PM) */}
                    {cls.startTime === '14:00' && (
                      <div className="flex items-center gap-3 py-1.5 px-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-emerald-800">
                        <Coffee className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-semibold">Lunch Recess (01:15 PM – 02:00 PM)</span>
                        <span className="text-[11px] text-emerald-600 ml-auto">45 Minutes Break</span>
                      </div>
                    )}

                    <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left: Time and Course */}
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-28 text-center p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Slot</span>
                          </div>
                          <div className="text-xs font-extrabold text-slate-800">
                            {cls.startTime} - {cls.endTime}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                              {cls.code}
                            </span>
                            <span
                              className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${isLab
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : isTutorial
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : 'bg-blue-50 text-blue-700 border-blue-200'
                                }`}
                            >
                              {cls.type}
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-slate-900">
                            {cls.title}
                          </h3>

                          <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 flex-wrap">
                            <span className="flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-medium text-slate-700">{cls.faculty}</span>
                            </span>

                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-semibold text-slate-800">{cls.room}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: FULL WEEK DAY-WISE GRID TABLE */}
      {viewMode === 'grid' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Weekly Timetable Matrix</h3>
            <p className="text-xs text-slate-500 mt-0.5">Overview of all days (Monday to Saturday)</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700">
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-28">Day</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">Scheduled Classes & Venues</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {DAYS_OF_WEEK.map((day) => {
                  const daySchedules = WEEKLY_SCHEDULE.filter((c) => c.day === day).sort((a, b) =>
                    a.startTime.localeCompare(b.startTime)
                  );

                  return (
                    <tr key={day} className="hover:bg-slate-50/60 transition">
                      <td className="p-3.5 font-bold text-slate-900 align-top bg-slate-50/40 border-r border-slate-200">
                        <div className="text-sm">{day}</div>
                        <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                          {daySchedules.length} {daySchedules.length === 1 ? 'class' : 'classes'}
                        </div>
                      </td>
                      <td className="p-3.5 align-top">
                        {daySchedules.length === 0 ? (
                          <span className="text-slate-400 italic">No classes scheduled</span>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                            {daySchedules.map((c) => (
                              <div
                                key={c.id}
                                className="p-2.5 rounded-lg border border-slate-200 bg-white hover:border-blue-300 transition"
                              >
                                <div className="flex items-center justify-between text-[11px] mb-1">
                                  <span className="font-mono font-bold text-slate-800">{c.code}</span>
                                  <span className="font-medium text-slate-500">{c.startTime}</span>
                                </div>
                                <div className="font-semibold text-slate-900 text-xs line-clamp-1">
                                  {c.title}
                                </div>
                                <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                                  <span>{c.room}</span>
                                  <span className="text-[10px] px-1 rounded bg-slate-100 text-slate-600 font-medium">{c.type}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Enrolled Courses Reference Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Registered Courses & Faculty Directory</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Code</th>
                <th className="py-2.5 px-3">Course Name</th>
                <th className="py-2.5 px-3 text-center">Credits</th>
                <th className="py-2.5 px-3">Faculty Instructor</th>
                <th className="py-2.5 px-3">Primary Venue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COURSES.map((course) => (
                <tr key={course.code} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{course.code}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-900">{course.name}</td>
                  <td className="py-2.5 px-3 text-center font-bold text-blue-700">{course.credits}</td>
                  <td className="py-2.5 px-3 text-slate-700">{course.faculty.name}</td>
                  <td className="py-2.5 px-3 text-slate-600">{course.classroom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
