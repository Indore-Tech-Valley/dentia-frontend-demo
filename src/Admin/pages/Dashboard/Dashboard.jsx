import React, { useState } from 'react';
import { 
  FaUserMd, FaUsers, FaCalendarCheck, FaMoneyBillWave, 
  FaClipboardList, FaUserClock, FaBed, FaAmbulance,
  FaPills, FaStethoscope, FaHeartbeat, FaChartPie
} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// Sample data
const appointmentData = [
  { date: 'Jan', appointments: 450, newPatients: 120 },
  { date: 'Feb', appointments: 520, newPatients: 150 },
  { date: 'Mar', appointments: 480, newPatients: 110 },
  { date: 'Apr', appointments: 620, newPatients: 180 },
  { date: 'May', appointments: 580, newPatients: 160 },
  { date: 'Jun', appointments: 720, newPatients: 210 },
];

const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 32000 },
  { month: 'Feb', revenue: 52000, expenses: 35000 },
  { month: 'Mar', revenue: 48000, expenses: 33000 },
  { month: 'Apr', revenue: 62000, expenses: 38000 },
  { month: 'May', revenue: 58000, expenses: 36000 },
  { month: 'Jun', revenue: 72000, expenses: 42000 },
];

const departmentData = [
  { name: 'Cardiology', value: 24 },
  { name: 'Pediatrics', value: 18 },
  { name: 'Orthopedics', value: 15 },
  { name: 'Neurology', value: 12 },
  { name: 'General', value: 31 }
];

const performanceData = [
  { subject: 'Efficiency', A: 85, fullMark: 100 },
  { subject: 'Satisfaction', A: 92, fullMark: 100 },
  { subject: 'Wait Time', A: 78, fullMark: 100 },
  { subject: 'Revenue', A: 88, fullMark: 100 },
  { subject: 'Staffing', A: 82, fullMark: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const StatCard = ({ icon, title, value, change, secondaryText }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {secondaryText && <p className="text-xs text-gray-500 mt-1">{secondaryText}</p>}
      </div>
      <div className={`p-3 rounded-full ${change >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {icon}
      </div>
    </div>
    <p className={`text-sm mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
      {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
    </p>
  </div>
);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [activeTab, setActiveTab] = useState('overview');
  const navigate=useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Clinic Management Dashboard</h1>
            <p className="text-gray-600">Comprehensive overview of clinic operations</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
            </select>
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <button 
                className={`px-3 py-2 text-sm ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-white'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`px-3 py-2 text-sm ${activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'bg-white'}`}
                onClick={() => setActiveTab('analytics')}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            icon={<FaCalendarCheck size={18} />}
            title="Today's Appointments"
            value="156"
            change={12}
            secondaryText="24 pending confirmations"
          />
          <StatCard 
            icon={<FaUsers size={18} />}
            title="Active Patients"
            value="2,847"
            change={8}
            secondaryText="342 new this month"
          />
          <StatCard 
            icon={<FaUserMd size={18} />}
            title="Available Doctors"
            value="24/28"
            change={-2}
            secondaryText="4 on leave"
          />
          <StatCard 
            icon={<FaMoneyBillWave size={18} />}
            title="Monthly Revenue"
            value="$127.5K"
            change={22}
            secondaryText="Target: $150K"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            icon={<FaClipboardList size={16} />}
            title="Pending Bills"
            value="89"
            change={-15}
            secondaryText="$45.2K total"
          />
          <StatCard 
            icon={<FaUserClock size={16} />}
            title="Waiting Patients"
            value="12"
            change={-8}
            secondaryText="Avg wait: 15 min"
          />
          <StatCard 
            icon={<FaBed size={16} />}
            title="Available Beds"
            value="18/45"
            change={5}
            secondaryText="60% occupancy"
          />
          <StatCard 
            icon={<FaAmbulance size={16} />}
            title="Emergency Cases"
            value="7"
            change={-12}
            secondaryText="3 critical"
          />
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointments Trend */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaCalendarCheck className="text-blue-500" />
              Appointment Trends
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={appointmentData}>
                <defs>
                  <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="appointments" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorAppointments)" 
                  name="Total Appointments"
                />
                <Line 
                  type="monotone" 
                  dataKey="newPatients" 
                  stroke="#10b981" 
                  name="New Patients"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Department Distribution */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaStethoscope className="text-purple-500" />
              Department Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue vs Expenses */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaMoneyBillWave className="text-green-500" />
              Revenue vs Expenses
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="revenue" 
                  fill="#10b981" 
                  name="Revenue"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="expenses" 
                  fill="#ef4444" 
                  name="Expenses"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Radar */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaHeartbeat className="text-red-500" />
              Performance Metrics
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar 
                  name="Performance" 
                  dataKey="A" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.3} 
                />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaClipboardList className="text-orange-500" />
              Recent Activity
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...Array(5)].map((_, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm whitespace-nowrap">2023-06-{20 + i}</td>
                      <td className="px-4 py-2 text-sm">Patient {i + 1}</td>
                      <td className="px-4 py-2 text-sm">Dr. {['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][i]}</td>
                      <td className="px-4 py-2 text-sm">{['Checkup', 'Consultation', 'Follow-up', 'Procedure', 'Emergency'][i]}</td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          i % 3 === 0 ? 'bg-green-100 text-green-800' : 
                          i % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Pending' : 'In Progress'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaPills className="text-indigo-500" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <FaUserMd className="text-xl" />, label: 'Add Doctor', color: 'bg-blue-100 text-blue-600',link:'/admin/doctors' },
                { icon: <FaUsers className="text-xl" />, label: 'New Patient', color: 'bg-green-100 text-green-600',link:'/admin/patients' },
                { icon: <FaCalendarCheck className="text-xl" />, label: 'Appointments', color: 'bg-purple-100 text-purple-600',link:'/admin/appointments' },
                { icon: <FaPills className="text-xl" />, label: 'Services', color: 'bg-orange-100 text-orange-600',link:'/admin/services' },
                { icon: <FaClipboardList className="text-xl" />, label: 'Reports', color: 'bg-red-100 text-red-600',link:'/admin/dashboard' },
                { icon: <FaAmbulance className="text-xl" />, label: 'Events', color: 'bg-pink-100 text-pink-600',link:'/admin/events' },
              ].map((action, index) => (
                <button
                  key={index}
                  onClick={()=>{
                    navigate(`${action.link}`)
                  }}
                  className={`${action.color} p-3 rounded-lg hover:shadow-md transition-all flex flex-col items-center gap-2`}
                >
                  {action.icon}
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;