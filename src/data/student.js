const STORAGE_KEY = 'campusflow_student_profile';

export const DEFAULT_STUDENT = {
  name: 'Rahul Sharma',
  enrollmentNo: '2023BCSE042',
  program: 'Bachelor of Technology (B.Tech)',
  branch: 'Computer Science and Engineering',
  semester: '5th Semester',
  academicYear: '2026 - 2027',
  section: 'Section B (Batch 2023-27)',
  email: 'rahul.sharma@campusflow.edu.in',
  phone: '+91 98765 43210',
  dob: '2004-08-14',
  bloodGroup: 'B+',
  advisor: 'Dr. Shalini Verma (Dept. of CSE)',
  cgpa: '8.74',
  creditsEarned: '92 / 160',
  attendanceOverall: '90.2%',
  hostelRoom: 'Aryabhatta Hostel, Room 412',
  emergencyContact: '+91 98765 12345 (Father)',
  notificationPreferences: {
    emailAlerts: true,
    smsAlerts: false,
    timetableChanges: true,
    assignmentReminders: true
  }
};

export const getStudentProfile = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_STUDENT, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error loading student profile from localStorage:', e);
  }
  return DEFAULT_STUDENT;
};

export const saveStudentProfile = (updatedProfile) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
    return true;
  } catch (e) {
    console.error('Error saving student profile to localStorage:', e);
    return false;
  }
};

export const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Room Change for CS203',
    message: 'Operating Systems lecture on Wednesday will be held in LT-1 instead of Room 302.',
    time: '20 minutes ago',
    unread: true,
    type: 'timetable'
  },
  {
    id: 'notif-2',
    title: 'DSA Assignment 2 Uploaded',
    message: 'Dr. Shalini Verma has posted the problem set for Graph Traversals. Due Oct 18.',
    time: '2 hours ago',
    unread: true,
    type: 'assignment'
  },
  {
    id: 'notif-3',
    title: 'Mid-Sem Examination Schedule',
    message: 'The official MST timetable for 5th semester is now available under Academic Calendar.',
    time: '1 day ago',
    unread: false,
    type: 'exam'
  },
  {
    id: 'notif-4',
    title: 'Library Book Due Reminder',
    message: 'Database System Concepts (Silberschatz) is due for renewal on Oct 14.',
    time: '2 days ago',
    unread: false,
    type: 'general'
  }
];
