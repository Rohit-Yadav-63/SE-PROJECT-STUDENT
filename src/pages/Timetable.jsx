import React, { useState, useEffect } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Filter,
  Printer,
  RotateCcw,
  LayoutGrid,
  List,
  Sparkles,
  Info
} from 'lucide-react';
import TimetableGrid from '../components/TimetableGrid';
import { WEEKLY_SCHEDULE, DAYS_OF_WEEK } from '../data/timetable';
import { COURSES } from '../data/courses';

export default function Timetable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { onOpenCourseModal } = useOutletContext();

  // State
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'day'
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week (Oct 12-17, 2026)

  // Filters
  const initialCourse = searchParams.get('course') || 'all';
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [selectedType, setSelectedType] = useState('all');

  // Sync if URL search param changes
  useEffect(() => {
    const courseParam = searchParams.get('course');
    if (courseParam) {
      setSelectedCourse(courseParam);
    }
  }, [searchParams]);

  // Calculate weekly date range based on weekOffset
  const getWeekRange = (offset) => {
    // Base week: Mon Oct 12, 2026 to Sat Oct 17, 2026
    const baseDate = new Date(2026, 9, 12);
    baseDate.setDate(baseDate.getDate() + offset * 7);

    const endDate = new Date(baseDate);
    endDate.setDate(endDate.getDate() + 5);

    const options = { month: 'short', day: 'numeric' };
    const startStr = baseDate.toLocaleDateString('en-US', options);
    const endStr = endDate.toLocaleDateString('en-US', { ...options, year: 'numeric' });

    const weekNumber = 7 + offset;
    return {
      text: `${startStr} – ${endStr}`,
      weekLabel: `Week ${weekNumber > 0 ? weekNumber : 1}`
    };
  };

  const weekInfo = getWeekRange(weekOffset);

  // Reset to today
  const handleResetToday = () => {
    setWeekOffset(0);
    setSelectedDay('Monday');
    setSelectedCourse('all');
    setSelectedType('all');
    setSearchParams({});
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-5">
      {/* Page Header & Navigation Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top Controls: Week Navigator + View Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Week Date Range & Navigation */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50/70 p-0.5">
              <button
                onClick={() => setWeekOffset(prev => prev - 1)}
                className="p-1.5 rounded-md hover:bg-white text-slate-600 hover:text-slate-900 transition-colors"
                title="Previous Week"
                aria-label="Previous week"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleResetToday}
                className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-white rounded-md transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3 text-blue-600" />
                Today
              </button>

              <button
                onClick={() => setWeekOffset(prev => prev + 1)}
                className="p-1.5 rounded-md hover:bg-white text-slate-600 hover:text-slate-900 transition-colors"
                title="Next Week"
                aria-label="Next week"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-slate-900">
                  {weekInfo.text}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {weekInfo.weekLabel}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Academic Session 2026–27 • Regular Class Schedule
              </p>
            </div>
          </div>

          {/* View Switcher & Print Button */}
          <div className="flex items-center gap-2.5">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setViewMode('week')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                  viewMode === 'week'
                    ? 'bg-white text-blue-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Week View</span>
              </button>

              <button
                onClick={() => setViewMode('day')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                  viewMode === 'day'
                    ? 'bg-white text-blue-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Day View</span>
              </button>
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors"
              title="Print Timetable"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Print Schedule</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" /> Filter:
            </span>

            {/* Course Filter Dropdown */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="course-filter" className="text-slate-600 font-medium">
                Course:
              </label>
              <select
                id="course-filter"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 font-medium outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Enrolled Courses (6)</option>
                {COURSES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} — {c.shortName} ({c.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Class Type Filter Dropdown */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="type-filter" className="text-slate-600 font-medium">
                Class Type:
              </label>
              <select
                id="type-filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 font-medium outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Class Types</option>
                <option value="Lecture">Lectures Only</option>
                <option value="Lab">Lab Sessions (2 hrs)</option>
                <option value="Tutorial">Tutorials & Seminars</option>
              </select>
            </div>

            {/* Clear filters badge */}
            {(selectedCourse !== 'all' || selectedType !== 'all') && (
              <button
                onClick={() => {
                  setSelectedCourse('all');
                  setSelectedType('all');
                  setSearchParams({});
                }}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium underline"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Quick Notice */}
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            <span>Click any class block to view syllabus & faculty details</span>
          </div>
        </div>
      </div>

      {/* Timetable Matrix / Grid Component */}
      <TimetableGrid
        schedule={WEEKLY_SCHEDULE}
        viewMode={viewMode}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        onSelectClass={(item) => onOpenCourseModal(item.code)}
        filterCourse={selectedCourse}
        filterType={selectedType}
      />

      {/* Course Color Legend */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Course Color Legend & Venues
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {COURSES.map((course) => (
            <div
              key={course.code}
              onClick={() => onOpenCourseModal(course)}
              className="p-2 rounded-lg border text-left cursor-pointer hover:shadow-xs transition-all"
              style={{
                backgroundColor: course.color.bgLight,
                borderColor: course.color.border
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: course.color.text }}
                >
                  {course.code}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {course.credits} Cr
                </span>
              </div>
              <p
                className="text-xs font-semibold truncate mt-0.5"
                style={{ color: course.color.text }}
              >
                {course.shortName}
              </p>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">
                {course.classroom.split('•')[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
