"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Shield, 
  User as UserIcon, 
  ShieldCheck, 
  Mail, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  UserPlus
} from "lucide-react";
import Image from "next/image";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  createdAt: Date;
}

export default function UserManagementTable({ users }: { users: User[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sorting
  const [sortField, setSortField] = useState<"name" | "joined">("joined");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredUsers = useMemo(() => {
    return users
      .filter(u => {
        const matchesSearch = (u.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || 
                             (u.email?.toLowerCase() || "").includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "all" || u.role === roleFilter;
        return matchesSearch && matchesRole;
      })
      .sort((a, b) => {
        const factor = sortOrder === "asc" ? 1 : -1;
        if (sortField === "name") {
          return (a.name || "").localeCompare(b.name || "") * factor;
        }
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * factor;
      });
  }, [users, searchQuery, roleFilter, sortField, sortOrder]);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const toggleSort = (field: "name" | "joined") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getRoleStyle = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-50 text-red-700 border-red-100 ring-red-500/10";
      case "SHOP_MANAGER":
        return "bg-purple-50 text-purple-700 border-purple-100 ring-purple-500/10";
      case "EDITOR":
        return "bg-blue-50 text-blue-700 border-blue-100 ring-blue-500/10";
      default:
        return "bg-green-50 text-green-700 border-green-100 ring-green-500/10";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "ADMIN": return <ShieldCheck className="w-3.5 h-3.5" />;
      case "SHOP_MANAGER": return <Shield className="w-3.5 h-3.5" />;
      case "EDITOR": return <UserIcon className="w-3.5 h-3.5" />;
      default: return <UserIcon className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col xl:flex-row gap-6 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-gray-50 text-gray-900 border-none rounded-2xl text-sm font-bold text-gray-900 placeholder:text-gray-600 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
          />
        </div>
        
        <div className="flex items-center gap-4 w-full xl:w-auto">
          <div className="flex items-center gap-3 bg-gray-50 text-gray-900 p-2 px-4 rounded-2xl border border-gray-100 w-full xl:w-auto">
            <Filter className="w-4 h-4 text-gray-600" />
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent border-none text-xs font-black uppercase tracking-widest text-gray-800 outline-none cursor-pointer pr-8"
            >
              <option value="all">All Roles</option>
              <option value="ADMIN">Admins</option>
              <option value="SHOP_MANAGER">Managers</option>
              <option value="EDITOR">Editors</option>
              <option value="CLIENT">Clients</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", count: users.length, color: "bg-gray-50 text-gray-900" },
          { label: "Admins", count: users.filter(u => u.role === "ADMIN").length, color: "bg-red-50 text-red-700" },
          { label: "Managers", count: users.filter(u => u.role === "SHOP_MANAGER").length, color: "bg-purple-50 text-purple-700" },
          { label: "Clients", count: users.filter(u => u.role === "CLIENT").length, color: "bg-green-50 text-green-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-[28px] border border-gray-100 bg-white shadow-sm flex flex-col gap-1`}>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</span>
            <span className="text-2xl font-black text-gray-900">{stat.count}</span>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-900/50 text-gray-600 uppercase font-black text-[10px] tracking-[0.2em] border-b border-gray-100">
                <th className="px-8 py-6 cursor-pointer hover:text-gray-900 transition-colors" onClick={() => toggleSort("name")}>
                  <div className="flex items-center gap-2">
                    User Profile {sortField === "name" && <ArrowUpDown className="w-3 h-3" />}
                  </div>
                </th>
                <th className="px-8 py-6">Access Level</th>
                <th className="px-8 py-6 cursor-pointer hover:text-gray-900 transition-colors" onClick={() => toggleSort("joined")}>
                  <div className="flex items-center gap-2">
                    Registration Date {sortField === "joined" && <ArrowUpDown className="w-3 h-3" />}
                  </div>
                </th>
                <th className="px-8 py-6 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-purple-50/30 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-gray-700 font-black text-lg border border-gray-100 group-hover:scale-110 transition-transform">
                        {user.name?.[0] || (user.email?.[0]?.toUpperCase() || "?")}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-gray-900 text-base tracking-tight">{user.name || "Anonymous User"}</span>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-3 h-3" />
                          <span className="text-xs font-bold">{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest ring-1 ring-inset ${getRoleStyle(user.role)}`}>
                      {getRoleIcon(user.role)}
                      {user.role.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="font-bold text-xs">{new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-3 text-gray-500 hover:text-[var(--primary-purple)] hover:bg-purple-50 rounded-2xl transition-all">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center gap-4 max-w-xs mx-auto">
                      <div className="w-20 h-20 bg-gray-50 text-gray-900 rounded-[30px] flex items-center justify-center text-gray-500">
                        <UserIcon className="w-10 h-10" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 tracking-tight">No users found</h3>
                      <p className="text-gray-600 font-medium">We couldn't find any users matching your search or filter criteria.</p>
                      <button 
                        onClick={() => { setSearchQuery(""); setRoleFilter("all"); }}
                        className="mt-2 px-6 py-3 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 text-gray-900/50 px-8 py-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-black text-gray-600 uppercase tracking-widest">
            Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`p-2.5 rounded-xl border transition-all ${
                  currentPage === 1 
                  ? 'border-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'border-gray-200 text-gray-700 hover:border-[var(--primary-purple)] hover:text-[var(--primary-purple)] active:scale-90'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
                      currentPage === page
                      ? 'bg-[var(--primary-purple)] text-white shadow-lg shadow-purple-200'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-[var(--primary-purple)] hover:text-[var(--primary-purple)]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`p-2.5 rounded-xl border transition-all ${
                  currentPage === totalPages 
                  ? 'border-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'border-gray-200 text-gray-700 hover:border-[var(--primary-purple)] hover:text-[var(--primary-purple)] active:scale-90'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
