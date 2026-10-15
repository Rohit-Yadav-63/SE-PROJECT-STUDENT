export const COURSES = [
  {
    id: 'CS201',
    code: 'CS201',
    name: 'Data Structures and Algorithms',
    shortName: 'DSA',
    credits: 4,
    faculty: {
      name: 'Dr. Shalini Verma',
      designation: 'Associate Professor, Dept. of CSE',
      email: 'shalini.verma@campusflow.edu.in',
      cabin: 'Academic Block 1, Room 304',
      officeHours: 'Mon, Wed 03:00 PM – 04:30 PM'
    },
    color: {
      primary: '#2563eb',
      bgLight: '#eff6ff',
      border: '#bfdbfe',
      text: '#1d4ed8',
      badge: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    typeBreakdown: '3 Lectures + 1 Lab session / week',
    classroom: 'LT-1 (Lectures) • CS Lab 2 (Labs)',
    attendance: '88%',
    description: 'Fundamental concepts of data structures including trees, heaps, graphs, hashing, and analysis of algorithmic efficiency (asymptotic notations, divide and conquer, dynamic programming).',
    syllabus: [
      'Unit 1: Stacks, Queues, Linked Lists & Complexity Analysis',
      'Unit 2: Binary Trees, BST, AVL Trees, B-Trees & Heaps',
      'Unit 3: Graph Representations, BFS, DFS, Dijkstra, Bellman-Ford',
      'Unit 4: Dynamic Programming & Greedy Algorithms'
    ],
    schedule: [
      { day: 'Monday', time: '09:00 AM - 10:00 AM', type: 'Lecture', room: 'LT-1' },
      { day: 'Monday', time: '02:00 PM - 04:00 PM', type: 'Lab', room: 'CS Lab 2' },
      { day: 'Wednesday', time: '10:00 AM - 11:00 AM', type: 'Lecture', room: 'LT-1' },
      { day: 'Friday', time: '09:00 AM - 10:00 AM', type: 'Lecture', room: 'LT-1' }
    ]
  },
  {
    id: 'CS202',
    code: 'CS202',
    name: 'Database Management Systems',
    shortName: 'DBMS',
    credits: 4,
    faculty: {
      name: 'Prof. Rajesh Kumar',
      designation: 'Assistant Professor (Senior Scale)',
      email: 'rajesh.kumar@campusflow.edu.in',
      cabin: 'Academic Block 1, Room 210',
      officeHours: 'Tue, Thu 02:00 PM – 03:30 PM'
    },
    color: {
      primary: '#4f46e5',
      bgLight: '#eef2ff',
      border: '#c7d2fe',
      text: '#4338ca',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    typeBreakdown: '3 Lectures + 1 Lab session / week',
    classroom: 'LT-2 (Lectures) • CS Lab 1 (Labs)',
    attendance: '92%',
    description: 'Relational data model, schema design, ER diagrams, SQL, normalization (1NF to BCNF), indexing, concurrency control, transaction processing, and introductory NoSQL.',
    syllabus: [
      'Unit 1: Relational Model, Relational Algebra & Calculus',
      'Unit 2: Advanced SQL, Triggers, Views & Stored Procedures',
      'Unit 3: Functional Dependencies, Normal Forms (1NF through BCNF)',
      'Unit 4: ACID Properties, Concurrency Control & Indexing'
    ],
    schedule: [
      { day: 'Monday', time: '10:00 AM - 11:00 AM', type: 'Lecture', room: 'LT-2' },
      { day: 'Tuesday', time: '12:15 PM - 01:15 PM', type: 'Lecture', room: 'LT-2' },
      { day: 'Tuesday', time: '02:00 PM - 04:00 PM', type: 'Lab', room: 'CS Lab 1' },
      { day: 'Thursday', time: '11:15 AM - 12:15 PM', type: 'Lecture', room: 'LT-2' }
    ]
  },
  {
    id: 'CS203',
    code: 'CS203',
    name: 'Operating Systems',
    shortName: 'OS',
    credits: 4,
    faculty: {
      name: 'Dr. Aris Thorne',
      designation: 'Professor & Dean of Academics',
      email: 'aris.thorne@campusflow.edu.in',
      cabin: 'Academic Block 2, Room 115',
      officeHours: 'Mon, Fri 11:00 AM – 12:30 PM'
    },
    color: {
      primary: '#059669',
      bgLight: '#ecfdf5',
      border: '#a7f3d0',
      text: '#047857',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    typeBreakdown: '3 Lectures + 1 Lab session / week',
    classroom: 'Room 302 (Lectures) • Systems Lab (Labs)',
    attendance: '85%',
    description: 'Process management, CPU scheduling algorithms, inter-process communication, concurrency, deadlocks, memory management, virtual memory paging, and file system architecture.',
    syllabus: [
      'Unit 1: Operating System Services, System Calls & Process Lifecycle',
      'Unit 2: Threads, CPU Scheduling & Process Synchronization',
      'Unit 3: Deadlocks: Prevention, Avoidance, Detection & Recovery',
      'Unit 4: Memory Management, Virtual Memory, Page Replacement & Storage'
    ],
    schedule: [
      { day: 'Monday', time: '11:15 AM - 12:15 PM', type: 'Lecture', room: 'Room 302' },
      { day: 'Wednesday', time: '09:00 AM - 10:00 AM', type: 'Lecture', room: 'Room 302' },
      { day: 'Wednesday', time: '02:00 PM - 04:00 PM', type: 'Lab', room: 'Systems Lab' },
      { day: 'Friday', time: '10:00 AM - 11:00 AM', type: 'Lecture', room: 'Room 302' }
    ]
  },
  {
    id: 'CS204',
    code: 'CS204',
    name: 'Computer Networks',
    shortName: 'CN',
    credits: 3,
    faculty: {
      name: 'Dr. Priya Sundaram',
      designation: 'Associate Professor',
      email: 'priya.sundaram@campusflow.edu.in',
      cabin: 'Academic Block 2, Room 402',
      officeHours: 'Tue, Thu 03:00 PM – 04:30 PM'
    },
    color: {
      primary: '#7c3aed',
      bgLight: '#f5f3ff',
      border: '#ddd6fe',
      text: '#6d28d9',
      badge: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    typeBreakdown: '3 Lectures / week',
    classroom: 'Room 204',
    attendance: '90%',
    description: 'Layered network architecture (OSI and TCP/IP), physical and data link layers, error detection, flow control, routing algorithms, transport layer protocols (TCP/UDP), and network security.',
    syllabus: [
      'Unit 1: Protocol Hierarchies, Physical Layer & Switching',
      'Unit 2: Data Link Layer, Sliding Window Protocols, Ethernet & CSMA/CD',
      'Unit 3: Network Layer: IPv4/IPv6 Addressing, Routing Algorithms (OSPF, BGP)',
      'Unit 4: Transport Layer (TCP Flow/Congestion Control) & Application Layer (DNS, HTTP)'
    ],
    schedule: [
      { day: 'Tuesday', time: '09:00 AM - 10:00 AM', type: 'Lecture', room: 'Room 204' },
      { day: 'Wednesday', time: '11:15 AM - 12:15 PM', type: 'Lecture', room: 'Room 204' },
      { day: 'Thursday', time: '12:15 PM - 01:15 PM', type: 'Lecture', room: 'Room 204' }
    ]
  },
  {
    id: 'CS205',
    code: 'CS205',
    name: 'Software Engineering',
    shortName: 'SE',
    credits: 3,
    faculty: {
      name: 'Prof. Neha Sharma',
      designation: 'Assistant Professor',
      email: 'neha.sharma@campusflow.edu.in',
      cabin: 'Academic Block 1, Room 108',
      officeHours: 'Wed, Fri 01:30 PM – 03:00 PM'
    },
    color: {
      primary: '#d97706',
      bgLight: '#fffbeb',
      border: '#fde68a',
      text: '#b45309',
      badge: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    typeBreakdown: '3 Lectures + 1 Tutorial / week',
    classroom: 'LT-1',
    attendance: '95%',
    description: 'Software development lifecycle models (Agile, Scrum, Waterfall), requirement engineering, software design patterns, testing strategies, CI/CD pipelines, and software project management.',
    syllabus: [
      'Unit 1: SDLC Models, Agile Methodologies & Scrum Framework',
      'Unit 2: Software Requirements Specification (SRS) & UML Modeling',
      'Unit 3: Architectural Styles, Design Patterns & Clean Code Principles',
      'Unit 4: Software Verification, Black-Box/White-Box Testing & DevOps'
    ],
    schedule: [
      { day: 'Tuesday', time: '10:00 AM - 11:00 AM', type: 'Lecture', room: 'LT-1' },
      { day: 'Tuesday', time: '04:00 PM - 05:00 PM', type: 'Tutorial', room: 'LT-1' },
      { day: 'Thursday', time: '09:00 AM - 10:00 AM', type: 'Lecture', room: 'LT-1' },
      { day: 'Friday', time: '12:15 PM - 01:15 PM', type: 'Lecture', room: 'LT-1' }
    ]
  },
  {
    id: 'CS206',
    code: 'CS206',
    name: 'Machine Learning',
    shortName: 'ML',
    credits: 4,
    faculty: {
      name: 'Dr. Amit Shah',
      designation: 'Associate Professor & AI Lab Incharge',
      email: 'amit.shah@campusflow.edu.in',
      cabin: 'Academic Block 3, Room 201',
      officeHours: 'Mon, Thu 03:30 PM – 05:00 PM'
    },
    color: {
      primary: '#0891b2',
      bgLight: '#ecfeff',
      border: '#a5f3fc',
      text: '#0e7490',
      badge: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    },
    typeBreakdown: '3 Lectures + 1 Lab session / week',
    classroom: 'Seminar Hall B (Lectures) • AI Lab (Labs)',
    attendance: '91%',
    description: 'Foundations of statistical learning, supervised algorithms (Regression, SVM, Decision Trees, Random Forests), unsupervised learning (K-Means, PCA), neural networks, and model evaluation metrics.',
    syllabus: [
      'Unit 1: Supervised Learning, Linear/Logistic Regression & Regularization',
      'Unit 2: Support Vector Machines, Decision Trees & Ensemble Methods',
      'Unit 3: Unsupervised Learning, K-Means Clustering & Dimensionality Reduction (PCA)',
      'Unit 4: Introduction to Neural Networks, Backpropagation & Deep Architectures'
    ],
    schedule: [
      { day: 'Tuesday', time: '11:15 AM - 12:15 PM', type: 'Lecture', room: 'Seminar Hall B' },
      { day: 'Thursday', time: '10:00 AM - 11:00 AM', type: 'Lecture', room: 'Seminar Hall B' },
      { day: 'Thursday', time: '02:00 PM - 04:00 PM', type: 'Lab', room: 'AI Lab' },
      { day: 'Friday', time: '11:15 AM - 12:15 PM', type: 'Lecture', room: 'Seminar Hall B' }
    ]
  }
];
