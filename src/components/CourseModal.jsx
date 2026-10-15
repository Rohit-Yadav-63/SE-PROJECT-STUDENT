import React from 'react';
import { X, Clock, MapPin, Mail, User, BookOpen, Calendar, Award, CheckCircle } from 'lucide-react';

export default function CourseModal({ course, onClose, onNavigateTimetable }) {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                {course.code}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                {course.credits} Credits
              </span>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Attendance: {course.attendance}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {course.name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {course.typeBreakdown} • {course.classroom}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          {/* Faculty Profile Card */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" /> Course Faculty & Cabin
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <p className="font-semibold text-slate-800 text-sm">{course.faculty.name}</p>
                <p className="text-slate-500">{course.faculty.designation}</p>
              </div>
              <div className="space-y-1 text-slate-600">
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={`mailto:${course.faculty.email}`} className="text-blue-600 hover:underline">
                    {course.faculty.email}
                  </a>
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{course.faculty.cabin}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Office Hours: {course.faculty.officeHours}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Weekly Schedule for this course */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" /> Weekly Class Schedule
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.schedule && course.schedule.map((slot, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold text-xs text-slate-800 block">
                      {slot.day}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400" /> {slot.time}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {slot.type}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      {slot.room}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Syllabus Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Syllabus Modules
            </h3>
            <div className="space-y-1.5">
              {course.syllabus && course.syllabus.map((unit, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-300 rounded-lg shadow-2xs hover:bg-slate-50"
          >
            Close
          </button>
          {onNavigateTimetable && (
            <button
              onClick={() => {
                onClose();
                onNavigateTimetable(course.code);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs"
            >
              Filter in Timetable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
