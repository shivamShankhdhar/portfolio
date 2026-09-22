'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SidebarLayout from '@/components/SidebarLayout';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import EducationSection from '@/components/sections/EducationSection';
import ContactSection from '@/components/sections/ContactSection';
import PortfolioStickyQR from '@/components/PortfolioStickyQR';
import {
  defaultProjects,
  defaultSkills,
  defaultExperience,
  defaultEducation,
  defaultCertifications,
} from '@/lib/defaultData';

export default function Home() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [projects, setProjects] = useState<any[]>(defaultProjects);
  const [education, setEducation] = useState<any[]>(defaultEducation);
  const [experience, setExperience] = useState<any[]>(defaultExperience);
  const [skills, setSkills] = useState<any[]>(defaultSkills);
  const [certifications, setCertifications] = useState<any[]>(defaultCertifications);
  const [profile, setProfile] = useState<any>({
    name: 'Shivam Shankhdhar',
    bio: 'Passionate Full Stack & Mobile Engineer dedicated to architecting high-performance web applications, native mobile experiences (React Native / Expo), and scalable backend systems. Proven track record of shipping end-to-end products to production.',
    available: true,
    roles: [
      'Full Stack Engineer',
      'Mobile App Specialist (React Native / Expo)',
      'Java & Spring Boot Engineer',
      'MERN Stack Architect',
      'Next.js & TypeScript Developer',
    ],
    linkedinUrl: 'https://linkedin.com/in/shivam-shankhdhar',
    githubUrl: 'https://github.com/shivamShankhdhar',
  });
  const [adminEmail, setAdminEmail] = useState<string>('s.shankhdhar1981@gmail.com');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectRes, eduRes, expRes, skillRes, certRes, infoRes, profileRes] = await Promise.allSettled([
          fetch('/api/projects'),
          fetch('/api/education'),
          fetch('/api/experience'),
          fetch('/api/skills'),
          fetch('/api/certifications'),
          fetch('/api/portfolio-info'),
          fetch('/api/profile'),
        ]);

        if (projectRes.status === 'fulfilled' && projectRes.value.ok) {
          const data = await projectRes.value.json();
          if (Array.isArray(data) && data.length > 0) setProjects(data);
        }

        if (eduRes.status === 'fulfilled' && eduRes.value.ok) {
          const data = await eduRes.value.json();
          if (Array.isArray(data) && data.length > 0) setEducation(data);
        }

        if (expRes.status === 'fulfilled' && expRes.value.ok) {
          const data = await expRes.value.json();
          if (Array.isArray(data) && data.length > 0) setExperience(data);
        }

        if (skillRes.status === 'fulfilled' && skillRes.value.ok) {
          const data = await skillRes.value.json();
          if (Array.isArray(data) && data.length > 0) setSkills(data);
        }

        if (certRes.status === 'fulfilled' && certRes.value.ok) {
          const data = await certRes.value.json();
          if (Array.isArray(data) && data.length > 0) setCertifications(data);
        }

        if (infoRes.status === 'fulfilled' && infoRes.value.ok) {
          const info = await infoRes.value.json();
          if (info.email) setAdminEmail(info.email);
        }

        if (profileRes.status === 'fulfilled' && profileRes.value.ok) {
          const profileData = await profileRes.value.json();
          if (profileData.data) setProfile(profileData.data);
        }
      } catch (error) {
        console.warn('Using default portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#09090b]">
        <div className="h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header />
      <SidebarLayout
        hasProjects={projects.length > 0}
        hasSkills={skills.length > 0}
        hasExperience={experience.length > 0}
        hasEducation={education.length > 0}
      >
        <HeroSection profile={profile} adminEmail={adminEmail} loading={loading} />
        <ProjectsSection projects={projects} loading={loading} />
        <SkillsSection skills={skills} loading={loading} />
        <ExperienceSection experience={experience} loading={loading} />
        <EducationSection education={education} loading={loading} />
        <ContactSection adminEmail={adminEmail} profile={profile} />
      </SidebarLayout>
      <PortfolioStickyQR />
    </div>
  );
}