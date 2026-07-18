// ─── MASTER DATA FILE ─────────────────────────────────────────────────────────

export const personal = {
  name:       "Sanivarapu Sai Charan",
  firstName:  "Sanivarapu",
  lastName:   "Sai Charan",
  title:      "SAP Certified ABAP Developer · Software Developer · IT Career Seeker",
  tagline:    "Building enterprise-grade software with SAP ABAP, backend development, and modern IT solutions.",
  status:     "Open to Work",
  email:      "saicharan.svs@gmail.com",
  phone:      "+91-7207872334",
  location:   "Guntur, Andhra Pradesh",
  github:     "https://github.com/saicharanindia",
  linkedin:   "https://www.linkedin.com/in/mr-sanivarapu-sai-charan-1721ba324",
  githubUser: "saicharanindia",
  bio: "Information Technology undergraduate specialising in SAP ABAP backend development, IT systems, and application security. Experienced in building structured web applications with authentication controls, validation mechanisms, and data integrity practices. Actively seeking IT career opportunities in SAP consulting, software development, and enterprise technology.",
};

export const stats = [
  { label: "Projects Shipped",  value: 6,   suffix: "+" },
  { label: "Certifications",    value: 7,   suffix: ""  },
  { label: "Technologies",      value: 20,  suffix: "+" },
  { label: "Learning Hours",    value: 600, suffix: "+" },
];

export const navLinks = [
  { label: "Home",          href: "#home"          },
  { label: "About",         href: "#about"         },
  { label: "Education",     href: "#education"     },
  { label: "Skills",        href: "#skills"        },
  { label: "Projects",      href: "#projects"      },
  { label: "Experience",    href: "#experience"    },
  { label: "Certifications",href: "#certifications"},
  { label: "GitHub",        href: "#github"        },
  { label: "Contact",       href: "#contact"       },
];

export const education = [
  {
    id: 1,
    institution: "Vignan's Foundation for Science, Technology & Research",
    shortName: "Vignan's University",
    degree: "B.Tech in Information Technology",
    branch: "Information Technology",
    period: "2023 – 2027",
    cgpa: "7.5",
    status: "Current",
    location: "Guntur, Andhra Pradesh, India",
    description:
      "Pursuing B.Tech in Information Technology with focus on SAP ABAP development, IT systems, application security, database integrity, and backend engineering. Building industry-ready skills through internships, certifications, and independent projects aligned with enterprise IT environments.",
    highlights: [
      "GPA: 7.5",
      "SAP ABAP Development",
      "IT General Controls",
      "Backend Development",
      "Database & Application Security",
    ],
  },
];

export const careerTimeline = [
  { year: "2023", title: "Enrolled B.Tech IT",        description: "Began academic journey at Vignan's University.", icon: "" },
  { year: "2024", title: "Software Development",       description: "Built core skills in Python, JavaScript, and backend engineering.", icon: "" },
  { year: "2025", title: "TCS & Industry Certifications", description: "Earned TCS iON, Accenture, and Deloitte job simulation certifications.", icon: "" },
  { year: "2026", title: "SAP ABAP Learning Journey",  description: "Deep-dived into SAP ABAP, ERP modules, and enterprise backend systems.", icon: "" },
  { year: "2027", title: "Graduation",                 description: "Graduating and ready for global SAP and enterprise technology roles.", icon: "" },
];

