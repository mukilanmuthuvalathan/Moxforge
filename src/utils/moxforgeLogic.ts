import {
  MOXFORGE_PAGES,
  MoxforgeProject,
  ProjectCategory,
  PartnerOrganization,
  PartnerCategory,
  TeamMember,
  TeamDepartment,
  CareerOpportunity,
  CareerType,
  CommunityEvent,
  PageId,
} from '../data/moxforgeData';

export function resolvePageId(raw?: string | null): PageId {
  if (!raw) return 'home';
  const cleaned = raw
    .trim()
    .toLowerCase()
    .replace(/^#\/?/, '')
    .replace(/^\/+|\/+$/g, '');
  const match = MOXFORGE_PAGES.find((p) => p.id === cleaned);
  return match ? match.id : 'home';
}

export function filterProjects(
  projects: MoxforgeProject[],
  category: ProjectCategory,
  searchQuery: string,
  divisionFilter: 'All' | 'Moxforge Labs' | 'Moxforge Community' = 'All'
): MoxforgeProject[] {
  const q = searchQuery.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesCategory = category === 'All' || project.category === category;
    const matchesDivision =
      divisionFilter === 'All' || project.leadDivision === divisionFilter;
    const matchesQuery =
      q.length === 0 ||
      project.title.toLowerCase().includes(q) ||
      project.summary.toLowerCase().includes(q) ||
      project.techStack.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesDivision && matchesQuery;
  });
}

export function filterPartners(
  partners: PartnerOrganization[],
  category: PartnerCategory
): PartnerOrganization[] {
  if (category === 'All') return partners;
  return partners.filter((p) => p.category === category);
}

export function filterTeamMembers(
  members: TeamMember[],
  department: TeamDepartment
): TeamMember[] {
  if (department === 'All') return members;
  return members.filter((m) => m.department === department);
}

export function filterCareers(
  careers: CareerOpportunity[],
  type: CareerType,
  searchQuery: string
): CareerOpportunity[] {
  const q = searchQuery.trim().toLowerCase();
  return careers.filter((role) => {
    const matchesType = type === 'All' || role.type === type;
    const matchesQuery =
      q.length === 0 ||
      role.title.toLowerCase().includes(q) ||
      role.summary.toLowerCase().includes(q) ||
      role.location.toLowerCase().includes(q) ||
      role.division.toLowerCase().includes(q);
    return matchesType && matchesQuery;
  });
}

export function registerForCommunityEvent(
  events: CommunityEvent[],
  registeredIds: string[],
  eventId: string
): { events: CommunityEvent[]; registeredIds: string[]; added: boolean } {
  if (registeredIds.includes(eventId)) {
    return { events, registeredIds, added: false };
  }
  const target = events.find((e) => e.id === eventId);
  if (!target || target.registeredCount >= target.capacity) {
    return { events, registeredIds, added: false };
  }
  const updatedEvents = events.map((ev) =>
    ev.id === eventId ? { ...ev, registeredCount: ev.registeredCount + 1 } : ev
  );
  return {
    events: updatedEvents,
    registeredIds: [...registeredIds, eventId],
    added: true,
  };
}

export interface CareerApplicationInput {
  roleId: string;
  fullName: string;
  email: string;
  affiliation: string;
  linkedinUrl?: string;
  portfolioUrl: string;
  statement: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCareerApplication(
  input: CareerApplicationInput
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.roleId || input.roleId.trim().length === 0) {
    errors.roleId = 'Please select an opportunity to apply for.';
  }
  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }
  if (!input.email || !EMAIL_REGEX.test(input.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }
  if (!input.affiliation || input.affiliation.trim().length < 2) {
    errors.affiliation = 'Please enter your university or current organization.';
  }
  if (!input.statement || input.statement.trim().length < 20) {
    errors.statement =
      'Please share a brief note on your technical background or project experience (at least 20 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface ContactEnquiryInput {
  fullName: string;
  email: string;
  organization: string;
  enquiryType:
    | 'Moxforge Organization'
    | 'Moxforge Innovation'
    | 'Enterprise R&D Partnership'
    | 'Moxforge Labs Venture Spinout'
    | 'University Chapter & Academic MOU'
    | 'Press & Speaking Enquiry';
  timeline: string;
  message: string;
}

export function validateContactEnquiry(
  input: ContactEnquiryInput
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }
  if (!input.email || !EMAIL_REGEX.test(input.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!input.organization || input.organization.trim().length < 2) {
    errors.organization = 'Please specify your company, institution, or chapter.';
  }
  if (!input.message || input.message.trim().length < 20) {
    errors.message =
      'Please describe your collaboration or business enquiry in at least 20 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export const ADMIN_MASTER_PASSWORD = 'Mukilan@197886';
export const ADMIN_AUTH_SESSION_KEY = 'moxforge_admin_auth_v1';

export function verifyAdminPassword(password: string): boolean {
  if (!password) return false;
  return password.trim() === ADMIN_MASTER_PASSWORD;
}

export function isAdminSessionAuthenticated(): boolean {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return false;
  }
  try {
    return (
      window.sessionStorage.getItem(ADMIN_AUTH_SESSION_KEY) === 'authenticated'
    );
  } catch {
    return false;
  }
}

export function setAdminSessionAuthenticated(authenticated: boolean): void {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    if (authenticated) {
      window.sessionStorage.setItem(ADMIN_AUTH_SESSION_KEY, 'authenticated');
    } else {
      window.sessionStorage.removeItem(ADMIN_AUTH_SESSION_KEY);
    }
  } catch {
    // Ignore storage quota/permission errors
  }
}

