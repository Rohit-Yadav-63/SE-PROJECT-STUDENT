import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Award,
  CheckCircle2,
  Edit3,
  Shield,
  BookOpen,
  MapPin,
  HeartHandshake
} from 'lucide-react';
import EditProfileModal from '../components/EditProfileModal';
import { COURSES } from '../data/courses';

export default function Profile() {
  const { student, updateStudent } = useOutletContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSaveProfile = (updatedProfile) => {
    updateStudent(updatedProfile);
    setToastMessage('Profile details updated and saved successfully!');
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl shadow-xs text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-emerald-700 hover:text-emerald-900 text-xs">
            Dismiss
          </button>
        </div>
      )}

      {/* Profile Header Hero Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-800 text-white font-bold text-2xl sm:text-3xl flex items-center justify-center shadow-md border-2 border-white">
            {student.name ? student.name.split(' ').map(n => n[0]).join('') : 'RS'}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                {student.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active Student
              </span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-500 mt-0.5">
              Roll No: {student.enrollmentNo}
            </p>
            <p className="text-xs text-blue-700 font-medium mt-1">
              {student.program} • {student.branch}
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Personal & Academic Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Academic Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Program</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">
                  {student.program}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Department / Branch</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">
                  {student.branch}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Current Semester</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">
                  {student.semester}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Academic Year</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">
                  {student.academicYear}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Class Section & Batch</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">
                  {student.section}
                </span>
              </div>
              {/* <div>
                <span className="text-slate-400 block font-medium">Faculty Mentor / Advisor</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">
                  {student.advisor}
                </span>
              </div> */}
            </div>
          </div>

          {/* Contact & Personal Information */}
          {/* <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>Contact & Personal Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Institutional Email</span>
                <a
                  href={`mailto:${student.email}`}
                  className="font-semibold text-blue-600 hover:underline text-sm mt-0.5 block"
                >
                  {student.email}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Contact Phone</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">
                  {student.phone}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Emergency Contact</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">
                  {student.emergencyContact}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Campus Residence</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">
                  {student.hostelRoom}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Date of Birth</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">
                  {student.dob}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Blood Group</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">
                  {student.bloodGroup}
                </span>
              </div>
            </div>
          </div> */}

          {/* Enrolled Courses Quick Summary Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Registered Courses (Semester 5)</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 border-y border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Code</th>
                    <th className="py-2.5 px-3">Course Title</th>
                    <th className="py-2.5 px-3 text-center">Credits</th>
                    <th className="py-2.5 px-3">Faculty</th>
                    <th className="py-2.5 px-3 text-right">Attendance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COURSES.map((c) => (
                    <tr key={c.code} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{c.code}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-900">{c.name}</td>
                      <td className="py-2.5 px-3 text-center font-semibold text-blue-700">{c.credits}</td>
                      <td className="py-2.5 px-3 text-slate-600">{c.faculty.name}</td>
                      <td className="py-2.5 px-3 text-right font-semibold text-emerald-600">{c.attendance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Performance & Stats */}
        <div className="space-y-6">
          {/* Cumulative Performance Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Academic Performance</span>
            </h3>

            <div className="mt-4 space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase">Cumulative GPA (CGPA)</span>
                <div className="text-3xl font-extrabold text-blue-900 mt-1">
                  {student.cgpa} <span className="text-xs font-normal text-slate-400">/ 10.0</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                  First Class with Distinction
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Credits Completed:</span>
                  <span className="font-bold text-slate-800">{student.creditsEarned}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Overall Attendance:</span>
                  <span className="font-bold text-emerald-600">{student.attendanceOverall}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Active Backlogs:</span>
                  <span className="font-bold text-slate-800">0 (Nil)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Fee Status:</span>
                  <span className="font-bold text-emerald-600">Cleared (Receipt #8821)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Faculty Mentor Details */}
          {/* <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-blue-600" />
              <span>Assigned Mentor</span>
            </h3>

            <div className="mt-3 text-xs space-y-2">
              <p className="font-bold text-slate-800 text-sm">
                Dr. Shalini Verma
              </p>
              <p className="text-slate-500">
                Associate Professor, Dept. of Computer Science
              </p>
              <p className="text-slate-600">
                Cabin: Academic Block 1, Room 304
              </p>
              <p className="text-blue-600 font-medium">
                shalini.verma@campusflow.edu.in
              </p>
              <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200/80 text-[11px] text-blue-900 mt-3">
                Mentorship hours: Monday & Wednesday, 3:00 PM – 4:30 PM.
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          student={student}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
}
