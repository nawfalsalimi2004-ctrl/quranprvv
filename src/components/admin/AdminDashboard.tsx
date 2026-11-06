import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_USERS, INITIAL_STATS, INITIAL_LOGS, INITIAL_TEMPLATES_SETTINGS } from '../../data/mockAdminData';
import { User, UserRole } from '../../types/auth';
import { SystemLog, TemplateSetting } from '../../types/admin';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Download, 
  Activity, 
  Search, 
  UserCheck, 
  UserX, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  Settings, 
  Layout, 
  BarChart3, 
  Clock, 
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ShieldAlert
} from 'lucide-react';

interface AdminDashboardProps {
  onGoHome?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onGoHome }) => {
  const { user, isAdmin } = useAuth();
  
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'users' | 'templates' | 'logs' | 'settings'>('overview');
  const [usersList, setUsersList] = useState<User[]>(INITIAL_USERS);
  const [templatesList, setTemplatesList] = useState<TemplateSetting[]>(INITIAL_TEMPLATES_SETTINGS);
  const [logsList, setLogsList] = useState<SystemLog[]>(INITIAL_LOGS);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Settings state
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowGuestDownload, setAllowGuestDownload] = useState(true);
  const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = useState(true);

  // If logged in user is not admin, hide admin completely with 403 Forbidden screen
  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900">403 - الوصول محظور وغير مصرح به</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            عذراً، هذه اللوحة مخصصة لإدارة النظام فقط، وحسابك الحالي لا يمتلك صلاحيات الوصول الإدارية.
          </p>
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition shadow-md"
            >
              العودة إلى الصفحة الرئيسية
            </button>
          )}
        </div>
      </div>
    );
  }

  // User Actions
  const toggleUserStatus = (id: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'active' ? 'suspended' : 'active';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const toggleUserRole = (id: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const nextRole: UserRole = u.role === 'admin' ? 'user' : 'admin';
        return { ...u, role: nextRole };
      }
      return u;
    }));
  };

  const deleteUser = (id: string) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا المستخدم نهائياً؟')) {
      setUsersList(prev => prev.filter(u => u.id !== id));
    }
  };

  // Template Actions
  const toggleTemplateActive = (id: string) => {
    setTemplatesList(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, isActive: !t.isActive };
      }
      return t;
    }));
  };

  const toggleTemplatePremium = (id: string) => {
    setTemplatesList(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, isPremium: !t.isPremium };
      }
      return t;
    }));
  };

  const filteredUsers = usersList.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>لوحة التحكم الإدارية المركزية</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              إدارة منصة سيرتي برو (Admin Portal)
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              متابعة حركة المنصة، إدارة حسابات المستخدمين، تفعيل القوالب، وسجلات النظام.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              النظام يعمل بكفاءة 100%
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500">إجمالي المستخدمين</span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {INITIAL_STATS.totalUsers.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">↑ +12.4% هذا الشهر</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500">السير الذاتية المُنشأة</span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {INITIAL_STATS.totalResumes.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">↑ +18.7% مقارنة بالسابق</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500">عمليات التنزيل والطباعة</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {INITIAL_STATS.totalDownloads.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">↑ 99.8% معدل رضا</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500">المستخدمين النشطين اليوم</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {INITIAL_STATS.activeToday.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-1">معدل التحويل 14.8%</p>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <button
            onClick={() => setActiveAdminTab('overview')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition whitespace-nowrap ${
              activeAdminTab === 'overview'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>نظرة عامة والتحليلات</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('users')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition whitespace-nowrap ${
              activeAdminTab === 'users'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>إدارة المستخدمين ({usersList.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('templates')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition whitespace-nowrap ${
              activeAdminTab === 'templates'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>إدارة القوالب والمظهر ({templatesList.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('logs')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition whitespace-nowrap ${
              activeAdminTab === 'logs'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>سجل النظام (Audit Logs)</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('settings')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition whitespace-nowrap ${
              activeAdminTab === 'settings'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>إعدادات النظام</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeAdminTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Visual Progress Graph Simulation */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-brand-600" />
                <span>إحصائيات استخدام القوالب المختلفة</span>
              </h3>

              <div className="space-y-3.5 pt-2">
                {templatesList.map((tmpl) => {
                  const percentage = Math.round((tmpl.usageCount / INITIAL_STATS.totalResumes) * 100);
                  return (
                    <div key={tmpl.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>{tmpl.name} ({tmpl.nameEn})</span>
                        <span className="font-mono text-slate-500">{tmpl.usageCount.toLocaleString()} ({percentage}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-600 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Activity Stream */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>أحدث العمليات في النظام</span>
              </h3>

              <div className="space-y-3 pt-1">
                {logsList.slice(0, 4).map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{log.action}</p>
                      <span className="text-[10px] text-slate-400">بواسطة: {log.user}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: USERS MANAGEMENT */}
        {activeAdminTab === 'users' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Table Header & Search */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="البحث بالاسم أو البريد..."
                  className="w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="text-xs text-slate-500">
                إجمالي المعروض: <strong className="text-slate-800">{filteredUsers.length}</strong> مستخدم
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                  <tr>
                    <th className="p-4">المستخدم</th>
                    <th className="p-4">البريد الإلكتروني</th>
                    <th className="p-4">الصلاحية</th>
                    <th className="p-4">السير المنشأة</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/70 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                            alt={u.name}
                            className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <p className="font-bold text-slate-900">{u.name}</p>
                            <span className="text-[10px] text-slate-400">انضم في {u.createdAt}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-slate-600 font-mono text-[11px]" dir="ltr">
                        {u.email}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => toggleUserRole(u.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition ${
                            u.role === 'admin'
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                          title="انقر لتغيير الصلاحية"
                        >
                          {u.role === 'admin' ? '⭐ مسؤول (Admin)' : 'مستخدم عادي'}
                        </button>
                      </td>

                      <td className="p-4 font-bold text-slate-700">
                        {u.resumesCount} سيرة
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition ${
                            u.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                          title="انقر لتعديل حالة الحساب"
                        >
                          {u.status === 'active' ? 'نشط' : 'معطل'}
                        </button>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                          title="حذف المستخدم"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: TEMPLATES MANAGEMENT */}
        {activeAdminTab === 'templates' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-800">التحكم في القوالب والمظهر العام</h3>
              <span className="text-xs text-slate-500">يمكنك تعطيل أو تفعيل أي قالب ليظهر للمستخدمين</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templatesList.map((tmpl) => (
                <div key={tmpl.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{tmpl.name}</h4>
                      <p className="text-[10px] text-slate-400">{tmpl.category}</p>
                    </div>

                    <button
                      onClick={() => toggleTemplateActive(tmpl.id)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        tmpl.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {tmpl.isActive ? 'مفعل للجميع' : 'معطل مؤقتاً'}
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                    <span>عدد الاستخدامات:</span>
                    <strong className="text-slate-900">{tmpl.usageCount.toLocaleString()}</strong>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs text-slate-600">تصنيف القالب:</span>
                    <button
                      onClick={() => toggleTemplatePremium(tmpl.id)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        tmpl.isPremium ? 'bg-amber-100 text-amber-800' : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {tmpl.isPremium ? 'مدفوع / بريميوم' : 'مجاني للجميع'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LOGS */}
        {activeAdminTab === 'logs' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-800">سجل النشاطات والأحداث البرمجية</h3>
              <button
                onClick={() => setLogsList([])}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
              >
                مسح السجل
              </button>
            </div>

            <div className="space-y-2">
              {logsList.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${
                      log.type === 'success' ? 'bg-emerald-500' :
                      log.type === 'warning' ? 'bg-amber-500' :
                      log.type === 'danger' ? 'bg-rose-500' : 'bg-blue-500'
                    }`} />
                    <span className="font-bold text-slate-800">{log.action}</span>
                  </div>

                  <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                    <span>{log.user}</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SYSTEM SETTINGS */}
        {activeAdminTab === 'settings' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 max-w-2xl">
            <h3 className="font-bold text-sm text-slate-800 pb-3 border-b border-slate-100">
              إعدادات المنصة وسياسات الأمان
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">وضع الصيانة العامة للموقع (Maintenance Mode)</h4>
                  <p className="text-[11px] text-slate-500">منع المستخدمين غير المشرفين من تحرير وحفظ السير مؤقتاً</p>
                </div>
                <button
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`p-1.5 rounded-lg text-xs font-bold ${
                    maintenanceMode ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {maintenanceMode ? 'مفعل' : 'معطل'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">السماح للزوار بالتنزيل الفوري بدون تسجيل حساب</h4>
                  <p className="text-[11px] text-slate-500">تسهيل التجربة على المستخدمين الجدد وتصدير PDF مجاناً</p>
                </div>
                <button
                  onClick={() => setAllowGuestDownload(!allowGuestDownload)}
                  className={`p-1.5 rounded-lg text-xs font-bold ${
                    allowGuestDownload ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {allowGuestDownload ? 'مفعل' : 'معطل'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">تفعيل مساعد الذكاء الاصطناعي (AI Assistant)</h4>
                  <p className="text-[11px] text-slate-500">تمكين الصياغة الآلية للنبذات المهنية والمهام الوظيفية</p>
                </div>
                <button
                  onClick={() => setAiSuggestionsEnabled(!aiSuggestionsEnabled)}
                  className={`p-1.5 rounded-lg text-xs font-bold ${
                    aiSuggestionsEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {aiSuggestionsEnabled ? 'مفعل' : 'معطل'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
