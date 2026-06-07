import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Server, 
  RefreshCw, 
  GraduationCap, 
  Clock, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  DollarSign, 
  Calendar, 
  X,
  FileText,
  Lock,
  Moon,
  Sun,
  Bell,
  Trash2,
  Edit,
  MoreVertical,
  Check,
  Shield,
  FileSpreadsheet,
  Printer,
  Eye,
  EyeOff,
  Building,
  Key,
  ChevronRight,
  ChevronLeft,
  Copy,
  Download,
  GripVertical,
  Sparkles,
  Info,
  Sliders,
  LogOut,
  Briefcase
} from 'lucide-react';

const LOCATION_DATA = {
  "India": {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Rajahmundry", "Kakinada", "Kadapa", "Anantapur"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Jagdalpur", "Ambikapur"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh", "Anand"],
    "Haryana": ["Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi", "Hamirpur"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", "Hazaribagh", "Giridih"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Davangere", "Bellary", "Gulbarga"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Alappuzha", "Palakkad", "Malappuram", "Kannur"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Pimpri-Chinchwad", "Nashik", "Kalyan-Dombivli", "Vasai-Virar", "Aurangabad", "Navi Mumbai", "Solapur", "Kolhapur"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur"],
    "Meghalaya": ["Shillong", "Tura", "Jowai"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
    "Nagaland": ["Dimapur", "Kohima", "Mokokchung"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Sikar"],
    "Sikkim": ["Gangtok", "Namchi", "Geyzing"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tiruppur", "Erode", "Vellore"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam"],
    "Tripura": ["Agartala", "Dharmanagar", "Udaipur"],
    "Uttar Pradesh": ["Kanpur", "Lucknow", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura-Vrindavan", "Budaun", "Rampur", "Shahjahanpur", "Farrukhabad-Fatehgarh", "Ayodhya", "Maunath Bhanjan", "Hapur", "Etawah", "Mirzapur-Vindhyachal", "Bulandshahr", "Sambhal", "Amroha", "Hardoi", "Fatehpur", "Raebareli", "Orai", "Sitapur", "Bahraich", "Modinagar", "Unnao", "Jaunpur", "Lakhimpur", "Hathras", "Banda", "Pilibhit", "Barabanki", "Khurja", "Gonda", "Mainpuri", "Lalitpur", "Etah", "Deoria", "Ghazipur", "Sultanpur", "Azamgarh", "Bijnor", "Sahaswan", "Basti", "Chandausi", "Akbarpur", "Ballia", "Tanda", "Greater Noida", "Shikohabad", "Shamli", "Awagarh", "Kasganj"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Haldwani", "Rudrapur", "Roorkee", "Rishikesh"],
    "West Bengal": ["Kolkata", "Howrah", "Kharagpur", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda"],
    "Delhi": ["New Delhi", "Dwarka", "Rohini", "South Delhi", "North Delhi", "East Delhi", "West Delhi"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
    "Ladakh": ["Leh", "Kargil"],
    "Chandigarh": ["Chandigarh"],
    "Puducherry": ["Puducherry", "Karaikal", "Mahe"],
    "Andaman and Nicobar Islands": ["Port Blair"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Silvassa", "Daman", "Diu"],
    "Lakshadweep": ["Kavaratti"]
  },
  "United States": {
    "California": ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento"],
    "New York": ["New York City", "Buffalo", "Rochester", "Albany"],
    "Texas": ["Houston", "Austin", "Dallas", "San Antonio"]
  },
  "Canada": {
    "Ontario": ["Toronto", "Ottawa", "Mississauga", "Hamilton"],
    "Quebec": ["Montreal", "Quebec City", "Laval"],
    "British Columbia": ["Vancouver", "Victoria", "Surrey"]
  },
  "United Kingdom": {
    "England": ["London", "Birmingham", "Manchester", "Leeds"],
    "Scotland": ["Edinburgh", "Glasgow", "Aberdeen"]
  },
  "Australia": {
    "New South Wales": ["Sydney", "Newcastle"],
    "Victoria": ["Melbourne", "Geelong"]
  },
  "United Arab Emirates": {
    "Dubai": ["Dubai"],
    "Abu Dhabi": ["Abu Dhabi", "Al Ain"],
    "Sharjah": ["Sharjah"]
  },
  "Saudi Arabia": {
    "Riyadh": ["Riyadh"],
    "Makkah": ["Jeddah", "Mecca", "Taif"],
    "Eastern": ["Dammam", "Khobar"]
  },
  "Nepal": {
    "Bagmati": ["Kathmandu", "Lalitpur"],
    "Gandaki": ["Pokhara"]
  },
  "Bangladesh": {
    "Dhaka": ["Dhaka", "Narayanganj"],
    "Chittagong": ["Chittagong"]
  },
  "Pakistan": {
    "Punjab": ["Lahore", "Faisalabad"],
    "Sindh": ["Karachi", "Hyderabad"]
  },
  "Singapore": {
    "Central": ["Singapore"]
  },
  "Germany": {
    "Bavaria": ["Munich", "Nuremberg"],
    "Berlin": ["Berlin"],
    "Hamburg": ["Hamburg"]
  },
  "France": {
    "Ile-de-France": ["Paris"],
    "Provence-Alpes-Cote d'Azur": ["Marseille", "Nice"]
  }
};

const getStudentAvatar = (student) => {
  if (student.profile_image && student.profile_image.trim() !== '') {
    return student.profile_image;
  }
  const gender = (student.gender || 'Male').toLowerCase();
  if (gender === 'female') {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="50" fill="%23fce7f3"/><circle cx="50" cy="40" r="20" fill="%23db2777"/><path d="M20 80c0-15 12-25 30-25s30 10 30 25H20z" fill="%23db2777"/></svg>`;
  } else if (gender === 'other') {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="50" fill="%23ccfbf1"/><circle cx="50" cy="40" r="20" fill="%230d9488"/><path d="M20 80c0-15 12-25 30-25s30 10 30 25H20z" fill="%230d9488"/></svg>`;
  } else {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="50" fill="%23dbeafe"/><circle cx="50" cy="40" r="20" fill="%232563eb"/><path d="M20 80c0-15 12-25 30-25s30 10 30 25H20z" fill="%232563eb"/></svg>`;
  }
};

const isValidPhone = (phone) => {
  return /^\d{10}$/.test(phone);
};

const isValidEmail = (email) => {
  if (!email) return true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return dateStr;
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
};

export default function App() {
  // Theme & Navigation
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); // Super Admin: schools, stats, invites. School Admin: dashboard, faculty, students, fees, reports, settings
  const [activeYearId, setActiveYearId] = useState(2); // Default to 2 (2025-2026)
  
  // Academic Years Management States
  const [showCreateYearModal, setShowCreateYearModal] = useState(false);
  const [newYearForm, setNewYearForm] = useState({
    year_range: '',
    start_date: '',
    end_date: '',
    description: ''
  });
  const [unpayConfirm, setUnpayConfirm] = useState(null);
  const [selectedFeeClassId, setSelectedFeeClassId] = useState('');
  const [selectedFeesClassId, setSelectedFeesClassId] = useState(null);
  const [classFeeStructure, setClassFeeStructure] = useState(null);
  const [yearError, setYearError] = useState('');
  const [isSavingYear, setIsSavingYear] = useState(false);
  const [showTransitionWizard, setShowTransitionWizard] = useState(false);
  const [wizardTargetYear, setWizardTargetYear] = useState(null);
  const [transitionWizardStep, setTransitionWizardStep] = useState(1);
  const [wizardClassMappings, setWizardClassMappings] = useState({});
  const [wizardStudentStatus, setWizardStudentStatus] = useState({});
  const [wizardConfirmText, setWizardConfirmText] = useState('');
  const [isActivatingYear, setIsActivatingYear] = useState(false);
  const [crossYearReports, setCrossYearReports] = useState([]);
  const [isFetchingCrossYear, setIsFetchingCrossYear] = useState(false);
  const [reportSubTab, setReportSubTab] = useState('session'); // 'session' or 'cross-year'
  const [schoolCurrency, setSchoolCurrency] = useState('USD');
  const [feesStatusFilter, setFeesStatusFilter] = useState('All');
  const [ledgerBackSource, setLedgerBackSource] = useState('students');
  const [showExperienceLetter, setShowExperienceLetter] = useState(false);
  const [studentDetailTab, setStudentDetailTab] = useState('fees'); // 'fees' or 'documents'

  // Admin Profile States
  const [adminProfile, setAdminProfile] = useState(null);
  const [adminProfileForm, setAdminProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    timezone: 'Asia/Kolkata',
    profile_image: ''
  });
  const [profileErrors, setProfileErrors] = useState({});
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSubTab, setProfileSubTab] = useState('details'); // 'details' | 'edit' | 'password'
  
  // Password Change States
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Currency definitions mapping code to symbol and name
  const currencyMap = {
    'INR': { symbol: '₹', code: 'INR', label: '₹ INR (Indian Rupee)' },
    'USD': { symbol: '$', code: 'USD', label: '$ USD (US Dollar)' },
    'EUR': { symbol: '€', code: 'EUR', label: '€ EUR (Euro)' },
    'GBP': { symbol: '£', code: 'GBP', label: '£ GBP (British Pound)' },
    'AED': { symbol: 'AED ', code: 'AED', label: 'AED (UAE Dirham)' },
    'SAR': { symbol: 'SR ', code: 'SAR', label: 'SAR (Saudi Riyal)' },
    'CAD': { symbol: 'C$', code: 'CAD', label: 'CAD (Canadian Dollar)' },
    'AUD': { symbol: 'A$', code: 'AUD', label: 'AUD (Australian Dollar)' }
  };

  const formatMoney = (amount) => {
    const numericAmount = parseFloat(amount) || 0;
    const currencyInfo = currencyMap[schoolCurrency] || currencyMap['USD'];
    return `${currencyInfo.symbol}${numericAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  // Synchronize dark-theme class with document.body to ensure correct CSS variables resolution globally
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);
  
  // Auth state
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [username, setUsername] = useState(localStorage.getItem('admin_email') || '');
  const [role, setRole] = useState(localStorage.getItem('admin_role') || ''); // 'Super Admin' or 'School Admin'
  const [schoolId, setSchoolId] = useState(localStorage.getItem('admin_school_id') || '');
  const [setupCompleted, setSetupCompleted] = useState(parseInt(localStorage.getItem('admin_setup_completed') || '1'));
  
  // Form credentials
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [forgotPasswordStep, setForgotPasswordStep] = useState(0); // 0 = off, 1 = enter email, 2 = verify OTP, 3 = reset password
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [toast, setToast] = useState(null); // { message: string, type: 'success' | 'error' }
  const [isInitializing, setIsInitializing] = useState(!!localStorage.getItem('admin_token'));

  // Multi-Tenant URL Detection (on mount / history changes)
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Super Admin Specific States
  const [schools, setSchools] = useState([]);
  const [superStats, setSuperStats] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', contact_person: '', phone: '' });
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [simpleConfirm, setSimpleConfirm] = useState(null);
  const [generatedCredentials, setGeneratedCredentials] = useState(null);
  const [showExtendModal, setShowExtendModal] = useState(null); // holds school object to extend
  const [extendMonths, setExtendMonths] = useState(12);

  // School Admin Setup Wizard States
  const [wizardStep, setWizardStep] = useState(1); // 1 to 5
  const [wizardForm, setWizardForm] = useState({
    name: '',
    logo_path: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150',
    address: '',
    contact_person: '',
    contact_number: ''
  });

  // School Admin Database States (Isolated)
  const [years, setYears] = useState([
    { id: 1, year_range: "2024-2025", is_active: false },
    { id: 2, year_range: "2025-2026", is_active: true }
  ]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [schoolName, setSchoolName] = useState(() => localStorage.getItem('admin_school_name') || 'BN School');

  // Selected sub-view states
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [teacherSalaries, setTeacherSalaries] = useState([]);
  const [studentFees, setStudentFees] = useState([]);

  // Groups and Custom Classroom states
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [newClassForm, setNewClassForm] = useState({ name: '', room: '', groups: [] });
  const [groupFilter, setGroupFilter] = useState('all');
  
  // Receipt Modal state
  const [receiptRecord, setReceiptRecord] = useState(null);
  const [receiptStudent, setReceiptStudent] = useState(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modals state
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
  const [activeTeacherMenuId, setActiveTeacherMenuId] = useState(null);
  
  // Connection states
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState('');
  const [sErrors, setSErrors] = useState({});
  const [isSavingStudent, setIsSavingStudent] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isFetchingMoreStudents, setIsFetchingMoreStudents] = useState(false);

  // Academic Planner & Subject/Schedules States
  const [subjects, setSubjects] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [plannerClassId, setPlannerClassId] = useState(null);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [editingSubjectId, setEditingSubjectId] = useState(null);
  const [editingSubjectName, setEditingSubjectName] = useState('');
  const [isSavingSchedule, setIsSavingSchedule] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
  });

  const [weekStartDate, setWeekStartDate] = useState(() => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diff));
    const yyyy = monday.getFullYear();
    const mm = String(monday.getMonth() + 1).padStart(2, '0');
    const dd = String(monday.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  const [selectedDaySubject, setSelectedDaySubject] = useState({});
  const [selectedDayTeacher, setSelectedDayTeacher] = useState({});


  // Faculty enhancements states
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [allWeeklySchedules, setAllWeeklySchedules] = useState([]);
  const [facultySelectedDate, setFacultySelectedDate] = useState(() => {
    const stored = localStorage.getItem('bn_faculty_selected_date');
    if (stored) return stored;
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  const handleFacultyDateChange = (val) => {
    setFacultySelectedDate(val);
    localStorage.setItem('bn_faculty_selected_date', val);
  };

  const getTodayDateStr = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  const [totalPeriodsPerDay, setTotalPeriodsPerDay] = useState(() => {
    const stored = localStorage.getItem('bn_settings_total_periods');
    return stored ? parseInt(stored) : 8;
  });

  // WhatsApp Reminders States
  const [whatsappQueue, setWhatsappQueue] = useState([]);
  const [whatsappProgress, setWhatsappProgress] = useState({ sent: 0, failed: 0, pending: 0, total: 0 });
  const [isSendingWhatsapp, setIsSendingWhatsapp] = useState(false);
  const [showWhatsappProgressModal, setShowWhatsappProgressModal] = useState(false);
  const [showWhatsappConfirmModal, setShowWhatsappConfirmModal] = useState(false);
  const [whatsappLogs, setWhatsappLogs] = useState([]);

  // Dashboard Widget States
  const [dashboardPlannerClassId, setDashboardPlannerClassId] = useState(null);
  const [dashboardTodaySchedule, setDashboardTodaySchedule] = useState(null);
  const [isFetchingDashboardSchedule, setIsFetchingDashboardSchedule] = useState(false);

  // Form Fields
  const [tForm, setTForm] = useState({ 
    name: '', 
    subject: '', 
    phone: '', 
    email: '', 
    qualification: '', 
    experience: '', 
    address: '', 
    joining_date: '', 
    exit_date: '',
    salary_amount: 3000.0, 
    assigned_classes: '',
    gender: 'Male',
    aadhaar_number: '',
    pan_number: '',
    profile_image: '',
    documents: []
  });
  const [sForm, setSForm] = useState({
    name: '',
    roll_number: '',
    sr_no: '',
    class_id: 1,
    group_name: '',
    gender: 'Male',
    phone: '',
    email: '',
    country: '',
    state: '',
    city: '',
    father_name: '',
    mother_name: '',
    address: '',
    date_of_birth: '',
    admission_date: '',
    emergency_contact: '',
    blood_group: '',
    aadhaar_number: '',
    nationality: 'Indian',
    caste: '',
    profile_image: '',
    documents: []
  });

  // Predefined logo choices for the Setup Wizard
  const logoChoices = [
    { name: 'Classic Graduation Cap', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=150' },
    { name: 'Traditional Academy Shield', url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150' },
    { name: 'Library & Quill', url: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=150' },
    { name: 'Modern Campus Crest', url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=150' }
  ];

  // API Config Helper
  const getHeaders = (customToken) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${customToken || token}`
  });

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Toast Timer Hook
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Reset Student Form Validation Errors on Modal open/close
  useEffect(() => {
    setSErrors({});
  }, [showAddStudentModal]);

  // Reset student lazy loading visibleCount when view context changes
  useEffect(() => {
    setVisibleCount(6);
  }, [selectedClassId, searchQuery, groupFilter, activeTab]);

  // If container does not have a scrollbar but we have more records, load more to enable scrollbar
  useEffect(() => {
    if (!selectedClassId) return;
    const container = document.querySelector('.erp-table-container');
    if (!container) return;
    
    const classStudents = students.filter(s => s.class_id === selectedClassId);
    const filteredLength = classStudents.filter(s => {
      const matchesGroup = groupFilter === 'all' || s.group_name === groupFilter;
      const matchesSearch = 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.roll_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.phone && s.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (s.email && s.email.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesGroup && matchesSearch;
    }).length;

    const hasMore = visibleCount < filteredLength;
    const noScrollbar = container.scrollHeight <= container.clientHeight;
    
    if (hasMore && noScrollbar) {
      setVisibleCount(prev => prev + 6);
    }
  }, [visibleCount, students, selectedClassId, searchQuery, groupFilter]);

  // Synchronize dashboard student count automatically
  useEffect(() => {
    const count = students.filter(s => s.academic_year_id === activeYearId).length;
    setDashboardStats(prev => {
      if (!prev) return null;
      if (prev.total_students === count) return prev;
      return { ...prev, total_students: count };
    });
  }, [students, activeYearId]);

  // Auto-expand address textarea when address state changes
  useEffect(() => {
    if (showAddStudentModal) {
      const timer = setTimeout(() => {
        const textarea = document.getElementById('s-address');
        if (textarea) {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [sForm.address, showAddStudentModal]);

  // Synchronize dashboard faculty count automatically
  useEffect(() => {
    const count = teachers.length;
    setDashboardStats(prev => {
      if (!prev) return null;
      if (prev.total_teachers === count) return prev;
      return { ...prev, total_teachers: count };
    });
  }, [teachers]);

  // Synchronize dashboard classroom count automatically
  useEffect(() => {
    const count = classes.length;
    setDashboardStats(prev => {
      if (!prev) return null;
      if (prev.active_classes === count) return prev;
      return { ...prev, active_classes: count };
    });
  }, [classes]);

  // Synchronize history paths
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // --- ACADEMIC PLANNER METHODS ---
  const fetchSubjects = async () => {
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const stored = localStorage.getItem(`bn_sandbox_subjects_${keySuffix}`);
      const local = stored ? JSON.parse(stored) : [
        { id: 1, name: 'English' },
        { id: 2, name: 'Mathematics' },
        { id: 3, name: 'Science' },
        { id: 4, name: 'Hindi' },
        { id: 5, name: 'Social Studies' },
        { id: 6, name: 'Drawing' },
        { id: 7, name: 'Computer' }
      ];
      setSubjects(local);
      return;
    }
    try {
      const res = await fetch('/api/subjects', { headers: getHeaders() });
      if (res.ok) {
        setSubjects(await res.json());
      }
    } catch (err) {
      console.error("Failed to fetch subjects", err);
    }
  };

  const fetchSchedules = async (classId) => {
    if (!classId) return;
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const storedKey = `bn_sandbox_schedules_${keySuffix}_${activeYearId}_${classId}`;
      const stored = localStorage.getItem(storedKey);
      const list = stored ? JSON.parse(stored) : [];
      const filtered = list.filter(s => s.week_start_date === weekStartDate);
      setSchedules(filtered);
      return;
    }
    try {
      const res = await fetch(`/api/schedules?class_id=${classId}&academic_year_id=${activeYearId}&week_start_date=${weekStartDate}`, { headers: getHeaders() });
      if (res.ok) {
        setSchedules(await res.json());
      }
    } catch (err) {
      console.error("Failed to fetch schedules", err);
    }
  };


  const handleSaveFullSchedule = async (statusVal = 'Draft') => {
    if (!plannerClassId) return;
    setIsSavingSchedule(true);
    setActionError('');
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const refMonday = new Date(weekStartDate);
    const scheduleDates = {};
    days.forEach((day, idx) => {
      const d = new Date(refMonday);
      d.setDate(refMonday.getDate() + idx);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      scheduleDates[day] = `${yyyy}-${mm}-${dd}`;
    });
    
    try {
      const keySuffix = schoolId || 'default';
      if (token.includes('mock') || !isConnected) {
        const storedKey = `bn_sandbox_schedules_${keySuffix}_${activeYearId}_${plannerClassId}`;
        const stored = localStorage.getItem(storedKey);
        let list = stored ? JSON.parse(stored) : [];
        
        days.forEach(day => {
          const daySubjects = scheduleForm[day] || [];
          const schedDate = scheduleDates[day];
          const existingIdx = list.findIndex(s => s.schedule_date === schedDate);
          
          const scheduleObj = {
            id: existingIdx !== -1 ? list[existingIdx].id : (Date.now() + Math.random()),
            school_id: keySuffix,
            academic_year_id: activeYearId,
            class_id: plannerClassId,
            day_of_week: day,
            schedule_date: schedDate,
            week_start_date: weekStartDate,
            subjects: daySubjects,
            status: statusVal
          };
          if (existingIdx !== -1) {
            list[existingIdx] = scheduleObj;
          } else {
            list.push(scheduleObj);
          }
        });
        
        localStorage.setItem(storedKey, JSON.stringify(list));
        setSchedules(list.filter(s => s.week_start_date === weekStartDate));
        
        const newLog = {
          id: Date.now(),
          operator: username || 'Admin',
          action: `Schedule ${statusVal}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          details: `Saved weekly schedule as ${statusVal} for class ID ${plannerClassId} on week of ${weekStartDate}.`
        };
        setAuditLogs(prev => [newLog, ...prev]);
        showToast(`Schedule saved as ${statusVal} successfully!`, 'success');
        fetchAllWeeklySchedules();
        return;
      }
      
      // Live DB Mode
      for (const day of days) {
        const daySubjects = scheduleForm[day] || [];
        const schedDate = scheduleDates[day];
        
        const res = await fetch('/api/schedules', {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({
            class_id: plannerClassId,
            academic_year_id: activeYearId,
            day_of_week: day,
            schedule_date: schedDate,
            week_start_date: weekStartDate,
            subjects: daySubjects,
            status: statusVal
          })
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.detail || `Failed to save schedule for ${day}`);
        }
      }
      
      await fetchSchedules(plannerClassId);
      
      const resAudit = await fetch('/api/audit-logs', { headers: getHeaders() });
      if (resAudit.ok) setAuditLogs(await resAudit.json());
      
      showToast(`Schedule saved as ${statusVal} successfully!`, 'success');
      fetchAllWeeklySchedules();
    } catch (err) {
      console.error(err);
      setActionError(err.message || "Failed to save schedule");
      showToast(err.message || "Failed to save schedule", 'error');
    } finally {
      setIsSavingSchedule(false);
    }
  };

  const handleSaveDaySchedule = async (day, statusVal = 'Draft') => {
    if (!plannerClassId) return;
    setIsSavingSchedule(true);
    setActionError('');
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const idx = days.indexOf(day);
    if (idx === -1) {
      setIsSavingSchedule(false);
      return;
    }
    
    const refMonday = new Date(weekStartDate);
    const d = new Date(refMonday);
    d.setDate(refMonday.getDate() + idx);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const schedDate = `${yyyy}-${mm}-${dd}`;
    
    const daySubjects = scheduleForm[day] || [];
    
    try {
      const keySuffix = schoolId || 'default';
      if (token.includes('mock') || !isConnected) {
        const storedKey = `bn_sandbox_schedules_${keySuffix}_${activeYearId}_${plannerClassId}`;
        const stored = localStorage.getItem(storedKey);
        let list = stored ? JSON.parse(stored) : [];
        
        const existingIdx = list.findIndex(s => s.schedule_date === schedDate);
        
        const scheduleObj = {
          id: existingIdx !== -1 ? list[existingIdx].id : (Date.now() + Math.random()),
          school_id: keySuffix,
          academic_year_id: activeYearId,
          class_id: plannerClassId,
          day_of_week: day,
          schedule_date: schedDate,
          week_start_date: weekStartDate,
          subjects: daySubjects,
          status: statusVal
        };
        if (existingIdx !== -1) {
          list[existingIdx] = scheduleObj;
        } else {
          list.push(scheduleObj);
        }
        
        localStorage.setItem(storedKey, JSON.stringify(list));
        setSchedules(list.filter(s => s.week_start_date === weekStartDate));
        
        const newLog = {
          id: Date.now(),
          operator: username || 'Admin',
          action: `${day} saved as ${statusVal}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          details: `Saved ${day} schedule as ${statusVal} for class ID ${plannerClassId} on week of ${weekStartDate}.`
        };
        setAuditLogs(prev => [newLog, ...prev]);
        showToast(`${day} schedule saved as ${statusVal} successfully!`, 'success');
        fetchAllWeeklySchedules();
        return;
      }
      
      // Live DB Mode
      const res = await fetch('/api/schedules', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          class_id: plannerClassId,
          academic_year_id: activeYearId,
          day_of_week: day,
          schedule_date: schedDate,
          week_start_date: weekStartDate,
          subjects: daySubjects,
          status: statusVal
        })
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || `Failed to save schedule for ${day}`);
      }
      
      await fetchSchedules(plannerClassId);
      await fetchAllWeeklySchedules();
      
      const resAudit = await fetch('/api/audit-logs', { headers: getHeaders() });
      if (resAudit.ok) setAuditLogs(await resAudit.json());
      
      showToast(`${day} schedule saved as ${statusVal} successfully!`, 'success');
    } catch (err) {
      console.error(err);
      setActionError(err.message || "Failed to save schedule");
      showToast(err.message || "Failed to save schedule", 'error');
    } finally {
      setIsSavingSchedule(false);
    }
  };

  const autoSaveDaySchedule = async (day, daySubjects, statusVal = 'Draft') => {
    if (!plannerClassId) return;
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const idx = days.indexOf(day);
    if (idx === -1) return;
    
    const refMonday = new Date(weekStartDate);
    const d = new Date(refMonday);
    d.setDate(refMonday.getDate() + idx);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const schedDate = `${yyyy}-${mm}-${dd}`;
    
    try {
      const keySuffix = schoolId || 'default';
      if (token.includes('mock') || !isConnected) {
        const storedKey = `bn_sandbox_schedules_${keySuffix}_${activeYearId}_${plannerClassId}`;
        const stored = localStorage.getItem(storedKey);
        let list = stored ? JSON.parse(stored) : [];
        
        const existingIdx = list.findIndex(s => s.schedule_date === schedDate);
        
        const scheduleObj = {
          id: existingIdx !== -1 ? list[existingIdx].id : (Date.now() + Math.random()),
          school_id: keySuffix,
          academic_year_id: activeYearId,
          class_id: plannerClassId,
          day_of_week: day,
          schedule_date: schedDate,
          week_start_date: weekStartDate,
          subjects: daySubjects,
          status: statusVal
        };
        if (existingIdx !== -1) {
          list[existingIdx] = scheduleObj;
        } else {
          list.push(scheduleObj);
        }
        
        localStorage.setItem(storedKey, JSON.stringify(list));
        setSchedules(list.filter(s => s.week_start_date === weekStartDate));
        fetchAllWeeklySchedules();
        return;
      }
      
      // Live DB Mode
      await fetch('/api/schedules', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          class_id: plannerClassId,
          academic_year_id: activeYearId,
          day_of_week: day,
          schedule_date: schedDate,
          week_start_date: weekStartDate,
          subjects: daySubjects,
          status: statusVal
        })
      });
      await fetchSchedules(plannerClassId);
      await fetchAllWeeklySchedules();
    } catch (err) {
      console.error("Auto-save failed", err);
    }
  };

  const [draggingDay, setDraggingDay] = useState(null);
  const [dragOverDay, setDragOverDay] = useState(null);
  const [scheduleCopyConfirm, setScheduleCopyConfirm] = useState(null);

  const handleCopyDayScheduleDragDrop = (sourceDay, targetDay) => {
    const sourcePeriods = scheduleForm[sourceDay] || [];
    const targetPeriods = scheduleForm[targetDay] || [];
    
    if (sourcePeriods.length === 0) {
      showToast(`No periods in ${sourceDay} to copy.`, "warning");
      return;
    }
    
    const performCopy = () => {
      // Deep copy source periods to target
      const copiedPeriods = JSON.parse(JSON.stringify(sourcePeriods));
      setScheduleForm(prev => ({
        ...prev,
        [targetDay]: copiedPeriods
      }));
      
      // Trigger background auto-save as Draft
      autoSaveDaySchedule(targetDay, copiedPeriods, 'Draft');
      showToast("Schedule copied successfully", "success");
    };
    
    if (targetPeriods.length > 0) {
      setScheduleCopyConfirm({
        targetDay,
        onConfirm: performCopy
      });
    } else {
      performCopy();
    }
  };

  const handleNavigateWeek = (weeksOffset) => {
    const d = new Date(weekStartDate);
    d.setDate(d.getDate() + (weeksOffset * 7));
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    setWeekStartDate(`${yyyy}-${mm}-${dd}`);
  };

  const handleCopyLastWeekSchedule = async () => {
    if (!plannerClassId) return;
    
    // Calculate last week's start date
    const currentMonday = new Date(weekStartDate);
    const prevMonday = new Date(currentMonday);
    prevMonday.setDate(currentMonday.getDate() - 7);
    const yyyy = prevMonday.getFullYear();
    const mm = String(prevMonday.getMonth() + 1).padStart(2, '0');
    const dd = String(prevMonday.getDate()).padStart(2, '0');
    const prevWeekStart = `${yyyy}-${mm}-${dd}`;
    
    const keySuffix = schoolId || 'default';
    let prevSchedules = [];
    
    try {
      if (token.includes('mock') || !isConnected) {
        const storedKey = `bn_sandbox_schedules_${keySuffix}_${activeYearId}_${plannerClassId}`;
        const stored = localStorage.getItem(storedKey);
        const list = stored ? JSON.parse(stored) : [];
        prevSchedules = list.filter(s => s.week_start_date === prevWeekStart);
      } else {
        const res = await fetch(`/api/schedules?class_id=${plannerClassId}&academic_year_id=${activeYearId}&week_start_date=${prevWeekStart}`, { headers: getHeaders() });
        if (res.ok) {
          prevSchedules = await res.json();
        }
      }
      
      if (prevSchedules.length === 0) {
        showToast("No schedule found for last week to copy.", "warning");
        return;
      }
      
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const copiedForm = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [] };
      
      prevSchedules.forEach(s => {
        const dayName = days.find(d => d.toLowerCase() === s.day_of_week.toLowerCase());
        if (dayName) {
          copiedForm[dayName] = Array.isArray(s.subjects) ? s.subjects : [];
        }
      });
      
      setScheduleForm(copiedForm);
      showToast("Copied last week's schedule! Review the periods and click Save Draft or Publish to save.", "success");
    } catch (err) {
      console.error("Failed to copy last week's schedule", err);
      showToast("Failed to copy last week's schedule", "error");
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    const name = newSubjectName.trim();
    if (!name) return;
    setActionError('');
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const storedKey = `bn_sandbox_subjects_${keySuffix}`;
      const stored = localStorage.getItem(storedKey);
      let list = stored ? JSON.parse(stored) : [
        { id: 1, name: 'English' },
        { id: 2, name: 'Mathematics' },
        { id: 3, name: 'Science' },
        { id: 4, name: 'Hindi' },
        { id: 5, name: 'Social Studies' },
        { id: 6, name: 'Drawing' },
        { id: 7, name: 'Computer' }
      ];
      
      if (list.some(s => s.name.toLowerCase() === name.toLowerCase())) {
        setActionError("Subject already exists");
        showToast("Subject already exists", 'error');
        return;
      }
      
      const newSub = {
        id: Date.now(),
        school_id: keySuffix,
        name: name
      };
      list.push(newSub);
      localStorage.setItem(storedKey, JSON.stringify(list));
      setSubjects(list);
      setNewSubjectName('');
      showToast("Subject added successfully!", 'success');
      return;
    }
    
    try {
      const res = await fetch('/api/subjects', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        setNewSubjectName('');
        await fetchSubjects();
        showToast("Subject added successfully!", 'success');
      } else {
        const errData = await res.json();
        setActionError(errData.detail || "Failed to add subject");
        showToast(errData.detail || "Failed to add subject", 'error');
      }
    } catch (err) {
      console.error(err);
      setActionError("Failed to add subject");
      showToast("Failed to add subject", 'error');
    }
  };

  const handleEditSubject = async (e) => {
    e.preventDefault();
    const name = editingSubjectName.trim();
    if (!name || !editingSubjectId) return;
    setActionError('');
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const storedKey = `bn_sandbox_subjects_${keySuffix}`;
      const stored = localStorage.getItem(storedKey);
      let list = stored ? JSON.parse(stored) : [];
      
      if (list.some(s => s.id !== editingSubjectId && s.name.toLowerCase() === name.toLowerCase())) {
        setActionError("Another subject with this name already exists");
        showToast("Another subject with this name already exists", 'error');
        return;
      }
      
      const updated = list.map(s => s.id === editingSubjectId ? { ...s, name } : s);
      localStorage.setItem(storedKey, JSON.stringify(updated));
      setSubjects(updated);
      setEditingSubjectId(null);
      setEditingSubjectName('');
      showToast("Subject updated successfully!", 'success');
      return;
    }
    
    try {
      const res = await fetch(`/api/subjects/${editingSubjectId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        setEditingSubjectId(null);
        setEditingSubjectName('');
        await fetchSubjects();
        showToast("Subject updated successfully!", 'success');
      } else {
        const errData = await res.json();
        setActionError(errData.detail || "Failed to update subject");
        showToast(errData.detail || "Failed to update subject", 'error');
      }
    } catch (err) {
      console.error(err);
      setActionError("Failed to update subject");
      showToast("Failed to update subject", 'error');
    }
  };

  const handleDeleteSubject = async (id) => {
    const keySuffix = schoolId || 'default';
    setActionError('');
    if (token.includes('mock') || !isConnected) {
      const storedKey = `bn_sandbox_subjects_${keySuffix}`;
      const stored = localStorage.getItem(storedKey);
      let list = stored ? JSON.parse(stored) : [];
      
      const updated = list.filter(s => s.id !== id);
      localStorage.setItem(storedKey, JSON.stringify(updated));
      setSubjects(updated);
      showToast("Subject deleted successfully!", 'success');
      return;
    }
    
    try {
      const res = await fetch(`/api/subjects/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        await fetchSubjects();
        showToast("Subject deleted successfully!", 'success');
      } else {
        const errData = await res.json();
        setActionError(errData.detail || "Failed to delete subject");
        showToast(errData.detail || "Failed to delete subject", 'error');
      }
    } catch (err) {
      console.error(err);
      setActionError("Failed to delete subject");
      showToast("Failed to delete subject", 'error');
    }
  };

  const handleTriggerNotifications = async () => {
    setActionError('');
    const keySuffix = schoolId || 'default';
    try {
      const res = await fetch('/api/schedules/trigger-notifications', {
        method: 'POST',
        headers: getHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        showToast(data.message, 'success');
        if (token.includes('mock') || !isConnected) {
          const storedNotifs = localStorage.getItem(`bn_sandbox_notifications_${keySuffix}`);
          if (storedNotifs) setNotifications(JSON.parse(storedNotifs));
        } else {
          const resNotif = await fetch('/api/notifications', { headers: getHeaders() });
          if (resNotif.ok) setNotifications(await resNotif.json());
        }
      } else {
        const errData = await res.json();
        showToast(errData.detail || "Failed to trigger notifications", 'error');
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to trigger parent notifications", 'error');
    }
  };

  const fetchWhatsappHistory = async () => {
    try {
      const res = await fetch('/api/schedules/whatsapp-reminders/history', { headers: getHeaders() });
      if (res.ok) {
        setWhatsappLogs(await res.json());
      }
    } catch (err) {
      console.error("Failed to fetch WhatsApp history", err);
    }
  };

  const handleInitWhatsappReminders = async () => {
    if (!plannerClassId) {
      showToast("Please select a classroom first.", "error");
      return;
    }
    const currentClass = classes.find(c => c.id === plannerClassId);
    const className = currentClass ? currentClass.name : `Class ${plannerClassId}`;
    
    // Check if tomorrow's schedule is published
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const tomorrowDay = days[tomorrow.getDay()];
    
    const tomorrowSchedule = schedules.find(s => s.day_of_week.toLowerCase() === tomorrowDay.toLowerCase());
    
    if (!tomorrowSchedule || tomorrowSchedule.status !== 'Published') {
      showToast(`Tomorrow's schedule (${tomorrowDay}) is not published for ${className}. Please publish it first.`, "error");
      return;
    }
    
    setShowWhatsappConfirmModal(true);
  };

  const executeSendWhatsappReminders = async () => {
    setShowWhatsappConfirmModal(false);
    setActionError('');
    setIsSendingWhatsapp(true);
    setShowWhatsappProgressModal(true);
    setWhatsappProgress({ sent: 0, failed: 0, pending: 0, total: 0 });
    
    try {
      const res = await fetch('/api/schedules/whatsapp-reminders/init', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ class_id: plannerClassId })
      });
      
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to initialize WhatsApp reminder queue");
      }
      
      const data = await res.json();
      const queue = data.queue || [];
      const total = queue.length;
      
      setWhatsappQueue(queue);
      setWhatsappProgress({ sent: 0, failed: 0, pending: total, total });
      
      await processWhatsappQueue(queue);
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to start WhatsApp reminders", "error");
      setIsSendingWhatsapp(false);
      setShowWhatsappProgressModal(false);
    }
  };

  const processWhatsappQueue = async (queue) => {
    let sentCount = 0;
    let failedCount = 0;
    const localQueue = [...queue];
    
    for (let i = 0; i < localQueue.length; i++) {
      const item = localQueue[i];
      setWhatsappProgress(prev => ({
        ...prev,
        pending: prev.total - (sentCount + failedCount) - 1
      }));
      
      try {
        await new Promise(resolve => setTimeout(resolve, 150));
        
        const res = await fetch('/api/schedules/whatsapp-reminders/send-single', {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({ log_id: item.id })
        });
        
        if (res.ok) {
          const resData = await res.json();
          const updatedLog = resData.log;
          if (updatedLog) {
            localQueue[i] = updatedLog;
            setWhatsappQueue([...localQueue]);
            
            if (updatedLog.status === 'Sent') {
              sentCount++;
            } else {
              failedCount++;
            }
          } else {
            failedCount++;
          }
        } else {
          failedCount++;
        }
      } catch (err) {
        console.error(err);
        failedCount++;
      }
      
      setWhatsappProgress(prev => ({
        ...prev,
        sent: sentCount,
        failed: failedCount
      }));
    }
    
    setIsSendingWhatsapp(false);
    showToast("WhatsApp reminders sent successfully.", "success");
    fetchWhatsappHistory();
  };

  const fetchDashboardTodaySchedule = async (classId) => {
    if (!classId) return;
    setIsFetchingDashboardSchedule(true);
    const keySuffix = schoolId || 'default';
    const todayDate = new Date().toISOString().split('T')[0];
    const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    
    if (token.includes('mock') || !isConnected) {
      const storedKey = `bn_sandbox_schedules_${keySuffix}_${activeYearId}_${classId}`;
      const stored = localStorage.getItem(storedKey);
      const list = stored ? JSON.parse(stored) : [];
      const todaySched = list.find(s => s.schedule_date === todayDate && s.status === 'Published');
      
      setDashboardTodaySchedule({
        day_of_week: dayOfWeek,
        schedule_date: todayDate,
        subjects: todaySched ? todaySched.subjects : [],
        status: todaySched ? todaySched.status : 'Published'
      });
      setIsFetchingDashboardSchedule(false);
      return;
    }
    
    try {
      const res = await fetch(`/api/schedules/today?class_id=${classId}`, { headers: getHeaders() });
      if (res.ok) {
        setDashboardTodaySchedule(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetchingDashboardSchedule(false);
    }
  };

  const fetchAllWeeklySchedules = async () => {
    const keySuffix = schoolId || 'default';
    
    // Calculate week start date (Monday) for the selected faculty date in local time
    const localDate = new Date(facultySelectedDate);
    const day = localDate.getDay();
    const diff = localDate.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(localDate.setDate(diff));
    const yyyy = monday.getFullYear();
    const mm = String(monday.getMonth() + 1).padStart(2, '0');
    const dd = String(monday.getDate()).padStart(2, '0');
    const currentWeekStart = `${yyyy}-${mm}-${dd}`;

    if (token.includes('mock') || !isConnected) {
      let combined = [];
      classes.forEach(c => {
        const storedKey = `bn_sandbox_schedules_${keySuffix}_${activeYearId}_${c.id}`;
        const stored = localStorage.getItem(storedKey);
        if (stored) {
          const list = JSON.parse(stored);
          const filtered = list.filter(s => s.week_start_date === currentWeekStart && (s.status === 'Published' || s.status === 'Draft'));
          combined = combined.concat(filtered);
        }
      });
      setAllWeeklySchedules(combined);
      return;
    }
    try {
      const res = await fetch(`/api/schedules/all-weekly?academic_year_id=${activeYearId}&week_start_date=${currentWeekStart}`, { headers: getHeaders() });
      if (res.ok) {
        setAllWeeklySchedules(await res.json());
      }
    } catch (err) {
      console.error("Failed to fetch all weekly schedules", err);
    }
  };

  useEffect(() => {
    if (activeTab === 'faculty' && classes.length > 0) {
      fetchAllWeeklySchedules();
    }
  }, [activeTab, classes, activeYearId, facultySelectedDate]);

  // --- ACADEMIC PLANNER SYNC EFFECTS ---
  useEffect(() => {
    if (activeTab === 'planner') {
      fetchSubjects();
      if (classes.length > 0) {
        if (!plannerClassId) {
          setPlannerClassId(classes[0].id);
        } else {
          fetchSchedules(plannerClassId);
        }
      }
    }
  }, [activeTab, plannerClassId, classes, activeYearId, weekStartDate]);

  useEffect(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const initial = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [] };
    schedules.forEach(s => {
      const dayName = days.find(d => d.toLowerCase() === s.day_of_week.toLowerCase());
      if (dayName) {
        initial[dayName] = Array.isArray(s.subjects) ? s.subjects : [];
      }
    });
    setScheduleForm(initial);
  }, [schedules]);

  useEffect(() => {
    if (classes.length > 0 && !dashboardPlannerClassId) {
      setDashboardPlannerClassId(classes[0].id);
    }
  }, [classes, dashboardPlannerClassId]);

  useEffect(() => {
    if (activeTab === 'dashboard' && dashboardPlannerClassId) {
      fetchDashboardTodaySchedule(dashboardPlannerClassId);
    }
  }, [dashboardPlannerClassId, activeTab, activeYearId]);


  // Fetch Super Admin Data
  const fetchSuperAdminData = async (customToken, showLoader = false) => {
    const activeToken = customToken || token;
    if (!activeToken) return;
    if (showLoader) setLoading(true);
    try {
      const statsRes = await fetch('/api/super-admin/stats', { headers: getHeaders(activeToken) });
      if (!statsRes.ok) throw new Error("Failed to fetch super admin stats");
      setSuperStats(await statsRes.json());
      
      const schoolRes = await fetch('/api/super-admin/schools', { headers: getHeaders(activeToken) });
      if (!schoolRes.ok) throw new Error("Failed to fetch schools");
      setSchools(await schoolRes.json());
      
      setIsConnected(true);
    } catch (err) {
      console.warn("Backend offline. Seeding Super Admin mock sandbox.");
      setIsConnected(false);
      loadMockSuperAdminData();
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  const loadMockSuperAdminData = () => {
    const savedSchools = JSON.parse(localStorage.getItem('bn_mock_schools') || '[]');
    const combinedSchools = [...savedSchools, ...MOCK_SCHOOLS];
    
    const updatedSchools = combinedSchools.map(s => {
      const end = new Date(s.subscription_end);
      const today = new Date();
      const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
      const daysLeft = diff > 0 ? diff : 0;
      
      const nextStatus = daysLeft <= 0 ? 'Inactive' : s.status;
      return {
        ...s,
        days_remaining: daysLeft,
        status: nextStatus
      };
    });
    
    setSchools(updatedSchools);
    
    const activeCount = updatedSchools.filter(s => s.status === 'Active').length;
    const inactiveCount = updatedSchools.filter(s => s.status === 'Inactive').length;
    
    setSuperStats({
      ...MOCK_SUPER_STATS,
      total_schools: updatedSchools.length,
      active_schools: activeCount,
      inactive_schools: inactiveCount,
      recent_schools: updatedSchools.map(s => ({
        name: s.name,
        email: s.email,
        status: s.status,
        created_at: s.subscription_start ? (s.subscription_start + " 10:00:00") : "2026-06-01 10:00:00"
      })).slice(0, 5)
    });
  };

  // Fetch School Admin Data
  const fetchERPData = async (customToken, customSchoolId) => {
    const activeToken = customToken || token;
    if (!activeToken) return;
    setLoading(true);
    try {
      const headers = getHeaders(activeToken);
      
      const resYears = await fetch('/api/academic-years', { headers });
      if (!resYears.ok) throw new Error("Failed to fetch academic years");
      const fetchedYears = await resYears.json();
      setYears(fetchedYears);
      const activeYear = fetchedYears.find(y => y.is_active === 1 || y.is_active === true || y.is_active === '1');
      if (activeYear && activeYear.id !== activeYearId) {
        setActiveYearId(activeYear.id);
      }

      const resCls = await fetch('/api/classes', { headers });
      if (!resCls.ok) throw new Error("Failed to fetch classes");
      setClasses(await resCls.json());

      const resTeach = await fetch('/api/teachers', { headers });
      if (!resTeach.ok) throw new Error("Failed to fetch teachers");
      setTeachers(await resTeach.json());

      const resStud = await fetch(`/api/students?academic_year_id=${activeYearId}`, { headers });
      if (!resStud.ok) throw new Error("Failed to fetch students");
      setStudents(await resStud.json());

      const resNotif = await fetch('/api/notifications', { headers });
      if (resNotif.ok) setNotifications(await resNotif.json());

      const resAudit = await fetch('/api/audit-logs', { headers });
      if (resAudit.ok) setAuditLogs(await resAudit.json());

      const resStats = await fetch(`/api/dashboard/stats?academic_year_id=${activeYearId}`, { headers });
      if (resStats.ok) setDashboardStats(await resStats.json());

      const resSchool = await fetch('/api/school', { headers });
      if (resSchool.ok) {
        const schInfo = await resSchool.json();
        if (schInfo.currency) setSchoolCurrency(schInfo.currency);
      }

      setIsConnected(true);
    } catch (err) {
      console.warn("School Admin API offline. Loading tenant mock seeds.");
      setIsConnected(false);
      loadMockSeeds(customSchoolId || schoolId);
    } finally {
      setLoading(false);
    }
  };

  const openCreateYearModal = () => {
    let nextRange = "2026-2027";
    let startYear = 2026;
    if (years.length > 0) {
      let maxStart = 0;
      years.forEach(y => {
        const parts = y.year_range.split('-');
        const start = parseInt(parts[0]);
        if (start && start > maxStart) maxStart = start;
      });
      if (maxStart > 0) {
        startYear = maxStart + 1;
        nextRange = `${startYear}-${startYear + 1}`;
      }
    }
    setNewYearForm({
      year_range: nextRange,
      start_date: `${startYear}-04-01`,
      end_date: `${startYear + 1}-03-31`,
      description: '',
      fee_structure: {
        April: 150, May: 150, June: 150, July: 150, August: 150, September: 150,
        October: 150, November: 150, December: 150, January: 150, February: 150, March: 150
      }
    });
    setYearError('');
    setShowCreateYearModal(true);
  };

  const handleCreateAcademicYear = async (e) => {
    e.preventDefault();
    setIsSavingYear(true);
    setYearError('');

    if (token.includes('mock') || !isConnected) {
      setTimeout(() => {
        const keySuffix = schoolId || 'default';
        const newY = {
          id: years.length + 1,
          school_id: parseInt(keySuffix) || 1,
          year_range: newYearForm.year_range,
          start_date: newYearForm.start_date,
          end_date: newYearForm.end_date,
          description: newYearForm.description,
          status: 'Draft',
          fee_structure: newYearForm.fee_structure,
          is_active: false
        };
        if (years.some(y => y.year_range === newYearForm.year_range)) {
          setYearError('Academic year range already exists');
          setIsSavingYear(false);
          return;
        }
        const updated = [...years, newY];
        setYears(updated);
        localStorage.setItem(`bn_sandbox_years_${keySuffix}`, JSON.stringify(updated));
        
        showToast('Academic year registered successfully as Draft!', 'success');
        setShowCreateYearModal(false);
        setIsSavingYear(false);
      }, 800);
      return;
    }

    try {
      const res = await fetch('/api/academic-years', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(newYearForm)
      });
      if (res.ok) {
        showToast('Academic year registered successfully as Draft!', 'success');
        setShowCreateYearModal(false);
        // Refresh years
        const resYears = await fetch('/api/academic-years', { headers: getHeaders() });
        if (resYears.ok) setYears(await resYears.json());
      } else {
        const err = await res.json();
        setYearError(err.detail || 'Failed to create academic year.');
        showToast(err.detail || 'Failed to create academic year.', 'danger');
      }
    } catch (err) {
      setYearError('Error connecting to backend.');
      showToast('Error connecting to backend.', 'danger');
    } finally {
      setIsSavingYear(false);
    }
  };

  const handleArchiveAcademicYear = async (yearId) => {
    if (!window.confirm("Are you sure you want to archive this academic session?")) return;
    
    if (token.includes('mock') || !isConnected) {
      const keySuffix = schoolId || 'default';
      const updated = years.map(y => y.id === yearId ? { ...y, status: 'Archived', is_active: false } : y);
      setYears(updated);
      localStorage.setItem(`bn_sandbox_years_${keySuffix}`, JSON.stringify(updated));
      showToast('Academic year archived successfully!', 'success');
      return;
    }

    try {
      const res = await fetch(`/api/academic-years/${yearId}/archive`, {
        method: 'PUT',
        headers: getHeaders()
      });
      if (res.ok) {
        showToast('Academic year archived successfully!', 'success');
        const resYears = await fetch('/api/academic-years', { headers: getHeaders() });
        if (resYears.ok) setYears(await resYears.json());
      } else {
        const err = await res.json();
        showToast(err.detail || 'Failed to archive academic year.', 'danger');
      }
    } catch (err) {
      showToast('Error connecting to backend.', 'danger');
    }
  };

  const fetchCrossYearReportsData = async () => {
    setIsFetchingCrossYear(true);
    
    if (token.includes('mock') || !isConnected) {
      setTimeout(() => {
        const mockReports = years.map(y => {
          const yearStudents = students.filter(s => s.academic_year_id === y.id && s.status === 'Active');
          return {
            year_range: y.year_range,
            student_count: yearStudents.length,
            status: y.status,
            revenue: yearStudents.length * 150.00,
            salary_expense: teachers.length * 1200.00,
            performance_index: y.status === 'Archived' ? '84.2%' : '86.5%'
          };
        });
        setCrossYearReports(mockReports);
        setIsFetchingCrossYear(false);
      }, 500);
      return;
    }

    try {
      const res = await fetch('/api/reports/cross-year', { headers: getHeaders() });
      if (res.ok) {
        setCrossYearReports(await res.json());
      } else {
        showToast('Failed to fetch cross-year reports.', 'danger');
      }
    } catch (err) {
      showToast('Error connecting to backend.', 'danger');
    } finally {
      setIsFetchingCrossYear(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'reports' && reportSubTab === 'cross-year') {
      fetchCrossYearReportsData();
    }
  }, [activeTab, reportSubTab]);

  const getInitialClassMappings = () => {
    const sorted = [...classes].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    const mappings = {};
    for (let i = 0; i < sorted.length; i++) {
      if (i < sorted.length - 1) {
        mappings[sorted[i].id] = sorted[i+1].id;
      } else {
        mappings[sorted[i].id] = 'Alumni';
      }
    }
    return mappings;
  };

  const handleExecuteTransition = async () => {
    if (wizardConfirmText !== 'CONFIRM') {
      showToast('Please type "CONFIRM" to proceed.', 'warning');
      return;
    }
    setIsActivatingYear(true);

    if (token.includes('mock') || !isConnected) {
      setTimeout(() => {
        const keySuffix = schoolId || 'default';
        
        // 1. Archive other years, activate target year
        const updatedYears = years.map(y => {
          if (y.id === wizardTargetYear.id) {
            return { ...y, status: 'Active', is_active: true };
          } else if (y.status === 'Active') {
            return { ...y, status: 'Archived', is_active: false };
          }
          return y;
        });
        
        // 2. Clone active students to the new year based on mapping and selection
        const updatedStudents = students.map(student => {
          if (student.status === 'Active') {
            const promotionStatus = wizardStudentStatus[student.id] || 'promote';
            if (promotionStatus === 'promote') {
              const nextClassId = wizardClassMappings[student.class_id];
              if (nextClassId === 'Alumni') {
                return { ...student, status: 'Alumni', academic_year_id: wizardTargetYear.id };
              } else if (nextClassId) {
                return { ...student, class_id: parseInt(nextClassId), academic_year_id: wizardTargetYear.id };
              }
            } else {
              return { ...student, academic_year_id: wizardTargetYear.id };
            }
          }
          return student;
        });
        
        setYears(updatedYears);
        setStudents(updatedStudents);
        localStorage.setItem(`bn_sandbox_years_${keySuffix}`, JSON.stringify(updatedYears));
        localStorage.setItem(`bn_sandbox_students_${keySuffix}`, JSON.stringify(updatedStudents));
        
        setActiveYearId(wizardTargetYear.id);
        
        showToast('Academic year activated successfully!', 'success');
        setShowTransitionWizard(false);
        setIsActivatingYear(false);
      }, 1000);
      return;
    }

    try {
      const payload = {
        class_mappings: wizardClassMappings,
        student_status: wizardStudentStatus
      };
      const res = await fetch(`/api/academic-years/${wizardTargetYear.id}/activate`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        showToast(data.message || 'Academic year activated successfully!', 'success');
        setShowTransitionWizard(false);
        // Set new active year
        setActiveYearId(wizardTargetYear.id);
        // Refresh all data
        await fetchERPData(token, schoolId);
      } else {
        const err = await res.json();
        showToast(err.detail || 'Activation failed.', 'danger');
      }
    } catch (err) {
      showToast('Error connecting to backend.', 'danger');
    } finally {
      setIsActivatingYear(false);
    }
  };

  const loadMockSeeds = (customSchoolId) => {
    const keySuffix = customSchoolId || schoolId || 'default';
    const isNewTenant = keySuffix !== '1' && keySuffix !== 'default';

    const storedClasses = localStorage.getItem(`bn_sandbox_classes_${keySuffix}`);
    const storedTeachers = localStorage.getItem(`bn_sandbox_teachers_${keySuffix}`);
    const storedStudents = localStorage.getItem(`bn_sandbox_students_${keySuffix}`);
    const storedSubjects = localStorage.getItem(`bn_sandbox_subjects_${keySuffix}`);
    const storedYears = localStorage.getItem(`bn_sandbox_years_${keySuffix}`);

    const localClasses = storedClasses ? JSON.parse(storedClasses) : (isNewTenant ? [] : MOCK_CLASSES);
    const localTeachers = storedTeachers ? JSON.parse(storedTeachers) : (isNewTenant ? [] : MOCK_TEACHERS);
    const localStudents = storedStudents ? JSON.parse(storedStudents) : (isNewTenant ? [] : MOCK_STUDENTS);
    const localSubjects = storedSubjects ? JSON.parse(storedSubjects) : (isNewTenant ? [] : [
      { id: 1, name: 'English' },
      { id: 2, name: 'Mathematics' },
      { id: 3, name: 'Science' },
      { id: 4, name: 'Hindi' },
      { id: 5, name: 'Social Studies' },
      { id: 6, name: 'Drawing' },
      { id: 7, name: 'Computer' }
    ]);
    const defaultFeesStructure = {
      April: 150, May: 150, June: 150, July: 150, August: 150, September: 150,
      October: 150, November: 150, December: 150, January: 150, February: 150, March: 150
    };
    const localYears = storedYears ? JSON.parse(storedYears) : (isNewTenant ? [] : [
      { id: 1, year_range: "2024-2025", start_date: "2024-04-01", end_date: "2025-03-31", description: "Past session", status: "Archived", is_active: false, fee_structure: defaultFeesStructure },
      { id: 2, year_range: "2025-2026", start_date: "2025-04-01", end_date: "2026-03-31", description: "Active session", status: "Active", is_active: true, fee_structure: defaultFeesStructure }
    ]);

    setClasses(localClasses);
    setTeachers(localTeachers);
    setStudents(localStudents);
    setSubjects(localSubjects);
    setYears(localYears);
    const storedCurr = localStorage.getItem(`bn_sandbox_school_currency_${keySuffix}`);
    setSchoolCurrency(storedCurr || 'USD');
    setNotifications(isNewTenant ? [] : MOCK_NOTIFS);
    setAuditLogs([
      { id: 1, operator: "System", action: "Tenant Sandbox Warning", timestamp: "2026-05-30 19:10:00", details: "Running in Offline Tenant Cache Mode." }
    ]);

    const act = localYears.find(y => y.status === 'Active' || y.is_active);
    let targetYearId = 2;
    if (act) {
      targetYearId = act.id;
      setActiveYearId(act.id);
    } else if (localYears.length > 0) {
      targetYearId = localYears[0].id;
      setActiveYearId(localYears[0].id);
    }

    // Pre-initialize sandbox fee records for mock students if not already present
    localStudents.forEach(s => {
      const storageKey = `bn_sandbox_fees_${keySuffix}_${s.id}_${targetYearId}`;
      if (!localStorage.getItem(storageKey)) {
        const months = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];
        
        // Find active year range
        const activeYear = localYears.find(y => y.id === targetYearId);
        const range = activeYear ? activeYear.year_range : '2025-2026';
        const [startYearStr, endYearStr] = range.split('-');
        const startYear = parseInt(startYearStr) || 2025;
        const endYear = parseInt(endYearStr) || 2026;
        
        // Find class-wise fee structure
        const sandboxClassFeesKey = `bn_sandbox_class_fees_${keySuffix}_${s.class_id}_${targetYearId}`;
        const storedClassFees = localStorage.getItem(sandboxClassFeesKey);
        const feeStructure = storedClassFees ? JSON.parse(storedClassFees) : {
          April: 150, May: 150, June: 150, July: 150, August: 150, September: 150,
          October: 150, November: 150, December: 150, January: 150, February: 150, March: 150
        };

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        const defaultFees = months.map((m, i) => {
          const year = i < 9 ? startYear : endYear;
          const monthNum = i < 9 ? i + 4 : i - 8;
          
          let status = "Pending";
          let payDate = null;
          if (s.id % 2 === 0 && (year < currentYear || (year === currentYear && monthNum < currentMonth))) {
            status = "Paid";
            payDate = `${year}-${String(monthNum).padStart(2, '0')}-05`;
          }

          return {
            id: i + 1,
            student_id: s.id,
            month: m,
            amount: parseFloat(feeStructure[m]) || 150.00,
            status: status,
            due_date: `${year}-${String(monthNum).padStart(2, '0')}-15`,
            payment_date: payDate
          };
        });
        localStorage.setItem(storageKey, JSON.stringify(defaultFees));
      }
    });

    // Pre-initialize sandbox salary records for mock teachers if not already present
    localTeachers.forEach(t => {
      const storageKey = `bn_sandbox_salaries_${keySuffix}_${t.id}_${targetYearId}`;
      if (!localStorage.getItem(storageKey)) {
        const months = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];
        const base = parseFloat(t.salary_amount) || 3000.0;
        const defaultSalaries = months.map((m, i) => ({
          id: i + 1,
          teacher_id: t.id,
          month: m,
          amount: base,
          status: i < 5 ? "Paid" : "Pending",
          payment_date: i < 5 ? `2025-${String(i+4).padStart(2, '0')}-05` : null
        }));
        localStorage.setItem(storageKey, JSON.stringify(defaultSalaries));
      }
    });

    let calculatedRevenue = 0;
    localStudents.forEach(s => {
      const storageKey = `bn_sandbox_fees_${keySuffix}_${s.id}_${targetYearId}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const records = JSON.parse(stored);
        records.forEach(r => {
          if (r.status === 'Paid') {
            calculatedRevenue += parseFloat(r.amount) || 0;
          }
        });
      }
    });
    
    setDashboardStats({
      total_students: localStudents.length,
      total_teachers: localTeachers.length,
      pending_fees_count: isNewTenant ? 0 : 5,
      pending_salaries_count: isNewTenant ? 0 : 8,
      monthly_revenue: isNewTenant ? 0.00 : calculatedRevenue,
      active_classes: localClasses.length,
      attendance_overview: isNewTenant ? "0.0% Avg" : "96.4% Avg",
      charts: {
        fee_collection: isNewTenant ? [
          { month: "April", amount: 0 }, { month: "May", amount: 0 }, { month: "June", amount: 0 },
          { month: "July", amount: 0 }, { month: "August", amount: 0 }, { month: "September", amount: 0 }
        ] : [
          { month: "April", amount: 450.00 }, { month: "May", amount: 300.00 }, { month: "June", amount: 300.00 },
          { month: "July", amount: 200.00 }, { month: "August", amount: 200.00 }, { month: "September", amount: 0 }
        ],
        salary_expense: isNewTenant ? [
          { month: "April", amount: 0 }, { month: "May", amount: 0 }, { month: "June", amount: 0 },
          { month: "July", amount: 0 }, { month: "August", amount: 0 }, { month: "September", amount: 0 }
        ] : [
          { month: "April", amount: 7500.00 }, { month: "May", amount: 7500.00 }, { month: "June", amount: 7500.00 },
          { month: "July", amount: 0 }, { month: "August", amount: 0 }, { month: "September", amount: 0 }
        ]
      }
    });
  };

  // Reset delete password and error when modal opens
  useEffect(() => {
    if (deleteConfirm) {
      setDeletePassword('');
      setDeleteError('');
    }
  }, [deleteConfirm]);

  // Verify session on mount
  useEffect(() => {
    const verifySession = async () => {
      const storedToken = localStorage.getItem('admin_token');
      const storedRole = localStorage.getItem('admin_role');
      const storedSetup = parseInt(localStorage.getItem('admin_setup_completed') || '1');
      const storedSchoolName = localStorage.getItem('admin_school_name') || 'BN School';
      const storedSchoolId = localStorage.getItem('admin_school_id') || '1';
      
      if (storedToken) {
        try {
          if (storedRole === 'Super Admin') {
            const res = await fetch('/api/super-admin/stats', {
              headers: { 'Authorization': `Bearer ${storedToken}` }
            });
            if (res.ok) {
              setToken(storedToken);
              setRole('Super Admin');
              setUsername(localStorage.getItem('admin_email') || 'Bilal@yopmail.com');
              await fetchSuperAdminData(storedToken, true);
              window.history.replaceState({ loggedIn: true, role: 'Super Admin' }, '', '/super-admin');
              setCurrentPath('/super-admin');
            } else {
              if (storedToken.includes('mock')) {
                throw new Error('Mock token check failed on server. Restoring mock session.');
              }
              clearSession();
            }
          } else {
            // School Admin
            const res = await fetch('/api/academic-years', {
              headers: { 'Authorization': `Bearer ${storedToken}` }
            });
            if (res.ok) {
              setToken(storedToken);
              setRole('School Admin');
              setUsername(localStorage.getItem('admin_email') || 'Admin@yopmail.com');
              setSchoolId(localStorage.getItem('admin_school_id') || '1');
              setSetupCompleted(storedSetup);
              setSchoolName(storedSchoolName);
              
              if (storedSetup === 0) {
                window.history.replaceState({ loggedIn: true, role: 'School Admin' }, '', '/setup');
                setCurrentPath('/setup');
              } else {
                await fetchERPData(storedToken, storedSchoolId);
                window.history.replaceState({ loggedIn: true, role: 'School Admin' }, '', '/dashboard');
                setCurrentPath('/dashboard');
              }
            } else {
              if (storedToken.includes('mock')) {
                throw new Error('Mock token check failed on server. Restoring mock session.');
              }
              clearSession();
            }
          }
        } catch (err) {
          // If offline/mock token
          if (storedToken && storedToken.includes('mock')) {
            setToken(storedToken);
            setRole(storedRole);
            setUsername(localStorage.getItem('admin_email') || 'Admin@yopmail.com');
            setSchoolId(localStorage.getItem('admin_school_id') || '1');
            setSetupCompleted(storedSetup);
            setSchoolName(storedSchoolName);
            if (storedRole === 'Super Admin') {
              loadMockSuperAdminData();
              window.history.replaceState({ loggedIn: true, role: 'Super Admin' }, '', '/super-admin');
              setCurrentPath('/super-admin');
            } else {
              loadMockSeeds(storedSchoolId);
              if (storedSetup === 0) {
                window.history.replaceState({ loggedIn: true, role: 'School Admin' }, '', '/setup');
                setCurrentPath('/setup');
              } else {
                window.history.replaceState({ loggedIn: true, role: 'School Admin' }, '', '/dashboard');
                setCurrentPath('/dashboard');
              }
            }
          } else {
            clearSession();
          }
        }
      } else {
        const path = window.location.pathname;
        if (path === '/super-admin') {
          window.history.replaceState({ loggedIn: false }, '', '/super-admin');
          setCurrentPath('/super-admin');
        } else {
          window.history.replaceState({ loggedIn: false }, '', '/login');
          setCurrentPath('/login');
        }
      }
      setIsInitializing(false);
    };

    verifySession();
  }, []);

  // Central Route Guard
  useEffect(() => {
    if (isInitializing) return;

    if (token) {
      if (role === 'Super Admin') {
        if (currentPath !== '/super-admin') {
          window.history.replaceState({ loggedIn: true, role: 'Super Admin' }, '', '/super-admin');
          setCurrentPath('/super-admin');
        }
      } else if (role === 'School Admin') {
        if (setupCompleted === 0) {
          if (currentPath !== '/setup') {
            window.history.replaceState({ loggedIn: true, role: 'School Admin' }, '', '/setup');
            setCurrentPath('/setup');
          }
        } else {
          if (currentPath !== '/dashboard') {
            window.history.replaceState({ loggedIn: true, role: 'School Admin' }, '', '/dashboard');
            setCurrentPath('/dashboard');
          }
        }
      }
    } else {
      if (currentPath !== '/login' && currentPath !== '/super-admin') {
        window.history.replaceState({ loggedIn: false }, '', '/login');
        setCurrentPath('/login');
      }
    }
  }, [currentPath, token, role, setupCompleted, isInitializing]);

  useEffect(() => {
    if (token && role === 'School Admin' && setupCompleted === 1 && !isInitializing) {
      fetchERPData(token, schoolId);
    }
  }, [token, activeYearId, isInitializing, setupCompleted, role, schoolId]);

  const clearSession = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    localStorage.removeItem('admin_role');
    localStorage.removeItem('admin_school_id');
    localStorage.removeItem('admin_setup_completed');
    setToken('');
    setRole('');
    setSchoolId('');
    setSetupCompleted(1);

    // Reset active view tab & selected states
    setActiveTab('dashboard');
    setSelectedClassId(null);
    setSelectedTeacher(null);
    setSelectedStudent(null);
    setSelectedGroupId(null);
    setEditingStudent(null);
    setReceiptRecord(null);
    setReceiptStudent(null);

    // Reset filter & search states
    setSearchQuery('');
    setGroupFilter('all');
    setSubjectFilter('all');
    setStatusFilter('all');

    // Reset data states to prevent leakage between logins
    setClasses([]);
    setTeachers([]);
    setStudents([]);
    setNotifications([]);
    setAuditLogs([]);
    setDashboardStats(null);
    setSchools([]);
    setSuperStats(null);
    setGeneratedCredentials(null);
    setTeacherSalaries([]);
    setStudentFees([]);
    setSchoolName('BN School');

    const path = window.location.pathname;
    if (path === '/super-admin') {
      window.history.replaceState({ loggedIn: false }, '', '/super-admin');
      setCurrentPath('/super-admin');
    } else {
      window.history.replaceState({ loggedIn: false }, '', '/login');
      setCurrentPath('/login');
    }
  };

  // Forgot Password: Request OTP
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setForgotOtp(''); // Clear previous OTP so it is not pre-filled
    if (!forgotEmail) {
      setForgotError('Email address is required.');
      return;
    }
    if (!isValidEmail(forgotEmail)) {
      setForgotError('Please enter a valid email address.');
      return;
    }
    setIsForgotLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.otp) {
          showToast(`Sandbox Password Reset OTP is: ${data.otp}`, 'success');
        } else {
          showToast('OTP sent successfully to your email.', 'success');
        }
        setForgotPasswordStep(2);
      } else {
        const err = await res.json();
        setForgotError(err.detail || 'Email address not registered.');
      }
    } catch (err) {
      const savedUsers = JSON.parse(localStorage.getItem('bn_mock_users') || '[]');
      const matched = savedUsers.find(u => u.email.trim().toLowerCase() === forgotEmail.trim().toLowerCase());
      const isDefaultMock = forgotEmail.trim().toLowerCase() === 'admin@yopmail.com' || forgotEmail.trim().toLowerCase() === 'bilal@yopmail.com';
      
      if (matched || isDefaultMock) {
        const dummyOtp = '1234';
        localStorage.setItem(`bn_reset_otp_${forgotEmail.trim().toLowerCase()}`, dummyOtp);
        showToast(`Offline Mode Reset OTP is: ${dummyOtp}`, 'success');
        setForgotPasswordStep(2);
      } else {
        setForgotError('Email address is not registered.');
      }
    } finally {
      setIsForgotLoading(false);
    }
  };

  // Forgot Password: Verify OTP
  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    if (!forgotOtp || forgotOtp.length !== 4) {
      setForgotError('Please enter the 4-digit OTP.');
      return;
    }
    setIsForgotLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail, otp: forgotOtp })
      });
      if (res.ok) {
        setForgotPasswordStep(3);
      } else {
        const err = await res.json();
        setForgotError(err.detail || 'Invalid or expired OTP.');
      }
    } catch (err) {
      const storedOtp = localStorage.getItem(`bn_reset_otp_${forgotEmail.trim().toLowerCase()}`);
      if (storedOtp && storedOtp === forgotOtp) {
        setForgotPasswordStep(3);
      } else {
        setForgotError('Invalid or expired OTP.');
      }
    } finally {
      setIsForgotLoading(false);
    }
  };

  // Forgot Password: Reset Password
  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    
    if (!newPassword || newPassword.length < 8) {
      setForgotError('Password must be at least 8 characters long.');
      return;
    }
    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword) || !/[!@#$%^&*()_+]/.test(newPassword)) {
      setForgotError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setForgotError('Passwords do not match.');
      return;
    }
    
    setIsForgotLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail, otp: forgotOtp, password: newPassword })
      });
      if (res.ok) {
        const savedUsers = JSON.parse(localStorage.getItem('bn_mock_users') || '[]');
        const updatedUsers = savedUsers.map(u => 
          u.email.trim().toLowerCase() === forgotEmail.trim().toLowerCase() 
            ? { ...u, password: newPassword } 
            : u
        );
        localStorage.setItem('bn_mock_users', JSON.stringify(updatedUsers));
        
        showToast('Password reset successfully. Please log in with your new password.', 'success');
        setForgotEmail('');
        setForgotOtp('');
        setNewPassword('');
        setConfirmNewPassword('');
        setForgotPasswordStep(0);
      } else {
        const err = await res.json();
        setForgotError(err.detail || 'Password reset failed.');
      }
    } catch (err) {
      const savedUsers = JSON.parse(localStorage.getItem('bn_mock_users') || '[]');
      const updatedUsers = savedUsers.map(u => 
        u.email.trim().toLowerCase() === forgotEmail.trim().toLowerCase() 
          ? { ...u, password: newPassword } 
          : u
      );
      localStorage.setItem('bn_mock_users', JSON.stringify(updatedUsers));
      localStorage.removeItem(`bn_reset_otp_${forgotEmail.trim().toLowerCase()}`);
      
      showToast('Password reset successfully (Offline Mode).', 'success');
      setForgotEmail('');
      setForgotOtp('');
      setNewPassword('');
      setConfirmNewPassword('');
      setForgotPasswordStep(0);
    } finally {
      setIsForgotLoading(false);
    }
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setRegisterSuccess('');
    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginUser, password: loginPass })
      });
      if (res.ok) {
        const data = await res.json();
        
        localStorage.setItem('admin_token', data.access_token);
        localStorage.setItem('admin_email', data.email);
        localStorage.setItem('admin_role', data.role);
        localStorage.setItem('admin_school_id', data.school_id || '');
        localStorage.setItem('admin_setup_completed', data.setup_completed);
        localStorage.setItem('admin_school_name', data.school_name || 'BN School');

        setToken(data.access_token);
        setUsername(data.email);
        setRole(data.role);
        setSchoolId(data.school_id);
        setSetupCompleted(data.setup_completed);
        setSchoolName(data.school_name || 'BN School');
        
        setLoginUser(''); setLoginPass('');
        setLoginError('');
        setIsLoggingIn(false);
        showToast('Logged In Successfully', 'success');

        if (data.role === 'Super Admin') {
          window.history.replaceState({ loggedIn: true, role: 'Super Admin' }, '', '/super-admin');
          setCurrentPath('/super-admin');
          await fetchSuperAdminData(data.access_token, true);
        } else {
          if (data.setup_completed === 0) {
            window.history.replaceState({ loggedIn: true, role: 'School Admin' }, '', '/setup');
            setCurrentPath('/setup');
          } else {
            window.history.replaceState({ loggedIn: true, role: 'School Admin' }, '', '/dashboard');
            setCurrentPath('/dashboard');
            await fetchERPData(data.access_token, data.school_id);
          }
        }
      } else {
        if (res.status === 500) {
          throw new Error('Database offline. Triggering mock fallback.');
        }

        const savedUsers = JSON.parse(localStorage.getItem('bn_mock_users') || '[]');
        const matched = savedUsers.find(u => u.email.trim().toLowerCase() === loginUser.trim().toLowerCase() && u.password.trim() === loginPass.trim());
        if (matched) {
          throw new Error('Dynamic mock user fallback.');
        }

        const err = await res.json();
        setLoginError(err.detail || 'Invalid email or password. Please verify your credentials.');
        setIsLoggingIn(false);
      }
    } catch (err) {
      // Offline fallback login credentials
      const savedUsers = JSON.parse(localStorage.getItem('bn_mock_users') || '[]');
      const matched = savedUsers.find(u => u.email.trim().toLowerCase() === loginUser.trim().toLowerCase() && u.password.trim() === loginPass.trim());

      if (matched) {
        const mockTokenVal = 'mock-token-' + matched.school_id + '-' + btoa(loginUser.trim()).replace(/\//g, '_').replace(/=/g, '');
        localStorage.setItem('admin_token', mockTokenVal);
        localStorage.setItem('admin_email', loginUser);
        localStorage.setItem('admin_role', matched.role);
        localStorage.setItem('admin_school_id', matched.school_id);
        localStorage.setItem('admin_setup_completed', String(matched.setup_completed));
        localStorage.setItem('admin_school_name', matched.school_name || 'BN School');

        setToken(mockTokenVal);
        setUsername(loginUser);
        setRole(matched.role);
        setSchoolId(matched.school_id);
        setSetupCompleted(matched.setup_completed);
        setSchoolName(matched.school_name || 'BN School');
        setLoginUser(''); setLoginPass('');
        setLoginError('');
        setIsLoggingIn(false);
        showToast('Logged In Successfully', 'success');
        
        if (matched.setup_completed === 0) {
          window.history.replaceState({ loggedIn: true, role: 'School Admin' }, '', '/setup');
          setCurrentPath('/setup');
        } else {
          setLoading(true);
          loadMockSeeds(matched.school_id);
          window.history.replaceState({ loggedIn: true, role: 'School Admin' }, '', '/dashboard');
          setCurrentPath('/dashboard');
          setTimeout(() => setLoading(false), 300);
        }
      } else if (loginUser === 'Bilal@yopmail.com' && loginPass === 'Bilal@123') {
        localStorage.setItem('admin_token', 'mock-super-token');
        localStorage.setItem('admin_email', loginUser);
        localStorage.setItem('admin_role', 'Super Admin');
        localStorage.setItem('admin_school_id', '');
        localStorage.setItem('admin_setup_completed', '1');

        setToken('mock-super-token');
        setUsername(loginUser);
        setRole('Super Admin');
        setSchoolId('');
        setSetupCompleted(1);
        setLoginUser(''); setLoginPass('');
        setLoginError('');
        setIsLoggingIn(false);
        showToast('Logged In Successfully', 'success');
        window.history.replaceState({ loggedIn: true, role: 'Super Admin' }, '', '/super-admin');
        setCurrentPath('/super-admin');
        loadMockSuperAdminData();
      } else if (loginUser === 'Admin@yopmail.com' && loginPass === 'Admin@123') {
        setLoading(true);
        loadMockSeeds('1');
        localStorage.setItem('admin_token', 'mock-token');
        localStorage.setItem('admin_email', loginUser);
        localStorage.setItem('admin_role', 'School Admin');
        localStorage.setItem('admin_school_id', '1');
        localStorage.setItem('admin_setup_completed', '1');
        localStorage.setItem('admin_school_name', "St. Xavier's International School");

        setToken('mock-token');
        setUsername(loginUser);
        setRole('School Admin');
        setSchoolId('1');
        setSetupCompleted(1);
        setSchoolName("St. Xavier's International School");
        setLoginUser(''); setLoginPass('');
        setLoginError('');
        setIsLoggingIn(false);
        showToast('Logged In Successfully', 'success');
        window.history.replaceState({ loggedIn: true, role: 'School Admin' }, '', '/dashboard');
        setCurrentPath('/dashboard');
        setTimeout(() => setLoading(false), 300);
      } else if (loginUser.includes('new') && loginPass === 'School@123') {
        // Invite Mock Login
        localStorage.setItem('admin_token', 'mock-token');
        localStorage.setItem('admin_email', loginUser);
        localStorage.setItem('admin_role', 'School Admin');
        localStorage.setItem('admin_school_id', '2');
        localStorage.setItem('admin_setup_completed', '0');
        localStorage.setItem('admin_school_name', "New College Campus");

        setToken('mock-token');
        setUsername(loginUser);
        setRole('School Admin');
        setSchoolId('2');
        setSetupCompleted(0);
        setSchoolName("New College Campus");
        setLoginUser(''); setLoginPass('');
        setLoginError('');
        setIsLoggingIn(false);
        showToast('Logged In Successfully', 'success');
        window.history.replaceState({ loggedIn: true, role: 'School Admin' }, '', '/setup');
        setCurrentPath('/setup');
      } else {
        setLoginError('Invalid email or password. Please verify your credentials.');
        setIsLoggingIn(false);
      }
    }
  };

  const handleLogout = () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setTimeout(() => {
      clearSession();
      setIsLoggingOut(false);
      showToast('Logged Out Successfully', 'success');
    }, 2200);
  };

  // Helper to generate secure password satisfying constraints:
  // - At least 8 characters
  // - At least one uppercase letter
  // - At least one lowercase letter
  // - At least one numeric digit
  // - At least one special character
  const generateSecurePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+";
    
    const uChar = uppercase[Math.floor(Math.random() * uppercase.length)];
    const lChar = lowercase[Math.floor(Math.random() * lowercase.length)];
    const nChar = numbers[Math.floor(Math.random() * numbers.length)];
    const sChar = special[Math.floor(Math.random() * special.length)];
    
    const all = uppercase + lowercase + numbers + special;
    let rest = "";
    for (let i = 0; i < 6; i++) {
      rest += all[Math.floor(Math.random() * all.length)];
    }
    
    const array = (uChar + lChar + nChar + sChar + rest).split("");
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
  };

  // Super Admin: Onboard/Invite School
  const handleInviteSchoolSubmit = async (e) => {
    e.preventDefault();
    if (!inviteForm.email || !isValidEmail(inviteForm.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setIsSendingInvite(true);
    try {
      const res = await fetch('/api/super-admin/invitations', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email: inviteForm.email })
      });
      if (res.ok) {
        setShowInviteModal(false);
        setInviteForm({ name: '', email: '', contact_person: '', phone: '' });
        await fetchSuperAdminData();
        showToast('Invitation sent successfully', 'success');
      } else {
        const err = await res.json();
        alert(err.detail || 'Failed to generate invitation.');
      }
    } catch (err) {
      // Offline fallback onboarding
      const securePassword = generateSecurePassword();
      
      try {
        await fetch('/api/sandbox/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: inviteForm.email,
            name: '-',
            password: securePassword
          })
        });
      } catch (mailErr) {
        console.error("Sandbox SMTP email failed:", mailErr);
      }
      
      const newSchoolId = schools.length + 1;
      const newSchool = {
        id: newSchoolId,
        name: '-',
        code: 'SCH-' + Math.floor(100000 + Math.random() * 900000),
        contact_person: '-',
        contact_number: '-',
        email: inviteForm.email,
        status: 'Active',
        logo_path: null,
        subscription_start: new Date().toISOString().split('T')[0],
        subscription_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        setup_completed: 0,
        days_remaining: 30
      };

      const savedSchools = JSON.parse(localStorage.getItem('bn_mock_schools') || '[]');
      savedSchools.push(newSchool);
      localStorage.setItem('bn_mock_schools', JSON.stringify(savedSchools));

      loadMockSuperAdminData();
      
      const savedUsers = JSON.parse(localStorage.getItem('bn_mock_users') || '[]');
      savedUsers.push({
        email: inviteForm.email,
        password: securePassword,
        role: 'School Admin',
        school_id: String(newSchoolId),
        setup_completed: 0,
        school_name: '-'
      });
      localStorage.setItem('bn_mock_users', JSON.stringify(savedUsers));
      
      setShowInviteModal(false);
      setInviteForm({ name: '', email: '', contact_person: '', phone: '' });
      showToast('Invitation sent successfully', 'success');
    } finally {
      setIsSendingInvite(false);
    }
  };

  // Super Admin: Extend Subscription
  const handleExtendSubscription = async (e) => {
    e.preventDefault();
    if (!showExtendModal) return;
    try {
      const res = await fetch(`/api/super-admin/schools/${showExtendModal.id}/extend`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ months: extendMonths })
      });
      if (res.ok) {
        setShowExtendModal(null);
        await fetchSuperAdminData();
        showToast('Subscription Extended Successfully', 'success');
      }
    } catch (err) {
      // Sandbox extend
      setSchools(schools.map(s => {
        if (s.id === showExtendModal.id) {
          const currentEnd = new Date(s.subscription_end);
          currentEnd.setMonth(currentEnd.getMonth() + parseInt(extendMonths));
          const newEnd = currentEnd.toISOString().split('T')[0];
          const diff = Math.ceil((currentEnd - new Date()) / (1000 * 60 * 60 * 24));
          return { ...s, subscription_end: newEnd, days_remaining: diff };
        }
        return s;
      }));
      setShowExtendModal(null);
      showToast('Subscription Extended (Sandbox Mode)', 'success');
    }
  };

  // Super Admin: Deactivate School
  const handleToggleSchoolStatus = async (school) => {
    const nextStatus = school.status === 'Active' ? 'Inactive' : 'Active';
    try {
      const res = await fetch(`/api/super-admin/schools/${school.id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        await fetchSuperAdminData();
        showToast(`School marked ${nextStatus}`, 'success');
      }
    } catch (err) {
      setSchools(schools.map(s => s.id === school.id ? { ...s, status: nextStatus } : s));
      setSuperStats({
        ...superStats,
        active_schools: nextStatus === 'Active' ? superStats.active_schools + 1 : superStats.active_schools - 1,
        inactive_schools: nextStatus === 'Inactive' ? superStats.inactive_schools + 1 : superStats.inactive_schools - 1
      });
      showToast(`School marked ${nextStatus} (Sandbox Mode)`, 'success');
    }
  };

  // Super Admin: Delete School
  const handleDeleteSchool = (schoolId) => {
    setDeleteConfirm({
      message: 'Are you sure you want to delete permanently? All associated accounts, students, and ledgers will be permanently deleted.',
      onConfirm: async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/super-admin/schools/${schoolId}`, {
            method: 'DELETE',
            headers: getHeaders()
          });
          if (res.ok) {
            await fetchSuperAdminData();
            showToast('School Deleted Successfully', 'success');
          } else {
            const err = await res.json();
            alert(err.detail || 'Failed to delete school.');
          }
        } catch (err) {
          // Sandbox delete
          const savedSchools = JSON.parse(localStorage.getItem('bn_mock_schools') || '[]');
          const updatedSchools = savedSchools.filter(s => s.id !== schoolId);
          localStorage.setItem('bn_mock_schools', JSON.stringify(updatedSchools));
          loadMockSuperAdminData();
          showToast('School Deleted (Sandbox Mode)', 'success');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleConfirmDelete = async () => {
    if (!deletePassword) {
      setDeleteError("Password is required.");
      return;
    }
    
    setLoading(true);
    let verified = false;
    
    try {
      // Call backend API to verify password
      const verifyRes = await fetch('/api/auth/verify-password', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ password: deletePassword })
      });
      if (verifyRes.ok) {
        verified = true;
      } else {
        const err = await verifyRes.json();
        setDeleteError(err.detail || "Invalid password.");
      }
    } catch (err) {
      // Fallback local sandbox validation
      const email = username.toLowerCase();
      if (email === 'bilal@yopmail.com' && deletePassword === 'Bilal@123') {
        verified = true;
      } else if (email === 'admin@yopmail.com' && deletePassword === 'Admin@123') {
        verified = true;
      } else {
        const savedUsers = JSON.parse(localStorage.getItem('bn_mock_users') || '[]');
        const matched = savedUsers.find(u => u.email.toLowerCase() === email);
        verified = matched && matched.password === deletePassword;
      }
      
      if (!verified) {
        setDeleteError("Invalid password.");
      }
    } finally {
      setLoading(false);
    }
    
    if (verified) {
      // Proceed with delete
      deleteConfirm.onConfirm();
      setDeleteConfirm(null);
      setDeletePassword('');
      setDeleteError('');
    }
  };

  // School Admin Setup Wizard Submit
  const handleWizardSubmit = async (e) => {
    e.preventDefault();
    if (wizardForm.contact_number && !isValidPhone(wizardForm.contact_number)) {
      alert("Phone Number must contain exactly 10 digits.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/school/setup', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(wizardForm)
      });
      if (res.ok) {
        const data = await res.json();
        
        localStorage.setItem('admin_token', data.access_token);
        localStorage.setItem('admin_setup_completed', '1');
        localStorage.setItem('admin_school_name', wizardForm.name);
        
        setToken(data.access_token);
        setSetupCompleted(1);
        setSchoolName(wizardForm.name);
        
        showToast('School Setup Completed!', 'success');
        window.history.replaceState({ loggedIn: true, role: 'School Admin' }, '', '/dashboard');
        setCurrentPath('/dashboard');
        await fetchERPData(data.access_token, data.school_id);
      } else {
        if (res.status === 500) {
          throw new Error('Database offline. Triggering mock fallback.');
        }
        const err = await res.json();
        alert(err.detail || 'Configuration update failed.');
      }
    } catch (err) {
      // Sandbox setup completed
      localStorage.setItem('admin_setup_completed', '1');
      localStorage.setItem('admin_school_name', wizardForm.name);
      setSetupCompleted(1);
      setSchoolName(wizardForm.name);
      
      const savedUsers = JSON.parse(localStorage.getItem('bn_mock_users') || '[]');
      const updatedUsers = savedUsers.map(u => u.email.toLowerCase() === username.toLowerCase() ? { ...u, setup_completed: 1, school_name: wizardForm.name } : u);
      localStorage.setItem('bn_mock_users', JSON.stringify(updatedUsers));

      const currentUser = savedUsers.find(u => u.email.toLowerCase() === username.toLowerCase());
      if (currentUser) {
        const savedSchools = JSON.parse(localStorage.getItem('bn_mock_schools') || '[]');
        const updatedSchools = savedSchools.map(s => {
          if (String(s.id) === String(currentUser.school_id)) {
            return {
              ...s,
              name: wizardForm.name,
              contact_person: wizardForm.contact_person,
              contact_number: wizardForm.contact_number,
              status: 'Active',
              setup_completed: 1
            };
          }
          return s;
        });
        localStorage.setItem('bn_mock_schools', JSON.stringify(updatedSchools));
      }

      try {
        await fetch('/api/sandbox/setup-completed', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: username })
        });
      } catch (setupErr) {
        console.error("Sandbox SMTP setup status update failed:", setupErr);
      }

      showToast('School Setup Completed! (Sandbox Mode)', 'success');
      window.history.replaceState({ loggedIn: true, role: 'School Admin' }, '', '/dashboard');
      setCurrentPath('/dashboard');
      loadMockSeeds();
    } finally {
      setLoading(false);
    }
  };

  // Tenant operations: salary/fees handlers, class, teachers, students etc.
  const handleAddClass = async (name, room, groups = []) => {
    if (!name) return;
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const newClassId = classes.length + 1;
      const localGroups = groups.map((g, idx) => ({
        id: idx + 1 + Math.floor(Math.random() * 1000),
        school_id: schoolId,
        class_id: newClassId,
        name: g
      }));
      const updated = [...classes, { id: newClassId, name, room, groups: localGroups }];
      setClasses(updated);
      localStorage.setItem(`bn_sandbox_classes_${keySuffix}`, JSON.stringify(updated));
      showToast('Classroom created (Sandbox Mode)', 'success');
      return;
    }
    try {
      const res = await fetch('/api/classes', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ name, room, groups })
      });
      if (res.ok) {
        await fetchERPData();
        showToast('Classroom created successfully', 'success');
      } else {
        const err = await res.json();
        alert(err.detail || 'Failed to create classroom');
      }
    } catch (err) {
      const newClassId = classes.length + 1;
      const localGroups = groups.map((g, idx) => ({
        id: idx + 1 + Math.floor(Math.random() * 1000),
        school_id: schoolId,
        class_id: newClassId,
        name: g
      }));
      const updated = [...classes, { id: newClassId, name, room, groups: localGroups }];
      setClasses(updated);
      localStorage.setItem(`bn_sandbox_classes_${keySuffix}`, JSON.stringify(updated));
      showToast('Classroom created (Sandbox Mode)', 'success');
    }
  };

  const handleAddGroup = async (classId, name) => {
    if (!name) return;
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const newGroupId = Math.floor(Math.random() * 10000);
      const updated = classes.map(c => {
        if (c.id === classId) {
          const existingGrps = c.groups || [];
          return { ...c, groups: [...existingGrps, { id: newGroupId, school_id: schoolId, class_id: classId, name }] };
        }
        return c;
      });
      setClasses(updated);
      localStorage.setItem(`bn_sandbox_classes_${keySuffix}`, JSON.stringify(updated));
      showToast('Group added (Sandbox Mode)', 'success');
      return;
    }
    try {
      const res = await fetch(`/api/classes/${classId}/groups`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        await fetchERPData();
        showToast('Group added successfully', 'success');
      } else {
        const err = await res.json();
        alert(err.detail || 'Failed to add group');
      }
    } catch (err) {
      const newGroupId = Math.floor(Math.random() * 10000);
      const updated = classes.map(c => {
        if (c.id === classId) {
          const existingGrps = c.groups || [];
          return { ...c, groups: [...existingGrps, { id: newGroupId, school_id: schoolId, class_id: classId, name }] };
        }
        return c;
      });
      setClasses(updated);
      localStorage.setItem(`bn_sandbox_classes_${keySuffix}`, JSON.stringify(updated));
      showToast('Group added (Sandbox Mode)', 'success');
    }
  };

  const handleEditGroup = async (groupId, name) => {
    if (!name) return;
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const updated = classes.map(c => {
        if (c.groups) {
          return {
            ...c,
            groups: c.groups.map(g => g.id === groupId ? { ...g, name } : g)
          };
        }
        return c;
      });
      setClasses(updated);
      localStorage.setItem(`bn_sandbox_classes_${keySuffix}`, JSON.stringify(updated));
      showToast('Group updated (Sandbox Mode)', 'success');
      return;
    }
    try {
      const res = await fetch(`/api/groups/${groupId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        await fetchERPData();
        showToast('Group updated successfully', 'success');
      } else {
        const err = await res.json();
        alert(err.detail || 'Failed to update group name');
      }
    } catch (err) {
      const updated = classes.map(c => {
        if (c.groups) {
          return {
            ...c,
            groups: c.groups.map(g => g.id === groupId ? { ...g, name } : g)
          };
        }
        return c;
      });
      setClasses(updated);
      localStorage.setItem(`bn_sandbox_classes_${keySuffix}`, JSON.stringify(updated));
      showToast('Group updated (Sandbox Mode)', 'success');
    }
  };

  const handleDeleteGroup = async (groupId) => {
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const updatedClasses = classes.map(c => {
        if (c.groups) {
          return {
            ...c,
            groups: c.groups.filter(g => g.id !== groupId)
          };
        }
        return c;
      });
      const updatedStudents = students.map(s => s.group_id === groupId ? { ...s, group_id: null } : s);
      setClasses(updatedClasses);
      setStudents(updatedStudents);
      localStorage.setItem(`bn_sandbox_classes_${keySuffix}`, JSON.stringify(updatedClasses));
      localStorage.setItem(`bn_sandbox_students_${keySuffix}`, JSON.stringify(updatedStudents));
      showToast('Group deleted (Sandbox Mode)', 'success');
      return;
    }
    try {
      const res = await fetch(`/api/groups/${groupId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        await fetchERPData();
        showToast('Group deleted successfully', 'success');
      } else {
        const err = await res.json();
        alert(err.detail || 'Failed to delete group');
      }
    } catch (err) {
      const updatedClasses = classes.map(c => {
        if (c.groups) {
          return {
            ...c,
            groups: c.groups.filter(g => g.id !== groupId)
          };
        }
        return c;
      });
      const updatedStudents = students.map(s => s.group_id === groupId ? { ...s, group_id: null } : s);
      setClasses(updatedClasses);
      setStudents(updatedStudents);
      localStorage.setItem(`bn_sandbox_classes_${keySuffix}`, JSON.stringify(updatedClasses));
      localStorage.setItem(`bn_sandbox_students_${keySuffix}`, JSON.stringify(updatedStudents));
      showToast('Group deleted (Sandbox Mode)', 'success');
    }
  };

  const handleEditTeacherClick = (teacher) => {
    setEditingTeacher(teacher);
    setTForm({
      name: teacher.name || '',
      subject: teacher.subject || '',
      phone: teacher.phone || '',
      email: teacher.email || '',
      qualification: teacher.qualification || '',
      experience: teacher.experience || '',
      address: teacher.address || '',
      joining_date: teacher.joining_date || '',
      exit_date: teacher.exit_date || '',
      salary_amount: parseFloat(teacher.salary_amount) || 3000.0,
      assigned_classes: teacher.assigned_classes || '',
      gender: teacher.gender || 'Male',
      aadhaar_number: teacher.aadhaar_number || '',
      pan_number: teacher.pan_number || '',
      profile_image: teacher.profile_image || '',
      documents: typeof teacher.documents === 'string' ? JSON.parse(teacher.documents) : (teacher.documents || [])
    });
    setShowAddTeacherModal(true);
  };

  const handleAddTeacherSubmit = async (e) => {
    e.preventDefault();
    if (!tForm.name || !tForm.subject) {
      alert("Name and Subject are required.");
      return;
    }
    if (tForm.phone && !isValidPhone(tForm.phone)) {
      alert("Phone Number must contain exactly 10 digits.");
      return;
    }
    if (tForm.email && !isValidEmail(tForm.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!tForm.joining_date) {
      alert("Joining Date is mandatory.");
      return;
    }
    if (tForm.aadhaar_number && !/^\d{12}$/.test(tForm.aadhaar_number)) {
      alert("Aadhaar Number must be exactly 12 digits.");
      return;
    }
    if (tForm.pan_number && !/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(tForm.pan_number.toUpperCase())) {
      alert("PAN Number must match standard format (e.g. ABCDE1234F).");
      return;
    }

    const finalForm = {
      ...tForm,
      pan_number: tForm.pan_number ? tForm.pan_number.toUpperCase() : ''
    };

    const keySuffix = schoolId || 'default';

    if (editingTeacher) {
      if (token.includes('mock') || !isConnected) {
        const updated = teachers.map(t => t.id === editingTeacher.id ? { ...t, ...finalForm } : t);
        setTeachers(updated);
        localStorage.setItem(`bn_sandbox_teachers_${keySuffix}`, JSON.stringify(updated));
        if (selectedTeacher && selectedTeacher.id === editingTeacher.id) {
          setSelectedTeacher({ ...selectedTeacher, ...finalForm });
        }
        setShowAddTeacherModal(false);
        setEditingTeacher(null);
        setTForm({ name: '', subject: '', phone: '', email: '', qualification: '', experience: '', address: '', joining_date: '', exit_date: '', salary_amount: 3000.0, assigned_classes: '', gender: 'Male', aadhaar_number: '', pan_number: '', profile_image: '', documents: [] });
        showToast('Teacher profile updated (Sandbox Mode)', 'success');
        return;
      }
      try {
        const res = await fetch(`/api/teachers/${editingTeacher.id}`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(finalForm)
        });
        if (res.ok) {
          setShowAddTeacherModal(false);
          setEditingTeacher(null);
          await fetchERPData();
          if (selectedTeacher && selectedTeacher.id === editingTeacher.id) {
            setSelectedTeacher({ ...selectedTeacher, ...finalForm });
          }
          setTForm({ name: '', subject: '', phone: '', email: '', qualification: '', experience: '', address: '', joining_date: '', exit_date: '', salary_amount: 3000.0, assigned_classes: '', gender: 'Male', aadhaar_number: '', pan_number: '', profile_image: '', documents: [] });
          showToast('Teacher profile updated', 'success');
        } else {
          const errData = await res.json();
          alert(errData.detail || 'Failed to update teacher');
        }
      } catch (err) {
        console.error(err);
        showToast('Failed to update teacher profile', 'error');
      }
      return;
    }

    if (token.includes('mock') || !isConnected) {
      const newT = { id: teachers.length + 1, ...finalForm, status: "Active", profile_image: finalForm.profile_image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150" };
      const updated = [...teachers, newT];
      setTeachers(updated);
      localStorage.setItem(`bn_sandbox_teachers_${keySuffix}`, JSON.stringify(updated));
      setShowAddTeacherModal(false);
      setTForm({ name: '', subject: '', phone: '', email: '', qualification: '', experience: '', address: '', joining_date: '', exit_date: '', salary_amount: 3000.0, assigned_classes: '', gender: 'Male', aadhaar_number: '', pan_number: '', profile_image: '', documents: [] });
      showToast('Teacher profile added (Sandbox Mode)', 'success');
      return;
    }
    try {
      const res = await fetch('/api/teachers', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(finalForm)
      });
      if (res.ok) {
        setShowAddTeacherModal(false);
        await fetchERPData();
        setTForm({ name: '', subject: '', phone: '', email: '', qualification: '', experience: '', address: '', joining_date: '', exit_date: '', salary_amount: 3000.0, assigned_classes: '', gender: 'Male', aadhaar_number: '', pan_number: '', profile_image: '', documents: [] });
        showToast('Teacher profile added', 'success');
      } else {
        const errData = await res.json();
        alert(errData.detail || 'Failed to add teacher');
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to add teacher profile', 'error');
    }
  };

  const handleModifyTeacherStatus = async (teacherId, nextStatus) => {
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const updated = teachers.map(t => t.id === teacherId ? { ...t, status: nextStatus } : t);
      setTeachers(updated);
      localStorage.setItem(`bn_sandbox_teachers_${keySuffix}`, JSON.stringify(updated));
      if (selectedTeacher && selectedTeacher.id === teacherId) {
        setSelectedTeacher({ ...selectedTeacher, status: nextStatus });
      }
      showToast(`Teacher status changed to ${nextStatus} (Sandbox Mode)`, 'success');
      return;
    }
    try {
      const res = await fetch(`/api/teachers/${teacherId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        await fetchERPData();
        if (selectedTeacher && selectedTeacher.id === teacherId) {
          setSelectedTeacher({ ...selectedTeacher, status: nextStatus });
        }
        showToast(`Teacher status changed to ${nextStatus}`, 'success');
      }
    } catch (err) {
      const updated = teachers.map(t => t.id === teacherId ? { ...t, status: nextStatus } : t);
      setTeachers(updated);
      localStorage.setItem(`bn_sandbox_teachers_${keySuffix}`, JSON.stringify(updated));
      if (selectedTeacher && selectedTeacher.id === teacherId) {
        setSelectedTeacher({ ...selectedTeacher, status: nextStatus });
      }
      showToast(`Teacher status changed to ${nextStatus} (Sandbox Mode)`, 'success');
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const updated = teachers.filter(t => t.id !== teacherId);
      setTeachers(updated);
      localStorage.setItem(`bn_sandbox_teachers_${keySuffix}`, JSON.stringify(updated));
      setSelectedTeacher(null);
      showToast('Teacher profile deleted (Sandbox Mode)', 'success');
      return;
    }
    try {
      const res = await fetch(`/api/teachers/${teacherId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        setSelectedTeacher(null);
        await fetchERPData();
        showToast('Teacher profile deleted', 'success');
      }
    } catch (err) {
      const updated = teachers.filter(t => t.id !== teacherId);
      setTeachers(updated);
      localStorage.setItem(`bn_sandbox_teachers_${keySuffix}`, JSON.stringify(updated));
      setSelectedTeacher(null);
      showToast('Teacher profile deleted (Sandbox Mode)', 'success');
    }
  };

  const handleAddStudentSubmit = async (e) => {
    e.preventDefault();
    const activeYear = years.find(y => y.id === activeYearId);
    if (!editingStudent && activeYear && !activeYear.is_active) {
      setActionError("Students can only be admitted to active academic sessions.");
      setTimeout(() => setActionError(''), 4000);
      return;
    }

    // Validation
    const newErrors = {};
    if (!sForm.name) {
      newErrors.name = "Student Name is required.";
    }
    if (!sForm.roll_number) {
      newErrors.roll_number = "Roll Number is required.";
    }
    if (!sForm.sr_no) {
      newErrors.sr_no = "SR No. is required.";
    }
    if (!sForm.father_name) {
      newErrors.father_name = "Father's Name is required.";
    }
    if (!sForm.mother_name) {
      newErrors.mother_name = "Mother's Name is required.";
    }
    if (!sForm.admission_date) {
      newErrors.admission_date = "Admission Date is required.";
    }
    if (!sForm.date_of_birth) {
      newErrors.date_of_birth = "Date of Birth is required.";
    }
    if (!sForm.phone) {
      newErrors.phone = "Phone Number is required.";
    } else if (!isValidPhone(sForm.phone)) {
      newErrors.phone = "Phone Number must contain exactly 10 digits.";
    }
    if (!sForm.emergency_contact) {
      newErrors.emergency_contact = "Emergency Phone is required.";
    } else if (!isValidPhone(sForm.emergency_contact)) {
      newErrors.emergency_contact = "Emergency Phone must contain exactly 10 digits.";
    }
    if (sForm.email && !isValidEmail(sForm.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!sForm.aadhaar_number) {
      newErrors.aadhaar_number = "Aadhaar Number is required.";
    }
    if (!sForm.country) {
      newErrors.country = "Country is required.";
    }
    if (!sForm.state) {
      newErrors.state = "State is required.";
    }
    if (!sForm.city) {
      newErrors.city = "City is required.";
    }
    if (!sForm.address) {
      newErrors.address = "Home Address is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setSErrors(newErrors);
      return;
    }
    setSErrors({});

    const payload = { ...sForm, academic_year_id: activeYearId };
    const keySuffix = schoolId || 'default';

    setIsSavingStudent(true);
    if (token.includes('mock') || !isConnected) {
      if (!editingStudent && students.some(s => s.roll_number === sForm.roll_number && s.academic_year_id === activeYearId)) {
        setSErrors({ roll_number: "Roll Number already exists." });
        setIsSavingStudent(false);
        return;
      }
      setTimeout(() => {
        if (editingStudent) {
          const updatedStud = { ...editingStudent, ...sForm };
          const updated = students.map(s => s.id === editingStudent.id ? updatedStud : s);
          setStudents(updated);
          localStorage.setItem(`bn_sandbox_students_${keySuffix}`, JSON.stringify(updated));
          setSelectedStudent(updatedStud);
          setIsSavingStudent(false);
          setShowAddStudentModal(false);
          setEditingStudent(null);
          showToast('Student Updated Successfully', 'success');
        } else {
          const newS = { 
            id: students.length + 1, 
            ...sForm, 
            status: "Active", 
            academic_year_id: activeYearId
          };
          const updated = [...students, newS];
          setStudents(updated);
          localStorage.setItem(`bn_sandbox_students_${keySuffix}`, JSON.stringify(updated));
          setIsSavingStudent(false);
          setShowAddStudentModal(false);
          showToast('Student Added Successfully', 'success');
        }
      }, 800);
      return;
    }

    try {
      let res;
      if (editingStudent) {
        res = await fetch(`/api/students/${editingStudent.id}`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch('/api/students', {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(payload)
        });
      }

      setIsSavingStudent(false);
      if (res.ok) {
        setShowAddStudentModal(false);
        if (editingStudent) {
          const updatedStud = { ...editingStudent, ...payload };
          setSelectedStudent(updatedStud);
        }
        setEditingStudent(null);
        await fetchERPData();
        setSForm({
          name: '',
          roll_number: '',
          class_id: 1,
          group_name: '',
          gender: 'Male',
          phone: '',
          email: '',
          country: '',
          state: '',
          city: '',
          father_name: '',
          mother_name: '',
          address: '',
          date_of_birth: '',
          admission_date: '',
          emergency_contact: '',
          blood_group: '',
          aadhaar_number: '',
          nationality: 'Indian',
          caste: '',
          profile_image: '',
          documents: []
        });
        showToast(editingStudent ? 'Student Updated Successfully' : 'Student Added Successfully', 'success');
      } else {
        const err = await res.json();
        const msg = err.detail || 'Failed to process student request.';
        if (msg.toLowerCase().includes('roll')) {
          setSErrors({ roll_number: "Roll Number already exists." });
        } else {
          setActionError(msg);
        }
      }
    } catch (err) {
      if (!editingStudent && students.some(s => s.roll_number === sForm.roll_number && s.academic_year_id === activeYearId)) {
        setSErrors({ roll_number: "Roll Number already exists." });
        setIsSavingStudent(false);
        return;
      }
      setTimeout(() => {
        if (editingStudent) {
          const updatedStud = { ...editingStudent, ...sForm };
          const updated = students.map(s => s.id === editingStudent.id ? updatedStud : s);
          setStudents(updated);
          localStorage.setItem(`bn_sandbox_students_${keySuffix}`, JSON.stringify(updated));
          setSelectedStudent(updatedStud);
          setIsSavingStudent(false);
          setShowAddStudentModal(false);
          setEditingStudent(null);
          showToast('Student Updated Successfully', 'success');
        } else {
          const newS = { 
            id: students.length + 1, 
            ...sForm, 
            status: "Active", 
            academic_year_id: activeYearId
          };
          const updated = [...students, newS];
          setStudents(updated);
          localStorage.setItem(`bn_sandbox_students_${keySuffix}`, JSON.stringify(updated));
          setIsSavingStudent(false);
          setShowAddStudentModal(false);
          showToast('Student Added Successfully', 'success');
        }
      }, 800);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const updated = students.filter(s => s.id !== studentId);
      setStudents(updated);
      localStorage.setItem(`bn_sandbox_students_${keySuffix}`, JSON.stringify(updated));
      setSelectedStudent(null);
      showToast('Student deleted (Sandbox Mode)', 'success');
      return;
    }
    try {
      const res = await fetch(`/api/students/${studentId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        setSelectedStudent(null);
        await fetchERPData();
        showToast('Student deleted successfully', 'success');
      }
    } catch (err) {
      const updated = students.filter(s => s.id !== studentId);
      setStudents(updated);
      localStorage.setItem(`bn_sandbox_students_${keySuffix}`, JSON.stringify(updated));
      setSelectedStudent(null);
      showToast('Student deleted (Sandbox Mode)', 'success');
    }
  };

  const fetchTeacherSalaryRecords = async (teacherId) => {
    if (token.includes('mock') || !isConnected) {
      const keySuffix = schoolId || 'default';
      const storageKey = `bn_sandbox_salaries_${keySuffix}_${teacherId}_${activeYearId}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setTeacherSalaries(JSON.parse(stored));
        return;
      }

      const base = teachers.find(t => t.id === teacherId)?.salary_amount || 3000.0;
      const months = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];
      const defaultSalaries = months.map((m, i) => ({
        id: i + 1,
        teacher_id: teacherId,
        month: m,
        amount: base,
        status: i < 5 ? "Paid" : "Pending",
        payment_date: i < 5 ? `2025-${String(i+4).padStart(2, '0')}-05` : null
      }));
      setTeacherSalaries(defaultSalaries);
      localStorage.setItem(storageKey, JSON.stringify(defaultSalaries));
      return;
    }

    try {
      const res = await fetch(`/api/teachers/${teacherId}/salary?academic_year_id=${activeYearId}`, { headers: getHeaders() });
      if (res.ok) {
        setTeacherSalaries(await res.json());
      } else {
        throw new Error("Failed to fetch salary records");
      }
    } catch (err) {
      const base = teachers.find(t => t.id === teacherId)?.salary_amount || 3000.0;
      const months = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];
      setTeacherSalaries(months.map((m, i) => ({
        id: i + 1,
        teacher_id: teacherId,
        month: m,
        amount: base,
        status: i < 5 ? "Paid" : "Pending",
        payment_date: i < 5 ? `2025-${String(i+4).padStart(2, '0')}-05` : null
      })));
    }
  };

  const fetchStudentFeesRecords = async (studentId) => {
    const keySuffix = schoolId || 'default';
    const activeYear = years.find(y => y.id === activeYearId);
    const range = activeYear ? activeYear.year_range : '2025-2026';
    const [startYearStr, endYearStr] = range.split('-');
    const startYear = parseInt(startYearStr) || 2025;
    const endYear = parseInt(endYearStr) || 2026;

    if (token.includes('mock') || !isConnected) {
      const storageKey = `bn_sandbox_fees_${keySuffix}_${studentId}_${activeYearId}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setStudentFees(JSON.parse(stored));
        return;
      }

      const months = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];
      const classId = selectedStudent?.class_id || '';
      const sandboxClassFeesKey = `bn_sandbox_class_fees_${keySuffix}_${classId}_${activeYearId}`;
      const storedClassFees = localStorage.getItem(sandboxClassFeesKey);
      const feeStructure = storedClassFees ? JSON.parse(storedClassFees) : {
        April: 150, May: 150, June: 150, July: 150, August: 150, September: 150,
        October: 150, November: 150, December: 150, January: 150, February: 150, March: 150
      };
      const defaultFees = months.map((m, i) => {
        const year = i < 9 ? startYear : endYear;
        const monthNum = i < 9 ? i + 4 : i - 8;
        return {
          id: i + 1,
          student_id: studentId,
          month: m,
          amount: parseFloat(feeStructure[m]) || 150.00,
          status: "Pending",
          due_date: `${year}-${String(monthNum).padStart(2, '0')}-15`,
          payment_date: null
        };
      });
      setStudentFees(defaultFees);
      localStorage.setItem(storageKey, JSON.stringify(defaultFees));
      return;
    }

    try {
      const res = await fetch(`/api/students/${studentId}/fees?academic_year_id=${activeYearId}`, { headers: getHeaders() });
      if (res.ok) {
        setStudentFees(await res.json());
      } else {
        throw new Error("Failed to fetch fee records");
      }
    } catch (err) {
      const storageKey = `bn_sandbox_fees_${keySuffix}_${studentId}_${activeYearId}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setStudentFees(JSON.parse(stored));
        return;
      }
      const months = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];
      const classId = selectedStudent?.class_id || '';
      const sandboxClassFeesKey = `bn_sandbox_class_fees_${keySuffix}_${classId}_${activeYearId}`;
      const storedClassFees = localStorage.getItem(sandboxClassFeesKey);
      const feeStructure = storedClassFees ? JSON.parse(storedClassFees) : {
        April: 150, May: 150, June: 150, July: 150, August: 150, September: 150,
        October: 150, November: 150, December: 150, January: 150, February: 150, March: 150
      };
      const defaultFees = months.map((m, i) => {
        const year = i < 9 ? startYear : endYear;
        const monthNum = i < 9 ? i + 4 : i - 8;
        return {
          id: i + 1,
          student_id: studentId,
          month: m,
          amount: parseFloat(feeStructure[m]) || 150.00,
          status: "Pending",
          due_date: `${year}-${String(monthNum).padStart(2, '0')}-15`,
          payment_date: null
        };
      });
      setStudentFees(defaultFees);
      localStorage.setItem(storageKey, JSON.stringify(defaultFees));
    }
  };

  const processSalary = async (teacherId, month) => {
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const storageKey = `bn_sandbox_salaries_${keySuffix}_${teacherId}_${activeYearId}`;
      const current = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const updated = current.map(s => s.month === month ? { ...s, status: "Paid", payment_date: new Date().toISOString().split('T')[0] } : s);
      setTeacherSalaries(updated);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      await fetchERPData();
      showToast('Salary disbursed (Sandbox Mode)', 'success');
      return;
    }

    try {
      const res = await fetch(`/api/teachers/${teacherId}/salary/${month}/pay?academic_year_id=${activeYearId}`, {
        method: 'POST',
        headers: getHeaders()
      });
      if (res.ok) {
        await fetchTeacherSalaryRecords(teacherId);
        await fetchERPData();
        showToast('Salary disbursed successfully', 'success');
      } else {
        throw new Error("Failed to disburse salary");
      }
    } catch (err) {
      const storageKey = `bn_sandbox_salaries_${keySuffix}_${teacherId}_${activeYearId}`;
      const current = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const updated = current.map(s => s.month === month ? { ...s, status: "Paid", payment_date: new Date().toISOString().split('T')[0] } : s);
      setTeacherSalaries(updated);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      await fetchERPData();
      showToast('Salary disbursed (Sandbox Mode)', 'success');
    }
  };

  const processFeePayment = async (studentId, month) => {
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const storageKey = `bn_sandbox_fees_${keySuffix}_${studentId}_${activeYearId}`;
      const current = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const updated = current.map(f => f.month === month ? { ...f, status: "Paid", payment_date: new Date().toISOString().split('T')[0] } : f);
      setStudentFees(updated);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      await fetchERPData();
      showToast('Tuition fee payment recorded (Sandbox Mode)', 'success');
      return;
    }

    try {
      const res = await fetch(`/api/students/${studentId}/fees/${month}/pay?academic_year_id=${activeYearId}`, {
        method: 'POST',
        headers: getHeaders()
      });
      if (res.ok) {
        await fetchStudentFeesRecords(studentId);
        await fetchERPData();
        showToast('Tuition fee payment recorded', 'success');
      } else {
        throw new Error("Failed to record fee payment");
      }
    } catch (err) {
      const storageKey = `bn_sandbox_fees_${keySuffix}_${studentId}_${activeYearId}`;
      const current = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const updated = current.map(f => f.month === month ? { ...f, status: "Paid", payment_date: new Date().toISOString().split('T')[0] } : f);
      setStudentFees(updated);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      await fetchERPData();
      showToast('Fee payment recorded (Sandbox Mode)', 'success');
    }
  };

  const handleRevertFeePayment = (studentId, month) => {
    setUnpayConfirm({ studentId, month });
  };

  const executeRevertFeePayment = async (studentId, month) => {
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const storageKey = `bn_sandbox_fees_${keySuffix}_${studentId}_${activeYearId}`;
      const current = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const updated = current.map(f => f.month === month ? { ...f, status: "Pending", payment_date: null } : f);
      setStudentFees(updated);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      await fetchERPData();
      showToast('Fee status reverted to Unpaid (Sandbox Mode)', 'success');
      return;
    }

    try {
      const res = await fetch(`/api/students/${studentId}/fees/${month}/unpay?academic_year_id=${activeYearId}`, {
        method: 'POST',
        headers: getHeaders()
      });
      if (res.ok) {
        await fetchStudentFeesRecords(studentId);
        await fetchERPData();
        showToast('Fee status reverted to Unpaid', 'success');
      } else {
        throw new Error("Failed to revert payment");
      }
    } catch (err) {
      const storageKey = `bn_sandbox_fees_${keySuffix}_${studentId}_${activeYearId}`;
      const current = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const updated = current.map(f => f.month === month ? { ...f, status: "Pending", payment_date: null } : f);
      setStudentFees(updated);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      await fetchERPData();
      showToast('Fee status reverted to Unpaid (Sandbox Mode)', 'success');
    }
  };

  const fetchClassFeeStructure = async (classId) => {
    if (!classId) return;
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const storageKey = `bn_sandbox_class_fees_${keySuffix}_${classId}_${activeYearId}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setClassFeeStructure(JSON.parse(stored));
      } else {
        setClassFeeStructure({
          April: 150, May: 150, June: 150, July: 150, August: 150, September: 150,
          October: 150, November: 150, December: 150, January: 150, February: 150, March: 150
        });
      }
      return;
    }

    try {
      const res = await fetch(`/api/class-fees?class_id=${classId}&academic_year_id=${activeYearId}`, {
        headers: getHeaders()
      });
      if (res.ok) {
        setClassFeeStructure(await res.json());
      } else {
        setClassFeeStructure({
          April: 150, May: 150, June: 150, July: 150, August: 150, September: 150,
          October: 150, November: 150, December: 150, January: 150, February: 150, March: 150
        });
      }
    } catch (err) {
      setClassFeeStructure({
        April: 150, May: 150, June: 150, July: 150, August: 150, September: 150,
        October: 150, November: 150, December: 150, January: 150, February: 150, March: 150
      });
    }
  };

  const saveClassFeeStructure = async () => {
    if (!selectedFeeClassId) return;
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const storageKey = `bn_sandbox_class_fees_${keySuffix}_${selectedFeeClassId}_${activeYearId}`;
      localStorage.setItem(storageKey, JSON.stringify(classFeeStructure));
      showToast('Class fee structure saved successfully (Sandbox Mode)', 'success');
      return;
    }

    try {
      const res = await fetch('/api/class-fees', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          class_id: selectedFeeClassId,
          academic_year_id: activeYearId,
          fee_structure: classFeeStructure
        })
      });
      if (res.ok) {
        showToast('Class fee structure saved successfully', 'success');
      } else {
        showToast('Failed to save fee structure', 'danger');
      }
    } catch (err) {
      showToast('Failed to save fee structure', 'danger');
    }
  };

  useEffect(() => {
    if (selectedFeeClassId) {
      fetchClassFeeStructure(selectedFeeClassId);
    }
  }, [activeYearId]);

  // Helper getters
  const getActiveYearRange = () => {
    return years.find(y => y.id === activeYearId)?.year_range || 'Unknown';
  };
  
  const isCurrentYearActive = () => {
    return years.find(y => y.id === activeYearId)?.is_active || false;
  };

  const getClassName = (classId) => {
    return classes.find(c => c.id === parseInt(classId))?.name || 'Unassigned';
  };

  const getClassMonthlyFee = (classId) => {
    const keySuffix = schoolId || 'default';
    const sandboxClassFeesKey = `bn_sandbox_class_fees_${keySuffix}_${classId}_${activeYearId}`;
    const storedClassFees = localStorage.getItem(sandboxClassFeesKey);
    const feeStructure = storedClassFees ? JSON.parse(storedClassFees) : {
      April: 150, May: 150, June: 150, July: 150, August: 150, September: 150,
      October: 150, November: 150, December: 150, January: 150, February: 150, March: 150
    };
    return parseFloat(feeStructure.April) || 150.00;
  };

  const getStudentFeeStatus = (student) => {
    if (!student) return 'PAID';
    if (student.fee_status) {
      return student.fee_status;
    }
    
    const keySuffix = schoolId || 'default';
    const storageKey = `bn_sandbox_fees_${keySuffix}_${student.id}_${activeYearId}`;
    const stored = localStorage.getItem(storageKey);
    
    const months = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];
    let records = [];
    if (stored) {
      records = JSON.parse(stored);
    } else {
      const activeYear = years.find(y => y.id === activeYearId);
      const range = activeYear ? activeYear.year_range : '2025-2026';
      const [startYearStr, endYearStr] = range.split('-');
      const startYear = parseInt(startYearStr) || 2025;
      const endYear = parseInt(endYearStr) || 2026;
      
      const sandboxClassFeesKey = `bn_sandbox_class_fees_${keySuffix}_${student.class_id}_${activeYearId}`;
      const storedClassFees = localStorage.getItem(sandboxClassFeesKey);
      const feeStructure = storedClassFees ? JSON.parse(storedClassFees) : {
        April: 150, May: 150, June: 150, July: 150, August: 150, September: 150,
        October: 150, November: 150, December: 150, January: 150, February: 150, March: 150
      };
      records = months.map((m, i) => {
        const year = i < 9 ? startYear : endYear;
        const monthNum = i < 9 ? i + 4 : i - 8;
        return {
          month: m,
          status: "Pending",
          due_date: `${year}-${String(monthNum).padStart(2, '0')}-15`
        };
      });
    }
    
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    let pastUnpaidCount = 0;
    let isCurrentUnpaid = false;
    let totalUnpaid = 0;
    
    records.forEach(f => {
      if (f.status !== 'Paid') {
        totalUnpaid++;
        const [dueY, dueM] = f.due_date.split('-').map(Number);
        if (dueY < currentYear || (dueY === currentYear && dueM < currentMonth)) {
          pastUnpaidCount++;
        } else if (dueY === currentYear && dueM === currentMonth) {
          isCurrentUnpaid = true;
        }
      }
    });
    
    if (totalUnpaid === 0) return 'PAID';
    if (pastUnpaidCount === 0) {
      return isCurrentUnpaid ? 'DUES PENDING' : 'PAID';
    }
    if (pastUnpaidCount === 1) return 'PAYMENT OVERDUE';
    if (pastUnpaidCount === 2) return 'CRITICAL DUES';
    return 'FEE DEFAULT ALERT';
  };

  const getFeeStatusBadgeInfo = (statusStr) => {
    switch (statusStr) {
      case 'PAID':
        return { class: 'badge-success', label: 'PAID' };
      case 'DUES PENDING':
        return { class: 'badge-pending', label: 'DUES PENDING' };
      case 'PAYMENT OVERDUE':
        return { class: 'badge-overdue', label: 'PAYMENT OVERDUE' };
      case 'CRITICAL DUES':
        return { class: 'badge-critical', label: 'CRITICAL DUES' };
      case 'FEE DEFAULT ALERT':
        return { class: 'badge-default-alert', label: 'FEE DEFAULT ALERT' };
      default:
        return { class: 'badge-secondary', label: statusStr || 'UNKNOWN' };
    }
  };

  const filteredTeachers = teachers.filter(t => {
    const matchesSubject = subjectFilter === 'all' || t.subject.toLowerCase() === subjectFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || t.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.phone && t.phone.includes(searchQuery));
    return matchesSubject && matchesStatus && matchesSearch;
  });

  const getDuesReport = () => {
    return students.map(s => {
      const keySuffix = schoolId || 'default';
      const storageKey = `bn_sandbox_fees_${keySuffix}_${s.id}_${activeYearId}`;
      const stored = localStorage.getItem(storageKey);
      
      let unpaidDues = 0;
      if (stored) {
        const records = JSON.parse(stored);
        records.forEach(r => {
          if (r.status !== 'Paid') {
            unpaidDues += parseFloat(r.amount) || 0;
          }
        });
      } else {
        const activeYear = years.find(y => y.id === activeYearId);
        const range = activeYear ? activeYear.year_range : '2025-2026';
        const [startYearStr, endYearStr] = range.split('-');
        const startYear = parseInt(startYearStr) || 2025;
        const endYear = parseInt(endYearStr) || 2026;
        
        const sandboxClassFeesKey = `bn_sandbox_class_fees_${keySuffix}_${s.class_id}_${activeYearId}`;
        const storedClassFees = localStorage.getItem(sandboxClassFeesKey);
        const feeStructure = storedClassFees ? JSON.parse(storedClassFees) : {
          April: 150, May: 150, June: 150, July: 150, August: 150, September: 150,
          October: 150, November: 150, December: 150, January: 150, February: 150, March: 150
        };
        
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;
        const months = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];
        
        months.forEach((m, i) => {
          const year = i < 9 ? startYear : endYear;
          const monthNum = i < 9 ? i + 4 : i - 8;
          if (year < currentYear || (year === currentYear && monthNum <= currentMonth)) {
            unpaidDues += parseFloat(feeStructure[m]) || 150.00;
          }
        });
      }
      
      return {
        name: s.name,
        roll: s.roll_number,
        class: getClassName(s.class_id),
        dues: unpaidDues
      };
    }).filter(r => r.dues > 0);
  };

  const getTotalPendingDuesAmount = () => {
    return getDuesReport().reduce((sum, r) => sum + r.dues, 0);
  };

  const getTotalPaidRevenueAmount = () => {
    const keySuffix = schoolId || 'default';
    let totalPaid = 0;
    students.forEach(s => {
      const storageKey = `bn_sandbox_fees_${keySuffix}_${s.id}_${activeYearId}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const records = JSON.parse(stored);
        records.forEach(r => {
          if (r.status === 'Paid') {
            totalPaid += parseFloat(r.amount) || 0;
          }
        });
      }
    });
    return totalPaid;
  };

  const getDynamicFeeCollectionChartData = () => {
    const keySuffix = schoolId || 'default';
    const months = ["April", "May", "June", "July", "August", "September"];
    const chartData = months.map(m => ({ month: m, amount: 0 }));
    
    students.forEach(s => {
      const storageKey = `bn_sandbox_fees_${keySuffix}_${s.id}_${activeYearId}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const records = JSON.parse(stored);
        records.forEach(r => {
          if (r.status === 'Paid') {
            const chartMonth = chartData.find(c => c.month === r.month);
            if (chartMonth) {
              chartMonth.amount += parseFloat(r.amount) || 0;
            }
          }
        });
      }
    });
    return chartData;
  };

  const getDynamicSalaryChartData = () => {
    const keySuffix = schoolId || 'default';
    const months = ["April", "May", "June", "July", "August", "September"];
    const chartData = months.map(m => ({ month: m, amount: 0 }));
    
    teachers.forEach(t => {
      const storageKey = `bn_sandbox_salaries_${keySuffix}_${t.id}_${activeYearId}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const records = JSON.parse(stored);
        records.forEach(r => {
          if (r.status === 'Paid') {
            const chartMonth = chartData.find(c => c.month === r.month);
            if (chartMonth) {
              chartMonth.amount += parseFloat(r.amount) || 0;
            }
          }
        });
      }
    });
    return chartData;
  };

  const downloadExperienceLetterDoc = (teacher) => {
    if (!teacher) return;
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const refNum = `BN/EXP/${new Date().getFullYear()}/${String(teacher.id).padStart(3, '0')}`;
    const subject = teacher.subject || 'Teaching';
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>Experience Certificate</title>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; padding: 40px; color: #000000; }
        .header { text-align: center; margin-bottom: 40px; }
        .title { text-align: center; font-size: 18pt; font-weight: bold; text-decoration: underline; margin-bottom: 30px; }
        .content { font-size: 12pt; text-align: justify; margin-bottom: 40px; }
        .signature { margin-top: 50px; }
      </style>
      </head>
      <body>
        <div class="header">
          <h1>BN SCHOOL</h1>
          <p>Official School Administration</p>
        </div>
        <p><strong>Date:</strong> ${dateStr}</p>
        <p><strong>Reference:</strong> ${refNum}</p>
        <br/>
        <div class="title">EXPERIENCE CERTIFICATE</div>
        <br/>
        <div class="content">
          <p><strong>TO WHOM IT MAY CONCERN</strong></p>
          <br/>
          <p>This is to certify that <strong>${teacher.name}</strong> was employed with BN School as a Teacher from <strong>${teacher.joining_date || 'N/A'}</strong> to <strong>${teacher.exit_date || 'N/A'}</strong>.</p>
          <p>During their tenure, they taught the subject of <strong>"${subject}"</strong> and demonstrated outstanding pedagogical skills, dedication, and professional ethics. Their conduct and behavior were exemplary.</p>
          <p>We appreciate their valuable contributions to our institution and wish them all the success in their future endeavors.</p>
        </div>
        <div class="signature">
          <p>Sincerely,</p>
          <br/><br/>
          <p>_______________________</p>
          <p><strong>Authorized Signatory</strong></p>
          <p>BN School Administration</p>
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Experience_Letter_${teacher.name.replace(/\\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUpdateStudentDocuments = async (studentId, updatedDocs) => {
    if (token.includes('mock') || !isConnected) {
      const keySuffix = schoolId || 'default';
      const updated = students.map(s => {
        if (s.id === studentId) {
          const updatedStud = { ...s, documents: updatedDocs };
          setSelectedStudent(updatedStud);
          return updatedStud;
        }
        return s;
      });
      setStudents(updated);
      localStorage.setItem(`bn_sandbox_students_${keySuffix}`, JSON.stringify(updated));
      showToast('Documents updated (Sandbox Mode)', 'success');
      return;
    }

    try {
      const targetStudent = students.find(s => s.id === studentId);
      if (!targetStudent) return;
      const payload = {
        ...targetStudent,
        documents: updatedDocs
      };
      
      const res = await fetch(`/api/students/${studentId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSelectedStudent(prev => ({ ...prev, documents: updatedDocs }));
        await fetchERPData();
        showToast('Documents updated successfully', 'success');
      } else {
        showToast('Failed to update student documents', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error updating student documents', 'error');
    }
  };

  const getDefaultersCount = () => {
    let pending = 0;
    let overdue = 0;
    let critical = 0;
    let alert = 0;
    students.forEach(s => {
      const status = getStudentFeeStatus(s);
      if (status === 'DUES PENDING') pending++;
      else if (status === 'PAYMENT OVERDUE') overdue++;
      else if (status === 'CRITICAL DUES') critical++;
      else if (status === 'FEE DEFAULT ALERT') alert++;
    });
    return { pending, overdue, critical, alert };
  };

  const handlePrintReceipt = (student, record) => {
    setReceiptStudent(student);
    setReceiptRecord(record);
  };

  const handleDownloadPDF = () => {
    if (!receiptStudent || !receiptRecord) return;
    const element = document.getElementById('receipt-print-area');
    if (!element) return;
    
    const opt = {
      margin:       10,
      filename:     `receipt-${receiptStudent.name.replace(/\s+/g, '_')}-${receiptRecord.month}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    if (window.html2pdf) {
      window.html2pdf().from(element).set(opt).save();
    } else {
      showToast('PDF download library loading, please try again in a moment', 'warning');
    }
  };

  // --- RENDERING LAYER ---

  // 1. Initial verification loading state
  if (isInitializing) {
    return (
      <div className={`app-layout ${isDarkMode ? 'dark-theme' : ''}`} style={{ background: 'var(--bg-app)', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', display: 'flex' }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <RefreshCw className="animate-spin" size={48} style={{ color: 'var(--color-primary)' }} />
          <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Verifying session...</span>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated Login Views
  if (!token) {
    const isSuperAdminLoginPage = currentPath === '/super-admin';
    return (
      <div className={`app-layout ${isDarkMode ? 'dark-theme' : ''}`} style={{ background: 'var(--bg-app)', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', display: 'flex' }}>
        
        {toast && (
          <div className="toast-in-out" style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 100005,
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: toast.type === 'success' ? '#10b981' : '#ef4444',
            color: '#ffffff',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.9rem',
            fontWeight: 600
          }}>
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
            <span>{toast.message}</span>
          </div>
        )}

        <div className="erp-card fade-in" style={{ width: '100%', maxWidth: '420px', padding: '40px 32px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              background: forgotPasswordStep > 0
                ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
                : isSuperAdminLoginPage
                  ? 'linear-gradient(135deg, var(--color-secondary) 0%, #ec4899 100%)'
                  : 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
              padding: '12px', borderRadius: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 0 20px rgba(59,130,246,0.3)'
            }}>
              {forgotPasswordStep === 1 && <Key size={36} color="white" />}
              {forgotPasswordStep === 2 && <Shield size={36} color="white" />}
              {forgotPasswordStep === 3 && <Lock size={36} color="white" />}
              {forgotPasswordStep === 0 && (isSuperAdminLoginPage ? <Sliders size={36} color="white" /> : <GraduationCap size={36} color="white" />)}
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              {forgotPasswordStep === 1 && 'Forgot Password'}
              {forgotPasswordStep === 2 && 'Verify OTP'}
              {forgotPasswordStep === 3 && 'Reset Password'}
              {forgotPasswordStep === 0 && (isSuperAdminLoginPage ? 'Super Admin Portal' : 'BN College Portal')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
              {forgotPasswordStep === 1 && 'Enter your registered email address.'}
              {forgotPasswordStep === 2 && 'Enter the 4-digit code sent to your email.'}
              {forgotPasswordStep === 3 && 'Enter and confirm your new password.'}
              {forgotPasswordStep === 0 && (isSuperAdminLoginPage ? 'Platform Administration Log-in' : 'Administrative Sign-in Required')}
            </p>
          </div>

          {/* Error & Success Messages */}
          {forgotPasswordStep > 0 && forgotError && (
            <div style={{
              padding: '10px 12px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', fontSize: '0.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <AlertTriangle size={14} />
              <span>{forgotError}</span>
            </div>
          )}

          {forgotPasswordStep > 0 && forgotSuccess && (
            <div style={{
              padding: '10px 12px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)', color: '#34d399', fontSize: '0.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <CheckCircle2 size={14} />
              <span>{forgotSuccess}</span>
            </div>
          )}

          {forgotPasswordStep === 0 && loginError && (
            <div style={{
              padding: '10px 12px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', fontSize: '0.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <AlertTriangle size={14} />
              <span>{loginError}</span>
            </div>
          )}

          {/* Step 0: Login Form */}
          {forgotPasswordStep === 0 && (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                  <input 
                    id="login-email"
                    type="email" 
                    placeholder="Email Address" 
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    className="erp-input"
                    style={{ paddingLeft: '40px' }}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                  <input 
                    id="login-password"
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Password" 
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="erp-input"
                    style={{ paddingLeft: '40px', paddingRight: '40px' }}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    id="password-visibility-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: '12px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>

                {!isSuperAdminLoginPage && (
                  <div style={{ textAlign: 'right', marginTop: '8px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotPasswordStep(1);
                        setForgotError('');
                        setForgotSuccess('');
                        setForgotEmail('');
                        setForgotOtp('');
                      }}
                      style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}
              </div>

              <button 
                id="btn-login-submit" 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '10px', background: isSuperAdminLoginPage ? 'linear-gradient(135deg, var(--color-secondary) 0%, #ec4899 100%)' : 'var(--color-primary)' }}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RefreshCw className="animate-spin" size={18} />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          )}

          {/* Step 1: Forgot Password (Email submission) */}
          {forgotPasswordStep === 1 && (
            <form onSubmit={handleForgotPasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                  <input 
                    id="forgot-email"
                    type="email" 
                    placeholder="Registered Email Address" 
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="erp-input"
                    style={{ paddingLeft: '40px' }}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <button 
                id="btn-forgot-submit" 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '10px', background: 'var(--color-primary)' }}
                disabled={isForgotLoading}
              >
                {isForgotLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RefreshCw className="animate-spin" size={18} />
                    <span>Sending OTP...</span>
                  </div>
                ) : (
                  'Send OTP'
                )}
              </button>

              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setForgotPasswordStep(0);
                    setForgotError('');
                    setForgotSuccess('');
                  }}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Verify OTP */}
          {forgotPasswordStep === 2 && (
            <form onSubmit={handleVerifyOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input 
                    id="forgot-otp"
                    type="text" 
                    placeholder="Enter 4-Digit OTP" 
                    maxLength={4}
                    value={forgotOtp}
                    onChange={(e) => setForgotOtp(e.target.value.replace(/\D/g, ''))}
                    className="erp-input"
                    style={{ letterSpacing: '4px', fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center' }}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <button 
                id="btn-verify-otp-submit" 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '10px', background: 'var(--color-primary)' }}
                disabled={isForgotLoading}
              >
                {isForgotLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RefreshCw className="animate-spin" size={18} />
                    <span>Verifying OTP...</span>
                  </div>
                ) : (
                  'Verify OTP'
                )}
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setForgotPasswordStep(1);
                    setForgotError('');
                    setForgotSuccess('');
                  }}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Back to Email
                </button>
                
                <button
                  type="button"
                  onClick={handleForgotPasswordSubmit}
                  style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                  disabled={isForgotLoading}
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Reset Password */}
          {forgotPasswordStep === 3 && (
            <form onSubmit={handleResetPasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                  <input 
                    id="reset-new-password"
                    type={showNewPassword ? 'text' : 'password'} 
                    placeholder="New Password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="erp-input"
                    style={{ paddingLeft: '40px', paddingRight: '40px' }}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    id="new-password-visibility-toggle"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{
                      position: 'absolute', right: '12px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                  <input 
                    id="reset-confirm-password"
                    type={showConfirmNewPassword ? 'text' : 'password'} 
                    placeholder="Confirm Password" 
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="erp-input"
                    style={{ paddingLeft: '40px', paddingRight: '40px' }}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    id="confirm-password-visibility-toggle"
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    style={{
                      position: 'absolute', right: '12px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    {showConfirmNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <button 
                id="btn-reset-password-submit" 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '10px', background: 'var(--color-primary)' }}
                disabled={isForgotLoading}
              >
                {isForgotLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RefreshCw className="animate-spin" size={18} />
                    <span>Resetting Password...</span>
                  </div>
                ) : (
                  'Reset Password'
                )}
              </button>

              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setForgotPasswordStep(0);
                    setForgotError('');
                    setForgotSuccess('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                  }}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel & Login
                </button>
              </div>
            </form>
          )}

          {forgotPasswordStep === 0 && isSuperAdminLoginPage && (
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button
                onClick={() => {
                  window.history.replaceState({}, '', '/login');
                  setCurrentPath('/login');
                  setLoginError('');
                }}
                className="btn-outline"
                style={{ fontSize: '0.8rem', padding: '6px 12px' }}
              >
                Go to School Portal
              </button>
            </div>
          )}

        </div>
      </div>
    );
  }

  // 3. School Admin First-Login Setup Wizard
  if (role === 'School Admin' && setupCompleted === 0) {
    return (
      <div className={`app-layout ${isDarkMode ? 'dark-theme' : ''}`} style={{ background: 'var(--bg-app)', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', display: 'flex' }}>
        <div className="erp-card fade-in" style={{ width: '100%', maxWidth: '550px', padding: '40px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sparkles className="animate-pulse" size={24} style={{ color: 'var(--color-primary)' }} />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>First-Login Setup Wizard</h2>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginLeft: 'auto' }}>Step {wizardStep} of 5</span>
          </div>

          <form onSubmit={handleWizardSubmit}>
            
            {/* Step 1: School Identity */}
            {wizardStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Step 1: School Identity</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Enter the official name of the school or college campus to update platform headings.</p>
                <div>
                  <label htmlFor="wizard-name" className="form-label" style={{ marginBottom: '6px', display: 'block' }}>Official School Name</label>
                  <input 
                    id="wizard-name"
                    type="text" 
                    placeholder="e.g. Lincoln High School" 
                    value={wizardForm.name} 
                    onChange={(e) => setWizardForm({ ...wizardForm, name: e.target.value })} 
                    className="erp-input"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Brand Identity */}
            {wizardStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Step 2: Brand Identity</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Choose a brand crest or logo representing the academic institution.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {logoChoices.map((choice, i) => (
                    <div 
                      key={i} 
                      onClick={() => setWizardForm({ ...wizardForm, logo_path: choice.url })}
                      style={{
                        padding: '12px',
                        border: '2px solid ' + (wizardForm.logo_path === choice.url ? 'var(--color-primary)' : 'var(--border-color)'),
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: wizardForm.logo_path === choice.url ? 'rgba(59,130,246,0.05)' : 'transparent'
                      }}
                    >
                      <img src={choice.url} alt={choice.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '50%', marginBottom: '8px' }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block' }}>{choice.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {wizardStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Step 3: Location</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Provide the physical address of the school or college campus.</p>
                <div>
                  <label htmlFor="wizard-address" className="form-label" style={{ marginBottom: '6px', display: 'block' }}>Physical Address</label>
                  <textarea 
                    id="wizard-address"
                    rows="3"
                    placeholder="e.g. 101 Education Way, New York, NY 10001" 
                    value={wizardForm.address} 
                    onChange={(e) => setWizardForm({ ...wizardForm, address: e.target.value })} 
                    className="erp-input"
                    style={{ resize: 'none' }}
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 4: Contact Point */}
            {wizardStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Step 4: Contact Information</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Provide contact points for administrative settings.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label htmlFor="wizard-person" className="form-label" style={{ marginBottom: '6px', display: 'block' }}>Contact Person Name</label>
                    <input 
                      id="wizard-person"
                      type="text" 
                      placeholder="e.g. Principal John Doe" 
                      value={wizardForm.contact_person} 
                      onChange={(e) => setWizardForm({ ...wizardForm, contact_person: e.target.value })} 
                      className="erp-input"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="wizard-phone" className="form-label" style={{ marginBottom: '6px', display: 'block' }}>Contact Phone Number</label>
                    <input 
                      id="wizard-phone"
                      type="text" 
                      placeholder="e.g. +1 (555) 019-9988" 
                      value={wizardForm.contact_number} 
                      onChange={(e) => setWizardForm({ ...wizardForm, contact_number: e.target.value })} 
                      className="erp-input"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review & Initialize */}
            {wizardStep === 5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Step 5: Review & Save</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Confirm that the settings are correct before launching the ERP portal.</p>
                <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(2, 6, 23, 0.4)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div><strong>School Name:</strong> {wizardForm.name || 'N/A'}</div>
                  <div><strong>Contact Person:</strong> {wizardForm.contact_person || 'N/A'} ({wizardForm.contact_number})</div>
                  <div><strong>Address:</strong> {wizardForm.address || 'N/A'}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                    <strong>Logo Selected:</strong>
                    <img src={wizardForm.logo_path} alt="Logo" style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '50%' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Wizard Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              {wizardStep > 1 ? (
                <button 
                  type="button" 
                  onClick={() => setWizardStep(wizardStep - 1)} 
                  className="btn-outline" 
                  style={{ padding: '8px 16px' }}
                >
                  Back
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={clearSession} 
                  className="btn-outline" 
                  style={{ padding: '8px 16px', color: '#ef4444', borderColor: '#ef4444' }}
                >
                  Cancel
                </button>
              )}

              {wizardStep < 5 ? (
                <button 
                  type="button" 
                  onClick={() => {
                    if (wizardStep === 1 && !wizardForm.name) return alert("School name is required");
                    if (wizardStep === 3 && !wizardForm.address) return alert("Address is required");
                    if (wizardStep === 4) {
                      if (!wizardForm.contact_person || !wizardForm.contact_number) {
                        return alert("Contact information is required");
                      }
                      if (!isValidPhone(wizardForm.contact_number)) {
                        return alert("Phone Number must contain exactly 10 digits.");
                      }
                    }
                    setWizardStep(wizardStep + 1);
                  }}
                  className="btn-primary" 
                  style={{ padding: '8px 20px' }}
                >
                  Continue
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ padding: '8px 20px' }}
                  disabled={loading}
                >
                  {loading ? 'Initializing ERP...' : 'Finish Setup & Launch'}
                </button>
              )}
            </div>
          </form>

        </div>
      </div>
    );
  }

  // --- ADMIN PROFILE ACTIONS ---

  const fetchProfileData = async () => {
    if (!token) return;
    
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const stored = localStorage.getItem(`bn_sandbox_profile_${keySuffix}`);
      if (stored) {
        const prof = JSON.parse(stored);
        setAdminProfile(prof);
        setAdminProfileForm(prof);
        return;
      } else {
        const schoolNameVal = role === 'Super Admin' ? 'Platform Administration' : (schoolName || 'St. Xavier\'s International School');
        const emailVal = role === 'Super Admin' ? 'Bilal@yopmail.com' : 'Admin@yopmail.com';
        const nameVal = role === 'Super Admin' ? 'Bilal Ahmed' : 'School Admin';
        const defaultProf = {
          id: 0,
          name: nameVal,
          email: emailVal,
          phone: '8650302499',
          address: '123 Main Street',
          city: 'Lucknow',
          state: 'Uttar Pradesh',
          country: 'India',
          timezone: 'Asia/Kolkata',
          profile_image: null,
          role: role,
          created_at: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString().replace('T', ' ').substring(0, 19),
          last_login_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
          school_name: schoolNameVal,
          school_email: role === 'Super Admin' ? 'support@bncollegeportal.com' : 'xavier.admin@xavier.edu',
          school_phone: role === 'Super Admin' ? '9876543210' : '+1 (555) 019-8833',
          school_address: role === 'Super Admin' ? '123 Main St' : '123 School Lane',
          school_city: role === 'Super Admin' ? 'Lucknow' : 'Lucknow',
          school_state: role === 'Super Admin' ? 'Uttar Pradesh' : 'Uttar Pradesh',
          school_country: role === 'Super Admin' ? 'India' : 'India'
        };
        setAdminProfile(defaultProf);
        setAdminProfileForm(defaultProf);
        localStorage.setItem(`bn_sandbox_profile_${keySuffix}`, JSON.stringify(defaultProf));
        return;
      }
    }
    
    try {
      const res = await fetch('/api/profile', { headers: getHeaders() });
      if (res.ok) {
        const prof = await res.json();
        setAdminProfile(prof);
        setAdminProfileForm({
          name: prof.name || '',
          email: prof.email || '',
          phone: prof.phone || '',
          address: prof.address || '',
          city: prof.city || '',
          state: prof.state || '',
          country: prof.country || '',
          timezone: prof.timezone || 'Asia/Kolkata',
          profile_image: prof.profile_image || ''
        });
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  };

  useEffect(() => {
    if (token && !isInitializing) {
      fetchProfileData();
    }
  }, [token, isInitializing]);

  const saveProfilePhoto = async (photoBase64) => {
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const updated = {
        ...adminProfile,
        profile_image: photoBase64
      };
      setAdminProfile(updated);
      localStorage.setItem(`bn_sandbox_profile_${keySuffix}`, JSON.stringify(updated));
      showToast('Profile photo updated (Sandbox)', 'success');
      return;
    }
    
    try {
      const formPayload = {
        name: adminProfile?.name || 'Administrator',
        email: adminProfile?.email || username,
        phone: adminProfile?.phone || '',
        address: adminProfile?.address || '',
        city: adminProfile?.city || '',
        state: adminProfile?.state || '',
        country: adminProfile?.country || '',
        timezone: adminProfile?.timezone || 'Asia/Kolkata',
        profile_image: photoBase64
      };
      
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(formPayload)
      });
      if (res.ok) {
        setAdminProfile(prev => ({ ...prev, profile_image: photoBase64 }));
        showToast('Profile photo updated', 'success');
      }
    } catch (err) {
      console.error(err);
      showToast('Error updating profile photo', 'error');
    }
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB limit.");
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setAdminProfileForm(prev => ({ ...prev, profile_image: reader.result }));
      saveProfilePhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveProfilePhoto = () => {
    saveProfilePhoto(null);
    setAdminProfileForm(prev => ({ ...prev, profile_image: null }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    const errors = {};
    if (!adminProfileForm.name) errors.name = "Full Name is required.";
    if (!adminProfileForm.email) {
      errors.email = "Email Address is required.";
    } else if (!isValidEmail(adminProfileForm.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (adminProfileForm.phone) {
      if (!/^\d{10}$/.test(adminProfileForm.phone)) {
        errors.phone = "Phone Number must contain exactly 10 digits.";
      }
    }
    
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      return;
    }
    
    setProfileErrors({});
    setIsSavingProfile(true);
    
    const keySuffix = schoolId || 'default';
    if (token.includes('mock') || !isConnected) {
      const updated = {
        ...adminProfile,
        ...adminProfileForm
      };
      setAdminProfile(updated);
      localStorage.setItem(`bn_sandbox_profile_${keySuffix}`, JSON.stringify(updated));
      setIsSavingProfile(false);
      showToast('Profile updated (Sandbox Mode)', 'success');
      setProfileSubTab('details');
      return;
    }
    
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(adminProfileForm)
      });
      if (res.ok) {
        const resProf = await fetch('/api/profile', { headers: getHeaders() });
        if (resProf.ok) {
          const prof = await resProf.json();
          setAdminProfile(prof);
          if (username === adminProfile.email) {
            setUsername(prof.email);
          }
        }
        showToast('Profile updated successfully', 'success');
        setProfileSubTab('details');
      } else {
        const err = await res.json();
        alert(err.detail || 'Failed to update profile.');
      }
    } catch (err) {
      console.error(err);
      showToast('Error updating profile', 'error');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    
    const errors = {};
    if (!passwordForm.current_password) errors.current_password = "Current Password is required.";
    
    const np = passwordForm.new_password;
    if (!np) {
      errors.new_password = "New Password is required.";
    } else {
      if (np.length < 8) {
        errors.new_password = "Must be at least 8 characters long.";
      } else if (!/[A-Z]/.test(np)) {
        errors.new_password = "Must contain at least one uppercase letter.";
      } else if (!/[a-z]/.test(np)) {
        errors.new_password = "Must contain at least one lowercase letter.";
      } else if (!/[0-9]/.test(np)) {
        errors.new_password = "Must contain at least one number.";
      } else if (!/[!@#$%^&*()_+={}\[\]|\\\\:;\"\'<>,.?\/~`\-]/.test(np)) {
        errors.new_password = "Must contain at least one special character.";
      }
    }
    
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      errors.confirm_password = "Passwords do not match.";
    }
    
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }
    
    setPasswordErrors({});
    setIsSavingPassword(true);
    
    if (token.includes('mock') || !isConnected) {
      setIsSavingPassword(false);
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
      showToast('Password updated (Sandbox Mode)', 'success');
      setProfileSubTab('details');
      return;
    }
    
    try {
      const res = await fetch('/api/profile/password', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(passwordForm)
      });
      if (res.ok) {
        showToast('Password changed successfully!', 'success');
        setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
        setProfileSubTab('details');
      } else {
        const err = await res.json();
        alert(err.detail || 'Failed to update password.');
      }
    } catch (err) {
      console.error(err);
      showToast('Error changing password', 'error');
    } finally {
      setIsSavingPassword(false);
    }
  };

  const renderAdminProfileTab = () => {
    return (
      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={22} className="gradient-text" /> Admin Profile Management
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '24px', alignItems: 'flex-start' }}>
          {/* Left Card: Avatar & Brief Info */}
          <div className="erp-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
              {adminProfileForm.profile_image ? (
                <img 
                  src={adminProfileForm.profile_image} 
                  alt="Profile Avatar" 
                  style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-primary)' }} 
                />
              ) : (
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '3px solid var(--border-color)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--text-muted)'
                }}>
                  <User size={64} />
                </div>
              )}
            </div>
            
            {/* Photo Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button 
                  type="button" 
                  className="btn-outline" 
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  onClick={() => document.getElementById('admin-avatar-upload').click()}
                >
                  Upload Photo
                </button>
                <input 
                  id="admin-avatar-upload" 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg" 
                  style={{ display: 'none' }} 
                  onChange={handleProfilePhotoChange} 
                />
                {adminProfileForm.profile_image && (
                  <button 
                    type="button" 
                    className="btn-outline" 
                    style={{ padding: '6px 12px', fontSize: '0.8rem', borderColor: '#ef4444', color: '#ef4444' }}
                    onClick={handleRemoveProfilePhoto}
                  >
                    Remove
                  </button>
                )}
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Max file size: 2MB (PNG/JPG)</span>
            </div>

            <div style={{ width: '100%', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{adminProfile?.name || 'Administrator'}</h4>
              <span className="badge badge-success" style={{ marginTop: '8px' }}>
                {adminProfile?.role === 'Super Admin' ? 'Super Admin' : 'Administrator'}
              </span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Clock size={12} /> {adminProfile?.timezone || 'Asia/Kolkata'}
              </p>
            </div>
          </div>

          {/* Right Card: Tab views */}
          <div className="erp-card" style={{ padding: '0', overflow: 'hidden' }}>
            {/* Sub-tabs header */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)', padding: '0 16px' }}>
              <button 
                type="button"
                className={`profile-tab ${profileSubTab === 'details' ? 'active' : ''}`}
                onClick={() => setProfileSubTab('details')}
              >
                Profile Details
              </button>
              <button 
                type="button"
                className={`profile-tab ${profileSubTab === 'edit' ? 'active' : ''}`}
                onClick={() => {
                  setProfileSubTab('edit');
                  setAdminProfileForm({
                    name: adminProfile?.name || '',
                    email: adminProfile?.email || '',
                    phone: adminProfile?.phone || '',
                    address: adminProfile?.address || '',
                    city: adminProfile?.city || '',
                    state: adminProfile?.state || '',
                    country: adminProfile?.country || '',
                    timezone: adminProfile?.timezone || 'Asia/Kolkata',
                    profile_image: adminProfile?.profile_image || ''
                  });
                  setProfileErrors({});
                }}
              >
                Edit Profile
              </button>
              <button 
                type="button"
                className={`profile-tab ${profileSubTab === 'password' ? 'active' : ''}`}
                onClick={() => {
                  setProfileSubTab('password');
                  setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
                  setPasswordErrors({});
                }}
              >
                Change Password
              </button>
            </div>

            {/* Sub-tab content body */}
            <div style={{ padding: '24px' }}>
              {profileSubTab === 'details' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h4 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Personal Information</h4>
                  <div className="profile-detail-grid">
                    <div className="profile-detail-item">
                      <span className="profile-detail-label">Full Name</span>
                      <span className="profile-detail-value">{adminProfile?.name || 'N/A'}</span>
                    </div>
                    <div className="profile-detail-item">
                      <span className="profile-detail-label">Email Address</span>
                      <span className="profile-detail-value">{adminProfile?.email || 'N/A'}</span>
                    </div>
                    <div className="profile-detail-item">
                      <span className="profile-detail-label">Phone Number</span>
                      <span className="profile-detail-value">{adminProfile?.phone || 'N/A'}</span>
                    </div>
                    <div className="profile-detail-item">
                      <span className="profile-detail-label">Designation</span>
                      <span className="profile-detail-value">{adminProfile?.role === 'Super Admin' ? 'Super Admin' : 'Administrator'}</span>
                    </div>
                    <div className="profile-detail-item" style={{ gridColumn: 'span 2' }}>
                      <span className="profile-detail-label">Address</span>
                      <span className="profile-detail-value">
                        {[adminProfile?.address, adminProfile?.city, adminProfile?.state, adminProfile?.country].filter(Boolean).join(', ') || 'N/A'}
                      </span>
                    </div>
                    <div className="profile-detail-item">
                      <span className="profile-detail-label">Time Zone</span>
                      <span className="profile-detail-value">{adminProfile?.timezone || 'Asia/Kolkata'}</span>
                    </div>
                    <div className="profile-detail-item">
                      <span className="profile-detail-label">Account Created</span>
                      <span className="profile-detail-value">{adminProfile?.created_at || 'N/A'}</span>
                    </div>
                    <div className="profile-detail-item">
                      <span className="profile-detail-label">Last Login Date</span>
                      <span className="profile-detail-value">{adminProfile?.last_login_at || 'N/A'}</span>
                    </div>
                  </div>

                  {adminProfile?.role === 'School Admin' && (
                    <>
                      <h4 style={{ fontSize: '1.05rem', margin: '16px 0 0 0', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>School Tenant Details</h4>
                      <div className="profile-detail-grid">
                        <div className="profile-detail-item">
                          <span className="profile-detail-label">School Name</span>
                          <span className="profile-detail-value">{adminProfile?.school_name || 'N/A'}</span>
                        </div>
                        <div className="profile-detail-item">
                          <span className="profile-detail-label">School Email</span>
                          <span className="profile-detail-value">{adminProfile?.school_email || 'N/A'}</span>
                        </div>
                        <div className="profile-detail-item">
                          <span className="profile-detail-label">School Contact</span>
                          <span className="profile-detail-value">{adminProfile?.school_phone || 'N/A'}</span>
                        </div>
                        <div className="profile-detail-item" style={{ gridColumn: 'span 2' }}>
                          <span className="profile-detail-label">School Address</span>
                          <span className="profile-detail-value">{adminProfile?.school_address || 'N/A'}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {profileSubTab === 'edit' && (
                <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input 
                        type="text" 
                        className="erp-input" 
                        value={adminProfileForm.name} 
                        onChange={(e) => setAdminProfileForm({ ...adminProfileForm, name: e.target.value })}
                      />
                      {profileErrors.name && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{profileErrors.name}</div>}
                    </div>
                    <div>
                      <label className="form-label">Email Address *</label>
                      <input 
                        type="email" 
                        className="erp-input" 
                        value={adminProfileForm.email} 
                        onChange={(e) => setAdminProfileForm({ ...adminProfileForm, email: e.target.value })}
                      />
                      {profileErrors.email && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{profileErrors.email}</div>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label className="form-label">Phone Number</label>
                      <input 
                        type="text" 
                        className="erp-input" 
                        placeholder="e.g. 9876543210" 
                        value={adminProfileForm.phone || ''} 
                        onChange={(e) => setAdminProfileForm({ ...adminProfileForm, phone: e.target.value })}
                      />
                      {profileErrors.phone && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{profileErrors.phone}</div>}
                    </div>
                    <div>
                      <label className="form-label">Time Zone</label>
                      <select 
                        className="erp-input" 
                        value={adminProfileForm.timezone} 
                        onChange={(e) => setAdminProfileForm({ ...adminProfileForm, timezone: e.target.value })}
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                        <option value="UTC">UTC (GMT)</option>
                        <option value="America/New_York">America/New_York (EST/EDT)</option>
                        <option value="Europe/London">Europe/London (BST/GMT)</option>
                        <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                        <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Home Address</label>
                    <textarea 
                      className="erp-input" 
                      rows={2} 
                      style={{ resize: 'vertical' }}
                      value={adminProfileForm.address || ''} 
                      onChange={(e) => setAdminProfileForm({ ...adminProfileForm, address: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label className="form-label">City</label>
                      <input 
                        type="text" 
                        className="erp-input" 
                        value={adminProfileForm.city || ''} 
                        onChange={(e) => setAdminProfileForm({ ...adminProfileForm, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">State</label>
                      <input 
                        type="text" 
                        className="erp-input" 
                        value={adminProfileForm.state || ''} 
                        onChange={(e) => setAdminProfileForm({ ...adminProfileForm, state: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Country</label>
                      <input 
                        type="text" 
                        className="erp-input" 
                        value={adminProfileForm.country || ''} 
                        onChange={(e) => setAdminProfileForm({ ...adminProfileForm, country: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                    <button 
                      type="button" 
                      className="btn-outline" 
                      onClick={() => setProfileSubTab('details')}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary" 
                      disabled={isSavingProfile}
                    >
                      {isSavingProfile ? 'Saving...' : 'Save Profile Details'}
                    </button>
                  </div>
                </form>
              )}

              {profileSubTab === 'password' && (
                <form onSubmit={handleChangePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label className="form-label">Current Password *</label>
                    <input 
                      type="password" 
                      className="erp-input" 
                      value={passwordForm.current_password} 
                      onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                    />
                    {passwordErrors.current_password && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{passwordErrors.current_password}</div>}
                  </div>

                  <div>
                    <label className="form-label">New Password *</label>
                    <input 
                      type="password" 
                      className="erp-input" 
                      value={passwordForm.new_password} 
                      onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                    />
                    {passwordErrors.new_password && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{passwordErrors.new_password}</div>}
                    
                    {/* Visual Password Strength Checklist */}
                    <div style={{ marginTop: '8px', padding: '10px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Password complexity requirements:</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: passwordForm.new_password.length >= 8 ? '#10b981' : 'var(--text-muted)' }}>
                          <Check size={10} /> Min. 8 characters
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: /[A-Z]/.test(passwordForm.new_password) ? '#10b981' : 'var(--text-muted)' }}>
                          <Check size={10} /> 1 uppercase letter
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: /[a-z]/.test(passwordForm.new_password) ? '#10b981' : 'var(--text-muted)' }}>
                          <Check size={10} /> 1 lowercase letter
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: /[0-9]/.test(passwordForm.new_password) ? '#10b981' : 'var(--text-muted)' }}>
                          <Check size={10} /> 1 number digit
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: /[!@#$%^&*()_+={}\[\]|\\\\:;\"\'<>,.?\/~`\-]/.test(passwordForm.new_password) ? '#10b981' : 'var(--text-muted)' }}>
                          <Check size={10} /> 1 special character
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Confirm New Password *</label>
                    <input 
                      type="password" 
                      className="erp-input" 
                      value={passwordForm.confirm_password} 
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                    />
                    {passwordErrors.confirm_password && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{passwordErrors.confirm_password}</div>}
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                    <button 
                      type="button" 
                      className="btn-outline" 
                      onClick={() => setProfileSubTab('details')}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary" 
                      disabled={isSavingPassword}
                    >
                      {isSavingPassword ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 4. Super Admin Portal Views
  if (role === 'Super Admin') {
    return (
      <div className={`app-layout ${isDarkMode ? 'dark-theme' : ''}`}>
        
        {(isLoggingOut || loading) && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: isDarkMode ? 'rgba(9, 13, 22, 0.85)' : 'rgba(248, 250, 252, 0.85)',
            backdropFilter: 'blur(4px)', zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', color: 'var(--text-primary)', pointerEvents: 'all'
          }} onClick={(e) => e.stopPropagation()}>
            <RefreshCw className="animate-spin" size={48} style={{ color: 'var(--color-primary)' }} />
            <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {isLoggingOut ? 'Logging Out' : 'Loading Platform Data...'}
            </span>
          </div>
        )}

        {toast && (
          <div className="toast-in-out" style={{
            position: 'fixed', top: '24px', right: '24px', zIndex: 100005, padding: '16px 20px', borderRadius: 'var(--radius-md)',
            backgroundColor: toast.type === 'success' ? '#10b981' : '#ef4444', color: '#ffffff', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', fontWeight: 600
          }}>
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
            <span>{toast.message}</span>
          </div>
        )}

        {/* Sidebar */}
        <aside className="sidebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', padding: '0 8px' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--color-secondary) 0%, #ec4899 100%)',
              padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Sliders size={24} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Super Portal</h1>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Platform Admin</span>
            </div>
          </div>

          <div className="sidebar-nav">
            <button onClick={() => setActiveTab('dashboard')} className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
              <Activity size={18} /> Platform Stats
            </button>
            <button onClick={() => {
              setActiveTab('schools');
              fetchSuperAdminData(null, true);
            }} className={`sidebar-item ${activeTab === 'schools' ? 'active' : ''}`}>
              <Building size={18} /> Manage Schools
            </button>
          </div>

          <div 
            onClick={() => { setActiveTab('profile'); setSelectedClassId(null); setSelectedTeacher(null); setSelectedStudent(null); }} 
            className={`sidebar-profile ${activeTab === 'profile' ? 'active' : ''}`}
          >
            {adminProfile?.profile_image ? (
              <img 
                src={adminProfile.profile_image} 
                alt="Admin Avatar" 
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }} 
              />
            ) : (
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                background: 'rgba(255, 255, 255, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--text-secondary)'
              }}>
                <User size={18} />
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {adminProfile?.name || 'Bilal Ahmed'}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Super Admin
              </span>
            </div>
          </div>
        </aside>

        {/* Main Panel */}
        <div className="main-wrapper">
          <header className="header">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Platform Control Panel</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', padding: '8px', borderRadius: '50%' }}
                className="menu-dot-trigger"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-color)' }} />
              <button onClick={() => setShowLogoutConfirm(true)} className="btn-outline" style={{ padding: '6px 14px', fontSize: '0.85rem' }} disabled={isLoggingOut}>
                Sign Out
              </button>
            </div>
          </header>

          <div className="content-body">
            


            {/* TAB 1: Platform Stats */}
            {activeTab === 'dashboard' && superStats && (
              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="stats-grid">
                  <div className="erp-card">
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Total Schools Onboarded</span>
                    <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px' }}>{superStats.total_schools}</div>
                    <span className="badge badge-primary" style={{ marginTop: '8px' }}>Active Tenants: {superStats.active_schools}</span>
                  </div>
                  <div className="erp-card">
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Deactivated Schools</span>
                    <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px', color: '#ef4444' }}>{superStats.inactive_schools}</div>
                    <span className="badge badge-danger" style={{ marginTop: '8px' }}>Action Required</span>
                  </div>
                  <div className="erp-card">
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Total Platform Students</span>
                    <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px' }}>{superStats.total_students}</div>
                    <span className="badge badge-success" style={{ marginTop: '8px' }}>Average 200/School</span>
                  </div>
                  <div className="erp-card">
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Total Platform Revenue</span>
                    <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px', color: '#10b981' }}>${superStats.total_revenue.toLocaleString()}</div>
                    <span className="badge badge-success" style={{ marginTop: '8px' }}>Tuition Collected</span>
                  </div>
                </div>

                <div className="erp-card">
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Recently Registered Schools</h3>
                  <div className="erp-table-container">
                    <table className="erp-table">
                      <thead>
                        <tr>
                          <th>School Name</th>
                          <th>Admin Email</th>
                          <th>Status</th>
                          <th>Onboard Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {superStats.recent_schools && superStats.recent_schools.map((school, i) => (
                          <tr key={i}>
                            <td style={{ fontWeight: 'bold' }}>{school.name}</td>
                            <td>{school.email}</td>
                            <td>
                              <span className={`badge ${(school.status === 'Active' && (school.days_remaining === undefined || school.days_remaining > 0)) ? 'badge-success' : 'badge-danger'}`}>
                                {(school.status === 'Active' && (school.days_remaining === undefined || school.days_remaining > 0)) ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td>{school.created_at}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Manage Schools */}
            {activeTab === 'schools' && (
              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.15rem' }}>Schools Registry & Subscription Management</h3>
                  <button onClick={() => setShowInviteModal(true)} className="btn-primary" style={{ background: 'linear-gradient(135deg, var(--color-secondary) 0%, #ec4899 100%)' }}>
                    <Plus size={16} /> Send invitation
                  </button>
                </div>

                <div className="erp-card">
                  <div className="erp-table-container">
                    <table className="erp-table">
                      <thead>
                        <tr>
                          <th>School Name</th>
                          <th>Code</th>
                          <th>Contact Person</th>
                          <th>Phone</th>
                          <th>Email Address</th>
                          <th>Subscription Expiry</th>
                          <th>Days Left</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schools.map(school => (
                          <tr key={school.id}>
                            <td style={{ fontWeight: 'bold' }}>{school.name || '-'}</td>
                            <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{school.code || '-'}</td>
                            <td>{school.contact_person || '-'}</td>
                            <td>{school.contact_number || '-'}</td>
                            <td>{school.email}</td>
                            <td>{school.subscription_end}</td>
                            <td>
                              <span className={`badge ${school.days_remaining > 15 ? 'badge-success' : school.days_remaining > 0 ? 'badge-warning' : 'badge-danger'}`} style={{ whiteSpace: 'nowrap', width: '95px', display: 'inline-flex', justifyContent: 'center' }}>
                                {school.days_remaining} Days
                              </span>
                            </td>
                            <td>
                              <button 
                                onClick={() => handleToggleSchoolStatus(school)}
                                className={`badge ${(school.status === 'Active' && school.days_remaining > 0) ? 'badge-success' : 'badge-danger'}`}
                                style={{ cursor: 'pointer', border: 'none' }}
                              >
                                {(school.status === 'Active' && school.days_remaining > 0) ? 'Active' : 'Inactive'}
                              </button>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button 
                                  onClick={() => setShowExtendModal(school)}
                                  className="btn-outline" 
                                  style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                                >
                                  Extend
                                </button>
                                <button 
                                  onClick={() => handleDeleteSchool(school.id)}
                                  className="btn-outline" 
                                  style={{ padding: '4px 8px', fontSize: '0.75rem', borderColor: '#ef4444', color: '#ef4444' }}
                                >
                                  <Trash2 size={12} style={{ pointerEvents: 'none' }} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Invite School Modal */}
        {showInviteModal && (
          <div className="modal-overlay" onClick={() => setShowInviteModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Onboard New School</h3>
                <button onClick={() => setShowInviteModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={20} /></button>
              </div>

              <form onSubmit={handleInviteSchoolSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label htmlFor="inv-email" className="form-label">Admin Email Address</label>
                  <input id="inv-email" type="email" className="erp-input" value={inviteForm.email} onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })} required placeholder="school.admin@domain.com" />
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: '10px', justifyContent: 'center' }} disabled={isSendingInvite}>
                  {isSendingInvite ? 'Sending...' : 'Send Invitation'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Extend Subscription Modal */}
        {showExtendModal && (
          <div className="modal-overlay" onClick={() => setShowExtendModal(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Extend Subscription</h3>
                <button onClick={() => setShowExtendModal(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={20} /></button>
              </div>

              <form onSubmit={handleExtendSubscription} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Extend license duration for **{showExtendModal.name}**.</p>
                <div>
                  <label htmlFor="extend-months" className="form-label">Duration extension</label>
                  <select 
                    id="extend-months"
                    value={extendMonths} 
                    onChange={(e) => setExtendMonths(e.target.value)} 
                    className="erp-input"
                  >
                    <option value={3}>3 Months</option>
                    <option value={6}>6 Months</option>
                    <option value={12}>12 Months (1 Year)</option>
                    <option value={24}>24 Months (2 Years)</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: '10px', justifyContent: 'center' }}>Extend License</button>
              </form>
            </div>
          </div>
        )}

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center', padding: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ef4444',
                  marginBottom: '8px'
                }}>
                  <LogOut size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Confirm Sign Out</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                  Are you sure you want to signout?
                </p>
                <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '16px' }}>
                  <button 
                    onClick={() => {
                      setShowLogoutConfirm(false);
                      handleLogout();
                    }}
                    className="btn-primary"
                    style={{ flex: 1, backgroundColor: '#ef4444', border: '1px solid #ef4444', color: 'white', justifyContent: 'center' }}
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => setShowLogoutConfirm(false)}
                    className="btn-outline"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="modal-overlay" onClick={() => { setDeleteConfirm(null); setDeletePassword(''); setDeleteError(''); }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center', padding: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ef4444',
                  marginBottom: '8px'
                }}>
                  <AlertTriangle size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Confirm Delete</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                  {deleteConfirm.message || 'Are you sure you want to delete permanently?'}
                </p>
                
                <div style={{ width: '100%', textAlign: 'left', marginTop: '12px' }}>
                  <label htmlFor="delete-pwd-sa" className="form-label" style={{ fontWeight: 600 }}>Enter your password to confirm:</label>
                  <input 
                    id="delete-pwd-sa"
                    type="password"
                    autoComplete="new-password"
                    className="erp-input"
                    value={deletePassword}
                    onChange={(e) => {
                      setDeletePassword(e.target.value);
                      setDeleteError('');
                    }}
                    placeholder="Enter your account password"
                    style={{ width: '100%', marginTop: '6px' }}
                  />
                  {deleteError && (
                    <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', fontWeight: 600 }}>
                      {deleteError}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '16px' }}>
                  <button 
                    onClick={handleConfirmDelete}
                    className="btn-primary"
                    style={{ flex: 1, backgroundColor: '#ef4444', border: '1px solid #ef4444', color: 'white', justifyContent: 'center' }}
                  >
                    Yes, Delete
                  </button>
                  <button 
                    onClick={() => { setDeleteConfirm(null); setDeletePassword(''); setDeleteError(''); }}
                    className="btn-outline"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Admin Profile */}
        {activeTab === 'profile' && renderAdminProfileTab()}

      </div>
    );
  }

  // 5. School Admin Portal (Standard ERP View)
  return (
    <div className={`app-layout ${isDarkMode ? 'dark-theme' : ''}`}>
      
      {(isLoggingOut || loading) && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: isDarkMode ? 'rgba(9, 13, 22, 0.85)' : 'rgba(248, 250, 252, 0.85)',
          backdropFilter: 'blur(4px)', zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', color: 'var(--text-primary)', pointerEvents: 'all'
        }} onClick={(e) => e.stopPropagation()}>
          <RefreshCw className="animate-spin" size={48} style={{ color: 'var(--color-primary)' }} />
          <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {isLoggingOut ? 'Logging Out' : 'Please wait...'}
          </span>
        </div>
      )}
      
      {toast && (
        <div className="toast-in-out" style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 100005, padding: '16px 20px', borderRadius: 'var(--radius-md)',
          backgroundColor: toast.type === 'success' ? '#10b981' : '#ef4444', color: '#ffffff', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', fontWeight: 600
        }}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', padding: '0 8px' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
            padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <GraduationCap size={24} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
              {schoolName || 'BN School'}
            </h1>
          </div>
        </div>

        <div className="sidebar-nav">
          <button id="nav-btn-dashboard" onClick={() => { setActiveTab('dashboard'); setSelectedClassId(null); setSelectedTeacher(null); setSelectedStudent(null); }} className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <Activity size={18} /> Dashboard
          </button>
          <button id="nav-btn-faculty" onClick={() => { setActiveTab('faculty'); setSelectedClassId(null); setSelectedTeacher(null); setSelectedStudent(null); }} className={`sidebar-item ${activeTab === 'faculty' ? 'active' : ''}`}>
            <Users size={18} /> Teachers
          </button>
          <button id="nav-btn-students" onClick={() => { setActiveTab('students'); setSelectedClassId(null); setSelectedTeacher(null); setSelectedStudent(null); }} className={`sidebar-item ${activeTab === 'students' ? 'active' : ''}`}>
            <GraduationCap size={18} /> Classes
          </button>
          <button id="nav-btn-planner" onClick={() => { setActiveTab('planner'); setSelectedClassId(null); setSelectedTeacher(null); setSelectedStudent(null); }} className={`sidebar-item ${activeTab === 'planner' ? 'active' : ''}`}>
            <Calendar size={18} /> Academic Planner
          </button>
          <button id="nav-btn-fees" onClick={() => { setActiveTab('fees'); setSelectedFeesClassId(null); setSelectedClassId(null); setSelectedTeacher(null); setSelectedStudent(null); }} className={`sidebar-item ${activeTab === 'fees' ? 'active' : ''}`}>
            <DollarSign size={18} /> Fees Portal
          </button>
          <button id="nav-btn-reports" onClick={() => { setActiveTab('reports'); setSelectedClassId(null); setSelectedTeacher(null); setSelectedStudent(null); }} className={`sidebar-item ${activeTab === 'reports' ? 'active' : ''}`}>
            <FileText size={18} /> Reports
          </button>
          <button id="nav-btn-settings" onClick={() => { setActiveTab('settings'); setSelectedClassId(null); setSelectedTeacher(null); setSelectedStudent(null); }} className={`sidebar-item ${activeTab === 'settings' ? 'active' : ''}`}>
            <Shield size={18} /> Audits & Settings
          </button>
        </div>

        <div 
          onClick={() => { setActiveTab('profile'); setSelectedClassId(null); setSelectedTeacher(null); setSelectedStudent(null); }} 
          className={`sidebar-profile ${activeTab === 'profile' ? 'active' : ''}`}
        >
          {adminProfile?.profile_image ? (
            <img 
              src={adminProfile.profile_image} 
              alt="Admin Avatar" 
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }} 
            />
          ) : (
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              background: 'rgba(255, 255, 255, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--text-secondary)'
            }}>
              <User size={18} />
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {adminProfile?.name || 'School Admin'}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Administrator
            </span>
          </div>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className="main-wrapper">
        
        {/* Header */}
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              {schoolName}
            </h2>
            <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--border-color)' }} />
            {/* Academic Year Selector */}
            {years.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Academic Year:</span>
                <select 
                  id="academic-year-select"
                  value={activeYearId} 
                  onChange={(e) => {
                    const newId = parseInt(e.target.value);
                    setActiveYearId(newId);
                    setSelectedClassId(null);
                    setSelectedStudent(null);
                  }} 
                  className="erp-input" 
                  style={{ width: '180px', padding: '6px 12px', fontSize: '0.85rem' }}
                >
                  {years.map(y => (
                    <option key={y.id} value={y.id}>{y.year_range} ({y.status || (y.is_active ? 'Active' : 'Archived')})</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Theme Toggle */}
            <button 
              id="theme-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', padding: '8px', borderRadius: '50%' }}
              className="menu-dot-trigger"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Notification trigger */}
            <div style={{ position: 'relative' }}>
              <button 
                id="notification-trigger"
                onClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
                className="menu-dot-trigger"
                style={{ padding: '8px', position: 'relative' }}
              >
                <Bell size={18} />
                {notifications.filter(n => !n.is_read).length > 0 && (
                  <span style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                )}
              </button>
              
              {showNotificationDrawer && (
                <div className="menu-dropdown" style={{ width: '300px', right: 0, padding: '12px' }}>
                  <h4 style={{ fontSize: '0.9rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '8px' }}>Reminders & Alerts</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto' }}>
                    {notifications.map(n => (
                      <div key={n.id} style={{ fontSize: '0.75rem', padding: '8px', borderRadius: '4px', backgroundColor: n.is_read ? 'transparent' : 'rgba(59,130,246,0.05)', borderLeft: '3px solid var(--color-primary)' }}>
                        <strong>{n.title}</strong>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>{n.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-color)' }} />
            
            <button id="btn-logout" onClick={() => setShowLogoutConfirm(true)} className="btn-outline" style={{ padding: '6px 14px', fontSize: '0.85rem' }} disabled={isLoggingOut}>
              Sign Out
            </button>
          </div>
        </header>

        {/* Content body */}
        <div className="content-body">
          {years.length === 0 && activeTab !== 'settings' ? (
            <div className="erp-card fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '64px 32px', gap: '24px', maxWidth: '600px', margin: '40px auto' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f59e0b'
              }}>
                <Calendar size={40} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Register Your First Academic Year</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '12px', lineHeight: '1.6' }}>
                  Welcome to BN School ERP! To begin managing classrooms, enrolling students, planning timetables, or tracking fee balances, you must first register and activate an Academic Year session.
                </p>
              </div>
              <button 
                onClick={openCreateYearModal}
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Plus size={18} /> Register First Academic Year
              </button>
            </div>
          ) : (
            <>
              {/* --- 1. DASHBOARD TAB --- */}
              {activeTab === 'dashboard' && dashboardStats && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Metric stats grid */}
              <div className="stats-grid">
                <div className="erp-card">
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Total Students</span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px' }}>{dashboardStats.total_students}</div>
                  <span className="badge badge-success" style={{ marginTop: '8px' }}>Active Year: {getActiveYearRange()}</span>
                </div>
                <div className="erp-card">
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Faculty Members</span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px' }}>{dashboardStats.total_teachers}</div>
                  <span className="badge badge-primary" style={{ marginTop: '8px' }}>Full-time</span>
                </div>
                 <div 
                    className="erp-card hoverable-card" 
                    style={{ cursor: 'pointer', transition: 'all 0.2s ease-in-out' }}
                    title="View students with overdue fee balances"
                    onClick={() => {
                      setActiveTab('fees');
                      setSelectedFeesClassId('all');
                      setFeesStatusFilter('Overdue');
                    }}
                  >
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Dues Balance Sheets</span>
                    {(() => {
                      const totalDuesAmount = getTotalPendingDuesAmount();
                      return (
                        <div style={{ fontSize: '2.0rem', fontWeight: 800, marginTop: '8px', color: '#ef4444' }}>
                          {formatMoney(totalDuesAmount)}
                        </div>
                      );
                    })()}
                  </div>
                 <div className="erp-card">
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Total Revenue</span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px', color: '#10b981' }}>
                    {formatMoney(isConnected ? dashboardStats.monthly_revenue : getTotalPaidRevenueAmount())}
                  </div>
                  <span className="badge badge-success" style={{ marginTop: '8px' }}>Tuition Collected</span>
                </div>
              </div>

              {/* Chart panels */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* SVG Tuition Collection Chart */}
                <div className="erp-card">
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Tuition Collection History</h3>
                  <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '2px solid var(--border-color)' }}>
                    {(() => {
                      const feeData = isConnected ? dashboardStats.charts.fee_collection : getDynamicFeeCollectionChartData();
                      const maxAmount = Math.max(...feeData.map(f => f.amount)) || 1;
                      const symbol = currencyMap[schoolCurrency]?.symbol || '$';
                      return feeData.map(f => (
                        <div key={f.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '8px' }}>
                          <div style={{
                            height: `${Math.max((f.amount / maxAmount) * 150, 10)}px`, width: '32px',
                            background: 'linear-gradient(to top, var(--color-primary) 0%, var(--color-accent) 100%)',
                            borderRadius: '4px 4px 0 0', position: 'relative'
                          }} title={`${symbol}${f.amount}`}>
                            <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: 'bold' }}>{symbol}{f.amount}</span>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{f.month.slice(0, 3)}</span>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* SVG Salary Expense Chart */}
                <div className="erp-card">
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Salary Disbursements</h3>
                  <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '2px solid var(--border-color)' }}>
                    {(() => {
                      const salData = isConnected ? dashboardStats.charts.salary_expense : getDynamicSalaryChartData();
                      const maxAmount = Math.max(...salData.map(s => s.amount)) || 1;
                      const symbol = currencyMap[schoolCurrency]?.symbol || '$';
                      return salData.map(s => (
                        <div key={s.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '8px' }}>
                          <div style={{
                            height: `${Math.max((s.amount / maxAmount) * 150, 10)}px`, width: '32px',
                            background: 'linear-gradient(to top, var(--color-secondary) 0%, #ec4899 100%)',
                            borderRadius: '4px 4px 0 0', position: 'relative'
                          }} title={`${symbol}${s.amount}`}>
                            <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: 'bold' }}>{symbol}{s.amount}</span>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.month.slice(0, 3)}</span>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>

              {/* Today's Timetable Subjects Widget */}
              <div className="erp-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={20} className="gradient-text" />
                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Today's Timetable Subjects</h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Class:</span>
                    <select
                      id="dashboard-class-select"
                      value={dashboardPlannerClassId || ''}
                      onChange={(e) => {
                        const val = e.target.value ? parseInt(e.target.value) : null;
                        setDashboardPlannerClassId(val);
                      }}
                      className="erp-input"
                      style={{ padding: '4px 8px', fontSize: '0.8rem', minWidth: '130px' }}
                    >
                      {classes.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {isFetchingDashboardSchedule ? (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                    <RefreshCw size={20} className="spin" style={{ marginRight: '8px' }} /> Loading today's schedule...
                  </div>
                ) : !dashboardTodaySchedule || !dashboardTodaySchedule.subjects || dashboardTodaySchedule.subjects.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.01)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-color)' }}>
                    <Calendar size={32} style={{ opacity: 0.3, marginBottom: '12px' }} />
                    <p style={{ fontSize: '0.9rem' }}>No published schedule for today ({dashboardTodaySchedule?.day_of_week || 'Today'}).</p>
                    <button 
                      onClick={() => setActiveTab('planner')}
                      className="btn-outline" 
                      style={{ marginTop: '14px', fontSize: '0.8rem', padding: '4px 12px' }}
                    >
                      Configure Planner
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
                      <span>Day: <strong>{dashboardTodaySchedule.day_of_week}</strong></span>
                      <span className="badge badge-success">Published</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', marginTop: '8px' }}>
                      {dashboardTodaySchedule.subjects.map((sub, index) => {
                        const subjectName = typeof sub === 'object' ? sub.subject : sub;
                        const teacherName = typeof sub === 'object' ? sub.teacher_name : '';
                        return (
                          <div 
                            key={index} 
                            className="glass-panel" 
                            style={{ 
                              padding: '12px 16px', 
                              borderRadius: 'var(--radius-sm)', 
                              border: '1px solid var(--border-color)',
                              background: 'rgba(255, 255, 255, 0.02)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px'
                            }}
                          >
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Period {index + 1}</span>
                            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{subjectName}</span>
                            {teacherName && (
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{teacherName}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- 2. FACULTY TAB --- */}
          {activeTab === 'faculty' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {selectedTeacher ? (
                /* Teacher detail sub-view */
                <div className="erp-card">
                  <button 
                    id="btn-teacher-back"
                    onClick={() => { setSelectedTeacher(null); setTeacherSalaries([]); }}
                    className="btn-outline" 
                    style={{ marginBottom: '24px', padding: '6px 12px' }}
                  >
                    Back to Faculty
                  </button>

                  <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px', alignItems: 'start' }}>
                    
                    {/* Left Column Profile Card */}
                    <div className="erp-card" style={{ textAlign: 'center', background: 'rgba(2, 6, 23, 0.2)' }}>
                      <img 
                        src={selectedTeacher.profile_image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"} 
                        alt={selectedTeacher.name} 
                        style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '16px', border: '3px solid var(--color-secondary)' }}
                      />
                      <h3 style={{ fontSize: '1.25rem' }}>{selectedTeacher.name}</h3>
                      <span className="badge badge-secondary" style={{ marginTop: '8px' }}>{selectedTeacher.subject}</span>
                      
                      <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '24px', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', textAlign: 'left', color: 'var(--text-secondary)' }}>
                        <div><strong>Gender:</strong> {selectedTeacher.gender || 'Male'}</div>
                        <div><strong>Email:</strong> {selectedTeacher.email || 'N/A'}</div>
                        <div><strong>Phone:</strong> {selectedTeacher.phone || 'N/A'}</div>
                        <div><strong>Address:</strong> {selectedTeacher.address || 'N/A'}</div>
                      </div>
                      
                      {isCurrentYearActive() && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                          <button 
                            id="btn-edit-teacher-profile"
                            onClick={() => handleEditTeacherClick(selectedTeacher)}
                            className="btn-primary" 
                            style={{ width: '100%', justifyContent: 'center' }}
                          >
                            <Edit size={14} style={{ marginRight: '6px' }} /> Edit Profile
                          </button>

                          <button 
                            id="btn-delete-teacher"
                            onClick={() => {
                              setDeleteConfirm({
                                message: 'Are you sure you want to delete permanently?',
                                onConfirm: () => {
                                  handleDeleteTeacher(selectedTeacher.id);
                                  setDeleteConfirm(null);
                                }
                              });
                            }}
                            className="btn-outline" 
                            style={{ borderColor: '#ef4444', color: '#ef4444', width: '100%', justifyContent: 'center' }}
                          >
                            <Trash2 size={14} /> Remove Teacher
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Right Column Details & LEDGER */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      {/* Detailed Grid */}
                      <div className="erp-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div>
                          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', color: 'var(--text-primary)' }}>Employment Information</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <div><strong>Joining Date:</strong> {selectedTeacher.joining_date || 'N/A'}</div>
                            <div><strong>Exit Date:</strong> {selectedTeacher.exit_date || 'Active / None'}</div>
                            <div>
                              <strong>Employment Status:</strong>{' '}
                              {(() => {
                                const isTeacherInactive = !!(selectedTeacher.exit_date && selectedTeacher.exit_date !== 'Active / None' && selectedTeacher.exit_date.trim() !== '');
                                const teacherDisplayStatus = isTeacherInactive ? 'Inactive' : (selectedTeacher.status || 'Active');
                                return (
                                  <span className={`badge ${teacherDisplayStatus === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                                    {teacherDisplayStatus.toUpperCase()}
                                  </span>
                                );
                              })()}
                            </div>
                            <div><strong>Assigned Classes:</strong> {selectedTeacher.assigned_classes || 'None'}</div>
                            {selectedTeacher.exit_date && selectedTeacher.exit_date !== 'Active / None' && selectedTeacher.exit_date.trim() !== '' && (
                              <div style={{ marginTop: '8px' }}>
                                <button
                                  onClick={() => setShowExperienceLetter(true)}
                                  className="btn-primary"
                                  style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                                >
                                  <FileText size={14} /> Experience Letter
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', color: 'var(--text-primary)' }}>Qualifications & Identity</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <div><strong>Education:</strong> {selectedTeacher.qualification || 'N/A'}</div>
                            <div><strong>Experience:</strong> {selectedTeacher.experience || 'N/A'}</div>
                            <div><strong>Aadhaar Number:</strong> {selectedTeacher.aadhaar_number || 'N/A'}</div>
                            <div><strong>PAN Number:</strong> {selectedTeacher.pan_number || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      {/* Attached Documents Table */}
                      <div className="erp-card">
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', color: 'var(--text-primary)' }}>Attached Documents</h4>
                        {(() => {
                          const docsList = typeof selectedTeacher.documents === 'string' ? JSON.parse(selectedTeacher.documents) : (selectedTeacher.documents || []);
                          if (docsList.length === 0) {
                            return (
                              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '24px', fontSize: '0.85rem' }}>
                                No documents attached to this faculty profile.
                              </div>
                            );
                          }
                          return (
                            <div className="table-responsive">
                              <table className="erp-table" style={{ fontSize: '0.85rem' }}>
                                <thead>
                                  <tr>
                                    <th>Document Type</th>
                                    <th>File Name</th>
                                    <th>Upload Date</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {docsList.map((doc) => (
                                    <tr key={doc.id}>
                                      <td style={{ fontWeight: 600 }}>{doc.type}</td>
                                      <td>{doc.name}</td>
                                      <td style={{ color: 'var(--text-muted)' }}>{doc.uploaded_at}</td>
                                      <td style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', border: 'none' }}>
                                        <button
                                          onClick={() => {
                                            const win = window.open();
                                            if (win) {
                                              win.document.write(`<iframe src="${doc.url}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                                            } else {
                                              alert("Pop-up blocked. Please allow pop-ups to view document.");
                                            }
                                          }}
                                          className="btn-outline"
                                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                                        >
                                          View
                                        </button>
                                        <a
                                          href={doc.url}
                                          download={doc.name}
                                          className="btn-outline"
                                          style={{ padding: '4px 10px', fontSize: '0.75rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                                        >
                                          Download
                                        </a>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Salaries monthly checklist */}
                      <div className="erp-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                          <h4 style={{ fontSize: '1.1rem' }}>Salary Registry ({getActiveYearRange()})</h4>
                          <span className="badge badge-warning">April to March</span>
                        </div>

                        <div className="salary-month-grid">
                          {teacherSalaries.map(sal => (
                            <div key={sal.month} className={`salary-month-card ${sal.status === 'Pending' ? 'pending' : ''}`}>
                              <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>{sal.month}</strong>
                              <span style={{ fontSize: '0.95rem', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>{formatMoney(sal.amount)}</span>
                              
                              {sal.status === 'Paid' ? (
                                <div style={{ fontSize: '0.7rem', color: '#10b981' }}>
                                  <Check size={10} style={{ display: 'inline', marginRight: '2px' }} />
                                  Paid ({sal.payment_date})
                                </div>
                              ) : (
                                <div>
                                  <span className="badge badge-danger" style={{ display: 'block', fontSize: '0.65rem', marginBottom: '6px' }}>Pending</span>
                                  {isCurrentYearActive() && (
                                    <button 
                                      onClick={() => processSalary(selectedTeacher.id, sal.month)}
                                      className="btn-primary" 
                                      style={{ padding: '4px 8px', fontSize: '0.75rem', width: '100%', justifyContent: 'center', borderRadius: '4px' }}
                                    >
                                      Disburse
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                /* Faculty Directory View */
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <select 
                        id="filter-teacher-subject"
                        value={subjectFilter} 
                        onChange={(e) => setSubjectFilter(e.target.value)} 
                        className="erp-input" 
                        style={{ width: '160px' }}
                      >
                        <option value="all">All Subjects</option>
                        {Array.from(new Set(teachers.map(t => t.subject).filter(Boolean)))
                          .sort((a, b) => a.localeCompare(b))
                          .map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                          ))
                        }
                      </select>

                      <select 
                        id="filter-teacher-status"
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value)} 
                        className="erp-input" 
                        style={{ width: '140px' }}
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Check Availability Date:</span>
                        <input 
                          id="filter-teacher-availability-date"
                          type="date"
                          value={facultySelectedDate}
                          onChange={(e) => handleFacultyDateChange(e.target.value)}
                          className="erp-input"
                          style={{ width: '150px', padding: '6px 12px' }}
                        />
                        {facultySelectedDate !== getTodayDateStr() && (
                          <button
                            id="btn-reset-faculty-date"
                            type="button"
                            onClick={() => handleFacultyDateChange(getTodayDateStr())}
                            className="btn-outline"
                            style={{ padding: '6px 12px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                          >
                            Reset to Today
                          </button>
                        )}
                      </div>
                    </div>

                    {isCurrentYearActive() && (
                      <button 
                        id="btn-add-teacher" 
                        onClick={() => {
                          setEditingTeacher(null);
                          setTForm({ name: '', subject: '', phone: '', email: '', qualification: '', experience: '', address: '', joining_date: new Date().toISOString().split('T')[0], exit_date: '', salary_amount: 3000.0, assigned_classes: '', gender: 'Male', aadhaar_number: '', pan_number: '', profile_image: '', documents: [] });
                          setShowAddTeacherModal(true);
                        }} 
                        className="btn-primary"
                      >
                        <Plus size={16} /> Add Teacher
                      </button>
                    )}
                  </div>

                  {/* Teacher card grid */}
                  <div className="teacher-grid">
                    {filteredTeachers.map(t => {
                      // WorkloadAvailability Logic (calculated for facultySelectedDate)
                      let assignedCount = 0;

                      allWeeklySchedules.forEach(sched => {
                        if (sched.schedule_date === facultySelectedDate && Array.isArray(sched.subjects)) {
                          sched.subjects.forEach(period => {
                            if (period && typeof period === 'object' && parseInt(period.teacher_id) === parseInt(t.id)) {
                              assignedCount++;
                            }
                          });
                        }
                      });
                      const maxPeriods = totalPeriodsPerDay;
                      const isOccupied = assignedCount >= maxPeriods;
                      const statusText = isOccupied ? 'Occupied' : 'Available';
                      const badgeColor = isOccupied ? 'badge-danger' : 'badge-success';

                      return (
                        <div 
                          key={t.id} 
                          className="teacher-card"
                          onClick={() => { setSelectedTeacher(t); fetchTeacherSalaryRecords(t.id); }}
                        >
                          <div style={{ position: 'absolute', top: '16px', right: '16px' }} onClick={(e) => e.stopPropagation()}>
                            <button 
                              id={`teacher-menu-btn-${t.id}`}
                              onClick={() => setActiveTeacherMenuId(activeTeacherMenuId === t.id ? null : t.id)}
                              className="menu-dot-trigger"
                            >
                              <MoreVertical size={16} />
                            </button>
                            {activeTeacherMenuId === t.id && (
                              <div className="menu-dropdown" style={{ right: 0, top: '24px' }}>
                                <button 
                                  id={`teacher-edit-btn-${t.id}`}
                                  onClick={() => { handleEditTeacherClick(t); setActiveTeacherMenuId(null); }}
                                  className="menu-dropdown-item"
                                >
                                  Edit
                                </button>
                                <button 
                                  id={`teacher-deactivate-btn-${t.id}`}
                                  onClick={() => { handleModifyTeacherStatus(t.id, t.status === 'Active' ? 'Inactive' : 'Active'); setActiveTeacherMenuId(null); }}
                                  className="menu-dropdown-item"
                                >
                                  {t.status === 'Active' ? 'Deactivate' : 'Activate'}
                                </button>
                                {isCurrentYearActive() && (
                                  <button 
                                    id={`teacher-remove-btn-${t.id}`}
                                    onClick={() => {
                                      setDeleteConfirm({
                                        message: 'Are you sure you want to delete permanently?',
                                        onConfirm: () => {
                                          handleDeleteTeacher(t.id);
                                          setDeleteConfirm(null);
                                        }
                                      });
                                      setActiveTeacherMenuId(null);
                                    }}
                                    className="menu-dropdown-item" 
                                    style={{ color: '#ef4444' }}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            )}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                            <img 
                              src={t.profile_image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"} 
                              alt={t.name} 
                              style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                              <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{t.name}</h4>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t.subject}</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            <div><strong>Phone:</strong> {t.phone || 'N/A'}</div>
                            <div><strong>Joined:</strong> {t.joining_date || 'N/A'}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                              <span className={`badge ${badgeColor}`}>{statusText}</span>
                              <span style={{ fontWeight: 'bold', marginLeft: 'auto', color: isOccupied ? '#ef4444' : '#10b981' }}>
                                Assigned: {assignedCount} / {maxPeriods} Periods
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- 3. STUDENTS TAB --- */}
          {activeTab === 'students' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {selectedStudent ? (
                /* Student detail view */
                <div className="erp-card">
                  <button 
                    id="btn-student-back"
                    onClick={() => { 
                      setSelectedStudent(null); 
                      setStudentFees([]); 
                      if (ledgerBackSource === 'fees') {
                        setActiveTab('fees');
                      }
                    }}
                    className="btn-outline" 
                    style={{ marginBottom: '24px', padding: '6px 12px' }}
                  >
                    Back to Student List
                  </button>

                  <div style={{ display: 'grid', gridTemplateColumns: '320px minmax(0, 1fr)', gap: '32px', alignItems: 'start' }}>
                    
                    {/* Left Column Profile Card */}
                    <div className="erp-card" style={{ textAlign: 'center', background: 'rgba(2, 6, 23, 0.2)' }}>
                      <img 
                        src={getStudentAvatar(selectedStudent)} 
                        alt={selectedStudent.name} 
                        style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '16px', border: '3px solid var(--color-primary)' }}
                      />
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{selectedStudent.name}</h3>
                      {(() => {
                        const statusStr = getStudentFeeStatus(selectedStudent);
                        const badge = getFeeStatusBadgeInfo(statusStr);
                        return (
                          <span className={`badge ${badge.class}`} style={{ fontSize: '0.8rem', padding: '6px 16px', display: 'inline-flex' }}>
                            {badge.label}
                          </span>
                        );
                      })()}
                      
                      <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '16px', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', textAlign: 'left', color: 'var(--text-secondary)' }}>
                        <div><strong>Roll No.:</strong> {selectedStudent.roll_number}</div>
                        <div><strong>SR No.:</strong> {selectedStudent.sr_no || 'N/A'}</div>
                        <div><strong>Class:</strong> {getClassName(selectedStudent.class_id)}</div>
                        <div><strong>Section:</strong> {selectedStudent.group_name || 'NA'}</div>
                        <div><strong>Gender:</strong> {selectedStudent.gender || 'Male'}</div>
                        <div><strong>Contact:</strong> {selectedStudent.phone || 'N/A'}</div>
                        <div><strong>Email:</strong> {selectedStudent.email || 'N/A'}</div>
                        <div><strong>Country:</strong> {selectedStudent.country || 'N/A'}</div>
                        <div><strong>State:</strong> {selectedStudent.state || 'N/A'}</div>
                        <div><strong>City:</strong> {selectedStudent.city || 'N/A'}</div>
                        <div><strong>Address:</strong> {selectedStudent.address || 'N/A'}</div>
                        <div><strong>Nationality:</strong> {selectedStudent.nationality || 'Indian'}</div>
                        <div><strong>Caste:</strong> {selectedStudent.caste || 'N/A'}</div>
                        <div><strong>Date of Birth:</strong> {formatDate(selectedStudent.date_of_birth)}</div>
                        <div><strong>Admission Date:</strong> {formatDate(selectedStudent.admission_date)}</div>
                      </div>
                      
                      {isCurrentYearActive() && (
                        <>
                          <button 
                            onClick={() => {
                              setEditingStudent(selectedStudent);
                              setSForm({
                                ...selectedStudent,
                                sr_no: selectedStudent.sr_no || '',
                                group_name: selectedStudent.group_name || '',
                                gender: selectedStudent.gender || 'Male',
                                country: selectedStudent.country || '',
                                state: selectedStudent.state || '',
                                city: selectedStudent.city || '',
                                profile_image: selectedStudent.profile_image || '',
                                blood_group: selectedStudent.blood_group || '',
                                nationality: selectedStudent.nationality || 'Indian',
                                caste: selectedStudent.caste || '',
                                documents: typeof selectedStudent.documents === 'string' ? JSON.parse(selectedStudent.documents) : (selectedStudent.documents || [])
                              });
                              setShowAddStudentModal(true);
                            }}
                            className="btn-outline" 
                            style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}
                          >
                            <Edit size={14} /> Edit Student
                          </button>
                          <button 
                            id="btn-delete-student"
                            onClick={() => {
                              setDeleteConfirm({
                                message: 'Are you sure you want to delete permanently?',
                                onConfirm: () => {
                                  handleDeleteStudent(selectedStudent.id);
                                  setDeleteConfirm(null);
                                }
                              });
                            }}
                            className="btn-outline" 
                            style={{ borderColor: '#ef4444', color: '#ef4444', marginTop: '10px', width: '100%', justifyContent: 'center' }}
                          >
                            <Trash2 size={14} /> Remove Student
                          </button>
                        </>
                      )}
                    </div>

                    {/* Right Column details and Month-wise Tuition Ledger */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <div className="erp-card">
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Family & Identification</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.9rem' }}>
                          <div><strong>Father's Name:</strong> {selectedStudent.father_name || 'N/A'}</div>
                          <div><strong>Mother's Name:</strong> {selectedStudent.mother_name || 'N/A'}</div>
                          <div><strong>Emergency Contact:</strong> {selectedStudent.emergency_contact || 'N/A'}</div>
                          <div><strong>Blood Group:</strong> {selectedStudent.blood_group || 'N/A'}</div>
                          <div><strong>Aadhaar Number:</strong> {selectedStudent.aadhaar_number || 'N/A'}</div>
                        </div>
                      </div>

                      {/* Sub-tab Navigation */}
                      <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                        <button
                          onClick={() => setStudentDetailTab('fees')}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: studentDetailTab === 'fees' ? 'var(--color-primary)' : 'var(--text-muted)',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            borderBottom: studentDetailTab === 'fees' ? '2px solid var(--color-primary)' : 'none',
                            paddingBottom: '12px'
                          }}
                        >
                          Fee Collection Ledger
                        </button>
                        <button
                          onClick={() => setStudentDetailTab('documents')}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: studentDetailTab === 'documents' ? 'var(--color-primary)' : 'var(--text-muted)',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            borderBottom: studentDetailTab === 'documents' ? '2px solid var(--color-primary)' : 'none',
                            paddingBottom: '12px'
                          }}
                        >
                          Attached Documents ({typeof selectedStudent.documents === 'string' ? JSON.parse(selectedStudent.documents).length : (selectedStudent.documents || []).length})
                        </button>
                      </div>

                      {studentDetailTab === 'fees' ? (
                        /* Fee ledger section */
                        <div className="erp-card">
                          <h4 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Fee Collection Ledger ({getActiveYearRange()})</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {studentFees.map(fee => (
                              <div key={fee.month} className="fees-month-item" style={{ borderLeft: `4px solid ${fee.status === 'Paid' ? '#10b981' : '#ef4444'}`, padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '4px', marginBottom: '6px' }}>
                                <div>
                                  <strong style={{ fontSize: '0.9rem' }}>{fee.month}</strong>
                                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    {fee.status === 'Paid' ? `Paid on: ${fee.payment_date ? formatDate(fee.payment_date) : 'N/A'}` : `Due Date: ${formatDate(fee.due_date)}`}
                                  </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                  <strong style={{ fontSize: '1rem' }}>{formatMoney(fee.amount)}</strong>
                                  {fee.status === 'Paid' ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                       <span 
                                         className="badge badge-success"
                                         style={{ cursor: 'pointer' }}
                                         title="Click to revert to Unpaid"
                                         onClick={() => handleRevertFeePayment(selectedStudent.id, fee.month)}
                                       >
                                         Paid
                                       </span>
                                      <button 
                                        onClick={() => handlePrintReceipt(selectedStudent, fee)}
                                        className="btn-outline" 
                                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                                      >
                                        <Printer size={12} /> Receipt
                                      </button>
                                    </div>
                                  ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <span className="badge badge-danger">Unpaid</span>
                                      {isCurrentYearActive() && (
                                        <button 
                                          onClick={() => processFeePayment(selectedStudent.id, fee.month)}
                                          className="btn-primary" 
                                          style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '4px' }}
                                        >
                                          Deposit
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        /* Documents section */
                        <div className="erp-card">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                            <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Attached Documents</h4>
                            
                            {/* File Upload Trigger */}
                            {isCurrentYearActive() && (
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <select
                                  id="detail-upload-doc-type"
                                  className="erp-input"
                                  style={{ padding: '4px 8px', fontSize: '0.75rem', width: '160px', height: '30px' }}
                                  defaultValue=""
                                >
                                  <option value="">-- Select Type --</option>
                                  <option value="Birth Certificate">Birth Certificate</option>
                                  <option value="Aadhaar Card">Aadhaar Card</option>
                                  <option value="Transfer Certificate (TC)">Transfer Certificate (TC)</option>
                                  <option value="Caste Certificate">Caste Certificate</option>
                                  <option value="Income Certificate">Income Certificate</option>
                                  <option value="Residence Certificate">Residence Certificate</option>
                                  <option value="Previous School Marksheet">Previous School Marksheet</option>
                                  <option value="Passport Size Photograph">Passport Size Photograph</option>
                                  <option value="Migration Certificate">Migration Certificate</option>
                                  <option value="Character Certificate">Character Certificate</option>
                                  <option value="Medical Certificate">Medical Certificate</option>
                                  <option value="Other Supporting Documents">Other Supporting Documents</option>
                                </select>
                                <button
                                  onClick={() => {
                                    const docType = document.getElementById('detail-upload-doc-type').value;
                                    if (!docType) {
                                      alert("Please select a Document Type first.");
                                      return;
                                    }
                                    document.getElementById('detail-upload-doc-file').click();
                                  }}
                                  className="btn-primary"
                                  style={{ padding: '4px 10px', fontSize: '0.75rem', height: '30px' }}
                                >
                                  <Plus size={12} /> Upload
                                </button>
                                <input
                                  id="detail-upload-doc-file"
                                  type="file"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  style={{ display: 'none' }}
                                  onChange={async (e) => {
                                    const file = e.target.files[0];
                                    const docType = document.getElementById('detail-upload-doc-type').value;
                                    if (!file) return;
                                    
                                    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
                                    if (!allowedTypes.includes(file.type)) {
                                      alert("Only PDF, JPG, JPEG, and PNG formats are allowed.");
                                      e.target.value = "";
                                      return;
                                    }
                                    
                                    const maxSize = 5 * 1024 * 1024;
                                    if (file.size > maxSize) {
                                      alert("File size exceeds 5MB limit.");
                                      e.target.value = "";
                                      return;
                                    }
                                    
                                    const reader = new FileReader();
                                    reader.onloadend = async () => {
                                      const base64data = reader.result;
                                      const currentDocs = typeof selectedStudent.documents === 'string' ? JSON.parse(selectedStudent.documents) : (selectedStudent.documents || []);
                                      const newDoc = {
                                        id: Date.now() + Math.random(),
                                        type: docType,
                                        name: file.name,
                                        url: base64data,
                                        size_str: (file.size / 1024).toFixed(1) + " KB",
                                        uploaded_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
                                      };
                                      const filtered = currentDocs.filter(d => d.type !== docType);
                                      const updatedDocs = [...filtered, newDoc];
                                      
                                      await handleUpdateStudentDocuments(selectedStudent.id, updatedDocs);
                                      document.getElementById('detail-upload-doc-type').value = "";
                                      e.target.value = "";
                                    };
                                    reader.readAsDataURL(file);
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          {(() => {
                            const docsList = typeof selectedStudent.documents === 'string' ? JSON.parse(selectedStudent.documents) : (selectedStudent.documents || []);
                            if (docsList.length === 0) {
                              return (
                                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '32px 24px', fontSize: '0.85rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                                  No documents uploaded yet.
                                </div>
                              );
                            }
                            return (
                              <div className="erp-table-container" style={{ width: '100%', overflowX: 'auto' }}>
                                <table className="erp-table" style={{ fontSize: '0.85rem', tableLayout: 'auto', width: '100%' }}>
                                  <thead>
                                    <tr>
                                      <th>Document Type</th>
                                      <th>File Name</th>
                                      <th>Upload Date</th>
                                      <th style={{ textAlign: 'right' }}>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {docsList.map((doc) => (
                                      <tr key={doc.id}>
                                        <td style={{ fontWeight: 600 }}>{doc.type}</td>
                                        <td style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={doc.name}>{doc.name}</td>
                                        <td style={{ color: 'var(--text-muted)' }}>{doc.uploaded_at.split(' ')[0]}</td>
                                        <td style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', border: 'none' }}>
                                          <button
                                            onClick={() => {
                                              const win = window.open();
                                              if (win) {
                                                win.document.write(`<iframe src="${doc.url}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                                              } else {
                                                alert("Pop-up blocked. Please allow pop-ups to view document.");
                                              }
                                            }}
                                            className="btn-outline"
                                            style={{ padding: '2px 8px', fontSize: '0.7rem' }}
                                          >
                                            View
                                          </button>
                                          <a
                                            href={doc.url}
                                            download={doc.name}
                                            className="btn-outline"
                                            style={{ padding: '2px 8px', fontSize: '0.7rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                                          >
                                            Download
                                          </a>
                                          {isCurrentYearActive() && (
                                            <button
                                              onClick={() => {
                                                setSimpleConfirm({
                                                  message: 'Are you sure you want to delete this?',
                                                  onConfirm: async () => {
                                                    const updatedDocs = docsList.filter(d => d.id !== doc.id);
                                                    await handleUpdateStudentDocuments(selectedStudent.id, updatedDocs);
                                                  }
                                                });
                                              }}
                                              className="btn-outline"
                                              style={{ padding: '2px 8px', fontSize: '0.7rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                                            >
                                              Delete
                                            </button>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            );
                          })()}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              ) : selectedClassId ? (
                /* Student class list sub-view */
                (() => {
                  const currentClass = classes.find(c => c.id === selectedClassId);
                  if (!currentClass) return null;
                  
                  // Extract unique non-empty section names for students in this class
                  const classStudents = students.filter(s => s.class_id === selectedClassId);
                  const uniqueGroups = [...new Set(classStudents.map(s => s.group_name).filter(Boolean))];
                  
                  // Filter students by section, search query (name, roll, contact/phone, email)
                  const filteredStudents = classStudents.filter(s => {
                    const matchesGroup = groupFilter === 'all' || s.group_name === groupFilter;
                    const matchesSearch = 
                      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      s.roll_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (s.phone && s.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
                      (s.email && s.email.toLowerCase().includes(searchQuery.toLowerCase()));
                    return matchesGroup && matchesSearch;
                  });

                  const visibleStudents = filteredStudents.slice(0, visibleCount);
                  
                  return (
                    <div className="erp-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <button 
                          id="btn-class-back"
                          onClick={() => { setSelectedClassId(null); setSelectedGroupId(null); setGroupFilter('all'); }}
                          className="btn-outline" 
                          style={{ padding: '6px 12px' }}
                        >
                          Back to Classes
                        </button>
                        
                        <h3 style={{ fontSize: '1.25rem' }}>
                          Students in {currentClass.name}
                        </h3>
                        
                        <div>
                          {isCurrentYearActive() && (
                            <button 
                              id="btn-add-student" 
                              onClick={() => {
                                setEditingStudent(null);
                                setSForm({
                                  name: '',
                                  roll_number: '',
                                  sr_no: '',
                                  class_id: selectedClassId,
                                  group_name: '',
                                  gender: 'Male',
                                  phone: '',
                                  email: '',
                                  country: '',
                                  state: '',
                                  city: '',
                                  father_name: '',
                                  mother_name: '',
                                  address: '',
                                  date_of_birth: '',
                                  admission_date: '',
                                  emergency_contact: '',
                                  blood_group: '',
                                  aadhaar_number: '',
                                  nationality: 'Indian',
                                  caste: '',
                                  profile_image: '',
                                  documents: []
                                });
                                setShowAddStudentModal(true);
                              }} 
                              className="btn-primary"
                            >
                              <Plus size={16} /> Add Student
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Search box & filter bar */}
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
                        {/* Search Input */}
                        <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
                          <input 
                            type="text"
                            placeholder="Search students..."
                            className="erp-input"
                            style={{ width: '100%', paddingLeft: '36px' }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        </div>

                        {/* Section Filter */}
                        {uniqueGroups.length > 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <label htmlFor="group-filter" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                              Filter by Section:
                            </label>
                            <select 
                              id="group-filter"
                              className="erp-input"
                              style={{ width: '200px', padding: '6px 12px' }}
                              value={groupFilter}
                              onChange={(e) => setGroupFilter(e.target.value)}
                            >
                              <option value="all">All Sections</option>
                              {uniqueGroups.map(g => (
                                <option key={g} value={g}>{g}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>

                      {/* Scrollable Table Container */}
                      <div 
                        className="erp-table-container" 
                        style={{ maxHeight: 'calc(100vh - 290px)', overflowY: 'auto' }}
                        onScroll={(e) => {
                          const target = e.target;
                          if (target.scrollHeight - target.scrollTop - target.clientHeight < 20) {
                            if (visibleCount < filteredStudents.length && !isFetchingMoreStudents) {
                              setIsFetchingMoreStudents(true);
                              setTimeout(() => {
                                setVisibleCount(prev => prev + 6);
                                setIsFetchingMoreStudents(false);
                              }, 500);
                            }
                          }
                        }}
                      >
                        <table className="erp-table">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th style={{ whiteSpace: 'nowrap' }}>Roll No</th>
                              <th>Section</th>
                              <th>Gender</th>
                              <th>Contact</th>
                              <th>Email Address</th>
                              <th>City</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {visibleStudents.map(student => (
                              <tr key={student.id} onClick={() => { setSelectedStudent(student); fetchStudentFeesRecords(student.id); setLedgerBackSource('students'); }} style={{ cursor: 'pointer' }}>
                                <td style={{ fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }} title={student.name}>
                                  {student.name}
                                </td>
                                <td style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{student.roll_number}</td>
                                <td>
                                  <span className="badge badge-outline" style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                                    {student.group_name || 'NA'}
                                  </span>
                                </td>
                                <td>{student.gender || 'Male'}</td>
                                <td>{student.phone || 'N/A'}</td>
                                <td>{student.email || 'N/A'}</td>
                                <td>{student.city || 'N/A'}</td>
                                <td onClick={(e) => e.stopPropagation()}>
                                  <button 
                                    onClick={() => {
                                      setEditingStudent(student);
                                      setSForm({
                                        ...student,
                                        sr_no: student.sr_no || '',
                                        group_name: student.group_name || '',
                                        gender: student.gender || 'Male',
                                        country: student.country || '',
                                        state: student.state || '',
                                        city: student.city || '',
                                        profile_image: student.profile_image || '',
                                        blood_group: student.blood_group || '',
                                        nationality: student.nationality || 'Indian',
                                        caste: student.caste || '',
                                        documents: typeof student.documents === 'string' ? JSON.parse(student.documents) : (student.documents || [])
                                      });
                                      setShowAddStudentModal(true);
                                    }}
                                    className="btn-outline" 
                                    style={{ padding: '4px 8px', marginRight: '6px' }}
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    id={`btn-remove-student-${student.id}`}
                                    onClick={() => {
                                      setDeleteConfirm({
                                        message: 'Are you sure you want to delete permanently?',
                                        onConfirm: () => {
                                          handleDeleteStudent(student.id);
                                          setDeleteConfirm(null);
                                        }
                                      });
                                    }}
                                    className="btn-outline" 
                                    style={{ padding: '4px 8px', color: '#ef4444', borderColor: '#ef4444' }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* Lazy Loading Spinner */}
                        {isFetchingMoreStudents && (
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', gap: '8px' }}>
                            <span 
                              style={{ 
                                border: '2px solid rgba(255,255,255,0.2)', 
                                borderTop: '2px solid white', 
                                borderRadius: '50%', 
                                width: '16px', 
                                height: '16px', 
                                animation: 'spin 0.8s linear infinite' 
                              }}
                            ></span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Loading more students...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()
              ) : (
                /* Class cards list view */
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '1.15rem' }}>Select Classroom to View Rosters</h3>
                    {isCurrentYearActive() && (
                      <button 
                        id="btn-create-class"
                        onClick={() => {
                          setNewClassForm({ name: '', room: '', groups: [] });
                          setShowCreateClassModal(true);
                        }} 
                        className="btn-primary"
                      >
                        <Plus size={16} /> Create Class
                      </button>
                    )}
                  </div>

                  <div className="class-grid">
                    {classes.map(cls => (
                      <div 
                        key={cls.id} 
                        className="class-card"
                        onClick={() => {
                          setSelectedClassId(cls.id);
                          const hasGrps = cls.groups && cls.groups.length > 0;
                          setSelectedGroupId(hasGrps ? null : 'all');
                          setGroupFilter(hasGrps ? 'all' : 'all');
                        }}
                      >
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{cls.name}</h4>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '12px' }}>{cls.room || 'No Room'}</span>
                        <span className="badge badge-primary">
                          {students.filter(s => s.class_id === cls.id).length} Students
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- 4. FEES TAB --- */}
          {activeTab === 'fees' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {selectedFeesClassId === null ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '1.15rem' }}>Select Classroom to View Rosters</h3>
                  </div>

                  <div className="class-grid">
                    {classes.map(cls => (
                      <div 
                        key={cls.id} 
                        className="class-card"
                        onClick={() => setSelectedFeesClassId(cls.id)}
                      >
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{cls.name}</h4>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '12px' }}>{cls.room || 'No Room'}</span>
                        <span className="badge badge-primary">
                          {students.filter(s => s.class_id === cls.id).length} Students
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="erp-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button 
                        onClick={() => { setSelectedFeesClassId(null); setSearchQuery(''); setFeesStatusFilter('All'); }}
                        className="btn-outline"
                        style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        &larr; Back to Classes
                      </button>
                      <h3 style={{ fontSize: '1.15rem', margin: 0 }}>
                        Outstanding Dues: {selectedFeesClassId === 'all' ? 'All Classes' : getClassName(selectedFeesClassId)} ({getActiveYearRange()})
                      </h3>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Status Filter:</span>
                      <select
                        value={feesStatusFilter}
                        onChange={(e) => setFeesStatusFilter(e.target.value)}
                        className="erp-input"
                        style={{ padding: '6px 12px', fontSize: '0.85rem', minWidth: '160px', width: 'auto' }}
                      >
                        <option value="All">All</option>
                        <option value="Overdue">Overdue Only (1+ Months)</option>
                        <option value="DUES PENDING">DUES PENDING</option>
                        <option value="PAYMENT OVERDUE">PAYMENT OVERDUE</option>
                        <option value="CRITICAL DUES">CRITICAL DUES</option>
                        <option value="FEE DEFAULT ALERT">FEE DEFAULT ALERT</option>
                        <option value="NO DUES">NO DUES</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Search Input */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
                      <input 
                        type="text"
                        placeholder="Search students..."
                        className="erp-input"
                        style={{ width: '100%', paddingLeft: '36px' }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    </div>
                  </div>

                  <div className="erp-table-container">
                    <table className="erp-table">
                      <thead>
                        <tr>
                          <th>Roll Number</th>
                          <th>Student Name</th>
                          <th>Class</th>
                          <th>Tuition Amount</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students
                          .filter(s => {
                            if (selectedFeesClassId !== 'all' && s.class_id !== selectedFeesClassId) {
                              return false;
                            }
                            
                            const statusStr = getStudentFeeStatus(s);
                            if (feesStatusFilter === 'Overdue') {
                              if (statusStr !== 'PAYMENT OVERDUE' && statusStr !== 'CRITICAL DUES' && statusStr !== 'FEE DEFAULT ALERT') {
                                return false;
                              }
                            } else if (feesStatusFilter !== 'All') {
                              const mappedStatus = feesStatusFilter === 'NO DUES' ? 'PAID' : feesStatusFilter;
                              if (statusStr !== mappedStatus) {
                                return false;
                              }
                            }
                            
                            if (searchQuery) {
                              const q = searchQuery.toLowerCase();
                              return s.name.toLowerCase().includes(q) || s.roll_number.includes(q);
                            }
                            return true;
                          })
                          .map(student => (
                            <tr key={student.id}>
                              <td style={{ fontWeight: 'bold' }}>{student.roll_number}</td>
                              <td>{student.name}</td>
                              <td>{getClassName(student.class_id)}</td>
                              <td>{formatMoney(getClassMonthlyFee(student.class_id))}/mo</td>
                              <td>
                                {(() => {
                                  const statusStr = getStudentFeeStatus(student);
                                  const badge = getFeeStatusBadgeInfo(statusStr);
                                  return (
                                    <span className={`badge ${badge.class}`}>
                                      {badge.label}
                                    </span>
                                  );
                                })()}
                              </td>
                              <td>
                                <button 
                                  id={`btn-open-student-ledger-${student.id}`}
                                  onClick={() => { 
                                    setSelectedStudent(student); 
                                    fetchStudentFeesRecords(student.id); 
                                    setLedgerBackSource('fees');
                                    setActiveTab('students'); 
                                  }}
                                  className="btn-primary" 
                                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                                >
                                  Open Ledger
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- 5. REPORTS TAB --- */}
          {activeTab === 'reports' && (
            <div className="erp-card fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button 
                    onClick={() => setReportSubTab('session')} 
                    className={`btn-subtab ${reportSubTab === 'session' ? 'active' : ''}`}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: reportSubTab === 'session' ? 'var(--color-primary)' : 'var(--text-muted)', 
                      fontWeight: 700, 
                      fontSize: '0.9rem', 
                      cursor: 'pointer',
                      borderBottom: reportSubTab === 'session' ? '2px solid var(--color-primary)' : 'none',
                      paddingBottom: '8px'
                    }}
                  >
                    Active Session Reports ({getActiveYearRange()})
                  </button>
                  <button 
                    onClick={() => setReportSubTab('cross-year')} 
                    className={`btn-subtab ${reportSubTab === 'cross-year' ? 'active' : ''}`}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: reportSubTab === 'cross-year' ? 'var(--color-primary)' : 'var(--text-muted)', 
                      fontWeight: 700, 
                      fontSize: '0.9rem', 
                      cursor: 'pointer',
                      borderBottom: reportSubTab === 'cross-year' ? '2px solid var(--color-primary)' : 'none',
                      paddingBottom: '8px'
                    }}
                  >
                    Cross-Year Analytics
                  </button>
                </div>
                <button 
                  id="btn-print-reports"
                  onClick={() => window.print()}
                  className="btn-primary"
                >
                  <FileSpreadsheet size={16} /> Export PDF/Print
                </button>
              </div>

              {reportSubTab === 'session' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div className="erp-card">
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#ef4444' }}>Outstanding Fees Summary</h4>
                    <div className="erp-table-container">
                      <table className="erp-table">
                        <thead>
                          <tr>
                            <th>Roll</th>
                            <th>Student</th>
                            <th>Class</th>
                            <th>Dues Outstanding</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getDuesReport().map((r, i) => (
                            <tr key={i}>
                              <td>{r.roll}</td>
                              <td>{r.name}</td>
                              <td>{r.class}</td>
                              <td style={{ fontWeight: 'bold', color: '#ef4444' }}>{formatMoney(r.dues)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="erp-card">
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#10b981' }}>Payroll Expense logs</h4>
                    <div className="erp-table-container">
                      <table className="erp-table">
                        <thead>
                          <tr>
                            <th>Faculty Name</th>
                            <th>Subject</th>
                            <th>Monthly Base</th>
                            <th>Payroll Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teachers.map((t, i) => (
                            <tr key={i}>
                              <td>{t.name}</td>
                              <td>{t.subject}</td>
                              <td>{formatMoney(t.salary_amount)}</td>
                              <td><span className="badge badge-success">Processed (April-Oct)</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {reportSubTab === 'cross-year' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {isFetchingCrossYear ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                      Loading cross-year comparative analytics...
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                      {/* Student Growth Year Wise */}
                      <div className="erp-card">
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Users size={18} /> Student Growth (Year-Wise)
                        </h4>
                        <div className="erp-table-container">
                          <table className="erp-table">
                            <thead>
                              <tr>
                                <th>Academic Session</th>
                                <th>Active Student Enrollment</th>
                                <th>Session Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {crossYearReports.map((r, i) => (
                                <tr key={i}>
                                  <td style={{ fontWeight: 'bold' }}>{r.year_range}</td>
                                  <td>{r.student_count} Students</td>
                                  <td>
                                    <span className={`badge ${r.status === 'Active' ? 'badge-success' : 'badge-secondary'}`}>{r.status}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Revenue Year Wise */}
                      <div className="erp-card">
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <DollarSign size={18} /> Fee Revenue collection (Year-Wise)
                        </h4>
                        <div className="erp-table-container">
                          <table className="erp-table">
                            <thead>
                              <tr>
                                <th>Academic Session</th>
                                <th>Total Paid Fees</th>
                                <th>Session Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {crossYearReports.map((r, i) => (
                                <tr key={i}>
                                  <td style={{ fontWeight: 'bold' }}>{r.year_range}</td>
                                  <td style={{ fontWeight: 'bold', color: '#10b981' }}>{formatMoney(r.revenue)}</td>
                                  <td>
                                    <span className={`badge ${r.status === 'Active' ? 'badge-success' : 'badge-secondary'}`}>{r.status}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Faculty History Year Wise */}
                      <div className="erp-card">
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#a855f7', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Briefcase size={18} /> Faculty Payroll Expense (Year-Wise)
                        </h4>
                        <div className="erp-table-container">
                          <table className="erp-table">
                            <thead>
                              <tr>
                                <th>Academic Session</th>
                                <th>Total Salary Disbursed</th>
                                <th>Session Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {crossYearReports.map((r, i) => (
                                <tr key={i}>
                                  <td style={{ fontWeight: 'bold' }}>{r.year_range}</td>
                                  <td style={{ fontWeight: 'bold', color: '#a855f7' }}>{formatMoney(r.salary_expense)}</td>
                                  <td>
                                    <span className={`badge ${r.status === 'Active' ? 'badge-success' : 'badge-secondary'}`}>{r.status}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Academic Performance Year Wise */}
                      <div className="erp-card">
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FileText size={18} /> Academic Performance Index (Year-Wise)
                        </h4>
                        <div className="erp-table-container">
                          <table className="erp-table">
                            <thead>
                              <tr>
                                <th>Academic Session</th>
                                <th>Average Performance Score</th>
                                <th>Session Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {crossYearReports.map((r, i) => (
                                <tr key={i}>
                                  <td style={{ fontWeight: 'bold' }}>{r.year_range}</td>
                                  <td style={{ fontWeight: 'bold', color: '#fbbf24' }}>{r.performance_index}</td>
                                  <td>
                                    <span className={`badge ${r.status === 'Active' ? 'badge-success' : 'badge-secondary'}`}>{r.status}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* --- 6. SETTINGS / AUDITS TAB --- */}
          {activeTab === 'settings' && (
            <div className="erp-card fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem' }}>System Audit Logs & Settings</h3>
                <span className="badge badge-secondary">Security Operator: {username}</span>
              </div>

              {/* Academic Sessions Master Management */}
              <div className="erp-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>Academic Sessions Manager</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                      Configure, activate, and archive school academic sessions.
                    </p>
                  </div>
                  <button 
                    onClick={openCreateYearModal}
                    className="btn-primary"
                    style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Plus size={16} /> Create Academic Year
                  </button>
                </div>
                
                <div className="erp-table-container">
                  <table className="erp-table">
                    <thead>
                      <tr>
                        <th>Session Range</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {years.map((y, idx) => (
                        <tr key={y.id || idx}>
                          <td style={{ fontWeight: 'bold' }}>{y.year_range}</td>
                          <td>{y.start_date || 'N/A'}</td>
                          <td>{y.end_date || 'N/A'}</td>
                          <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{y.description || 'No description'}</td>
                          <td>
                            {y.status === 'Active' ? (
                              <span className="badge badge-success">Active</span>
                            ) : y.status === 'Archived' ? (
                              <span className="badge badge-secondary">Archived</span>
                            ) : (
                              <span className="badge badge-warning">Draft</span>
                            )}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            {y.status === 'Draft' && (
                              <button 
                                onClick={() => {
                                  setWizardTargetYear(y);
                                  setTransitionWizardStep(1);
                                  setWizardClassMappings(getInitialClassMappings());
                                  // Initialize student status map
                                  const initStatuses = {};
                                  students.forEach(s => {
                                    if (s.status === 'Active') {
                                      initStatuses[s.id] = 'promote';
                                    }
                                  });
                                  setWizardStudentStatus(initStatuses);
                                  setWizardConfirmText('');
                                  setShowTransitionWizard(true);
                                }}
                                className="btn-primary"
                                style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                              >
                                Activate Session
                              </button>
                            )}
                            {y.status === 'Active' && (
                              <button 
                                onClick={() => handleArchiveAcademicYear(y.id)}
                                className="btn-outline"
                                style={{ padding: '4px 10px', fontSize: '0.8rem', color: '#ef4444', borderColor: '#ef4444' }}
                              >
                                Archive Session
                              </button>
                            )}
                            {y.status === 'Archived' && (
                              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>Historical</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tuition Fee settings configuration */}
              <div className="erp-card">
                <h4 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>Class-wise Tuition Fee Configuration</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px', marginBottom: '16px' }}>
                  Define class-wise monthly tuition fee amounts for the currently active academic session.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '220px' }}>
                      <label className="form-label" style={{ fontWeight: 600 }}>Select Class</label>
                      <select
                        value={selectedFeeClassId}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedFeeClassId(val);
                          fetchClassFeeStructure(val);
                        }}
                        className="erp-input"
                      >
                        <option value="">-- Choose Class --</option>
                        {classes.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '220px' }}>
                      <label className="form-label" style={{ fontWeight: 600 }}>Default Currency</label>
                      <select
                        value={schoolCurrency}
                        onChange={async (e) => {
                          const val = e.target.value;
                          setSchoolCurrency(val);
                          
                          if (isConnected) {
                            try {
                              const res = await fetch('/api/school/currency', {
                                method: 'PUT',
                                headers: getHeaders(),
                                body: JSON.stringify({ currency: val })
                              });
                              if (res.ok) {
                                showToast(`Default currency updated to ${val} successfully.`, "success");
                              } else {
                                showToast("Failed to save currency configuration on server.", "error");
                              }
                            } catch (err) {
                              showToast("Error updating currency.", "error");
                            }
                          } else {
                            const keySuffix = schoolId || 'default';
                            localStorage.setItem(`bn_sandbox_school_currency_${keySuffix}`, val);
                            showToast(`Default currency updated to ${val} (Offline Mode) successfully.`, "success");
                          }
                        }}
                        className="erp-input"
                      >
                        {Object.values(currencyMap).map(c => (
                          <option key={c.code} value={c.code}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {selectedFeeClassId && classFeeStructure && (
                    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255,255,255,0.01)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                        {["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"].map(m => (
                          <div key={m} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{m}</label>
                            <input 
                              type="number"
                              value={classFeeStructure[m] ?? 150}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                setClassFeeStructure(prev => ({
                                  ...prev,
                                  [m]: val
                                }));
                              }}
                              className="erp-input"
                              style={{ padding: '6px 10px', fontSize: '0.85rem' }}
                              required
                              min="0"
                            />
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                        <button onClick={saveClassFeeStructure} className="btn-primary">
                          Save Fee Structure
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* School settings configuration */}
              <div className="erp-card">
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>School Settings & Timetable Configuration</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '16px' }}>
                  Define structural settings for classroom schedulers and faculty workload computation.
                </p>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '180px' }}>
                    <label htmlFor="settings-total-periods" className="form-label" style={{ fontWeight: 600 }}>Total Periods Per Day</label>
                    <input
                      id="settings-total-periods"
                      type="number"
                      min="1"
                      max="15"
                      value={totalPeriodsPerDay}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 8;
                        setTotalPeriodsPerDay(val);
                        localStorage.setItem('bn_settings_total_periods', val);
                      }}
                      className="erp-input"
                      style={{ padding: '6px 12px' }}
                    />
                  </div>
                  <button
                    onClick={() => showToast('Total periods limit saved successfully!', 'success')}
                    className="btn-primary"
                    style={{ padding: '8px 16px' }}
                  >
                    Save Configuration
                  </button>
                </div>
              </div>

              {/* Audit Logs Table */}
              <div className="erp-card">
                <h4 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Operations Audit Ledger</h4>
                <div className="erp-table-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <table className="erp-table">
                    <thead>
                      <tr>
                        <th>Operator</th>
                        <th>Action</th>
                        <th>Timestamp</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs.map((log, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 'bold' }}>{log.operator}</td>
                          <td>
                            <span className="badge badge-primary">{log.action}</span>
                          </td>
                          <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{log.timestamp}</td>
                          <td>{log.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* --- 7. ACADEMIC PLANNER TAB --- */}
          {activeTab === 'planner' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {!isCurrentYearActive() && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 'var(--radius-md)', padding: '16px', color: '#fef08a' }}>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24' }}>
                    <AlertTriangle size={18} /> Read-only Session
                  </strong>
                  <span style={{ fontSize: '0.85rem' }}>This academic session is not active. Modifying timetable schedules or publishing periods is disabled.</span>
                </div>
              )}
              <div className="erp-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={22} className="gradient-text" />
                    Academic Planner & Class Schedule Management
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                    Configure day-wise subjects for each class weekly.
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button 
                    id="btn-manage-subjects"
                    onClick={() => {
                      if (!isCurrentYearActive()) return;
                      fetchSubjects();
                      setShowSubjectModal(true);
                    }}
                    disabled={!isCurrentYearActive()}
                    className="btn-outline"
                    style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px', opacity: isCurrentYearActive() ? 1 : 0.5, cursor: isCurrentYearActive() ? 'pointer' : 'not-allowed' }}
                  >
                    <Sliders size={16} /> Manage Subjects
                  </button>
 
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button 
                      id="btn-trigger-reminders"
                      onClick={() => {
                        if (!isCurrentYearActive()) return;
                        handleInitWhatsappReminders();
                      }}
                      disabled={!isCurrentYearActive()}
                      className="btn-outline"
                      style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px', color: isCurrentYearActive() ? '#10b981' : 'var(--text-muted)', borderColor: isCurrentYearActive() ? '#10b981' : 'var(--border-color)', opacity: isCurrentYearActive() ? 1 : 0.5, cursor: isCurrentYearActive() ? 'pointer' : 'not-allowed' }}
                    >
                      <span>📲 Send Tomorrow's Reminders</span>
                    </button>
                    <span className="badge" style={{ fontSize: '0.65rem', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', whiteSpace: 'nowrap' }}>
                      WhatsApp Integration Pending
                    </span>
                  </div>
                  
                  <button 
                    id="btn-copy-last-week"
                    onClick={handleCopyLastWeekSchedule}
                    disabled={isSavingSchedule || !plannerClassId || !isCurrentYearActive()}
                    className="btn-outline"
                    style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px', color: isCurrentYearActive() ? '#10b981' : 'var(--text-muted)', borderColor: isCurrentYearActive() ? '#10b981' : 'var(--border-color)' }}
                  >
                    <Copy size={16} /> Copy Last Week
                  </button>
                  
                  <button 
                    id="btn-save-draft"
                    onClick={() => handleSaveFullSchedule('Draft')}
                    disabled={isSavingSchedule || !plannerClassId || !isCurrentYearActive()}
                    className="btn-primary"
                    style={{ padding: '8px 16px' }}
                  >
                    {isSavingSchedule ? "Saving..." : "Save Draft"}
                  </button>
 
                  <button 
                    id="btn-publish-schedule"
                    onClick={() => handleSaveFullSchedule('Published')}
                    disabled={isSavingSchedule || !plannerClassId || !isCurrentYearActive()}
                    className="btn-primary"
                    style={{ padding: '8px 16px' }}
                  >
                    {isSavingSchedule ? "Publishing..." : "Publish"}
                  </button>
                </div>
              </div>

              {/* Selector, Week Picker & Status bar */}
              <div className="erp-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', padding: '16px 24px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px' }}>
                  {/* Class selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Select Class:</span>
                    <select
                      id="planner-class-select"
                      value={plannerClassId || ''}
                      onChange={(e) => {
                        const val = e.target.value ? parseInt(e.target.value) : null;
                        setPlannerClassId(val);
                      }}
                      className="erp-input"
                      style={{ padding: '6px 12px', minWidth: '150px' }}
                    >
                      {classes.length === 0 ? (
                        <option value="">No Classes Available</option>
                      ) : (
                        classes.map(c => (
                          <option key={c.id} value={c.id}>{c.name} {c.room ? `(${c.room})` : ''}</option>
                        ))
                      )}
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Week Starting:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button 
                          id="btn-prev-week"
                          type="button"
                          onClick={() => handleNavigateWeek(-1)}
                          className="btn-outline"
                          style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          title="Previous Week"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        
                        <input
                          type="date"
                          value={weekStartDate}
                          onChange={(e) => {
                            if (e.target.value) {
                              const selected = new Date(e.target.value);
                              const day = selected.getDay();
                              const diff = selected.getDate() - day + (day === 0 ? -6 : 1);
                              const monday = new Date(selected.setDate(diff));
                              const yyyy = monday.getFullYear();
                              const mm = String(monday.getMonth() + 1).padStart(2, '0');
                              const dd = String(monday.getDate()).padStart(2, '0');
                              setWeekStartDate(`${yyyy}-${mm}-${dd}`);
                            }
                          }}
                          className="erp-input"
                          style={{ padding: '6px 12px' }}
                        />

                        <button 
                          id="btn-next-week"
                          type="button"
                          onClick={() => handleNavigateWeek(1)}
                          className="btn-outline"
                          style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          title="Next Week"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      {(() => {
                        const start = new Date(weekStartDate);
                        const end = new Date(start);
                        end.setDate(start.getDate() + 5);
                        const formatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
                        return `${start.toLocaleDateString('en-US', formatOptions)} – ${end.toLocaleDateString('en-US', formatOptions)}`;
                      })()}
                    </div>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginRight: '8px' }}>Schedule Status:</span>
                  {(() => {
                    const activeScheduleStatus = (() => {
                      if (schedules.length === 0) return 'Draft';
                      const statuses = schedules.map(s => s.status);
                      const hasDraft = statuses.includes('Draft');
                      const hasPublished = statuses.includes('Published');
                      if (hasDraft && hasPublished) return 'Mixed';
                      if (hasPublished) return 'Published';
                      return 'Draft';
                    })();
                    return (
                      <span className={`badge ${
                        activeScheduleStatus === 'Published' ? 'badge-success' : 'badge-warning'
                      }`} style={
                        activeScheduleStatus === 'Mixed' ? { backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24' } : {}
                      }>
                        {activeScheduleStatus}
                      </span>
                    );
                  })()}
                </div>
              </div>

              {/* Day-wise Matrix Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, idx) => {
                  const daySubjects = scheduleForm[day] || [];
                  const daySchedule = schedules.find(s => s.day_of_week.toLowerCase() === day.toLowerCase());
                  const isModified = (() => {
                    if (!daySchedule) return false;
                    const saved = Array.isArray(daySchedule.subjects) ? daySchedule.subjects : [];
                    if (daySubjects.length !== saved.length) return true;
                    for (let i = 0; i < daySubjects.length; i++) {
                      const p1 = daySubjects[i];
                      const p2 = saved[i];
                      const p1Sub = typeof p1 === 'object' ? p1.subject : p1;
                      const p2Sub = typeof p2 === 'object' ? p2.subject : p2;
                      const p1Teach = typeof p1 === 'object' ? p1.teacher_id : null;
                      const p2Teach = typeof p2 === 'object' ? p2.teacher_id : null;
                      if (p1Sub !== p2Sub || parseInt(p1Teach) !== parseInt(p2Teach)) return true;
                    }
                    return false;
                  })();
                  const dayStatus = (daySchedule && !isModified && daySubjects.length > 0) ? daySchedule.status : 'Draft';
                  
                  const refMonday = new Date(weekStartDate);
                  const cardDate = new Date(refMonday);
                  cardDate.setDate(refMonday.getDate() + idx);
                  
                  const cardDateStr = (() => {
                    const y = cardDate.getFullYear();
                    const m = String(cardDate.getMonth() + 1).padStart(2, '0');
                    const r = String(cardDate.getDate()).padStart(2, '0');
                    return `${y}-${m}-${r}`;
                  })();

                  const todayLocal = new Date();
                  const todayDateStr = (() => {
                    const y = todayLocal.getFullYear();
                    const m = String(todayLocal.getMonth() + 1).padStart(2, '0');
                    const r = String(todayLocal.getDate()).padStart(2, '0');
                    return `${y}-${m}-${r}`;
                  })();

                  const isToday = cardDateStr === todayDateStr;
                  const isPast = cardDateStr < todayDateStr;

                  return (
                    <div 
                      key={day} 
                      className="erp-card" 
                      draggable={!isPast}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', day);
                        setDraggingDay(day);
                      }}
                      onDragEnd={() => {
                        setDraggingDay(null);
                        setDragOverDay(null);
                      }}
                      onDragOver={(e) => {
                        if (isPast) return;
                        if (draggingDay === day) return;
                        e.preventDefault();
                        if (dragOverDay !== day) {
                          setDragOverDay(day);
                        }
                      }}
                      onDragLeave={() => {
                        setDragOverDay(null);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        const sourceDay = e.dataTransfer.getData('text/plain');
                        setDragOverDay(null);
                        setDraggingDay(null);
                        if (sourceDay && sourceDay !== day && !isPast) {
                          handleCopyDayScheduleDragDrop(sourceDay, day);
                        }
                      }}
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '16px', 
                        minHeight: '340px',
                        opacity: isPast ? 0.6 : (draggingDay === day ? 0.4 : 1),
                        border: dragOverDay === day 
                          ? '2px dashed #10b981' 
                          : (isToday ? '2px solid #3b82f6' : '1px solid var(--border-color)'),
                        boxShadow: dragOverDay === day 
                          ? '0 0 15px rgba(16, 185, 129, 0.4)' 
                          : (isToday ? '0 0 15px rgba(59, 130, 246, 0.25)' : 'none'),
                        background: dragOverDay === day 
                          ? 'rgba(16, 185, 129, 0.08)' 
                          : (isToday ? 'rgba(59, 130, 246, 0.03)' : 'var(--bg-surface)'),
                        transition: 'all 0.3s ease',
                        cursor: isPast ? 'default' : 'grab'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {!isPast && <GripVertical size={14} style={{ color: 'var(--text-muted)', cursor: 'grab' }} />}
                            <h4 style={{ fontWeight: 700, fontSize: '1rem', color: isToday ? '#3b82f6' : 'var(--text-primary)' }}>{day}</h4>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {cardDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {daySubjects.length > 0 && (
                            <span style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              padding: '4px 8px',
                              borderRadius: '6px',
                              textTransform: 'uppercase',
                              background: dayStatus === 'Published' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                              color: dayStatus === 'Published' ? '#34d399' : '#fbbf24',
                              border: dayStatus === 'Published' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                              boxShadow: dayStatus === 'Published' ? '0 0 10px rgba(16, 185, 129, 0.1)' : '0 0 10px rgba(245, 158, 11, 0.1)'
                            }}>
                              {dayStatus}
                            </span>
                          )}
                          <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)' }}>
                            {daySubjects.length} {daySubjects.length === 1 ? 'Period' : 'Periods'}
                          </span>
                        </div>
                      </div>

                      {/* Subject List for this day */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '220px' }}>
                        {daySubjects.length === 0 ? (
                          <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '20px' }}>
                            No periods scheduled.
                          </div>
                        ) : (
                          daySubjects.map((item, index) => {
                            const subjectName = typeof item === 'object' ? item.subject : item;
                            const teacherName = typeof item === 'object' ? item.teacher_name : '';
                            
                            const periodBadge = (() => {
                              if (!daySchedule) return null;
                              if (daySchedule.status !== 'Published') return null;
                              
                              const saved = Array.isArray(daySchedule.subjects) ? daySchedule.subjects : [];
                              const matchedSavedIndices = new Set();
                              let currentBadge = null;
                              
                              for (let i = 0; i <= index; i++) {
                                const p = daySubjects[i];
                                if (!p) continue;
                                const pSub = typeof p === 'object' ? p.subject : p;
                                const pTeach = typeof p === 'object' ? p.teacher_id : null;
                                
                                const exactSameIndex = saved[i];
                                if (exactSameIndex) {
                                  const sSub = typeof exactSameIndex === 'object' ? exactSameIndex.subject : exactSameIndex;
                                  const sTeach = typeof exactSameIndex === 'object' ? exactSameIndex.teacher_id : null;
                                  if (pSub === sSub && parseInt(pTeach) === parseInt(sTeach)) {
                                    matchedSavedIndices.add(i);
                                    if (i === index) currentBadge = null;
                                    continue;
                                  }
                                }
                                
                                let foundExactMatch = false;
                                for (let j = 0; j < saved.length; j++) {
                                  if (matchedSavedIndices.has(j)) continue;
                                  const s = saved[j];
                                  const sSub = typeof s === 'object' ? s.subject : s;
                                  const sTeach = typeof s === 'object' ? s.teacher_id : null;
                                  if (pSub === sSub && parseInt(pTeach) === parseInt(sTeach)) {
                                    matchedSavedIndices.add(j);
                                    foundExactMatch = true;
                                    break;
                                  }
                                }
                                
                                if (foundExactMatch) {
                                  if (i === index) currentBadge = null;
                                  continue;
                                }
                                
                                if (i === index) {
                                  if (i < saved.length) {
                                    currentBadge = 'UPDATED';
                                  } else {
                                    currentBadge = 'NEW';
                                  }
                                }
                              }
                              return currentBadge;
                            })();

                            return (
                              <div 
                                key={index} 
                                style={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between', 
                                  alignItems: 'center', 
                                  padding: '8px 12px', 
                                  background: 'rgba(255, 255, 255, 0.02)', 
                                  border: '1px solid var(--border-color)', 
                                  borderRadius: 'var(--radius-sm)',
                                  fontSize: '0.85rem'
                                }}
                              >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Period {index + 1}: {subjectName}</span>
                                    {periodBadge && (
                                      <span style={{
                                        fontSize: '0.6rem',
                                        fontWeight: 700,
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        textTransform: 'uppercase',
                                        background: periodBadge === 'NEW' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                                        color: periodBadge === 'NEW' ? '#22d3ee' : '#fbbf24',
                                        border: periodBadge === 'NEW' ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                                        letterSpacing: '0.05em'
                                      }}>
                                        {periodBadge}
                                      </span>
                                    )}
                                  </div>
                                  {teacherName && (
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Taught by: {teacherName}</span>
                                  )}
                                </div>
                                {!isPast && isCurrentYearActive() && (
                                  <button
                                    onClick={() => {
                                      const updated = scheduleForm[day].filter((_, i) => i !== index);
                                      setScheduleForm(prev => ({
                                        ...prev,
                                        [day]: updated
                                      }));
                                      autoSaveDaySchedule(day, updated, 'Draft');
                                    }}
                                    style={{ 
                                      background: 'none', 
                                      border: 'none', 
                                      color: '#ef4444', 
                                      cursor: 'pointer',
                                      padding: '4px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      borderRadius: '4px',
                                      transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    title="Remove period"
                                  >
                                    <X size={14} />
                                  </button>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Add subject and teacher selector for this day (Only if not past) */}
                      {!isPast && isCurrentYearActive() ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <select
                              className="erp-input"
                              style={{ flex: 1, padding: '4px 8px', fontSize: '0.8rem' }}
                              value={selectedDaySubject[day] || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setSelectedDaySubject(prev => ({ ...prev, [day]: val }));
                              }}
                            >
                              <option value="">Select Subject</option>
                              {subjects.map(s => (
                                <option key={s.id} value={s.name}>{s.name}</option>
                              ))}
                            </select>

                            <select
                              className="erp-input"
                              style={{ flex: 1, padding: '4px 8px', fontSize: '0.8rem' }}
                              value={selectedDayTeacher[day] || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setSelectedDayTeacher(prev => ({ ...prev, [day]: val }));
                              }}
                            >
                              <option value="">Select Teacher</option>
                              {teachers.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                              ))}
                            </select>
                          </div>
                          <button
                            type="button"
                            className="btn-primary"
                            style={{ width: '100%', padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                            onClick={() => {
                              const subName = selectedDaySubject[day];
                              const teachId = selectedDayTeacher[day];
                              if (!subName) {
                                showToast("Please select a subject", "error");
                                  return;
                              }
                              const teacherObj = teachers.find(t => t.id === parseInt(teachId));
                              const newPeriod = {
                                subject: subName,
                                teacher_id: teacherObj ? teacherObj.id : null,
                                teacher_name: teacherObj ? teacherObj.name : 'Unassigned'
                              };
                              const updated = [...(scheduleForm[day] || []), newPeriod];
                              setScheduleForm(prev => ({
                                ...prev,
                                [day]: updated
                              }));
                              setSelectedDaySubject(prev => ({ ...prev, [day]: '' }));
                              setSelectedDayTeacher(prev => ({ ...prev, [day]: '' }));
                              autoSaveDaySchedule(day, updated, 'Draft');
                            }}
                          >
                            <Plus size={14} /> Add Period
                          </button>
                          
                          {/* Day-specific publish action */}
                          <div style={{ display: 'flex', marginTop: '6px' }}>
                            <button
                              type="button"
                              className={dayStatus === 'Published' ? "btn-outline" : "btn-primary"}
                              disabled={dayStatus === 'Published'}
                              style={{ 
                                width: '100%', 
                                padding: '6px 12px', 
                                fontSize: '0.8rem', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                opacity: dayStatus === 'Published' ? 0.6 : 1,
                                cursor: dayStatus === 'Published' ? 'not-allowed' : 'pointer',
                                background: dayStatus === 'Published' ? 'rgba(255, 255, 255, 0.05)' : 'var(--color-primary)',
                                color: dayStatus === 'Published' ? 'var(--text-muted)' : '#ffffff',
                                borderColor: dayStatus === 'Published' ? 'var(--border-color)' : 'transparent'
                              }}
                              title={dayStatus === 'Published' ? "All periods are already published" : ""}
                              onClick={() => handleSaveDaySchedule(day, 'Published')}
                            >
                              {dayStatus === 'Published' ? "Already Published" : "Publish"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                          <Lock size={12} /> Schedule locked (Past day)
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>


            </div>
          )}

          {/* TAB 8: Admin Profile */}
          {activeTab === 'profile' && renderAdminProfileTab()}
            </>
          )}
        </div>
      </div>

      {/* --- ADD FACULTY MODAL --- */}
      {showAddTeacherModal && (
        <div className="modal-overlay" onClick={() => { setShowAddTeacherModal(false); setEditingTeacher(null); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem' }}>{editingTeacher ? 'Edit Faculty Profile' : 'Add New Faculty Member'}</h3>
              <button onClick={() => { setShowAddTeacherModal(false); setEditingTeacher(null); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleAddTeacherSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Photo Upload Area */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.01)' }}>
                <img 
                  src={tForm.profile_image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"} 
                  alt="Preview" 
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary)' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Profile Photo</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      type="button" 
                      className="btn-outline" 
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      onClick={() => document.getElementById('teacher-photo-upload').click()}
                    >
                      Upload Photo
                    </button>
                    {tForm.profile_image && (
                      <button 
                        type="button" 
                        className="btn-outline" 
                        style={{ padding: '4px 10px', fontSize: '0.75rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                        onClick={() => setTForm({...tForm, profile_image: ''})}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input 
                    id="teacher-photo-upload" 
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setTForm({...tForm, profile_image: reader.result});
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="t-name" className="form-label">Full Name</label>
                  <input id="t-name" type="text" className="erp-input" value={tForm.name} onChange={(e) => setTForm({...tForm, name: e.target.value})} required />
                </div>
                <div>
                  <label htmlFor="t-gender" className="form-label">Gender</label>
                  <select
                    id="t-gender"
                    value={tForm.gender}
                    onChange={(e) => setTForm({...tForm, gender: e.target.value})}
                    className="erp-input"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="t-subject" className="form-label">Subject Dept</label>
                  <input id="t-subject" type="text" className="erp-input" placeholder="e.g. Mathematics" value={tForm.subject} onChange={(e) => setTForm({...tForm, subject: e.target.value})} required />
                </div>
                <div>
                  <label htmlFor="t-phone" className="form-label">Phone Number</label>
                  <input id="t-phone" type="text" className="erp-input" value={tForm.phone} onChange={(e) => setTForm({...tForm, phone: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="t-email" className="form-label">Email Address</label>
                  <input id="t-email" type="email" className="erp-input" value={tForm.email} onChange={(e) => setTForm({...tForm, email: e.target.value})} />
                </div>
                <div>
                  <label htmlFor="t-qual" className="form-label">Qualification</label>
                  <input id="t-qual" type="text" className="erp-input" value={tForm.qualification} onChange={(e) => setTForm({...tForm, qualification: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="t-experience" className="form-label">Experience</label>
                  <input id="t-experience" type="text" className="erp-input" placeholder="e.g. 5 Years" value={tForm.experience || ''} onChange={(e) => setTForm({...tForm, experience: e.target.value})} />
                </div>
                <div>
                  <label htmlFor="t-salary" className="form-label">Base Salary ($)</label>
                  <input id="t-salary" type="number" className="erp-input" value={tForm.salary_amount} onChange={(e) => setTForm({...tForm, salary_amount: parseFloat(e.target.value) || 0})} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="t-aadhaar" className="form-label">Aadhaar Number (12 digits)</label>
                  <input id="t-aadhaar" type="text" placeholder="123456789012" className="erp-input" value={tForm.aadhaar_number} onChange={(e) => setTForm({...tForm, aadhaar_number: e.target.value})} />
                </div>
                <div>
                  <label htmlFor="t-pan" className="form-label">PAN Number (e.g. ABCDE1234F)</label>
                  <input id="t-pan" type="text" placeholder="ABCDE1234F" className="erp-input" value={tForm.pan_number} onChange={(e) => setTForm({...tForm, pan_number: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="t-join" className="form-label">Joining Date *</label>
                  <input id="t-join" type="date" className="erp-input" value={tForm.joining_date} onChange={(e) => setTForm({...tForm, joining_date: e.target.value})} required />
                </div>
                <div>
                  <label htmlFor="t-exit" className="form-label">Exit Date (Optional)</label>
                  <input id="t-exit" type="date" className="erp-input" value={tForm.exit_date} onChange={(e) => setTForm({...tForm, exit_date: e.target.value})} />
                </div>
              </div>

              <div>
                <label htmlFor="t-address" className="form-label">Home Address</label>
                <input id="t-address" type="text" className="erp-input" value={tForm.address} onChange={(e) => setTForm({...tForm, address: e.target.value})} />
              </div>

              {/* Document Management Section */}
              <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>Document Attachments</h4>
                
                {/* Upload Controls */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1', minWidth: '150px' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Select Document Type</label>
                    <select
                      id="upload-doc-type"
                      className="erp-input"
                      style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                      defaultValue=""
                    >
                      <option value="">-- Choose Type --</option>
                      <option value="Aadhaar Card">Aadhaar Card</option>
                      <option value="PAN Card">PAN Card</option>
                      <option value="Resume / CV">Resume / CV</option>
                      <option value="Educational Certificates">Educational Certificates</option>
                      <option value="Experience Certificates">Experience Certificates</option>
                      <option value="Offer Letter">Offer Letter</option>
                      <option value="Joining Letter">Joining Letter</option>
                      <option value="Relieving Letter">Relieving Letter</option>
                      <option value="Other Documents">Other Documents</option>
                    </select>
                  </div>
                  
                  <div style={{ flex: '1', minWidth: '150px' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Choose File</label>
                    <input
                      id="upload-doc-file"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="erp-input"
                      style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        const docType = document.getElementById('upload-doc-type').value;
                        if (!file) return;
                        if (!docType) {
                          alert("Please select a Document Type first.");
                          e.target.value = "";
                          return;
                        }
                        
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const base64data = reader.result;
                          const newDoc = {
                            id: Date.now() + Math.random(),
                            type: docType,
                            name: file.name,
                            url: base64data,
                            uploaded_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
                          };
                          
                          setTForm(prev => {
                            const filtered = prev.documents.filter(d => d.type !== docType);
                            return {
                              ...prev,
                              documents: [...filtered, newDoc]
                            };
                          });
                          
                          document.getElementById('upload-doc-type').value = "";
                          e.target.value = "";
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </div>
                </div>

                {/* Uploaded Documents List */}
                {tForm.documents && tForm.documents.length > 0 ? (
                  <div className="erp-table-container" style={{ maxHeight: '180px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                    <table className="erp-table" style={{ fontSize: '0.8rem' }}>
                      <thead>
                        <tr>
                          <th>Document Type</th>
                          <th>File Name</th>
                          <th>Uploaded</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tForm.documents.map((doc) => (
                          <tr key={doc.id}>
                            <td style={{ fontWeight: 600 }}>{doc.type}</td>
                            <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</td>
                            <td style={{ color: 'var(--text-muted)' }}>{doc.uploaded_at.split(' ')[0]}</td>
                            <td style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', border: 'none' }}>
                              <button
                                type="button"
                                className="btn-outline"
                                style={{ padding: '2px 6px', fontSize: '0.7rem' }}
                                onClick={() => {
                                  const win = window.open();
                                  if (win) {
                                    win.document.write(`<iframe src="${doc.url}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                                  } else {
                                    alert("Pop-up blocked. Please allow pop-ups to view document.");
                                  }
                                }}
                              >
                                View
                              </button>
                              <a
                                href={doc.url}
                                download={doc.name}
                                className="btn-outline"
                                style={{ padding: '2px 6px', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
                              >
                                Download
                              </a>
                              <button
                                type="button"
                                className="btn-outline"
                                style={{ padding: '2px 6px', fontSize: '0.7rem', color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}
                                onClick={() => {
                                  setTForm(prev => ({
                                    ...prev,
                                    documents: prev.documents.filter(d => d.id !== doc.id)
                                  }));
                                }}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', padding: '12px', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                    No documents attached yet.
                  </div>
                )}
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '10px', justifyContent: 'center' }}>Save Faculty Profile</button>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT STUDENT MODAL --- */}
      {showAddStudentModal && (
        <div className="modal-overlay" onClick={() => { setShowAddStudentModal(false); setEditingStudent(null); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem' }}>
                {editingStudent ? 'Edit Student Profile' : `Admit Student - ${getClassName(selectedClassId)}`}
              </h3>
              <button onClick={() => { setShowAddStudentModal(false); setEditingStudent(null); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleAddStudentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Photo Upload/Remove Area */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.01)' }}>
                <img 
                  src={getStudentAvatar(sForm)} 
                  alt="Preview" 
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary)' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Profile Photo</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      type="button" 
                      className="btn-outline" 
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      onClick={() => document.getElementById('student-photo-upload').click()}
                    >
                      Upload Photo
                    </button>
                    {sForm.profile_image && (
                      <button 
                        type="button" 
                        className="btn-outline" 
                        style={{ padding: '4px 10px', fontSize: '0.75rem', borderColor: '#ef4444', color: '#ef4444' }}
                        onClick={() => setSForm({...sForm, profile_image: ''})}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input 
                    id="student-photo-upload" 
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setSForm(prev => ({ ...prev, profile_image: reader.result }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>

              {/* 1. Student Name & Roll Number */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="s-name" className="form-label">Student Name</label>
                  <input 
                    id="s-name" 
                    type="text" 
                    className="erp-input" 
                    value={sForm.name} 
                    onChange={(e) => {
                      setSForm({...sForm, name: e.target.value, class_id: selectedClassId});
                      if (sErrors.name) setSErrors({...sErrors, name: null});
                    }} 
                    required 
                  />
                  {sErrors.name && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.name}</div>}
                </div>
                <div>
                  <label htmlFor="s-roll" className="form-label">Roll Number</label>
                  <input 
                    id="s-roll" 
                    type="text" 
                    className="erp-input" 
                    value={sForm.roll_number} 
                    onChange={(e) => {
                      setSForm({...sForm, roll_number: e.target.value});
                      if (sErrors.roll_number) setSErrors({...sErrors, roll_number: null});
                    }} 
                    required 
                  />
                  {sErrors.roll_number && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.roll_number}</div>}
                </div>
              </div>

              {/* 2. Father's Name & Mother's Name */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="s-father" className="form-label">Father's Name</label>
                  <input 
                    id="s-father" 
                    type="text" 
                    className="erp-input" 
                    value={sForm.father_name || ''} 
                    onChange={(e) => {
                      setSForm({...sForm, father_name: e.target.value});
                      if (sErrors.father_name) setSErrors({...sErrors, father_name: null});
                    }} 
                    required 
                  />
                  {sErrors.father_name && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.father_name}</div>}
                </div>
                <div>
                  <label htmlFor="s-mother" className="form-label">Mother's Name</label>
                  <input 
                    id="s-mother" 
                    type="text" 
                    className="erp-input" 
                    value={sForm.mother_name || ''} 
                    onChange={(e) => {
                      setSForm({...sForm, mother_name: e.target.value});
                      if (sErrors.mother_name) setSErrors({...sErrors, mother_name: null});
                    }} 
                    required 
                  />
                  {sErrors.mother_name && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.mother_name}</div>}
                </div>
              </div>

              {/* 3. Admission Date & Date of Birth */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="s-admission-date" className="form-label">Admission Date</label>
                  <input 
                    id="s-admission-date" 
                    type="date" 
                    className="erp-input" 
                    value={sForm.admission_date || ''} 
                    onChange={(e) => {
                      setSForm({...sForm, admission_date: e.target.value});
                      if (sErrors.admission_date) setSErrors({...sErrors, admission_date: null});
                    }} 
                    required 
                  />
                  {sErrors.admission_date && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.admission_date}</div>}
                </div>
                <div>
                  <label htmlFor="s-dob" className="form-label">Date of Birth</label>
                  <input 
                    id="s-dob" 
                    type="date" 
                    className="erp-input" 
                    value={sForm.date_of_birth || ''} 
                    onChange={(e) => {
                      setSForm({...sForm, date_of_birth: e.target.value});
                      if (sErrors.date_of_birth) setSErrors({...sErrors, date_of_birth: null});
                    }} 
                    required 
                  />
                  {sErrors.date_of_birth && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.date_of_birth}</div>}
                </div>
              </div>

              {/* 4. Gender & Blood Group */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="s-gender" className="form-label">Gender</label>
                  <select 
                    id="s-gender" 
                    className="erp-input" 
                    value={sForm.gender || 'Male'} 
                    onChange={(e) => setSForm({...sForm, gender: e.target.value})}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="s-blood" className="form-label">Blood Group</label>
                  <select 
                    id="s-blood" 
                    className="erp-input" 
                    value={sForm.blood_group || ''} 
                    onChange={(e) => setSForm({...sForm, blood_group: e.target.value})}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              {/* 5. Phone Number & Email Address */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="s-phone" className="form-label">Contact</label>
                  <input 
                    id="s-phone" 
                    type="text" 
                    className="erp-input" 
                    value={sForm.phone || ''} 
                    onChange={(e) => {
                      setSForm({...sForm, phone: e.target.value});
                      if (sErrors.phone) setSErrors({...sErrors, phone: null});
                    }} 
                  />
                  {sErrors.phone && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.phone}</div>}
                </div>
                <div>
                  <label htmlFor="s-email" className="form-label">Email Address</label>
                  <input 
                    id="s-email" 
                    type="email" 
                    className="erp-input" 
                    value={sForm.email || ''} 
                    onChange={(e) => {
                      setSForm({...sForm, email: e.target.value});
                      if (sErrors.email) setSErrors({...sErrors, email: null});
                    }} 
                  />
                  {sErrors.email && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.email}</div>}
                </div>
              </div>

              {/* 6. Emergency Contact Phone & Aadhaar Number */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="s-contact" className="form-label">Emergency Phone</label>
                  <input 
                    id="s-contact" 
                    type="text" 
                    className="erp-input" 
                    value={sForm.emergency_contact || ''} 
                    onChange={(e) => {
                      setSForm({...sForm, emergency_contact: e.target.value});
                      if (sErrors.emergency_contact) setSErrors({...sErrors, emergency_contact: null});
                    }} 
                  />
                  {sErrors.emergency_contact && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.emergency_contact}</div>}
                </div>
                <div>
                  <label htmlFor="s-aadhaar" className="form-label">Aadhaar Number</label>
                  <input 
                    id="s-aadhaar" 
                    type="text" 
                    className="erp-input" 
                    value={sForm.aadhaar_number || ''} 
                    onChange={(e) => {
                      setSForm({...sForm, aadhaar_number: e.target.value});
                      if (sErrors.aadhaar_number) setSErrors({...sErrors, aadhaar_number: null});
                    }} 
                    required 
                  />
                  {sErrors.aadhaar_number && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.aadhaar_number}</div>}
                </div>
              </div>

              {/* 7. Home Address & SR No. */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="s-address" className="form-label">Home Address</label>
                  <textarea 
                    id="s-address" 
                    className="erp-input" 
                    value={sForm.address || ''} 
                    onChange={(e) => {
                      setSForm({...sForm, address: e.target.value});
                      if (sErrors.address) setSErrors({...sErrors, address: null});
                    }} 
                    required 
                    rows={1}
                    style={{ 
                      width: '100%', 
                      minHeight: '38px', 
                      resize: 'none',
                      overflowY: 'hidden',
                      paddingTop: '8px',
                      paddingBottom: '8px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Enter home address"
                  />
                  {sErrors.address && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.address}</div>}
                </div>
                <div>
                  <label htmlFor="s-sr-no" className="form-label">SR No.</label>
                  <input 
                    id="s-sr-no" 
                    type="text" 
                    className="erp-input" 
                    value={sForm.sr_no || ''} 
                    onChange={(e) => {
                      setSForm({...sForm, sr_no: e.target.value});
                      if (sErrors.sr_no) setSErrors({...sErrors, sr_no: null});
                    }} 
                    required 
                    style={{ height: '38px', width: '100%' }}
                  />
                  {sErrors.sr_no && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.sr_no}</div>}
                </div>
              </div>

              {/* 7.5. Nationality & Caste */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="s-nationality" className="form-label">Nationality</label>
                  <select
                    id="s-nationality"
                    className="erp-input"
                    value={sForm.nationality || 'Indian'}
                    onChange={(e) => {
                      setSForm({...sForm, nationality: e.target.value});
                      if (sErrors.nationality) setSErrors({...sErrors, nationality: null});
                    }}
                    required
                    style={{ height: '38px', width: '100%' }}
                  >
                    <option value="Indian">Indian</option>
                    <option value="Afghan">Afghan</option>
                    <option value="American">American</option>
                    <option value="Australian">Australian</option>
                    <option value="Bangladeshi">Bangladeshi</option>
                    <option value="British">British</option>
                    <option value="Canadian">Canadian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Indonesian">Indonesian</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Kuwaiti">Kuwaiti</option>
                    <option value="Malaysian">Malaysian</option>
                    <option value="Nepalese">Nepalese</option>
                    <option value="New Zealander">New Zealander</option>
                    <option value="Omani">Omani</option>
                    <option value="Pakistani">Pakistani</option>
                    <option value="Qatari">Qatari</option>
                    <option value="Saudi">Saudi</option>
                    <option value="Singaporean">Singaporean</option>
                    <option value="South African">South African</option>
                    <option value="Sri Lankan">Sri Lankan</option>
                    <option value="UAE National">UAE National</option>
                    <option value="Other">Other</option>
                  </select>
                  {sErrors.nationality && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.nationality}</div>}
                </div>
                <div>
                  <label htmlFor="s-caste" className="form-label">Caste (Optional)</label>
                  <input
                    id="s-caste"
                    type="text"
                    placeholder="Enter caste"
                    className="erp-input"
                    value={sForm.caste || ''}
                    onChange={(e) => {
                      setSForm({...sForm, caste: e.target.value});
                      if (sErrors.caste) setSErrors({...sErrors, caste: null});
                    }}
                    style={{ height: '38px', width: '100%' }}
                  />
                  {sErrors.caste && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.caste}</div>}
                </div>
              </div>

              {/* 8. Country, State & City */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="s-country" className="form-label">Country</label>
                  <select
                    id="s-country"
                    className="erp-input"
                    value={sForm.country || ''}
                    onChange={(e) => {
                      const country = e.target.value;
                      setSForm({ ...sForm, country, state: '', city: '' });
                      if (sErrors.country) setSErrors({...sErrors, country: null});
                    }}
                    required
                  >
                    <option value="">-- Country --</option>
                    {Object.keys(LOCATION_DATA).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {sErrors.country && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.country}</div>}
                </div>
                
                <div>
                  <label htmlFor="s-state" className="form-label">State</label>
                  <select
                    id="s-state"
                    className="erp-input"
                    value={sForm.state || ''}
                    disabled={!sForm.country}
                    onChange={(e) => {
                      const state = e.target.value;
                      setSForm({ ...sForm, state, city: '' });
                      if (sErrors.state) setSErrors({...sErrors, state: null});
                    }}
                    required
                  >
                    <option value="">-- State --</option>
                    {sForm.country && Object.keys(LOCATION_DATA[sForm.country] || {}).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {sErrors.state && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.state}</div>}
                </div>

                <div>
                  <label htmlFor="s-city" className="form-label">City</label>
                  <select
                    id="s-city"
                    className="erp-input"
                    value={sForm.city || ''}
                    disabled={!sForm.state}
                    onChange={(e) => {
                      setSForm({ ...sForm, city: e.target.value });
                      if (sErrors.city) setSErrors({...sErrors, city: null});
                    }}
                    required
                  >
                    <option value="">-- City --</option>
                    {sForm.country && sForm.state && (LOCATION_DATA[sForm.country][sForm.state] || []).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {sErrors.city && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{sErrors.city}</div>}
                </div>
              </div>

              {/* 9. Section */}
              <div>
                <label htmlFor="s-group-name" className="form-label">Section (Optional)</label>
                <input 
                  id="s-group-name" 
                  type="text" 
                  placeholder="e.g. Section A, Section B" 
                  className="erp-input" 
                  value={sForm.group_name || ''} 
                  onChange={(e) => setSForm({...sForm, group_name: e.target.value})} 
                />
              </div>

              {/* Document Management Section */}
              <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>Student Documents</h4>
                
                {/* Upload Controls */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1', minWidth: '150px' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Select Document Type</label>
                    <select
                      id="upload-student-doc-type"
                      className="erp-input"
                      style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                      defaultValue=""
                    >
                      <option value="">-- Choose Type --</option>
                      <option value="Birth Certificate">Birth Certificate</option>
                      <option value="Aadhaar Card">Aadhaar Card</option>
                      <option value="Transfer Certificate (TC)">Transfer Certificate (TC)</option>
                      <option value="Caste Certificate">Caste Certificate</option>
                      <option value="Income Certificate">Income Certificate</option>
                      <option value="Residence Certificate">Residence Certificate</option>
                      <option value="Previous School Marksheet">Previous School Marksheet</option>
                      <option value="Passport Size Photograph">Passport Size Photograph</option>
                      <option value="Migration Certificate">Migration Certificate</option>
                      <option value="Character Certificate">Character Certificate</option>
                      <option value="Medical Certificate">Medical Certificate</option>
                      <option value="Other Supporting Documents">Other Supporting Documents</option>
                    </select>
                  </div>
                  
                  <div style={{ flex: '1', minWidth: '150px' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Choose File (PDF, JPG, PNG)</label>
                    <input
                      id="upload-student-doc-file"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="erp-input"
                      style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        const docType = document.getElementById('upload-student-doc-type').value;
                        if (!file) return;
                        if (!docType) {
                          alert("Please select a Document Type first.");
                          e.target.value = "";
                          return;
                        }
                        
                        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
                        if (!allowedTypes.includes(file.type)) {
                          alert("Only PDF, JPG, JPEG, and PNG formats are allowed.");
                          e.target.value = "";
                          return;
                        }
                        
                        const maxSize = 5 * 1024 * 1024;
                        if (file.size > maxSize) {
                          alert("File size exceeds 5MB limit.");
                          e.target.value = "";
                          return;
                        }
                        
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const base64data = reader.result;
                          const newDoc = {
                            id: Date.now() + Math.random(),
                            type: docType,
                            name: file.name,
                            url: base64data,
                            size_str: (file.size / 1024).toFixed(1) + " KB",
                            uploaded_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
                          };
                          
                          setSForm(prev => {
                            const currentDocs = prev.documents || [];
                            const filtered = currentDocs.filter(d => d.type !== docType);
                            return {
                              ...prev,
                              documents: [...filtered, newDoc]
                            };
                          });
                          
                          document.getElementById('upload-student-doc-type').value = "";
                          e.target.value = "";
                          showToast(`${docType} attached successfully!`, 'success');
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </div>
                </div>

                {/* Uploaded Documents List */}
                {sForm.documents && sForm.documents.length > 0 ? (
                  <div className="erp-table-container" style={{ maxHeight: '180px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                    <table className="erp-table" style={{ fontSize: '0.8rem' }}>
                      <thead>
                        <tr>
                          <th>Document Type</th>
                          <th>File Name</th>
                          <th>Uploaded</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sForm.documents.map((doc) => (
                          <tr key={doc.id}>
                            <td style={{ fontWeight: 600 }}>{doc.type}</td>
                            <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={doc.name}>{doc.name}</td>
                            <td style={{ color: 'var(--text-muted)' }}>{doc.uploaded_at.split(' ')[0]}</td>
                            <td style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', border: 'none' }}>
                              <button
                                type="button"
                                className="btn-outline"
                                style={{ padding: '2px 6px', fontSize: '0.7rem' }}
                                onClick={() => {
                                  const win = window.open();
                                  if (win) {
                                    win.document.write(`<iframe src="${doc.url}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                                  } else {
                                    alert("Pop-up blocked. Please allow pop-ups to view document.");
                                  }
                                }}
                              >
                                View
                              </button>
                              <a
                                href={doc.url}
                                download={doc.name}
                                className="btn-outline"
                                style={{ padding: '2px 6px', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
                              >
                                Download
                              </a>
                              <button
                                type="button"
                                className="btn-outline"
                                style={{ padding: '2px 6px', fontSize: '0.7rem', color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}
                                onClick={() => {
                                  setSForm(prev => ({
                                    ...prev,
                                    documents: prev.documents.filter(d => d.id !== doc.id)
                                  }));
                                }}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', padding: '12px', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                    No documents attached yet.
                  </div>
                )}
              </div>

              {actionError && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{actionError}</div>}
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ marginTop: '10px', justifyContent: 'center' }} 
                disabled={isSavingStudent}
              >
                {isSavingStudent ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span 
                      style={{ 
                        border: '2px solid rgba(255,255,255,0.2)', 
                        borderTop: '2px solid white', 
                        borderRadius: '50%', 
                        width: '14px', 
                        height: '14px', 
                        animation: 'spin 0.8s linear infinite' 
                      }}
                    ></span>
                    Saving...
                  </span>
                ) : 'Save details'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- CREATE CLASS MODAL --- */}
      {showCreateClassModal && (
        <div className="modal-overlay" onClick={() => setShowCreateClassModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem' }}>Create New Classroom</h3>
              <button onClick={() => setShowCreateClassModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddClass(newClassForm.name, newClassForm.room, newClassForm.groups);
              setShowCreateClassModal(false);
              setNewClassForm({ name: '', room: '', groups: [] });
            }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="c-name" className="form-label">Class Name</label>
                <input 
                  id="c-name" 
                  type="text" 
                  placeholder="e.g. Class 1 or BCA 1st Year"
                  className="erp-input" 
                  value={newClassForm.name} 
                  onChange={(e) => setNewClassForm({...newClassForm, name: e.target.value})} 
                  required 
                />
              </div>
              <div>
                <label htmlFor="c-room" className="form-label">Room Number / Location</label>
                <input 
                  id="c-room" 
                  type="text" 
                  placeholder="e.g. Room 101"
                  className="erp-input" 
                  value={newClassForm.room} 
                  onChange={(e) => setNewClassForm({...newClassForm, room: e.target.value})} 
                />
              </div>

              {/* Section Management Section */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>Optional Sections</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  Add sections (e.g. Section A, Section B) if this class is divided into sections. Press Enter or click Add.
                </p>
                
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <input 
                    id="new-group-name"
                    type="text" 
                    placeholder="Type section name..." 
                    className="erp-input"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = e.target.value.trim();
                        if (!val) return;
                        if (newClassForm.groups.some(g => g.toLowerCase() === val.toLowerCase())) {
                          alert("Duplicate section name in class!");
                          return;
                        }
                        setNewClassForm({ ...newClassForm, groups: [...newClassForm.groups, val] });
                        e.target.value = '';
                      }
                    }}
                  />
                  <button 
                    type="button"
                    className="btn-outline"
                    onClick={() => {
                      const input = document.getElementById('new-group-name');
                      const val = input.value.trim();
                      if (!val) return;
                      if (newClassForm.groups.some(g => g.toLowerCase() === val.toLowerCase())) {
                        alert("Duplicate section name in class!");
                        return;
                      }
                      setNewClassForm({ ...newClassForm, groups: [...newClassForm.groups, val] });
                      input.value = '';
                    }}
                  >
                    Add
                  </button>
                </div>

                {newClassForm.groups.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    {newClassForm.groups.map((g, idx) => (
                      <span key={idx} className="badge badge-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
                        {g}
                        <button 
                          type="button" 
                          onClick={() => setNewClassForm({ ...newClassForm, groups: newClassForm.groups.filter((_, i) => i !== idx) })}
                          style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '10px', justifyContent: 'center' }}>Create Classroom</button>
            </form>
          </div>
        </div>
      )}

      {/* --- RECEIPT MODAL --- */}
      {receiptRecord && receiptStudent && (
        <div className="modal-overlay" onClick={() => { setReceiptRecord(null); setReceiptStudent(null); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div id="receipt-print-area" className="receipt-box">
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>TUITION FEE INVOICE RECEIPT</h3>
                <p>BN SCHOOL ERP PORTAL SYSTEM</p>
                <p>---------------------------------</p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                <div><strong>STUDENT NAME:</strong> {receiptStudent.name}</div>
                <div><strong>CLASSROOM SECTION:</strong> {getClassName(receiptStudent.class_id)}</div>
                <div><strong>SR NO:</strong> {receiptStudent.sr_no || 'N/A'}</div>
                <div><strong>INVOICE TRANSACTION ID:</strong> {(() => {
                  const schoolPart = String(schoolId || 1).padStart(2, '0').slice(-2);
                  const studentPart = String(receiptStudent.id || 1).padStart(4, '0').slice(-4);
                  const recordPart = String(receiptRecord.id || 1).padStart(6, '0').slice(-6);
                  return `${schoolPart}${studentPart}${recordPart}`;
                })()}</div>
                <div><strong>ACADEMIC SESSION:</strong> {getActiveYearRange()}</div>
                <div><strong>BILLING MONTH:</strong> {receiptRecord.month}</div>
                <div><strong>DUE DEADLINE DATE:</strong> {formatDate(receiptRecord.due_date)}</div>
                <div><strong>RECEIPT PAYMENT DATE:</strong> {formatDate(receiptRecord.payment_date)}</div>
                <p>---------------------------------</p>
                <div style={{ display: 'flex', justifyBetween: 'space-between', fontWeight: 'bold', fontSize: '1rem' }}>
                  <span>TUITION AMOUNT:</span>
                  <span>{formatMoney(receiptRecord.amount)}</span>
                </div>
                <div style={{ display: 'flex', justifyBetween: 'space-between', fontWeight: 'bold' }}>
                  <span>TRANSACTION STATUS:</span>
                  <span style={{ color: '#10b981' }}>PAID / RECEIVED</span>
                </div>
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.75rem' }}>
                <p>This is a computer generated receipt.</p>
                <p>Thank you for your payment!</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '12px' }}>
              <button onClick={handleDownloadPDF} className="btn-primary" style={{ backgroundColor: 'var(--color-secondary)', borderColor: 'var(--color-secondary)' }}>
                <Download size={14} /> Download PDF
              </button>
              <button onClick={() => window.print()} className="btn-primary">
                <Printer size={14} /> Print Receipt
              </button>
              <button onClick={() => { setReceiptRecord(null); setReceiptStudent(null); }} className="btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
              {/* Schedule Copy Confirmation Modal */}
              {scheduleCopyConfirm && (
                <div className="modal-overlay" onClick={() => setScheduleCopyConfirm(null)}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center', padding: '32px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'rgba(245, 158, 11, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#f59e0b',
                        marginBottom: '8px'
                      }}>
                        <Copy size={32} />
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Replace Schedule</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                        Replace existing schedule for {scheduleCopyConfirm.targetDay}?
                      </p>
                      
                      <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '16px' }}>
                        <button 
                          onClick={() => {
                            scheduleCopyConfirm.onConfirm();
                            setScheduleCopyConfirm(null);
                          }}
                          className="btn-primary"
                          style={{ flex: 1, justifyContent: 'center' }}
                        >
                          Replace
                        </button>
                        <button 
                          onClick={() => setScheduleCopyConfirm(null)}
                          className="btn-outline"
                          style={{ flex: 1, justifyContent: 'center' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* WhatsApp Confirm Modal */}
              {showWhatsappConfirmModal && (() => {
                const currentClass = classes.find(c => c.id === plannerClassId);
                const className = currentClass ? currentClass.name : `Class ${plannerClassId}`;
                return (
                  <div className="modal-overlay" onClick={() => setShowWhatsappConfirmModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center', padding: '32px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '50%',
                          background: 'rgba(16, 185, 129, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#10b981',
                          marginBottom: '8px'
                        }}>
                          <Bell size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Send WhatsApp Reminders</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                          Send tomorrow's schedule reminder to all parents of {className}?
                        </p>
                        
                        <div style={{
                          background: 'rgba(245, 158, 11, 0.1)',
                          border: '1px solid rgba(245, 158, 11, 0.2)',
                          borderRadius: '6px',
                          padding: '10px 14px',
                          fontSize: '0.8rem',
                          color: '#fbbf24',
                          textAlign: 'left',
                          width: '100%',
                          marginTop: '8px'
                        }}>
                          ⚠️ <strong>WhatsApp Integration Pending</strong>: The reminder engine is running in sandbox/simulation mode. No real WhatsApp messages will be delivered.
                        </div>
                        
                        <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '16px' }}>
                          <button 
                            onClick={executeSendWhatsappReminders}
                            className="btn-primary"
                            style={{ flex: 1, justifyContent: 'center', backgroundColor: '#10b981', borderColor: '#10b981' }}
                          >
                            Send Reminders
                          </button>
                          <button 
                            onClick={() => setShowWhatsappConfirmModal(false)}
                            className="btn-outline"
                            style={{ flex: 1, justifyContent: 'center' }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* WhatsApp Progress Modal */}
              {showWhatsappProgressModal && (
                <div className="modal-overlay">
                  <div className="modal-content" style={{ maxWidth: '600px', padding: '32px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      📲 WhatsApp Schedule Reminders
                    </h3>
                    
                    <div style={{
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                      borderRadius: '6px',
                      padding: '10px 14px',
                      fontSize: '0.8rem',
                      color: '#fbbf24',
                      marginBottom: '20px'
                    }}>
                      ⚠️ <strong>Sandbox Mode Active</strong>: Real-time sending is simulated. Configure a provider (Meta Cloud API, Twilio, etc.) to enable production delivery.
                    </div>
                    
                    {/* Status Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total</span>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '4px' }}>{whatsappProgress.total}</div>
                      </div>
                      <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center', color: '#10b981' }}>
                        <span style={{ fontSize: '0.75rem', color: '#10b981', opacity: 0.8 }}>Sent</span>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '4px' }}>{whatsappProgress.sent}</div>
                      </div>
                      <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)', textAlign: 'center', color: '#ef4444' }}>
                        <span style={{ fontSize: '0.75rem', color: '#ef4444', opacity: 0.8 }}>Failed</span>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '4px' }}>{whatsappProgress.failed}</div>
                      </div>
                      <div style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)', textAlign: 'center', color: '#f59e0b' }}>
                        <span style={{ fontSize: '0.75rem', color: '#f59e0b', opacity: 0.8 }}>Pending</span>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '4px' }}>{whatsappProgress.pending}</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        <span>Progress</span>
                        <span>{Math.round(((whatsappProgress.sent + whatsappProgress.failed) / (whatsappProgress.total || 1)) * 100)}%</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${((whatsappProgress.sent + whatsappProgress.failed) / (whatsappProgress.total || 1)) * 100}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #10b981, #3b82f6)',
                          transition: 'width 0.15s ease'
                        }} />
                      </div>
                    </div>

                    {/* Live Processing Queue list */}
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', maxHeight: '250px', overflowY: 'auto' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>Auditing logs / Real-time queue</h4>
                      {whatsappQueue.length === 0 ? (
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '24px' }}>
                          Initializing delivery channel...
                        </div>
                      ) : (
                        <table className="erp-table" style={{ fontSize: '0.8rem' }}>
                          <thead>
                            <tr>
                              <th>Student</th>
                              <th>Number</th>
                              <th>Status</th>
                              <th>Log</th>
                            </tr>
                          </thead>
                          <tbody>
                            {whatsappQueue.map((item, idx) => {
                              const isCompleted = idx < (whatsappProgress.sent + whatsappProgress.failed);
                              let itemStatus = item.status || 'Pending';
                              let itemErr = item.error_message || '';
                              return (
                                <tr key={item.id}>
                                  <td style={{ fontWeight: 600 }}>{item.student_name}</td>
                                  <td>{item.recipient_number}</td>
                                  <td>
                                    <span style={{
                                      padding: '2px 6px',
                                      borderRadius: '4px',
                                      fontSize: '0.7rem',
                                      fontWeight: 700,
                                      background: itemStatus === 'Sent' ? 'rgba(16,185,129,0.15)' : (itemStatus === 'Failed' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)'),
                                      color: itemStatus === 'Sent' ? '#34d399' : (itemStatus === 'Failed' ? '#f87171' : '#fbbf24')
                                    }}>
                                      {itemStatus}
                                    </span>
                                  </td>
                                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={itemErr}>
                                    {itemErr || 'Delivery success'}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                      <button 
                        disabled={isSendingWhatsapp}
                        onClick={() => setShowWhatsappProgressModal(false)}
                        className="btn-primary"
                        style={{ padding: '8px 16px' }}
                      >
                        {isSendingWhatsapp ? 'Processing...' : 'Close Logs'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Delete Confirmation Modal */}
              {deleteConfirm && (
                <div className="modal-overlay" onClick={() => { setDeleteConfirm(null); setDeletePassword(''); setDeleteError(''); }}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center', padding: '32px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'rgba(239, 68, 68, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ef4444',
                        marginBottom: '8px'
                      }}>
                        <AlertTriangle size={32} />
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Confirm Delete</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                        {deleteConfirm.message || 'Are you sure you want to delete permanently?'}
                      </p>
                      
                      <div style={{ width: '100%', textAlign: 'left', marginTop: '12px' }}>
                        <label htmlFor="delete-pwd" className="form-label" style={{ fontWeight: 600 }}>Enter your password to confirm:</label>
                        <input 
                          id="delete-pwd"
                          type="password"
                          autoComplete="new-password"
                          className="erp-input"
                          value={deletePassword}
                          onChange={(e) => {
                            setDeletePassword(e.target.value);
                            setDeleteError('');
                          }}
                          placeholder="Enter your account password"
                          style={{ width: '100%', marginTop: '6px' }}
                        />
                        {deleteError && (
                          <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', fontWeight: 600 }}>
                            {deleteError}
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '16px' }}>
                        <button 
                          onClick={handleConfirmDelete}
                          className="btn-primary"
                          style={{ flex: 1, backgroundColor: '#ef4444', border: '1px solid #ef4444', color: 'white', justifyContent: 'center' }}
                        >
                          Yes, Delete
                        </button>
                        <button 
                          onClick={() => { setDeleteConfirm(null); setDeletePassword(''); setDeleteError(''); }}
                          className="btn-outline"
                          style={{ flex: 1, justifyContent: 'center' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Simple Confirmation Modal (No Password) */}
              {simpleConfirm && (
                <div className="modal-overlay" onClick={() => setSimpleConfirm(null)}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center', padding: '32px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'rgba(239, 68, 68, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ef4444',
                        marginBottom: '8px'
                      }}>
                        <AlertTriangle size={32} />
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Confirm Delete</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                        {simpleConfirm.message || 'Are you sure you want to delete this?'}
                      </p>
                      
                      <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '16px' }}>
                        <button 
                          onClick={() => {
                            simpleConfirm.onConfirm();
                            setSimpleConfirm(null);
                          }}
                          className="btn-primary"
                          style={{ flex: 1, backgroundColor: '#ef4444', border: '1px solid #ef4444', color: 'white', justifyContent: 'center' }}
                        >
                          Yes, Delete
                        </button>
                        <button 
                          onClick={() => setSimpleConfirm(null)}
                          className="btn-outline"
                          style={{ flex: 1, justifyContent: 'center' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- MANAGE SUBJECTS MODAL --- */}
              {showSubjectModal && (
                <div className="modal-overlay" onClick={() => setShowSubjectModal(false)}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                        <BookOpen size={20} className="gradient-text" />
                        Manage Global Subjects Catalog
                      </h3>
                      <button onClick={() => setShowSubjectModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        <X size={18} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {/* Add Subject Form */}
                      <form onSubmit={handleAddSubject} style={{ display: 'flex', gap: '8px' }}>
                        <input 
                          type="text"
                          placeholder="Subject Name (e.g. Chemistry)"
                          value={newSubjectName}
                          onChange={(e) => setNewSubjectName(e.target.value)}
                          className="erp-input"
                          style={{ flex: 1 }}
                          required
                        />
                        <button type="submit" className="btn-primary" style={{ padding: '8px 16px', whiteSpace: 'nowrap', justifyContent: 'center' }}>
                          <Plus size={16} style={{ marginRight: '4px' }} /> Add
                        </button>
                      </form>

                      {/* Subjects List */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Available Subjects ({subjects.length})</span>
                        {subjects.length === 0 ? (
                          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px', fontSize: '0.9rem' }}>
                            No subjects in the catalog. Add one above.
                          </div>
                        ) : (
                          subjects.map(s => (
                            <div 
                              key={s.id}
                              style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                padding: '10px 14px', 
                                background: 'rgba(255,255,255,0.02)', 
                                border: '1px solid var(--border-color)', 
                                borderRadius: 'var(--radius-sm)' 
                              }}
                            >
                              {editingSubjectId === s.id ? (
                                <form onSubmit={handleEditSubject} style={{ display: 'flex', gap: '8px', width: '100%' }}>
                                  <input 
                                    type="text"
                                    value={editingSubjectName}
                                    onChange={(e) => setEditingSubjectName(e.target.value)}
                                    className="erp-input"
                                    style={{ flex: 1, padding: '4px 8px', fontSize: '0.85rem' }}
                                    required
                                    autoFocus
                                  />
                                  <button type="submit" className="btn-primary" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>Save</button>
                                  <button type="button" className="btn-outline" onClick={() => setEditingSubjectId(null)} style={{ padding: '4px 10px', fontSize: '0.8rem' }}>Cancel</button>
                                </form>
                              ) : (
                                <>
                                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{s.name}</span>
                                  <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                      onClick={() => {
                                        setEditingSubjectId(s.id);
                                        setEditingSubjectName(s.name);
                                      }}
                                      style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                                      title="Edit Subject"
                                    >
                                      <Edit size={14} />
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm(`Are you sure you want to delete "${s.name}"?`)) {
                                          handleDeleteSubject(s.id);
                                        }
                                      }}
                                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                      title="Delete Subject"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

        {unpayConfirm && (
          <div className="modal-overlay" onClick={() => setUnpayConfirm(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ef4444',
                margin: '0 auto 16px auto'
              }}>
                <AlertTriangle size={30} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px 0' }}>Revert Payment</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', margin: '0 0 24px 0' }}>
                Are you sure you want to mark <strong>{unpayConfirm.month}</strong>'s tuition fees as <strong>UNPAID</strong>?
              </p>
              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                <button 
                  onClick={async () => {
                    const target = unpayConfirm;
                    setUnpayConfirm(null);
                    await executeRevertFeePayment(target.studentId, target.month);
                  }}
                  className="btn-primary"
                  style={{ flex: 1, backgroundColor: '#ef4444', border: '1px solid #ef4444', color: 'white', justifyContent: 'center' }}
                >
                  Yes, Revert
                </button>
                <button 
                  onClick={() => setUnpayConfirm(null)}
                  className="btn-outline"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Academic Year Modal */}
        {showCreateYearModal && (
          <div className="modal-overlay" onClick={() => setShowCreateYearModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Register New Academic Year</h3>
                <button onClick={() => setShowCreateYearModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleCreateAcademicYear} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {yearError && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                    <AlertTriangle size={16} style={{ color: '#ef4444' }} />
                    <span>{yearError}</span>
                  </div>
                )}
                <div>
                  <label className="form-label" htmlFor="new-year-range" style={{ fontWeight: 600 }}>Academic Year Range</label>
                  <input 
                    id="new-year-range"
                    type="text" 
                    value={newYearForm.year_range}
                    onChange={(e) => setNewYearForm({ ...newYearForm, year_range: e.target.value })}
                    placeholder="e.g. 2026-2027" 
                    className="erp-input" 
                    required 
                  />
                  <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>Auto-generated based on the latest year range, but can be customized.</small>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label className="form-label" htmlFor="new-year-start" style={{ fontWeight: 600 }}>Start Date</label>
                    <input 
                      id="new-year-start"
                      type="date" 
                      value={newYearForm.start_date}
                      onChange={(e) => setNewYearForm({ ...newYearForm, start_date: e.target.value })}
                      className="erp-input" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="new-year-end" style={{ fontWeight: 600 }}>End Date</label>
                    <input 
                      id="new-year-end"
                      type="date" 
                      value={newYearForm.end_date}
                      onChange={(e) => setNewYearForm({ ...newYearForm, end_date: e.target.value })}
                      className="erp-input" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label" htmlFor="new-year-desc" style={{ fontWeight: 600 }}>Description (Optional)</label>
                  <textarea 
                    id="new-year-desc"
                    value={newYearForm.description}
                    onChange={(e) => setNewYearForm({ ...newYearForm, description: e.target.value })}
                    placeholder="Enter short details about this session..." 
                    className="erp-input" 
                    rows="3"
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button type="button" onClick={() => setShowCreateYearModal(false)} className="btn-outline">Cancel</button>
                  <button type="submit" className="btn-primary" disabled={isSavingYear}>
                    {isSavingYear ? 'Saving...' : 'Register Year'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Year Transition / Promotion Wizard Modal */}
        {showTransitionWizard && wizardTargetYear && (
          <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px', width: '90%', maxHeight: '85vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Promote to Next Academic Year</h3>
                  <span className="badge badge-warning" style={{ marginTop: '6px' }}>Target Session: {wizardTargetYear.year_range}</span>
                </div>
                <button onClick={() => setShowTransitionWizard(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
              </div>

              {/* Wizard Steps indicator */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', padding: '0 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', background: transitionWizardStep >= 1 ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 'bold' }}>1</div>
                  <span style={{ fontSize: '0.75rem', fontWeight: transitionWizardStep === 1 ? 'bold' : 'normal', color: transitionWizardStep === 1 ? 'var(--text-primary)' : 'var(--text-muted)' }}>Classroom Map</span>
                </div>
                <div style={{ flex: 1, height: '2px', background: transitionWizardStep >= 2 ? 'var(--color-primary)' : 'var(--border-color)', margin: '0 12px', transform: 'translateY(-10px)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', background: transitionWizardStep >= 2 ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 'bold' }}>2</div>
                  <span style={{ fontSize: '0.75rem', fontWeight: transitionWizardStep === 2 ? 'bold' : 'normal', color: transitionWizardStep === 2 ? 'var(--text-primary)' : 'var(--text-muted)' }}>Students List</span>
                </div>
                <div style={{ flex: 1, height: '2px', background: transitionWizardStep >= 3 ? 'var(--color-primary)' : 'var(--border-color)', margin: '0 12px', transform: 'translateY(-10px)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', background: transitionWizardStep >= 3 ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 'bold' }}>3</div>
                  <span style={{ fontSize: '0.75rem', fontWeight: transitionWizardStep === 3 ? 'bold' : 'normal', color: transitionWizardStep === 3 ? 'var(--text-primary)' : 'var(--text-muted)' }}>Safety Confirm</span>
                </div>
              </div>

              {/* Step 1 Content: Class mappings */}
              {transitionWizardStep === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="alert alert-info" style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 'var(--radius-md)', padding: '16px', color: '#93c5fd' }}>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}>
                      <Shield size={18} /> Step 1: Map Current Classes to Next Classrooms
                    </strong>
                    <span style={{ fontSize: '0.85rem' }}>Select which class gets promoted into which next class. Graduating classes should be mapped to "Alumni / Graduated".</span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {classes.map(cls => (
                      <div key={cls.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ fontWeight: 600 }}>{cls.name} ({students.filter(s => s.class_id === cls.id && s.status === 'Active').length} Active Students)</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Promote to:</span>
                          <select
                            value={wizardClassMappings[cls.id] || ''}
                            onChange={(e) => setWizardClassMappings({ ...wizardClassMappings, [cls.id]: e.target.value })}
                            className="erp-input"
                            style={{ width: '200px', padding: '6px 10px', fontSize: '0.85rem' }}
                          >
                            <option value="Alumni">Alumni / Graduated</option>
                            {classes.map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                    <button type="button" onClick={() => setShowTransitionWizard(false)} className="btn-outline">Cancel</button>
                    <button type="button" onClick={() => setTransitionWizardStep(2)} className="btn-primary">Next: Review Students</button>
                  </div>
                </div>
              )}

              {/* Step 2 Content: Student Checklist */}
              {transitionWizardStep === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="alert alert-info" style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 'var(--radius-md)', padding: '16px', color: '#93c5fd' }}>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}>
                      <Shield size={18} /> Step 2: Student-Level Promotion Selection
                    </strong>
                    <span style={{ fontSize: '0.85rem' }}>Select which students should be promoted or repeat their class. Unchecking a student keeps them in their current class range for the new academic year.</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
                    {classes.map(cls => {
                      const classStudents = students.filter(s => s.class_id === cls.id && s.status === 'Active');
                      if (classStudents.length === 0) return null;
                      return (
                        <div key={cls.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', color: 'var(--color-primary)' }}>
                            {cls.name} ({classStudents.length} students)
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {classStudents.map(student => {
                              const isGraduating = wizardClassMappings[cls.id] === 'Alumni';
                              const statusValue = wizardStudentStatus[student.id] || 'promote';
                              return (
                                <div key={student.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                                  <span style={{ fontSize: '0.85rem' }}><strong>{student.roll_number}</strong> - {student.name}</span>
                                  <div style={{ display: 'flex', gap: '16px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer' }}>
                                      <input
                                        type="radio"
                                        name={`status-${student.id}`}
                                        value="promote"
                                        checked={statusValue === 'promote'}
                                        onChange={() => setWizardStudentStatus({ ...wizardStudentStatus, [student.id]: 'promote' })}
                                      />
                                      {isGraduating ? 'Graduate to Alumni' : 'Promote'}
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer', color: '#f59e0b' }}>
                                      <input
                                        type="radio"
                                        name={`status-${student.id}`}
                                        value="repeat"
                                        checked={statusValue === 'repeat'}
                                        onChange={() => setWizardStudentStatus({ ...wizardStudentStatus, [student.id]: 'repeat' })}
                                      />
                                      Repeat/Repeat Case
                                    </label>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '16px' }}>
                    <button type="button" onClick={() => setTransitionWizardStep(1)} className="btn-outline">Back: Mappings</button>
                    <button type="button" onClick={() => setTransitionWizardStep(3)} className="btn-primary">Next: Final Review</button>
                  </div>
                </div>
              )}

              {/* Step 3 Content: Confirmation & Shield */}
              {transitionWizardStep === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="alert alert-warning" style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 'var(--radius-md)', padding: '16px', color: '#fef08a' }}>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '1rem' }}>
                      <AlertTriangle size={20} /> Critical Operation Warning
                    </strong>
                    <span style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                      Activating a new session is a final, critical database operation. The current active academic session will be marked as **Archived (Read-only)**. All selected students will be cloned and advanced into the new session.
                    </span>
                  </div>

                  <div className="erp-card" style={{ background: 'rgba(2, 6, 23, 0.4)' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>Transition Impact Summary</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
                      <div>Total Students in active session: <strong>{students.filter(s => s.status === 'Active').length}</strong></div>
                      <div>Students mapped to Promote: <strong>{Object.values(wizardStudentStatus).filter(v => v === 'promote').length}</strong></div>
                      <div>Students mapped to Repeat: <strong>{Object.values(wizardStudentStatus).filter(v => v === 'repeat').length}</strong></div>
                      <div>Target Session: <strong style={{ color: 'var(--color-primary)' }}>{wizardTargetYear.year_range}</strong></div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                    <label className="form-label" htmlFor="transition-confirm-input" style={{ fontWeight: 'bold' }}>To execute this transition, type <span style={{ color: '#ef4444' }}>"CONFIRM"</span> below:</label>
                    <input 
                      id="transition-confirm-input"
                      type="text" 
                      placeholder="CONFIRM" 
                      value={wizardConfirmText} 
                      onChange={(e) => setWizardConfirmText(e.target.value)} 
                      className="erp-input"
                      style={{ border: wizardConfirmText === 'CONFIRM' ? '1px solid #10b981' : '1px solid var(--border-color)' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '16px' }}>
                    <button type="button" onClick={() => setTransitionWizardStep(2)} className="btn-outline">Back: Students Checklist</button>
                    <button 
                      type="button" 
                      onClick={handleExecuteTransition} 
                      className="btn-primary" 
                      disabled={wizardConfirmText !== 'CONFIRM' || isActivatingYear}
                      style={{ backgroundColor: wizardConfirmText === 'CONFIRM' ? '#10b981' : 'rgba(255,255,255,0.05)', borderColor: wizardConfirmText === 'CONFIRM' ? '#10b981' : 'var(--border-color)', color: wizardConfirmText === 'CONFIRM' ? 'white' : 'var(--text-muted)' }}
                    >
                      {isActivatingYear ? 'Processing Transition...' : 'Execute Year Transition'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center', padding: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ef4444',
                  marginBottom: '8px'
                }}>
                  <LogOut size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Confirm Sign Out</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                  Are you sure you want to signout?
                </p>
                <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '16px' }}>
                  <button 
                    onClick={() => {
                      setShowLogoutConfirm(false);
                      handleLogout();
                    }}
                    className="btn-primary"
                    style={{ flex: 1, backgroundColor: '#ef4444', border: '1px solid #ef4444', color: 'white', justifyContent: 'center' }}
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => setShowLogoutConfirm(false)}
                    className="btn-outline"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* --- EXPERIENCE LETTER MODAL --- */}
      {showExperienceLetter && selectedTeacher && (
        <div className="modal-overlay" onClick={() => setShowExperienceLetter(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem' }}>Experience Certificate</h3>
              <button onClick={() => setShowExperienceLetter(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            
            <div className="receipt-box" style={{ fontFamily: 'Georgia, serif', padding: '40px', color: '#000000', backgroundColor: '#ffffff', border: '1px solid #cbd5e1' }}>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#000000', margin: '0 0 4px 0', fontFamily: 'Outfit, sans-serif' }}>BN SCHOOL</h2>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>Official Administration</p>
                <div style={{ borderBottom: '2px double #cbd5e1', marginTop: '16px' }}></div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '24px', color: '#334155' }}>
                <div><strong>Ref:</strong> BN/EXP/{new Date().getFullYear()}/{String(selectedTeacher.id).padStart(3, '0')}</div>
                <div><strong>Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
              
              <div style={{ textAlign: 'center', margin: '30px 0', fontSize: '1.25rem', fontWeight: 'bold', textDecoration: 'underline', color: '#000000', letterSpacing: '1px' }}>
                EXPERIENCE CERTIFICATE
              </div>
              
              <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#1e293b', textAlign: 'justify', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p><strong>TO WHOM IT MAY CONCERN</strong></p>
                <p>
                  This is to certify that <strong>{selectedTeacher.name}</strong> was employed as a Teacher at <strong>BN School</strong>.
                  Their service tenure was from <strong>{selectedTeacher.joining_date || 'N/A'}</strong> to <strong>{selectedTeacher.exit_date || 'N/A'}</strong>.
                </p>
                <p>
                  During this period, they were responsible for teaching the subject of <strong>"{selectedTeacher.subject || 'Teaching'}"</strong>. 
                  They proved to be a highly dedicated, competent, and professional educator. Their conduct and behavior were exemplary.
                </p>
                <p>
                  We highly appreciate their valuable contributions to our school community and wish them the absolute best in all their future endeavors.
                </p>
              </div>
              
              <div style={{ marginTop: '50px', fontSize: '1rem', color: '#1e293b' }}>
                <p>Sincerely,</p>
                <div style={{ height: '40px' }}></div>
                <p>_______________________</p>
                <p><strong>Authorized Signatory</strong></p>
                <p>BN School Administration</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button 
                onClick={() => window.print()} 
                className="btn-primary" 
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Printer size={16} /> Print Letter
              </button>
              <button 
                onClick={() => downloadExperienceLetterDoc(selectedTeacher)} 
                className="btn-outline" 
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Download size={16} /> Download Letter (.doc)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Pre-seeded Mock Platform Data
const MOCK_SCHOOLS = [
  { id: 1, name: "St. Xavier's International School", code: "SCH-981763", contact_person: "Fr. Thomas Matthews", contact_number: "+1 (555) 019-8833", email: "xavier.admin@xavier.edu", status: "Active", subscription_start: "2026-04-01", subscription_end: "2027-03-31", setup_completed: 1, days_remaining: 305 },
  { id: 2, name: "Lincoln Technical College", code: "SCH-098716", contact_person: "Dr. Elizabeth Vance", contact_number: "+1 (555) 021-3311", email: "lincoln.tech@lincoln.edu", status: "Active", subscription_start: "2026-05-01", subscription_end: "2026-06-30", setup_completed: 1, days_remaining: 31 }
];

const MOCK_SUPER_STATS = {
  total_schools: 2,
  active_schools: 2,
  inactive_schools: 0,
  total_students: 450,
  total_teachers: 35,
  total_revenue: 12450.00,
  recent_schools: [
    { name: "Lincoln Technical College", email: "lincoln.tech@lincoln.edu", status: "Active", created_at: "2026-05-01 10:00:00" },
    { name: "St. Xavier's International School", email: "xavier.admin@xavier.edu", status: "Active", created_at: "2026-04-01 09:00:00" }
  ]
};

// Pre-seeded Mock Fallback data sets
const MOCK_CLASSES = [];
const MOCK_TEACHERS = [];
const MOCK_STUDENTS = [];
const MOCK_NOTIFS = [];
