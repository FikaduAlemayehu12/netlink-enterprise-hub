
import React from 'react';
import { Search, UserPlus } from 'lucide-react';
import PerformanceChart from './PerformanceChart';

interface StaffDirectoryProps {
  employees: any[];
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

const StaffDirectory: React.FC<StaffDirectoryProps> = ({ employees, searchTerm, onSearchChange }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-black text-slate-900 uppercase">Staff <span className="text-blue-600">Directory</span></h2>
        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Filter staff members..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-6">
        {employees.map(emp => (
          <div key={emp.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border flex items-center gap-8 group hover:shadow-xl transition-all">
            <img src={emp.photo || 'https://i.pravatar.cc/150'} className="w-20 h-20 rounded-[1.5rem] object-cover" />
            <div className="flex-grow">
              <h4 className="text-xl font-black text-slate-900 leading-none">{emp.name}</h4>
              <p className="text-green-600 font-bold text-xs uppercase tracking-widest mt-1">{emp.role}</p>
            </div>
            <div className="px-8 border-l border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2">KPI Trend</p>
              <PerformanceChart data={emp.performance_history || [80, 85, 82, 90, 88]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffDirectory;
