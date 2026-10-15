// import React, { useState } from 'react';
// import {
//   CalendarDays,
//   Clock,
//   MapPin,
//   Calendar as CalendarIcon,
//   Filter,
//   CheckCircle2,
//   AlertCircle,
//   Tag,
//   Info
// } from 'lucide-react';
// import { ACADEMIC_EVENTS } from '../data/calendar';

// export default function Calendar() {
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredEvents = ACADEMIC_EVENTS.filter((evt) => {
//     const matchesCategory =
//       activeCategory === 'all' || evt.category === activeCategory;
//     const matchesSearch =
//       evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       evt.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       evt.type.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const categories = [
//     { id: 'all', label: 'All Dates & Events', count: ACADEMIC_EVENTS.length },
//     { id: 'exam', label: 'Exams & MSTs', count: ACADEMIC_EVENTS.filter((e) => e.category === 'exam').length },
//     { id: 'deadline', label: 'Deadlines & Submissions', count: ACADEMIC_EVENTS.filter((e) => e.category === 'deadline').length },
//     { id: 'holiday', label: 'Holidays & Recess', count: ACADEMIC_EVENTS.filter((e) => e.category === 'holiday').length },
//     { id: 'academic', label: 'Term Milestones', count: ACADEMIC_EVENTS.filter((e) => e.category === 'academic').length }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Header Banner */}
//       <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <div className="flex items-center gap-2">
//             <span className="p-2 rounded-lg bg-blue-50 text-blue-700">
//               <CalendarDays className="w-5 h-5" />
//             </span>
//             <h1 className="text-xl font-bold text-slate-900">Academic Calendar</h1>
//           </div>
//           <p className="text-xs text-slate-500 mt-1">
//             Autumn Semester 2026–27 Schedule • Examination dates, assignments & university recesses
//           </p>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="px-3 py-2 bg-blue-50/70 rounded-lg border border-blue-200/60 text-xs text-blue-800 font-semibold flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
//             Semester Ongoing (Week 9)
//           </div>
//         </div>
//       </div>

//       {/* Filter and Search Bar */}
//       <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
//         <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 md:pb-0">
//           {categories.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActiveCategory(cat.id)}
//               className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
//                 activeCategory === cat.id
//                   ? 'bg-blue-700 text-white font-semibold shadow-xs'
//                   : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
//               }`}
//             >
//               {cat.label} ({cat.count})
//             </button>
//           ))}
//         </div>

//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search events or exams..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full md:w-64 text-xs px-3 py-1.5 pl-8 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
//           />
//           <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
//         </div>
//       </div>

//       {/* Events Timeline / Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {filteredEvents.length === 0 ? (
//           <div className="col-span-full bg-white rounded-xl border border-slate-200 p-12 text-center">
//             <CalendarIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
//             <p className="text-sm font-semibold text-slate-700">No events found matching your criteria</p>
//             <p className="text-xs text-slate-400 mt-1">Try resetting the filter or clear your search query.</p>
//           </div>
//         ) : (
//           filteredEvents.map((evt) => (
//             <div
//               key={evt.id}
//               className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between"
//             >
//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${evt.badgeClass}`}>
//                     {evt.type}
//                   </span>
//                   <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600">
//                     <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
//                     <span>{evt.dayDisplay}</span>
//                   </div>
//                 </div>

//                 <h3 className="text-sm font-bold text-slate-900 mt-2">
//                   {evt.title}
//                 </h3>
//                 <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
//                   {evt.description}
//                 </p>
//               </div>

//               <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
//                 <div className="flex items-center gap-1.5">
//                   <Clock className="w-3.5 h-3.5 text-slate-400" />
//                   <span>{evt.time}</span>
//                 </div>
//                 <div className="flex items-center gap-1.5 text-slate-700 font-medium">
//                   <MapPin className="w-3.5 h-3.5 text-slate-400" />
//                   <span className="truncate max-w-[180px]">{evt.location}</span>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* University Academic Notice Policy Banner */}
//       <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-4 flex items-start gap-3 text-xs text-blue-900">
//         <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
//         <div>
//           <span className="font-bold">Official Notice:</span> All Mid-Semester (MST) and End-Semester dates are determined by the University Examination Controller. Students are required to maintain a minimum 75% attendance in each course to be eligible to sit for final semester examinations.
//         </div>
//       </div>
//     </div>
//   );
// }
