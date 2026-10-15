import React, { useState } from 'react';
import { X, Save, User, Phone, Mail, ShieldAlert, Bell } from 'lucide-react';

export default function EditProfileModal({ student, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: student.name || '',
    phone: student.phone || '',
    email: student.email || '',
    emergencyContact: student.emergencyContact || '',
    hostelRoom: student.hostelRoom || '',
    notificationPreferences: {
      emailAlerts: student.notificationPreferences?.emailAlerts ?? true,
      timetableChanges: student.notificationPreferences?.timetableChanges ?? true,
      assignmentReminders: student.notificationPreferences?.assignmentReminders ?? true
    }
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...student,
      ...formData
    };
    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Edit Student Profile
            </h2>
            <p className="text-xs text-slate-500">
              Update contact information and alert preferences
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
            {savedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg font-medium text-xs">
                Profile changes saved successfully!
              </div>
            )}

            {/* Readonly info notice */}
            <div className="p-3 bg-blue-50/70 border border-blue-200 text-blue-800 rounded-lg flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold">Academic Records:</span> Enrollment No (
                <span className="font-mono">{student.enrollmentNo}</span>), Program, and Branch are locked by the Registrar's Office.
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Student Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                University Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Contact Phone & Emergency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Primary Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Hostel / Residence */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Campus Residence / Hostel Room
              </label>
              <input
                type="text"
                value={formData.hostelRoom}
                onChange={(e) => setFormData({ ...formData, hostelRoom: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Notification Preferences */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-blue-600" /> Notification Preferences
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notificationPreferences.timetableChanges}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notificationPreferences: {
                          ...formData.notificationPreferences,
                          timetableChanges: e.target.checked
                        }
                      })
                    }
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="text-slate-700">Instant notification for timetable & classroom changes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notificationPreferences.assignmentReminders}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notificationPreferences: {
                          ...formData.notificationPreferences,
                          assignmentReminders: e.target.checked
                        }
                      })
                    }
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="text-slate-700">Assignment deadline & exam reminder notifications</span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
