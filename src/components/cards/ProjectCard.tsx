'use client';

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Project {
  _id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  link?: string;
  github?: string;
  startDate: string;
  endDate?: string;
}

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export default function ProjectCard({ project, onEdit, onDelete, isAdmin = false }: ProjectCardProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group relative h-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isVisible
          ? 'animate-fadeInScale opacity-100'
          : 'opacity-0'
      }`}
    >
      {project.image && (
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-slate-900">{project.title}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-slate-600">{project.description}</p>

        {project.technologies.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              View Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              GitHub
            </a>
          )}
        </div>

        {isAdmin && (
          <div className="mt-4 flex gap-2 border-t border-slate-200 pt-4">
            <button
              onClick={() => onEdit?.(project)}
              className="flex-1 rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete?.(project._id)}
              className="flex-1 rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