export const technologies = [
  // SAP
  { name: "SAP ABAP",       logo: "SAP",     level: 72, category: "SAP",         icon: "🔵" },
  { name: "SAP ERP",        logo: "SAP",     level: 68, category: "SAP",         icon: "🔲" },
  { name: "SAP Modules",    logo: "SAP",     level: 65, category: "SAP",         icon: "⚙️" },
  // Programming
  { name: "Python",         logo: "Python",  level: 82, category: "Programming", icon: "🐍" },
  { name: "C",              logo: "C",       level: 72, category: "Programming", icon: "©️" },
  { name: "C++",            logo: "C++",     level: 70, category: "Programming", icon: "➕" },
  // Web
  { name: "JavaScript",     logo: "JS",      level: 78, category: "Web",         icon: "⚡" },
  { name: "HTML5",          logo: "HTML",    level: 90, category: "Web",         icon: "🏷️" },
  { name: "CSS3",           logo: "CSS",     level: 85, category: "Web",         icon: "🎨" },
  { name: "REST APIs",      logo: "API",     level: 78, category: "Web",         icon: "🔌" },
  // Frameworks
  { name: "Django",         logo: "Django",  level: 72, category: "Frameworks",  icon: "🚀" },
  // Databases
  { name: "MySQL",          logo: "MySQL",   level: 75, category: "Databases",   icon: "🗄️" },
  { name: "SQLite",         logo: "SQLite",  level: 70, category: "Databases",   icon: "💾" },
  // Tools
  { name: "Git",            logo: "Git",     level: 82, category: "Tools",       icon: "🔧" },
  { name: "Postman",        logo: "Postman", level: 75, category: "Tools",       icon: "📮" },
  { name: "VS Code",        logo: "VSCode",  level: 92, category: "Tools",       icon: "💻" },
  // IT Controls
  { name: "ITGC",           logo: "ITGC",    level: 60, category: "IT Controls", icon: "🔒" },
  { name: "App Controls",   logo: "CTRL",    level: 58, category: "IT Controls", icon: "🛡️" },
  { name: "SDLC",           logo: "SDLC",    level: 65, category: "IT Controls", icon: "📋" },
];

export const skills = technologies;

export const projects = [
  {
    id: 1,
    title: "LuxDrive Portal",
    subtitle: "Vehicle Rental Management System",
    description:
      "Designed a structured database schema with enforced constraints to maintain transactional consistency. Performed basic risk assessment of booking workflows to identify potential failure points.",
    longDescription:
      "Backend-driven vehicle rental management system with structured database schema, transactional integrity, booking workflow risk assessment, and comprehensive technical documentation outlining system architecture and data flow.",
    tech: ["Python", "Django", "MySQL", "JavaScript", "HTML", "CSS"],
    features: ["DB Schema & Constraints", "Risk Assessment", "Booking Workflows", "Technical Docs"],
    github: "https://github.com/saicharanindia",
    demo: "#",
    accentColor: "#FF003C",
    year: "May 2025",
    status: "Completed",
  },
  {
    id: 2,
    title: "Student Attendance Tracker",
    subtitle: "Academic Monitoring System",
    description:
      "Automated attendance processing improving recording efficiency by 60%. Developed a reporting dashboard for monitoring, exception tracking, and performance analysis with full auditability.",
    longDescription:
      "Backend-driven academic monitoring platform with automated attendance processing (60% efficiency gain), reporting dashboard for exception tracking, structured relational database for full auditability, and edge-case tested system logic.",
    tech: ["Python", "Django", "SQLite", "JavaScript", "HTML", "CSS"],
    features: ["60% Efficiency Gain", "Reporting Dashboard", "Auditability", "Edge-case Testing"],
    github: "https://github.com/saicharanindia",
    demo: "#",
    accentColor: "#FF5E7A",
    year: "April 2024",
    status: "Completed",
  },
];

export const experience = [
  {
    id: 1,
    company: "BootSpring",
    role: "Software Development Intern",
    duration: "Jan 2025 – May 2025",
    type: "Internship",
    description:
      "Designed and shipped production-grade web application features using Python, Django, and REST APIs. Focused on authentication security, structured input validation, and system reliability.",
    achievements: [
      "Designed and implemented authentication mechanisms with role-based access control to restrict unauthorised system access.",
      "Developed REST APIs incorporating structured input validation and exception handling to minimise system vulnerabilities.",
      "Conducted functional testing and debugging to identify logical errors and system reliability gaps.",
      "Documented system workflows and application logic to improve traceability and maintainability.",
    ],
    tech: ["Python", "Django", "JavaScript", "REST APIs", "Git"],
  },
];

export const certifications = [
  { id: 1, title: "Career Edge – IT for Non-IT",         issuer: "TCS iON",   year: "Jul 2025", status: "Completed"   },
  { id: 2, title: "Career Edge – Young Professional",    issuer: "TCS iON",   year: "Jul 2025", status: "Completed"   },
  { id: 3, title: "Technology Apprenticeship",           issuer: "Accenture", year: "2025",     status: "Completed"   },
  { id: 4, title: "Technology Apprenticeship",           issuer: "Deloitte",  year: "2025",     status: "Completed"   },
  { id: 5, title: "SAP Certified ABAP Backend Developer",issuer: "SAP",       year: "2026",     status: "In Progress" },
];

