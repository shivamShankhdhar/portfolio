'use client';

import React from 'react';
import { FiExternalLink, FiCalendar, FiAward, FiEdit2, FiTrash2 } from 'react-icons/fi';

export interface Certification {
  _id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  description?: string;
}

interface CertificationCardProps {
  certification: Certification;
  onEdit?: (certification: Certification) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export default function CertificationCard({
  certification,
  onEdit,
  onDelete,
  isAdmin = false,
}: CertificationCardProps) {
  const issueDate = certification.issueDate
    ? new Date(certification.issueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      })
    : '';

  return (
    <div className="group relative flex flex-col justify-between h-full p-6 rounded-2xl border border-red-200/60 dark:border-red-900/30 bg-white dark:bg-[#121217] shadow-sm hover:shadow-lg hover:border-red-500/50 dark:hover:border-red-500/40 transition-all duration-300">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-900/40">
              <FiAward className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                {certification.title}
              </h3>
              <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                {certification.issuer}
              </p>
            </div>
          </div>

          {issueDate && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              <FiCalendar className="h-3 w-3 text-red-500" />
              <span>{issueDate}</span>
            </span>
          )}
        </div>

        {certification.description && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {certification.description}
          </p>
        )}

        {certification.credentialId && (
          <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Credential ID: <span className="text-slate-700 dark:text-slate-300">{certification.credentialId}</span>
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-red-950/30 flex items-center justify-between">
        {certification.credentialUrl ? (
          <a
            href={certification.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
          >
            <FiExternalLink className="h-3.5 w-3.5" />
            <span>Verify Credential</span>
          </a>
        ) : (
          <span className="text-[11px] text-slate-400">Verified Certification</span>
        )}

        {isAdmin && (
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(certification)}
                className="p-1 text-slate-500 hover:text-blue-600 transition"
                aria-label="Edit certification"
              >
                <FiEdit2 className="h-3.5 w-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(certification._id)}
                className="p-1 text-slate-500 hover:text-red-600 transition"
                aria-label="Delete certification"
              >
                <FiTrash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
