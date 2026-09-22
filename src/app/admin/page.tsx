'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  FiLogOut,
  FiUser,
  FiCode,
  FiBriefcase,
  FiBook,
  FiAward,
  FiMail,
  FiPlus,
  FiExternalLink,
  FiDatabase,
  FiSun,
  FiMoon,
  FiTrash2,
} from 'react-icons/fi';
import { FaGamepad } from 'react-icons/fa6';
import { useTheme } from '@/context/ThemeContext';
import ProfileForm from '@/components/admin/forms/ProfileForm';
import ProjectForm from '@/components/admin/forms/ProjectForm';
import AppForm from '@/components/admin/forms/AppForm';
import EducationForm from '@/components/admin/forms/EducationForm';
import ExperienceForm from '@/components/admin/forms/ExperienceForm';
import SkillForm from '@/components/SkillForm';
import CertificationForm from '@/components/admin/forms/CertificationForm';
import ProjectCard, { Project } from '@/components/cards/ProjectCard';
import AppAdminCard, { AppItem } from '@/components/cards/AppAdminCard';
import EducationCard, { Education } from '@/components/cards/EducationCard';
import ExperienceCard, { Experience } from '@/components/cards/ExperienceCard';
import SkillCard, { Skill } from '@/components/SkillCard';
import CertificationCard, { Certification } from '@/components/cards/CertificationCard';
import {
  Skeleton,
  ProjectCardSkeleton,
  ExperienceCardSkeleton,
  SkillCardSkeleton,
  EducationCardSkeleton,
} from '@/components/ui/Skeleton';

