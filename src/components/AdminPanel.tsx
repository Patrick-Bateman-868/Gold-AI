import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  AlertCircle, 
  Settings, 
  BarChart3, 
  MessageSquare,
  Search,
  MoreVertical,
  ArrowLeft
} from 'lucide-react';
import { Language } from '../types';
import { cn } from '../lib/utils';

interface AdminPanelProps {
  language: Language;
  onBack: () => void;
}

const MOCK_USERS = [
  { id: '1', name: 'Алихан М.', email: 'alikhan@example.com', role: 'student', status: 'active', merit: 1250 },
  { id: '2', name: 'Мадина С.', email: 'madina@example.com', role: 'student', status: 'active', merit: 1100 },
  { id: '3', name: 'Нурасыл Б.', email: 'nurasyl@example.com', role: 'student', status: 'warning', merit: 950 },
  { id: '4', name: 'Айгерим К.', email: 'aigerim@example.com', role: 'student', status: 'active', merit: 800 },
];

export default function AdminPanel({ language, onBack }: AdminPanelProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-neutral-900/50 flex flex-col p-6">
        <div className="mb-10 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-gold-400" />
          <h2 className="text-xl font-display font-bold">Admin Hub</h2>
        </div>

        <nav className="flex-1 space-y-2">
          <AdminSidebarItem icon={Users} label="Participants" active />
          <AdminSidebarItem icon={BarChart3} label="Analytics" />
          <AdminSidebarItem icon={MessageSquare} label="Moderation" />
          <AdminSidebarItem icon={Settings} label="System Settings" />
        </nav>

        <button 
          onClick={onBack}
          className="mt-auto flex items-center gap-2 text-neutral-500 hover:text-neutral-200 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to App
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-display font-bold">User Management</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-gold-500/50 transition-colors w-64"
              />
            </div>
            <button className="px-4 py-2 rounded-xl gold-gradient text-neutral-950 font-bold text-sm">
              Add User
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <AdminStatCard label="Total Students" value="124" trend="+12%" />
          <AdminStatCard label="Active Today" value="86" trend="+5%" />
          <AdminStatCard label="Merit Distributed" value="14.2k" />
          <AdminStatCard label="Pending Tasks" value="18" warning />
        </div>

        {/* Users Table */}
        <div className="glass rounded-3xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Role</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Merit</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-xs font-bold text-gold-400">
                        {user.name[0]}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-neutral-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 capitalize">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        user.status === 'active' ? "bg-emerald-500" : "bg-orange-500"
                      )} />
                      <span className="text-xs capitalize">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-gold-400 font-bold">
                    {user.merit}
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-neutral-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function AdminSidebarItem({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
      active 
        ? "bg-gold-500 text-neutral-950 font-bold" 
        : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
    )}>
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
}

function AdminStatCard({ label, value, trend, warning }: { label: string, value: string, trend?: string, warning?: boolean }) {
  return (
    <div className="glass p-6 rounded-2xl">
      <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">{label}</div>
      <div className="flex items-end justify-between">
        <div className={cn("text-2xl font-bold", warning && "text-orange-500")}>{value}</div>
        {trend && <div className="text-xs text-emerald-500 font-bold">{trend}</div>}
        {warning && <AlertCircle className="w-4 h-4 text-orange-500" />}
      </div>
    </div>
  );
}