export const currentFocus = [
  { item: "SAP ABAP Development",            progress: 72, color: "#FF003C" },
  { item: "SAP S/4HANA Core Modules",        progress: 65, color: "#FF1744" },
  { item: "Backend Development (Django)",    progress: 78, color: "#FF003C" },
  { item: "Enterprise Architecture Design",  progress: 50, color: "#FF5E7A" },
  { item: "IT General Controls (ITGC)",      progress: 60, color: "#FF003C" },
  { item: "Python Automation & Scripting",   progress: 82, color: "#FF1744" },
];

export const faqs = [
  {
    question: "What is your SAP ABAP experience level?",
    answer: "I am pursuing SAP ABAP certification and building hands-on skills in ABAP programming, SAP ERP modules, and enterprise backend development. Targeting SAP Certified Developer status by 2027.",
  },
  {
    question: "What technologies are you most proficient in?",
    answer: "SAP ABAP, Python, Django, JavaScript, MySQL, and REST APIs. I also work with Git, Postman, VS Code, and apply IT General Controls in application development.",
  },
  {
    question: "Are you open to internships or full-time roles?",
    answer: "Yes — actively seeking IT career opportunities in SAP development, software engineering, and enterprise technology. Available for internships now and full-time from 2027.",
  },
  {
    question: "What kind of roles are you targeting?",
    answer: "SAP ABAP Developer, Software Developer, IT Analyst, and enterprise technology roles at companies like SAP, TCS, Infosys, Accenture, Deloitte, and other IT consulting firms.",
  },
  {
    question: "Are you available for remote or global positions?",
    answer: "Absolutely. Open to remote-first environments, relocation, and global IT career opportunities aligned with SAP and enterprise software development.",
  },
];

export const whyHireMe = [
  { title: "SAP ABAP Specialist",     description: "Dedicated focus on SAP ABAP backend development and ERP module integration." },
  { title: "Backend Development",     description: "Proficient in Python, Django, REST APIs, MySQL — building reliable server-side systems." },
  { title: "IT Controls Knowledge",   description: "Strong understanding of ITGC, application controls, SDLC, and risk identification." },
  { title: "Execution Over Theory",   description: "Real production projects with measurable outcomes — not classroom exercises." },
  { title: "IT Career Driven",        description: "Targeting SAP, TCS, Infosys, Accenture, Deloitte, and global enterprise IT firms." },
  { title: "Communication Clarity",   description: "Precise technical documentation and confident cross-functional collaboration." },
];

export const services = [
  { title: "SAP ABAP Development",    description: "Custom ABAP programs, reports, function modules, and SAP ERP module support.",             color: "#FF003C" },
  { title: "Backend Development",     description: "Scalable server-side applications using Python, Django, and REST API architectures.",        color: "#FF1744" },
  { title: "Enterprise Architecture", description: "Robust, scalable IT system designs aligned with industry-standard best practices.",           color: "#FF003C" },
  { title: "Database Engineering",    description: "Schema design, query optimisation, and data integrity using MySQL and SQLite.",               color: "#FF5E7A" },
  { title: "IT General Controls",     description: "Application controls, risk identification, and SDLC-aligned development practices.",          color: "#FF003C" },
  { title: "Technical Consulting",    description: "Strategic IT advice for digital transformation and enterprise software modernisation.",        color: "#FF1744" },
];

// ── Company logos used in certifications & experience ─────────────────────────
export const companyLogos: Record<string, string> = {
  "TCS iON":   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/200px-Tata_Consultancy_Services_Logo.svg.png",
  "Accenture": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/200px-Accenture.svg.png",
  "Deloitte":  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/200px-Deloitte.svg.png",
  "SAP":       "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/200px-SAP_2011_logo.svg.png",
  "BootSpring":"https://via.placeholder.com/80x30/111111/FF003C?text=BootSpring",
};
