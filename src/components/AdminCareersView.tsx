import React, { useState } from 'react';
import { CareerOpportunity } from '../data/moxforgeData';
import {
  CareerPageAdminConfig,
  DEFAULT_CAREER_ADMIN_CONFIG,
  SubmittedCandidateApplication,
  SubmittedBusinessEnquiry,
  loadCareerAdminConfig,
  saveCareerAdminConfig,
  loadSubmittedApplications,
  saveSubmittedApplications,
  updateCandidateApplicationStatus,
  loadSubmittedEnquiries,
  saveSubmittedEnquiries,
  updateEnquiryStatus,
  loadGoogleSheetWebhookUrl,
  saveGoogleSheetWebhookUrl,
} from '../utils/careerAdminStore';
import {
  verifyAdminPassword,
  isAdminSessionAuthenticated,
  setAdminSessionAuthenticated,
} from '../utils/moxforgeLogic';

export const AdminCareersView: React.FC<{
  onOpenCareersPage: () => void;
}> = ({ onOpenCareersPage }) => {
  const [config, setConfig] = useState<CareerPageAdminConfig>(() =>
    loadCareerAdminConfig()
  );
  const [submittedApps, setSubmittedApps] = useState<
    SubmittedCandidateApplication[]
  >(() => loadSubmittedApplications());
  const [submittedEnquiries, setSubmittedEnquiries] = useState<
    SubmittedBusinessEnquiry[]
  >(() => loadSubmittedEnquiries());
  const [sheetWebhookUrl, setSheetWebhookUrl] = useState<string>(() =>
    loadGoogleSheetWebhookUrl()
  );

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    isAdminSessionAuthenticated()
  );
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [newOptionLabel, setNewOptionLabel] = useState('');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPassword(passwordInput)) {
      setAdminSessionAuthenticated(true);
      setIsAuthenticated(true);
      setAuthError(null);
      setPasswordInput('');
    } else {
      setAuthError('Access Denied: Incorrect administrator password.');
    }
  };

  const handleLockSession = () => {
    setAdminSessionAuthenticated(false);
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthError(null);
  };

  const [roleForm, setRoleForm] = useState<{
    title: string;
    type: CareerOpportunity['type'];
    division: CareerOpportunity['division'];
    location: string;
    durationOrCommitment: string;
    stipendOrComp: string;
    summary: string;
    requirementsText: string;
  }>({
    title: '',
    type: 'Internship',
    division: 'Moxforge Labs',
    location: 'Remote / Hybrid',
    durationOrCommitment: '',
    stipendOrComp: '',
    summary: '',
    requirementsText: '',
  });
  const [roleError, setRoleError] = useState<string | null>(null);

  const updateAndPersist = (next: CareerPageAdminConfig, notice?: string) => {
    setConfig(next);
    saveCareerAdminConfig(next);
    if (notice) {
      setSaveMessage(notice);
    }
  };

  const handleAddOpportunityOption = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newOptionLabel.trim();
    if (!trimmed) return;
    const nextOption = {
      id: `opp-${Date.now()}`,
      label: trimmed,
    };
    const nextConfig: CareerPageAdminConfig = {
      ...config,
      opportunityOptions: [...config.opportunityOptions, nextOption],
    };
    setNewOptionLabel('');
    updateAndPersist(
      nextConfig,
      `Added "${trimmed}" to Target Opportunity options.`
    );
  };

  const handleRemoveOpportunityOption = (id: string) => {
    if (config.opportunityOptions.length <= 1) {
      setSaveMessage('At least one Target Opportunity option is required.');
      return;
    }
    const nextConfig: CareerPageAdminConfig = {
      ...config,
      opportunityOptions: config.opportunityOptions.filter((o) => o.id !== id),
    };
    updateAndPersist(nextConfig, 'Removed Target Opportunity option.');
  };

  const handleAddCustomRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleForm.title.trim() || !roleForm.summary.trim()) {
      setRoleError('Please provide both a Role Title and Summary.');
      return;
    }
    setRoleError(null);
    const reqs = roleForm.requirementsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const newRole: CareerOpportunity = {
      id: `role-${Date.now()}`,
      title: roleForm.title.trim(),
      type: roleForm.type,
      division: roleForm.division,
      location: roleForm.location.trim() || 'Remote',
      durationOrCommitment: roleForm.durationOrCommitment.trim() || 'Flexible',
      stipendOrComp: roleForm.stipendOrComp.trim() || 'Competitive',
      summary: roleForm.summary.trim(),
      requirements: reqs,
    };

    const nextConfig: CareerPageAdminConfig = {
      ...config,
      customRoles: [...config.customRoles, newRole],
      opportunityOptions: [
        ...config.opportunityOptions,
        { id: newRole.id, label: `${newRole.title} (${newRole.type})` },
      ],
    };

    setRoleForm({
      title: '',
      type: 'Internship',
      division: 'Moxforge Labs',
      location: 'Remote / Hybrid',
      durationOrCommitment: '',
      stipendOrComp: '',
      summary: '',
      requirementsText: '',
    });
    updateAndPersist(
      nextConfig,
      `Published "${newRole.title}" to the Careers page.`
    );
  };

  const handleDeleteCustomRole = (roleId: string) => {
    const nextConfig: CareerPageAdminConfig = {
      ...config,
      customRoles: config.customRoles.filter((r) => r.id !== roleId),
      opportunityOptions: config.opportunityOptions.filter(
        (o) => o.id !== roleId
      ),
    };
    updateAndPersist(nextConfig, 'Removed career role from the Careers page.');
  };

  const handleDeleteApplication = (appId: string) => {
    const nextApps = submittedApps.filter((a) => a.id !== appId);
    setSubmittedApps(nextApps);
    saveSubmittedApplications(nextApps);
  };

  const handleSetCandidateAppStatus = (
    appId: string,
    status: 'Pending' | 'Approved' | 'Rejected'
  ) => {
    const nextApps = updateCandidateApplicationStatus(appId, status);
    setSubmittedApps(nextApps);
    setSaveMessage(
      `Updated candidate application ${appId} status to "${status}".`
    );
  };

  const handleDownloadApplicationsCsv = () => {
    const headers = [
      'Application ID',
      'Submitted At',
      'Status',
      'Full Name',
      'Email',
      'Affiliation / University',
      'Opportunity / Role',
      'LinkedIn',
      'Portfolio / GitHub',
      'Technical Statement',
    ];
    const escapeCsv = (val: string) =>
      `"${String(val || '').replace(/"/g, '""')}"`;
    const rows = submittedApps.map((item) =>
      [
        item.id,
        item.submittedAt,
        item.status || 'Pending',
        item.fullName,
        item.email,
        item.affiliation,
        item.roleTitle,
        item.linkedinUrl || '',
        item.portfolioUrl || '',
        item.statement,
      ]
        .map(escapeCsv)
        .join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'moxforge-candidate-applications.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDeleteEnquiry = (refCode: string) => {
    const nextEnq = submittedEnquiries.filter(
      (e) => e.referenceCode !== refCode
    );
    setSubmittedEnquiries(nextEnq);
    saveSubmittedEnquiries(nextEnq);
  };

  const handleSetEnquiryStatus = (
    refCode: string,
    status: 'Pending' | 'Approved' | 'Rejected'
  ) => {
    const nextEnq = updateEnquiryStatus(refCode, status);
    setSubmittedEnquiries(nextEnq);
    setSaveMessage(
      `Updated enquiry ${refCode} status to "${status}".`
    );
  };

  const handleSaveWebhookUrl = (e: React.FormEvent) => {
    e.preventDefault();
    saveGoogleSheetWebhookUrl(sheetWebhookUrl);
    setSaveMessage(
      'Saved Private Google Sheet Web App URL. All Contact page enquiries now automatically post directly to your private Google Sheet.'
    );
  };

  const handleDownloadEnquiriesCsv = () => {
    const headers = [
      'Reference Code',
      'Submitted At',
      'Status',
      'Full Name',
      'Email',
      'Organization',
      'Partnership Track',
      'Project Scope & Requirements',
    ];
    const escapeCsv = (val: string) =>
      `"${String(val || '').replace(/"/g, '""')}"`;
    const rows = submittedEnquiries.map((item) =>
      [
        item.referenceCode,
        item.submittedAt,
        item.status || 'Pending',
        item.fullName,
        item.email,
        item.organization,
        item.enquiryType,
        item.message,
      ]
        .map(escapeCsv)
        .join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'moxforge-business-enquiries.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleResetDefaults = () => {
    updateAndPersist(
      DEFAULT_CAREER_ADMIN_CONFIG,
      'Reset Careers page configuration to default (Direct Candidate Application form only).'
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-8 pb-16">
        <div className="max-w-md w-full bg-white border border-stone-200 rounded-2xl shadow-sm p-8 sm:p-10 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-[11px] font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              MOXFORGE SECURE ADMIN
            </div>
            <h1 className="font-display text-2xl font-bold text-stone-950 mt-3">
              Admin Authentication
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
              Enter the master administrator password to manage candidate applications, review business enquiries, and update opportunity configurations.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-password-input"
                className="block text-xs font-semibold text-stone-800"
              >
                Master Admin Password
              </label>
              <div className="relative mt-1">
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(null);
                  }}
                  autoFocus
                  placeholder="Enter administrator password..."
                  className="w-full pl-3 pr-16 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-stone-500 hover:text-stone-800 cursor-pointer px-1 py-0.5 rounded font-mono"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {authError && (
                <p role="alert" className="text-xs text-rose-700 mt-2 font-medium">
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              Unlock Admin Panel →
            </button>

            <button
              type="button"
              onClick={onOpenCareersPage}
              className="w-full py-2 px-4 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              ← Back to Public Site
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-6">
      {/* Standalone Admin Header */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <img
            src="/assets/aistudio/bluemetallic_logo_new_1__20729a63.png"
            alt="MOXFORGE emblem"
            className="w-12 h-12 rounded-xl object-cover ring-1 ring-stone-900/10 shadow-xs shrink-0 mt-1"
          />
          <div>
            <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
              MOXFORGE INTERNAL ADMIN — CAREERS PAGE MANAGEMENT (#/admin)
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 mt-1">
              Careers Page & Candidate Application Admin
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              This admin page is hidden from the public MOXFORGE website navigation. Changes saved here update the Careers page immediately.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleLockSession}
            className="px-3.5 py-2 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Lock Admin Session
          </button>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={onOpenCareersPage}
            className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            View Live Careers Page →
          </button>
        </div>
      </section>

      {saveMessage && (
        <div
          role="status"
          className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs font-medium text-blue-950 flex items-center justify-between"
        >
          <span>{saveMessage}</span>
          <button
            type="button"
            onClick={() => setSaveMessage(null)}
            className="text-stone-500 hover:text-stone-900 font-mono text-xs cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Edit Direct Candidate Application Form & Target Opportunities */}
        <div className="lg:col-span-6 space-y-6">
          <section className="bg-white border border-stone-200 rounded-xl p-6">
            <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
              DIRECT CANDIDATE APPLICATION FORM SETTINGS
            </p>
            <h2 className="font-display text-xl font-bold text-stone-950 mt-1">
              Edit Application Form Text & Target Opportunities
            </h2>

            <div className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="admin-form-kicker"
                  className="block text-xs font-medium text-stone-800"
                >
                  Form Kicker Label
                </label>
                <input
                  id="admin-form-kicker"
                  type="text"
                  value={config.formKicker}
                  onChange={(e) =>
                    updateAndPersist({ ...config, formKicker: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-form-title"
                  className="block text-xs font-medium text-stone-800"
                >
                  Form Heading
                </label>
                <input
                  id="admin-form-title"
                  type="text"
                  value={config.formTitle}
                  onChange={(e) =>
                    updateAndPersist({ ...config, formTitle: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-form-desc"
                  className="block text-xs font-medium text-stone-800"
                >
                  Form Subtitle / Description
                </label>
                <textarea
                  id="admin-form-desc"
                  rows={2}
                  value={config.formDescription}
                  onChange={(e) =>
                    updateAndPersist({
                      ...config,
                      formDescription: e.target.value,
                    })
                  }
                  className="mt-1 w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-stone-200">
              <h3 className="text-xs font-semibold text-stone-900">
                Target Opportunity Dropdown Options
              </h3>
              <ul className="mt-3 space-y-2">
                {config.opportunityOptions.map((opt) => (
                  <li
                    key={opt.id}
                    className="flex items-center justify-between gap-2 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800"
                  >
                    <span>{opt.label}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveOpportunityOption(opt.id)}
                      className="text-red-700 hover:text-red-900 font-medium whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              <form
                onSubmit={handleAddOpportunityOption}
                className="mt-3 flex gap-2"
              >
                <label htmlFor="admin-new-option" className="sr-only">
                  New Target Opportunity Option
                </label>
                <input
                  id="admin-new-option"
                  type="text"
                  value={newOptionLabel}
                  onChange={(e) => setNewOptionLabel(e.target.value)}
                  placeholder="Add new opportunity option (e.g. AI Research Intern)..."
                  className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-medium bg-stone-900 text-white rounded-lg hover:bg-stone-800 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Add Option
                </button>
              </form>
            </div>
          </section>

          {/* Submitted Candidate Applications */}
          <section className="bg-white border border-stone-200 rounded-xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                  CANDIDATE SUBMISSIONS
                </p>
                <h2 className="font-display text-xl font-bold text-stone-950 mt-1">
                  Submitted Candidate Applications
                </h2>
              </div>
              {submittedApps.length > 0 && (
                <button
                  type="button"
                  onClick={handleDownloadApplicationsCsv}
                  className="px-3 py-1.5 text-xs font-medium bg-stone-100 text-stone-800 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  Download Applications CSV
                </button>
              )}
            </div>

            {submittedApps.length === 0 ? (
              <p className="text-xs text-stone-500 mt-3">
                No candidate applications have been submitted yet.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {submittedApps.map((app) => {
                  const status = app.status || 'Pending';
                  return (
                    <article
                      key={app.id}
                      className="p-4 bg-stone-50 border border-stone-200 rounded-lg text-xs space-y-2.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-950">
                            {app.id} · {app.fullName}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                              status === 'Approved'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : status === 'Rejected'
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : 'bg-sky-100 text-sky-800 border border-sky-300'
                            }`}
                          >
                            ● {status}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteApplication(app.id)}
                          className="text-red-700 hover:text-red-900 font-medium cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>

                      <p className="text-stone-700">
                        <span className="font-medium">Opportunity:</span>{' '}
                        {app.roleTitle}
                      </p>
                      <p className="text-stone-600">
                        <span className="font-medium">Email:</span> {app.email} ·{' '}
                        <span className="font-medium">Organization:</span>{' '}
                        {app.affiliation}
                        {app.submittedAt && (
                          <> · <span className="font-medium text-stone-500">Date:</span> {app.submittedAt}</>
                        )}
                      </p>
                      {app.linkedinUrl && (
                        <p className="text-stone-600">
                          <span className="font-medium">LinkedIn:</span>{' '}
                          <a
                            href={app.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:underline"
                          >
                            {app.linkedinUrl}
                          </a>
                        </p>
                      )}
                      {app.portfolioUrl && (
                        <p className="text-stone-600">
                          <span className="font-medium">Portfolio:</span>{' '}
                          <a
                            href={app.portfolioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:underline"
                          >
                            {app.portfolioUrl}
                          </a>
                        </p>
                      )}
                      <p className="text-stone-700 pt-1 border-t border-stone-200 leading-relaxed">
                        {app.statement}
                      </p>

                      <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[11px] font-mono text-stone-500">
                          ADMIN DECISION:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              handleSetCandidateAppStatus(app.id, 'Approved')
                            }
                            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                              status === 'Approved'
                                ? 'bg-emerald-700 text-white font-semibold'
                                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                            }`}
                          >
                            ✓ Approve
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleSetCandidateAppStatus(app.id, 'Rejected')
                            }
                            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                              status === 'Rejected'
                                ? 'bg-rose-700 text-white font-semibold'
                                : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
                            }`}
                          >
                            ✕ Reject
                          </button>
                          {status !== 'Pending' && (
                            <button
                              type="button"
                              onClick={() =>
                                handleSetCandidateAppStatus(app.id, 'Pending')
                              }
                              className="px-2 py-1 rounded text-[11px] font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
                            >
                              Reset to Pending
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Optional Career Role Postings Manager */}
        <div className="lg:col-span-6 space-y-6">
          <section className="bg-white border border-stone-200 rounded-xl p-6">
            <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
              PUBLISH OR REMOVE CAREER ROLES
            </p>
            <h2 className="font-display text-xl font-bold text-stone-950 mt-1">
              Add New Career Role to Careers Page
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              By default, the Careers page shows only the Direct Candidate Application form. Any roles added below will also appear on the Careers page.
            </p>

            <form onSubmit={handleAddCustomRole} className="mt-4 space-y-3">
              <div>
                <label
                  htmlFor="admin-role-title"
                  className="block text-xs font-medium text-stone-800"
                >
                  Role Title
                </label>
                <input
                  id="admin-role-title"
                  type="text"
                  value={roleForm.title}
                  onChange={(e) =>
                    setRoleForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g. Robotics & ROS 2 Engineering Intern"
                  className="mt-1 w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="admin-role-type"
                    className="block text-xs font-medium text-stone-800"
                  >
                    Role Type
                  </label>
                  <select
                    id="admin-role-type"
                    value={roleForm.type}
                    onChange={(e) =>
                      setRoleForm((prev) => ({
                        ...prev,
                        type: e.target.value as CareerOpportunity['type'],
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Volunteering">Volunteering</option>
                    <option value="Full-Time Engineering">
                      Full-Time Engineering
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="admin-role-division"
                    className="block text-xs font-medium text-stone-800"
                  >
                    Division
                  </label>
                  <select
                    id="admin-role-division"
                    value={roleForm.division}
                    onChange={(e) =>
                      setRoleForm((prev) => ({
                        ...prev,
                        division: e.target
                          .value as CareerOpportunity['division'],
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  >
                    <option value="Moxforge Labs">Moxforge Labs</option>
                    <option value="Moxforge Community">
                      Moxforge Community
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="admin-role-location"
                    className="block text-xs font-medium text-stone-800"
                  >
                    Location
                  </label>
                  <input
                    id="admin-role-location"
                    type="text"
                    value={roleForm.location}
                    onChange={(e) =>
                      setRoleForm((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder="Remote / Hybrid"
                    className="mt-1 w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin-role-duration"
                    className="block text-xs font-medium text-stone-800"
                  >
                    Duration / Commitment
                  </label>
                  <input
                    id="admin-role-duration"
                    type="text"
                    value={roleForm.durationOrCommitment}
                    onChange={(e) =>
                      setRoleForm((prev) => ({
                        ...prev,
                        durationOrCommitment: e.target.value,
                      }))
                    }
                    placeholder="e.g. 3–6 Months / Full-Time"
                    className="mt-1 w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-role-summary"
                  className="block text-xs font-medium text-stone-800"
                >
                  Role Summary
                </label>
                <textarea
                  id="admin-role-summary"
                  rows={3}
                  value={roleForm.summary}
                  onChange={(e) =>
                    setRoleForm((prev) => ({
                      ...prev,
                      summary: e.target.value,
                    }))
                  }
                  placeholder="Describe the role responsibilities and focus..."
                  className="mt-1 w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-role-reqs"
                  className="block text-xs font-medium text-stone-800"
                >
                  Requirements (One per line, optional)
                </label>
                <textarea
                  id="admin-role-reqs"
                  rows={3}
                  value={roleForm.requirementsText}
                  onChange={(e) =>
                    setRoleForm((prev) => ({
                      ...prev,
                      requirementsText: e.target.value,
                    }))
                  }
                  placeholder="Python or TypeScript experience&#10;Interest in AI or Robotics"
                  className="mt-1 w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              {roleError && (
                <p role="alert" className="text-xs text-red-700">
                  {roleError}
                </p>
              )}

              <button
                type="submit"
                className="w-full px-4 py-2.5 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Publish Role to Careers Page
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-stone-200">
              <h3 className="text-xs font-semibold text-stone-900">
                Currently Published Roles on Careers Page
              </h3>
              {config.customRoles.length === 0 ? (
                <p className="text-xs text-stone-500 mt-2">
                  No additional role cards published (Careers page currently displays only the Direct Candidate Application form).
                </p>
              ) : (
                <div className="mt-3 space-y-2.5">
                  {config.customRoles.map((r) => (
                    <div
                      key={r.id}
                      className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-start justify-between gap-3 text-xs"
                    >
                      <div>
                        <p className="font-semibold text-stone-950">
                          {r.title}
                        </p>
                        <p className="text-stone-500 mt-0.5">
                          {r.type} · {r.division} · {r.location}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomRole(r.id)}
                        className="text-red-700 hover:text-red-900 font-medium whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Delete Role
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Private Google Sheets Auto-Sync & Business Enquiries */}
          <section className="bg-white border border-stone-200 rounded-xl p-6">
            <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
              CONTACT PAGE — PRIVATE GOOGLE SHEETS AUTO-SYNC
            </p>
            <h2 className="font-display text-xl font-bold text-stone-950 mt-1">
              Business & Partnership Enquiries
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              When a visitor clicks &ldquo;Dispatch Business Enquiry&rdquo; on the Contact page, their details are automatically sent in the background to your private Google Sheet Web App URL below (no visitor Google login required).
            </p>

            <form onSubmit={handleSaveWebhookUrl} className="mt-4 space-y-2">
              <label
                htmlFor="admin-sheet-webhook"
                className="block text-xs font-medium text-stone-800"
              >
                Private Google Sheet Apps Script Web App URL
              </label>
              <div className="flex gap-2">
                <input
                  id="admin-sheet-webhook"
                  type="url"
                  value={sheetWebhookUrl}
                  onChange={(e) => setSheetWebhookUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-medium bg-stone-900 text-white rounded-lg hover:bg-stone-800 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Save Sheet URL
                </button>
              </div>
            </form>

            <div className="mt-5 pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs font-semibold text-stone-900">
                  Dispatched Business Enquiries
                </h3>
                {submittedEnquiries.length > 0 && (
                  <button
                    type="button"
                    onClick={handleDownloadEnquiriesCsv}
                    className="px-3 py-1.5 text-xs font-medium bg-stone-100 text-stone-800 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Export Google Sheets CSV ↓
                  </button>
                )}
              </div>

              {submittedEnquiries.length === 0 ? (
                <p className="text-xs text-stone-500 mt-2">
                  No business or partnership enquiries dispatched yet.
                </p>
              ) : (
                <div className="mt-3 space-y-2.5">
                  {submittedEnquiries.map((item) => {
                    const status = item.status || 'Pending';
                    return (
                      <article
                        key={item.referenceCode}
                        className="p-4 bg-stone-50 border border-stone-200 rounded-lg text-xs space-y-2.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-stone-950">
                              {item.referenceCode} · {item.fullName} ({item.organization})
                            </span>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                                status === 'Approved'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : status === 'Rejected'
                                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                  : 'bg-sky-100 text-sky-800 border border-sky-300'
                              }`}
                            >
                              ● {status}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteEnquiry(item.referenceCode)
                            }
                            className="text-red-700 hover:text-red-900 font-medium cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>

                        <p className="text-stone-600">
                          <span className="font-medium">Track:</span>{' '}
                          {item.enquiryType} ·{' '}
                          <span className="font-medium">Email:</span> {item.email} ·{' '}
                          <span className="font-medium text-stone-500">Date:</span> {item.submittedAt}
                        </p>

                        <p className="text-stone-700 pt-1 border-t border-stone-200 leading-relaxed">
                          {item.message}
                        </p>

                        <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-mono text-stone-500">
                            ADMIN DECISION:
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() =>
                                handleSetEnquiryStatus(item.referenceCode, 'Approved')
                              }
                              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                                status === 'Approved'
                                  ? 'bg-emerald-700 text-white font-semibold'
                                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                              }`}
                            >
                              ✓ Approve
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleSetEnquiryStatus(item.referenceCode, 'Rejected')
                              }
                              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                                status === 'Rejected'
                                  ? 'bg-rose-700 text-white font-semibold'
                                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
                              }`}
                            >
                              ✕ Reject
                            </button>
                            {status !== 'Pending' && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleSetEnquiryStatus(item.referenceCode, 'Pending')
                                }
                                className="px-2 py-1 rounded text-[11px] font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
                              >
                                Reset to Pending
                              </button>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
