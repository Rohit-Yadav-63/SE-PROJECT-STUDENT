import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Search, BookOpen, Award, CheckCircle2, Filter, AlertCircle } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { COURSES } from '../data/courses';

export default function Courses() {
  const { onOpenCourseModal } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Filter courses based on search query and type
  const filteredCourses = COURSES.filter((course) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      course.name.toLowerCase().includes(q) ||
      course.code.toLowerCase().includes(q) ||
      course.shortName.toLowerCase().includes(q) ||
      course.faculty.name.toLowerCase().includes(q);

    if (!matchesQuery) return false;

    if (filterType === 'lab') {
      return course.typeBreakdown.toLowerCase().includes('lab');
    }
    if (filterType === 'theory') {
      return !course.typeBreakdown.toLowerCase().includes('lab');
    }

    return true;
  });

  const totalCredits = COURSES.reduce((sum, c) => sum + c.credits, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner & Academic Summary */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <span>Autumn 2026 Curriculum</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Enrolled Academic Courses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Registered courses for B.Tech Computer Science & Engineering (Semester 5).
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
          <div className="text-center px-3 border-r border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">Courses</span>
            <span className="text-lg font-bold text-slate-900">{COURSES.length}</span>
          </div>
          {/* <div className="text-center px-3 border-r border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">Credits</span>
            <span className="text-lg font-bold text-blue-700">{totalCredits}</span>
          </div>
          <div className="text-center px-3">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">Avg Attd.</span>
            <span className="text-lg font-bold text-emerald-600">89.8%</span>
          </div> */}
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search courses by code, title, or faculty (e.g. CS201, DBMS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
          />
        </div>

        {/* Filter Type Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${filterType === 'all'
                ? 'bg-blue-700 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
          >
            All Courses ({COURSES.length})
          </button>
          <button
            onClick={() => setFilterType('lab')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${filterType === 'lab'
                ? 'bg-blue-700 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
          >
            With Lab Practicals (4)
          </button>
          <button
            onClick={() => setFilterType('theory')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${filterType === 'theory'
                ? 'bg-blue-700 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
          >
            Theory Only (2)
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No courses match your query</p>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search terms or clearing the filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterType('all');
            }}
            className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={onOpenCourseModal}
            />
          ))}
        </div>
      )}
    </div>
  );
}
