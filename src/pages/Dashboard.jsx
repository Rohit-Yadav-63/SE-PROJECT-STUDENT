import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  BookOpen,
  Coffee,
  ChevronRight,
  ArrowRight,
  AlertCircle,
  FileText,
  CalendarDays,
  Sparkles
} from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import ClassCard from '../components/ClassCard';
import { WEEKLY_SCHEDULE, DAYS_OF_WEEK, getClassStatus } from '../data/timetable';
import { COURSES } from '../data/courses';
import { ACADEMIC_EVENTS } from '../data/calendar';

export default function Dashboard() {
  const { student, onOpenCourseModal } = useOutletContext();

  // Current day - default to Monday for demo (realistic schedule day) or selectable
  const [selectedDay, setSelectedDay] = useState('Monday');

  // Simulated current time for status calculation (e.g. 10:15 AM on Monday)
  const currentTimeSimulated = '10:15';

  // Classes for the selected day in chronological order
  const dayClasses = WEEKLY_SCHEDULE
    .filter((c) => c.day === selectedDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Determine status for each class
  const dayClassesWithStatus = dayClasses.map((c) => {
    const status = getClassStatus(c.startTime, c.endTime, currentTimeSimulated);
    return { ...c, calculatedStatus: status };
  });

  // Identify next upcoming class (first class that is 'Upcoming' or 'Ongoing')
  const nextClassIndex = dayClassesWithStatus.findIndex(
    (c) => c.calculatedStatus === 'Upcoming' || c.calculatedStatus === 'Ongoing'
  );
  const nextClass = nextClassIndex !== -1 ? dayClassesWithStatus[nextClassIndex] : null;

  // Upcoming 2-3 classes for quick glance
  const upcomingClasses = dayClassesWithStatus.filter(
    (c) => c.calculatedStatus === 'Upcoming' || c.calculatedStatus === 'Ongoing'
  ).slice(0, 3);

  // Free periods count
  // Total working slots = 7. Free = 7 - count of classes for day
  const freePeriodCount = Math.max(0, 7 - dayClasses.length);

  // Upcoming academic events
  const nextMilestones = ACADEMIC_EVENTS.slice(2, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>Semester 5 • CSE Department</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Good morning, {student.name?.split(' ')[0] || 'Rahul'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Here’s your academic schedule and upcoming lectures for today.
          </p>
        </div>

        {/* Day Simulator Switcher */}
        <div className="flex flex-col sm:items-end gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Schedule Day View
          </span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {DAYS_OF_WEEK.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  selectedDay === d
                    ? 'bg-blue-700 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {d.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Classes Today"
          value={`${dayClasses.length} Classes`}
          subtitle={`${selectedDay}'s total schedule`}
          icon={Clock}
          badgeText={selectedDay}
          colorVariant="blue"
        />

        <SummaryCard
          title="Enrolled Courses"
          value={`${COURSES.length} Courses`}
          subtitle="21 Academic Credits"
          icon={BookOpen}
          badgeText="Active"
          colorVariant="indigo"
        />

        <SummaryCard
          title="Next Class"
          value={nextClass ? nextClass.code : 'No more classes'}
          subtitle={nextClass ? `${nextClass.startTime} • ${nextClass.room}` : 'Day finished'}
          icon={Clock}
          badgeText={nextClass ? nextClass.type : 'Free'}
          colorVariant="emerald"
        />

        <SummaryCard
          title="Free Periods"
          value={`${freePeriodCount} Slots`}
          subtitle="Including lunch break"
          icon={Coffee}
          badgeText="Self-Study"
          colorVariant="amber"
        />
      </div>

      {/* Main Grid: Today's Schedule & Weekly Preview vs Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>{selectedDay}’s Scheduled Classes</span>
                  <span className="text-xs font-normal text-slate-500">
                    ({dayClasses.length} lectures/labs)
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Classes are ordered chronologically with real-time status.
                </p>
              </div>

              <Link
                to="/timetable"
                className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                Full Timetable <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* List of Today's Classes */}
            {dayClassesWithStatus.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No classes scheduled for {selectedDay}. Enjoy your free day!
              </div>
            ) : (
              <div className="space-y-3">
                {dayClassesWithStatus.map((cls, idx) => {
                  const isNext = nextClass && cls.id === nextClass.id;
                  return (
                    <ClassCard
                      key={cls.id}
                      classItem={cls}
                      status={cls.calculatedStatus}
                      isNext={isNext}
                      onSelectCourse={onOpenCourseModal}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Compact Weekly Timetable Preview */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Weekly Timetable Preview
                </h3>
                <p className="text-xs text-slate-500">
                  Click any day to quickly preview scheduled course distribution.
                </p>
              </div>

              <Link
                to="/timetable"
                className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                Expand View <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Day Pills Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2">
              {DAYS_OF_WEEK.map((day) => {
                const count = WEEKLY_SCHEDULE.filter((c) => c.day === day).length;
                const isSelected = selectedDay === day;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-400 ring-1 ring-blue-300'
                        : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-bold ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                        {day.slice(0, 3)}
                      </span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-white text-slate-600 border border-slate-200">
                        {count}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 truncate">
                      {count === 0 ? 'No classes' : `${count} sessions`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col) */}
        <div className="space-y-6">
          {/* Upcoming Classes Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Upcoming Classes</span>
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Next scheduled classes in queue for {selectedDay}.
            </p>

            {upcomingClasses.length === 0 ? (
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 text-center text-xs text-slate-400">
                All classes for {selectedDay} have concluded.
              </div>
            ) : (
              <div className="space-y-2.5">
                {upcomingClasses.map((cls) => (
                  <div
                    key={cls.id}
                    onClick={() => onOpenCourseModal(cls.code)}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-800">
                        {cls.code}
                      </span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                        {cls.type}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-900 mt-1 truncate">
                      {cls.title}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                      <span className="font-medium text-slate-700">{cls.timeDisplay}</span>
                      <span>{cls.room}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Academic Deadlines / Milestones */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-amber-600" />
                <span>Upcoming Milestones</span>
              </h3>
              <Link to="/calendar" className="text-xs text-blue-600 hover:underline">
                View all
              </Link>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Important submission dates & exams this month.
            </p>

            <div className="space-y-2.5">
              {nextMilestones.map((evt) => (
                <div key={evt.id} className="p-2.5 rounded-lg border border-slate-200 bg-white">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${evt.badgeClass}`}>
                      {evt.type}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {evt.dayDisplay}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 mt-1.5 truncate">
                    {evt.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {evt.location}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Student Quick Resources */}
          <div className="bg-slate-900 text-slate-100 rounded-xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-blue-600 text-white">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Student Academic Notice</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Minimum 75% attendance in both Theory and Labs is mandatory to appear for Semester V End-Term Examinations.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Your Current Overall:</span>
              <span className="font-bold text-emerald-400">90.2% (Eligible)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
