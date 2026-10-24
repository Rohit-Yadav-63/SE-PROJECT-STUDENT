import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Coffee
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { WEEKLY_SCHEDULE, DAYS_OF_WEEK } from '../data/timetable';

export default function Dashboard() {
  const { student } = useAuth();

  // Get current day of week from real date (e.g. 'Monday', 'Tuesday', ...)
  const realDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIndex = new Date().getDay();
  const currentActualDay = realDayNames[todayIndex];

  // If today is Sunday, default to Monday, otherwise current day
  const defaultDay = currentActualDay === 'Sunday' ? 'Monday' : currentActualDay;
  const [activeDay, setActiveDay] = useState(defaultDay);

  // Today's classes in chronological order
  const todayClasses = WEEKLY_SCHEDULE
    .filter((c) => c.day === activeDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Simulated or calculated current time helper
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const getStatus = (startTime, endTime) => {
    // If viewing today's real day
    if (activeDay === currentActualDay) {
      const [sh, sm] = startTime.split(':').map(Number);
      const [eh, em] = endTime.split(':').map(Number);
      const sMin = sh * 60 + sm;
      const eMin = eh * 60 + em;

      if (currentMinutes < sMin) return { label: 'Upcoming', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      if (currentMinutes >= sMin && currentMinutes <= eMin) return { label: 'Ongoing Now', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold' };
      return { label: 'Completed', color: 'bg-slate-100 text-slate-500 border-slate-200' };
    }
    return { label: 'Scheduled', color: 'bg-slate-100 text-slate-600 border-slate-200' };
  };

  // Next class calculation
  const nextClass = todayClasses.find(c => {
    const status = getStatus(c.startTime, c.endTime);
    return status.label === 'Ongoing Now' || status.label === 'Upcoming' || status.label === 'Scheduled';
  }) || todayClasses[0];

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="space-y-6">
      {/* Student Welcome Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>{student.program} • {student.semester}</span>
          </div> */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {student.name?.split(' ')[0] || 'Student'}
          </h1>
          {/* <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Roll No: <span className="font-mono font-medium text-slate-700">{student.enrollmentNo}</span> • {formattedDate}
          </p> */}
        </div>

        {/* View Timetable Action */}
        {/* <div className="flex items-center gap-3">
          <Link
            to="/timetable"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition"
          >
            <CalendarDays className="w-4 h-4" />
            <span>Full Weekly Timetable</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div> */}
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Classes Today */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Classes Today</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {todayClasses.length} {todayClasses.length === 1 ? 'Class' : 'Classes'}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Scheduled for {activeDay}
          </p>
        </div>

        {/* Next Class */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Next Lecture / Lab</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-bold text-slate-900 truncate">
            {nextClass ? `${nextClass.code}` : 'No Classes'}
          </div>
          <p className="text-xs text-slate-500 mt-1 truncate">
            {nextClass ? `${nextClass.timeDisplay} • ${nextClass.room}` : 'Day Finished'}
          </p>
        </div>

        {/* Branch / Section */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Class Section</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-bold text-slate-900 truncate">
            {student.section || 'Section B'}
          </div>
          <p className="text-xs text-slate-500 mt-1 truncate">
            {student.branch}
          </p>
        </div>

        {/* Attendance Status */}
        {/* <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Overall Attendance</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            {student.attendanceOverall || '90.2%'}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Above university 75% criteria
          </p>
        </div> */}
      </div>

      {/* Main Section: Today's Scheduled Classes */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Today's Scheduled Classes</span>
            </h2>
            {/* <p className="text-xs text-slate-500 mt-0.5">
              Chronological timetable of all lectures, practical labs, and sessions for {activeDay}.
            </p> */}
          </div>

          {/* Day Filter Switcher (Mon - Sat) */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = activeDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                    }`}
                >
                  {day.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Classes List */}
        <div className="mt-6 space-y-4">
          {todayClasses.length === 0 ? (
            <div className="p-12 text-center rounded-xl bg-slate-50 border border-slate-100">
              <Coffee className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-700">No Classes Scheduled for {activeDay}</h3>
              <p className="text-xs text-slate-400 mt-1">
                You have a free day today! Use this time to revise or relax.
              </p>
            </div>
          ) : (
            todayClasses.map((cls, index) => {
              const status = getStatus(cls.startTime, cls.endTime);
              const isLab = cls.type === 'Lab';
              const isTutorial = cls.type === 'Tutorial';

              return (
                <div
                  key={cls.id || index}
                  className="p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left: Time and Subject */}
                  <div className="flex items-start gap-4">
                    {/* Time badge */}
                    <div className="shrink-0 w-28 text-center p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-center gap-1 text-slate-500 mb-0.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Time</span>
                      </div>
                      <div className="text-xs font-extrabold text-slate-800">
                        {cls.startTime} - {cls.endTime}
                      </div>
                    </div>

                    {/* Subject info */}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        {/* <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                          {cls.code}
                        </span> */}

                        {/* <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${isLab
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : isTutorial
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                            }`}
                        >
                          {cls.type}
                        </span> */}

                        <span className={`text-[11px] px-2 py-0.5 rounded-full border ${status.color}`}>
                          {status.label}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900">
                        {cls.title}
                      </h3>

                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 flex-wrap">
                        {/* <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-medium text-slate-700">{cls.faculty}</span>
                        </span> */}

                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-semibold text-slate-800">{cls.room}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Quick actions */}
                  <div className="flex items-center gap-3 self-end md:self-center">
                    <Link
                      to="/timetable"
                      className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg transition"
                    >
                      View in Timetable
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Break Note */}
        {/* <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-amber-600" />
            <span>Regular Campus Breaks: Morning Recess (11:00 AM – 11:15 AM) • Lunch Recess (01:15 PM – 02:00 PM)</span>
          </div>
          <Link to="/timetable" className="font-semibold text-blue-600 hover:text-blue-800 shrink-0">
            Check Full Week Schedule →
          </Link>
        </div> */}
      </div>
    </div>
  );
}
