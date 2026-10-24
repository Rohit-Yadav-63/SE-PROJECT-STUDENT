import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_STUDENT } from '../data/student';

const AuthContext = createContext(null);

const REGISTERED_USERS_KEY = 'campusflow_registered_users';
const CURRENT_USER_KEY = 'campusflow_current_user';

// Helper to get registered users from localStorage
export const getRegisteredUsers = () => {
  try {
    const data = localStorage.getItem(REGISTERED_USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading registered users from localStorage:', e);
    return [];
  }
};

// Helper to save registered users to localStorage
export const saveRegisteredUsers = (users) => {
  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    return true;
  } catch (e) {
    console.error('Error saving registered users to localStorage:', e);
    return false;
  }
};

// Helper to get current authenticated user session
export const getCurrentUser = () => {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error reading current user session:', e);
    return null;
  }
};

// Validate that email uses the domain @bmu.edu.in
export const isValidBmuEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  // Must have characters before @bmu.edu.in and strictly end with @bmu.edu.in
  const bmuRegex = /^[a-zA-Z0-9._%+-]+@bmu\.edu\.in$/i;
  return bmuRegex.test(email.trim());
};

// Validate password requirements:
// - Minimum 8 characters
// - At least one uppercase letter (A-Z)
// - At least one lowercase letter (a-z)
// - At least one digit (0-9)
// - At least one special character (@, #, $, %, !, etc.)
export const isValidPassword = (password) => {
  if (!password || typeof password !== 'string') return false;
  const minLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[@#$%!^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);
  return minLength && hasUpper && hasLower && hasDigit && hasSpecial;
};

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(() => getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getCurrentUser()));

  // Register a new user
  const signup = (newStudentData) => {
    const email = (newStudentData.email || '').trim().toLowerCase();
    const password = newStudentData.password || '';

    // Validate email domain (@bmu.edu.in)
    if (!isValidBmuEmail(email)) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Validate password complexity
    if (!isValidPassword(password)) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Prevent duplicate accounts
    const users = getRegisteredUsers();
    const existing = users.find(u => u.email && u.email.toLowerCase() === email);
    if (existing) {
      return { success: false, error: 'An account with this email already exists. Please sign in.' };
    }

    // Create new student account record
    const newUser = {
      ...DEFAULT_STUDENT,
      ...newStudentData,
      id: 'usr_' + Date.now(),
      email: email,
      name: newStudentData.name?.trim() || 'Student',
      enrollmentNo: newStudentData.enrollmentNo?.trim() || '2024BCSE' + Math.floor(100 + Math.random() * 900),
      password: password,
      branch: newStudentData.branch || DEFAULT_STUDENT.branch,
      semester: newStudentData.semester || DEFAULT_STUDENT.semester,
      program: newStudentData.program || DEFAULT_STUDENT.program,
      section: newStudentData.section || DEFAULT_STUDENT.section,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    saveRegisteredUsers(updatedUsers);

    return { success: true, user: newUser };
  };

  // Login handler: Authenticate against registered users only
  const login = (identifier, password) => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = password || '';

    if (!cleanId || !cleanPass) {
      return { success: false, error: 'Please enter your email and password.' };
    }

    const users = getRegisteredUsers();

    // Check if account exists by email or enrollment number
    const user = users.find(
      u => (u.email && u.email.toLowerCase() === cleanId) ||
           (u.enrollmentNo && u.enrollmentNo.toLowerCase() === cleanId)
    );

    // If user has not signed up first
    if (!user) {
      return { success: false, error: 'Account not found. Please sign up first.' };
    }

    // If password does not match
    if (user.password !== cleanPass) {
      return { success: false, error: 'Invalid email or password.' };
    }

    // Successful login: persist session
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    setStudent(user);
    setIsAuthenticated(true);
    return { success: true, user };
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setStudent(null);
    setIsAuthenticated(false);
  };

  // Update profile
  const updateProfile = (updatedData) => {
    if (!student) return;
    const newStudent = { ...student, ...updatedData };
    setStudent(newStudent);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newStudent));

    // Update in registered users list
    const users = getRegisteredUsers();
    const updatedUsers = users.map(u => (u.email === student.email ? { ...u, ...updatedData } : u));
    saveRegisteredUsers(updatedUsers);
  };

  // Fallback student object so protected components never crash
  const effectiveStudent = student ? { ...DEFAULT_STUDENT, ...student } : DEFAULT_STUDENT;

  return (
    <AuthContext.Provider
      value={{
        student: effectiveStudent,
        isAuthenticated,
        login,
        signup,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
