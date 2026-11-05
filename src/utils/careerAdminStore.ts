import { CareerOpportunity } from '../data/moxforgeData';

export interface SubmittedCandidateApplication {
  id: string;
  roleId: string;
  roleTitle: string;
  fullName: string;
  email: string;
  affiliation: string;
  linkedinUrl?: string;
  portfolioUrl: string;
  statement: string;
  submittedAt: string;
  status?: 'Pending' | 'Approved' | 'Rejected';
}

export interface CareerPageAdminConfig {
  formKicker: string;
  formTitle: string;
  formDescription: string;
  opportunityOptions: { id: string; label: string }[];
  customRoles: CareerOpportunity[];
}

const CONFIG_STORAGE_KEY = 'moxforge_careers_admin_config_v2';
const APPS_STORAGE_KEY = 'moxforge_careers_submitted_apps_v1';

export const DEFAULT_CAREER_ADMIN_CONFIG: CareerPageAdminConfig = {
  formKicker: 'DIRECT CANDIDATE APPLICATION',
  formTitle: 'Apply for Role or Fellowship',
  formDescription:
    'Every application is reviewed directly by Moxforge Innovation Labs leads and Community directors.',
  opportunityOptions: [
    {
      id: 'opp-moxforge-organization',
      label: 'Moxforge Organization',
    },
    {
      id: 'opp-moxforge-innovation',
      label: 'Moxforge Innovation',
    },
  ],
  customRoles: [],
};

export function loadCareerAdminConfig(): CareerPageAdminConfig {
  if (typeof window === 'undefined' || !window.localStorage) {
    return DEFAULT_CAREER_ADMIN_CONFIG;
  }
  try {
    const raw = window.localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) return DEFAULT_CAREER_ADMIN_CONFIG;
    const parsed = JSON.parse(raw) as Partial<CareerPageAdminConfig>;
    return {
      formKicker: parsed.formKicker || DEFAULT_CAREER_ADMIN_CONFIG.formKicker,
      formTitle: parsed.formTitle || DEFAULT_CAREER_ADMIN_CONFIG.formTitle,
      formDescription:
        parsed.formDescription || DEFAULT_CAREER_ADMIN_CONFIG.formDescription,
      opportunityOptions: Array.isArray(parsed.opportunityOptions) &&
        parsed.opportunityOptions.length > 0
        ? parsed.opportunityOptions
        : DEFAULT_CAREER_ADMIN_CONFIG.opportunityOptions,
      customRoles: Array.isArray(parsed.customRoles) ? parsed.customRoles : [],
    };
  } catch {
    return DEFAULT_CAREER_ADMIN_CONFIG;
  }
}

export function saveCareerAdminConfig(config: CareerPageAdminConfig): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadSubmittedApplications(): SubmittedCandidateApplication[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(APPS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item: SubmittedCandidateApplication) => ({
      ...item,
      status: item.status || 'Pending',
    }));
  } catch {
    return [];
  }
}

export function saveSubmittedApplications(
  apps: SubmittedCandidateApplication[]
): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(apps));
  } catch {
    // Ignore storage quota errors
  }
}

export function updateCandidateApplicationStatus(
  id: string,
  status: 'Pending' | 'Approved' | 'Rejected'
): SubmittedCandidateApplication[] {
  const current = loadSubmittedApplications();
  const updated = current.map((item) =>
    item.id === id ? { ...item, status } : item
  );
  saveSubmittedApplications(updated);
  return updated;
}

export interface SubmittedBusinessEnquiry {
  referenceCode: string;
  fullName: string;
  email: string;
  organization: string;
  enquiryType: string;
  timeline: string;
  message: string;
  submittedAt: string;
  syncedToSheet?: boolean;
  status?: 'Pending' | 'Approved' | 'Rejected';
}

const ENQUIRIES_STORAGE_KEY = 'moxforge_business_enquiries_v1';
const SHEET_WEBHOOK_STORAGE_KEY = 'moxforge_private_sheet_webhook_v1';

export function loadSubmittedEnquiries(): SubmittedBusinessEnquiry[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item: SubmittedBusinessEnquiry) => ({
      ...item,
      status: item.status || 'Pending',
    }));
  } catch {
    return [];
  }
}

export function saveSubmittedEnquiries(
  enquiries: SubmittedBusinessEnquiry[]
): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(
      ENQUIRIES_STORAGE_KEY,
      JSON.stringify(enquiries)
    );
  } catch {
    // Ignore storage quota errors
  }
}

export function updateEnquiryStatus(
  referenceCode: string,
  status: 'Pending' | 'Approved' | 'Rejected'
): SubmittedBusinessEnquiry[] {
  const current = loadSubmittedEnquiries();
  const updated = current.map((item) =>
    item.referenceCode === referenceCode ? { ...item, status } : item
  );
  saveSubmittedEnquiries(updated);
  return updated;
}

export function loadGoogleSheetWebhookUrl(): string {
  const envUrl =
    (import.meta as any).env?.VITE_GOOGLE_SHEETS_WEBHOOK_URL || '';
  if (typeof window === 'undefined' || !window.localStorage) {
    return envUrl;
  }
  try {
    return (
      window.localStorage.getItem(SHEET_WEBHOOK_STORAGE_KEY)?.trim() || envUrl
    );
  } catch {
    return envUrl;
  }
}

export function saveGoogleSheetWebhookUrl(url: string): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(SHEET_WEBHOOK_STORAGE_KEY, url.trim());
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Automatically dispatches a submitted Business or Partnership Enquiry
 * directly to the admin's private Google Sheet Web App URL in the background
 * without requiring any visitor login on the public website.
 */
export async function dispatchEnquiryToPrivateGoogleSheet(
  enquiry: SubmittedBusinessEnquiry
): Promise<boolean> {
  const webhookUrl = loadGoogleSheetWebhookUrl();
  if (!webhookUrl) return false;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(enquiry),
    });
    return true;
  } catch {
    return false;
  }
}

