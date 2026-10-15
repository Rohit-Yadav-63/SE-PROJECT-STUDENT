import React from 'react';
import { User, BookOpen, Clock, MapPin, Award, ChevronRight } from 'lucide-react';

export default function CourseCard({ course, onSelect }) {
  return (
    <div
      onClick={() => onSelect(course)}
      className="bg-white rounded-xl border border-slate-200/90 hover:border-blue-300 hover:shadow-sm transition-all p-5 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
    >
      {/* Subtle top color strip indicator */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: course.color.primary }}
      />

      <div>
        {/* Top Meta: Code, Credits, Attendance */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
            {course.code}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-500" />
              {course.credits} Credits
            </span>
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              {course.attendance} Attd.
            </span>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
          {course.name}
        </h3>

        {/* Short description */}
        <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
          {course.description}
        </p>

        {/* Faculty & Schedule Meta */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium text-slate-700 truncate">{course.faculty.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-500">{course.typeBreakdown}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-500 truncate">{course.classroom}</span>
          </div>
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-medium">
        <span>View Full Syllabus & Timetable</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </div>
  );
}