type Tab = 'profile' | 'projects' | 'apps' | 'skills' | 'experience' | 'education' | 'certifications' | 'messages';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [dbConfigured, setDbConfigured] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string>('');

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [appCategoryFilter, setAppCategoryFilter] = useState<string>('All');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Form modals / editing states
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Auth Check
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');
    if (!token) {
      router.push('/login');
      return;
    }
    setAdminEmail(email || 'Admin');
  }, [router]);

  // Check DB status
  const checkDbStatus = async () => {
    try {
      const res = await fetch('/api/auth');
      if (res.ok) {
        const data = await res.json();
        setDbConfigured(Boolean(data.dbConfigured));
      }
    } catch {
      setDbConfigured(false);
    }
  };

  // Fetch all entities
  const fetchAllData = async () => {
    try {
      setLoading(true);
      await checkDbStatus();

      const [pRes, aRes, sRes, expRes, eduRes, certRes, msgRes] = await Promise.allSettled([
        fetch('/api/projects'),
        fetch('/api/apps?admin=true'),
        fetch('/api/skills'),
        fetch('/api/experience'),
        fetch('/api/education'),
        fetch('/api/certifications'),
        fetch('/api/messages'),
      ]);

      if (pRes.status === 'fulfilled' && pRes.value.ok) setProjects(await pRes.value.json());
      if (aRes.status === 'fulfilled' && aRes.value.ok) setApps(await aRes.value.json());
      if (sRes.status === 'fulfilled' && sRes.value.ok) setSkills(await sRes.value.json());
      if (expRes.status === 'fulfilled' && expRes.value.ok) setExperience(await expRes.value.json());
      if (eduRes.status === 'fulfilled' && eduRes.value.ok) setEducation(await eduRes.value.json());
      if (certRes.status === 'fulfilled' && certRes.value.ok) setCertifications(await certRes.value.json());
      if (msgRes.status === 'fulfilled' && msgRes.value.ok) {
        const data = await msgRes.value.json();
        if (data.messages) setMessages(data.messages);
      }
    } catch (e) {
      console.error('Error fetching admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  // Generic Save / Update handler
  const handleSaveItem = async (entity: string, data: any) => {
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const endpoint = editingItem ? `/api/${entity}/${editingItem._id}` : `/api/${entity}`;

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || resData.error || 'Failed to save');

      toast.success(`${editingItem ? 'Updated' : 'Created'} successfully!`);
      setIsAddingNew(false);
      setEditingItem(null);
      fetchAllData();
    } catch (err: any) {
      toast.error('Save failed', { description: err.message });
    }
  };

  // Generic Delete handler
  const handleDeleteItem = async (entity: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const res = await fetch(`/api/${entity}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const resData = await res.json();
        throw new Error(resData.message || resData.error || 'Failed to delete');
      }

      toast.success('Deleted successfully');
      fetchAllData();
    } catch (err: any) {
      toast.error('Delete failed', { description: err.message });
    }
  };

  // Delete message
  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      const res = await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Message deleted');
      setMessages(messages.filter((m) => m._id !== id));
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'projects', label: 'Projects', icon: FiCode, count: projects.length },
    { id: 'apps', label: 'Mobile Apps & Games', icon: FaGamepad, count: apps.length },
    { id: 'skills', label: 'Skills', icon: FiAward, count: skills.length },
    { id: 'experience', label: 'Experience', icon: FiBriefcase, count: experience.length },
    { id: 'education', label: 'Education', icon: FiBook, count: education.length },
    { id: 'certifications', label: 'Certifications', icon: FiAward, count: certifications.length },
    { id: 'messages', label: 'Inbox', icon: FiMail, count: messages.length },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-24">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 glass-panel border-b border-red-200/60 dark:border-red-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white font-bold shadow-md shadow-red-600/30">
              <span className="text-xs">SS</span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Admin Control Center</p>
              <p className="text-[11px] text-slate-500 truncate max-w-[200px]">{adminEmail}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121217] text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 transition"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <FiSun className="h-4 w-4 text-amber-400" /> : <FiMoon className="h-4 w-4 text-red-600" />}
            </button>

            {/* View Live Portfolio */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 hover:text-red-600 transition"
            >
              <FiExternalLink className="h-3.5 w-3.5" />
              <span>Live Site</span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
            >
              <FiLogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Database Status Alert Banner */}
        <div
          className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm ${
            dbConfigured
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
              : 'bg-amber-50 dark:bg-amber-950/30 border-amber-500/40 text-amber-900 dark:text-amber-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                dbConfigured ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
              }`}
            >
              <FiDatabase className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold">
                {dbConfigured ? 'MongoDB Connected & Active' : 'MongoDB URI Pending in .env'}
              </p>
              <p className="text-xs opacity-90">
                {dbConfigured
                  ? 'All changes save immediately and persist to your MongoDB database.'
                  : 'Operating in safe fallback mode. To persist updates to your own database, paste your MongoDB URI in the MONGO_URI entry in portfolio/.env'}
              </p>
            </div>
          </div>

          <button
            onClick={checkDbStatus}
            className="text-xs font-bold underline shrink-0 hover:opacity-80"
          >
            Re-check Status
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#121217] border border-slate-200 dark:border-red-950/30 shadow-sm scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as Tab);
                  setIsAddingNew(false);
                  setEditingItem(null);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="space-y-6">
          {/* 1. Profile Tab */}
          {activeTab === 'profile' && (
            <ProfileForm onSuccess={fetchAllData} />
          )}

          {/* 2. Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Manage Projects</h3>
                  <p className="text-xs text-slate-500">Showcase mobile apps, web applications, and backend systems.</p>
                </div>
                {!isAddingNew && !editingItem && (
                  <button
                    onClick={() => setIsAddingNew(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md transition"
                  >
                    <FiPlus className="h-4 w-4" />
                    <span>Add Project</span>
                  </button>
                )}
              </div>

              {(isAddingNew || editingItem) ? (
                <ProjectForm
                  initialData={editingItem}
                  onSubmit={(data) => handleSaveItem('projects', data)}
                  onCancel={() => {
                    setIsAddingNew(false);
                    setEditingItem(null);
                  }}
                />
              ) : loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <ProjectCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((p) => (
                    <ProjectCard
                      key={p._id}
                      project={p}
                      isAdmin={true}
                      onEdit={(proj) => setEditingItem(proj)}
                      onDelete={(id) => handleDeleteItem('projects', id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. Mobile Apps & Games Tab */}
          {activeTab === 'apps' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Mobile Apps &amp; Games
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/15 text-red-500 border border-red-500/30">
                      {apps.length} Total
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage production Android apps. Titles categorized as <strong className="text-red-500">&quot;Games&quot;</strong> automatically stream to the public Games Showcase (<Link href="/mobile-apps/games" target="_blank" className="underline hover:text-red-400">/mobile-apps/games</Link>).
                  </p>
                </div>

                {!isAddingNew && !editingItem && (
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href="/mobile-apps/games"
                      target="_blank"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-white/10 hover:border-red-500/40 text-slate-700 dark:text-slate-300 transition"
                    >
                      <FaGamepad className="h-3.5 w-3.5 text-red-500" />
                      <span>View Games Hub</span>
                      <FiExternalLink className="h-3 w-3" />
                    </Link>

                    <button
                      onClick={() => setIsAddingNew(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
                    >
                      <FiPlus className="h-4 w-4" />
                      <span>Add New App</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Category Filter Pills */}
              {!isAddingNew && !editingItem && (
                <div className="flex flex-wrap items-center gap-2 pt-1 border-b border-slate-200/80 dark:border-white/5 pb-3">
                  {['All', 'Games', 'Productivity', 'Utilities', 'Other'].map((cat) => {
                    const count =
                      cat === 'All'
                        ? apps.length
                        : apps.filter((a) => (a.category || '').toLowerCase() === cat.toLowerCase()).length;
                    const isSelected = appCategoryFilter === cat;

                    return (
                      <button
                        key={cat}
                        onClick={() => setAppCategoryFilter(cat)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-red-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                        }`}
                      >
                        <span>{cat}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-500'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Form or List View */}
              {isAddingNew || editingItem ? (
                <AppForm
                  initialData={editingItem}
                  onSubmit={(data) => handleSaveItem('apps', data)}
                  onCancel={() => {
                    setIsAddingNew(false);
                    setEditingItem(null);
                  }}
                />
              ) : loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <ProjectCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {(() => {
                    const filtered =
                      appCategoryFilter === 'All'
                        ? apps
                        : apps.filter(
                            (a) =>
                              (a.category || '').toLowerCase() ===
                              appCategoryFilter.toLowerCase()
                          );

                    if (filtered.length === 0) {
                      return (
                        <div className="text-center py-12 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 p-8 space-y-3">
                          <FaGamepad className="h-10 w-10 text-slate-400 mx-auto" />
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            No apps found in category &quot;{appCategoryFilter}&quot;
                          </p>
                          <button
                            onClick={() => setIsAddingNew(true)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold shadow-md hover:bg-red-500 transition cursor-pointer"
                          >
                            <FiPlus className="h-4 w-4" />
                            <span>Add First App</span>
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((app) => (
                          <AppAdminCard
                            key={app._id}
                            app={app}
                            onEdit={(a) => setEditingItem(a)}
                            onDelete={(id) => handleDeleteItem('apps', id)}
                          />
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* 4. Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Technical Skills</h3>
                  <p className="text-xs text-slate-500">Add or edit competencies, proficiencies, and categories.</p>
                </div>
                {!isAddingNew && !editingItem && (
                  <button
                    onClick={() => setIsAddingNew(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md transition"
                  >
                    <FiPlus className="h-4 w-4" />
                    <span>Add Skill</span>
                  </button>
                )}
              </div>

              {(isAddingNew || editingItem) ? (
                <SkillForm
                  skill={editingItem}
                  onSave={async (data) => handleSaveItem('skills', data)}
                  onCancel={() => {
                    setIsAddingNew(false);
                    setEditingItem(null);
                  }}
                />
              ) : loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <SkillCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {skills.map((s) => (
                    <SkillCard
                      key={s._id}
                      skill={s}
                      isAdmin={true}
                      onEdit={(sk) => setEditingItem(sk)}
                      onDelete={(id) => handleDeleteItem('skills', id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. Experience Tab */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Experience Timeline</h3>
                  <p className="text-xs text-slate-500">Record engineering roles and production accomplishments.</p>
                </div>
                {!isAddingNew && !editingItem && (
                  <button
                    onClick={() => setIsAddingNew(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md transition"
                  >
                    <FiPlus className="h-4 w-4" />
                    <span>Add Experience</span>
                  </button>
                )}
              </div>

              {(isAddingNew || editingItem) ? (
                <ExperienceForm
                  initialData={editingItem}
                  onSubmit={(data) => handleSaveItem('experience', data)}
                  onCancel={() => {
                    setIsAddingNew(false);
                    setEditingItem(null);
                  }}
                />
              ) : loading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <ExperienceCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <ExperienceCard
                      key={exp._id}
                      experience={exp}
                      isAdmin={true}
                      onEdit={(item) => setEditingItem(item)}
                      onDelete={(id) => handleDeleteItem('experience', id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. Education Tab */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Academic Qualifications</h3>
                  <p className="text-xs text-slate-500">Formal degrees and academic achievements.</p>
                </div>
                {!isAddingNew && !editingItem && (
                  <button
                    onClick={() => setIsAddingNew(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md transition"
                  >
                    <FiPlus className="h-4 w-4" />
                    <span>Add Education</span>
                  </button>
                )}
              </div>

              {(isAddingNew || editingItem) ? (
                <EducationForm
                  initialData={editingItem}
                  onSubmit={(data) => handleSaveItem('education', data)}
                  onCancel={() => {
                    setIsAddingNew(false);
                    setEditingItem(null);
                  }}
                />
              ) : loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <EducationCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {education.map((edu) => (
                    <EducationCard
                      key={edu._id}
                      education={edu}
                      isAdmin={true}
                      onEdit={(item) => setEditingItem(item)}
                      onDelete={(id) => handleDeleteItem('education', id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 6. Certifications Tab */}
          {activeTab === 'certifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Professional Certifications</h3>
                  <p className="text-xs text-slate-500">Industry certifications and verified credentials.</p>
                </div>
                {!isAddingNew && !editingItem && (
                  <button
                    onClick={() => setIsAddingNew(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md transition"
                  >
                    <FiPlus className="h-4 w-4" />
                    <span>Add Certification</span>
                  </button>
                )}
              </div>

              {(isAddingNew || editingItem) ? (
                <CertificationForm
                  initialData={editingItem}
                  onSubmit={(data) => handleSaveItem('certifications', data)}
                  onCancel={() => {
                    setIsAddingNew(false);
                    setEditingItem(null);
                  }}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {certifications.map((cert) => (
                    <CertificationCard
                      key={cert._id}
                      certification={cert}
                      isAdmin={true}
                      onEdit={(item) => setEditingItem(item)}
                      onDelete={(id) => handleDeleteItem('certifications', id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 7. Messages Inbox Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Visitor Messages</h3>
                <p className="text-xs text-slate-500">Inquiries sent directly through your portfolio contact form.</p>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121217] space-y-3"
                    >
                      <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-white/5">
                        <Skeleton className="h-4 w-32 rounded-md" />
                        <Skeleton className="h-4 w-20 rounded-md" />
                      </div>
                      <Skeleton className="h-4 w-full rounded-md" />
                      <Skeleton className="h-4 w-3/4 rounded-md" />
                    </div>
                  ))}
                </div>
              ) : messages.length === 0 ? (
                <div className="p-12 text-center rounded-2xl border border-dashed border-red-200 dark:border-red-900/30">
                  <FiMail className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Your inbox is empty</p>
                  <p className="text-xs text-slate-400 mt-0.5">When visitors send messages on your contact section, they will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className="p-5 rounded-2xl border border-red-200/60 dark:border-red-900/30 bg-white dark:bg-[#121217] shadow-sm space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-red-950/30 pb-3">
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{msg.name}</p>
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
                          >
                            {msg.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400">
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}
                          </span>
                          <button
                            onClick={() => handleDeleteMessage(msg._id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 transition"
                            aria-label="Delete message"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {msg.message}
                      </p>

                      <div className="pt-2">
                        <a
                          href={`mailto:${msg.email}?subject=Re: Portfolio Inquiry`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
                        >
                          <FiMail className="h-3.5 w-3.5" />
                          <span>Reply via Email</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
