import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resolvePageId,
  filterProjects,
  filterPartners,
  filterTeamMembers,
  filterCareers,
  registerForCommunityEvent,
  validateCareerApplication,
  validateContactEnquiry,
  verifyAdminPassword,
  ADMIN_MASTER_PASSWORD,
} from './moxforgeLogic';
import {
  MOXFORGE_PROJECTS,
  MOXFORGE_PARTNERS,
  MOXFORGE_TEAM,
  MOXFORGE_CAREERS,
  INITIAL_COMMUNITY_EVENTS,
} from '../data/moxforgeData';

test('resolvePageId maps valid routes and defaults unknown inputs to home', () => {
  assert.equal(resolvePageId('home'), 'home');
  assert.equal(resolvePageId('#/ventures'), 'ventures');
  assert.equal(resolvePageId('COMMUNITY'), 'community');
  assert.equal(resolvePageId('unknown-route'), 'home');
  assert.equal(resolvePageId(undefined), 'home');
});

test('filterProjects filters by category, division, and search query', () => {
  const storageOnly = filterProjects(
    MOXFORGE_PROJECTS,
    'Distributed Storage',
    ''
  );
  assert.equal(storageOnly.length, 1);
  assert.equal(storageOnly[0].id, 'mox-storvex');

  const communityOnly = filterProjects(
    MOXFORGE_PROJECTS,
    'All',
    '',
    'Moxforge Community'
  );
  assert.equal(communityOnly.length, 1);
  assert.equal(communityOnly[0].id, 'mox-pylume');

  const searchLearnito = filterProjects(MOXFORGE_PROJECTS, 'All', 'Learnito');
  assert.equal(searchLearnito.length, 2);
  assert.equal(searchLearnito[0].id, 'mox-learnito-ai');
  assert.equal(searchLearnito[1].id, 'mox-learnitosphere');

  const platformOnly = filterProjects(
    MOXFORGE_PROJECTS,
    'Software Platform',
    ''
  );
  assert.equal(platformOnly.length, 1);
  assert.equal(platformOnly[0].id, 'mox-learnitosphere');
});

test('filterPartners and filterTeamMembers filter accurately', () => {
  const academic = filterPartners(MOXFORGE_PARTNERS, 'Academic Institutions');
  assert.equal(academic.length, 2);

  const leadership = filterTeamMembers(MOXFORGE_TEAM, 'Leadership');
  assert.equal(leadership.length, 2);
  const founder = leadership.find((m) => m.isFounder);
  assert.ok(founder);
  assert.equal(founder.name, 'Mukilan Muthuvalathan');
  assert.equal(founder.location, 'MOXFORGE');
  assert.equal(founder.role, 'Founder & Chief Executive Officer (CEO)');
});

test('filterCareers filters internships and volunteering opportunities', () => {
  const internships = filterCareers(MOXFORGE_CAREERS, 'Internship', '');
  assert.equal(internships.length, 2);

  const volunteering = filterCareers(MOXFORGE_CAREERS, 'Volunteering', 'campus');
  assert.equal(volunteering.length, 1);
  assert.equal(volunteering[0].id, 'role-campus-chapter-lead');
});

test('registerForCommunityEvent increments attendee count once and prevents duplicate RSVP', () => {
  const first = registerForCommunityEvent(
    INITIAL_COMMUNITY_EVENTS,
    [],
    'evt-forgecon-2026'
  );
  assert.equal(first.added, true);
  assert.deepEqual(first.registeredIds, ['evt-forgecon-2026']);
  const updatedEvent = first.events.find((e) => e.id === 'evt-forgecon-2026')!;
  assert.equal(
    updatedEvent.registeredCount,
    INITIAL_COMMUNITY_EVENTS[0].registeredCount + 1
  );

  const duplicate = registerForCommunityEvent(
    first.events,
    first.registeredIds,
    'evt-forgecon-2026'
  );
  assert.equal(duplicate.added, false);
  assert.equal(
    duplicate.events.find((e) => e.id === 'evt-forgecon-2026')!.registeredCount,
    updatedEvent.registeredCount
  );
});

test('validateCareerApplication catches invalid fields and passes valid submission', () => {
  const invalid = validateCareerApplication({
    roleId: '',
    fullName: 'A',
    email: 'not-an-email',
    affiliation: '',
    portfolioUrl: '',
    statement: 'Too short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.roleId);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.affiliation);
  assert.ok(invalid.errors.statement);

  const valid = validateCareerApplication({
    roleId: 'role-ai-compiler-intern',
    fullName: 'Karthik Narayanan',
    email: 'karthik@iit.ac.in',
    affiliation: 'IIT Madras',
    portfolioUrl: 'https://github.com/karthik',
    statement:
      'Built custom INT8 quantization passes in PyTorch and ONNX Runtime for embedded vision workloads.',
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('validateContactEnquiry enforces email format and minimum message length', () => {
  const invalid = validateContactEnquiry({
    fullName: '',
    email: 'invalid@',
    organization: '',
    enquiryType: 'Enterprise R&D Partnership',
    timeline: 'Q1 2027',
    message: 'Short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.organization);
  assert.ok(invalid.errors.message);

  const valid = validateContactEnquiry({
    fullName: 'Priya Sundaram',
    email: 'priya@heliosgrid.in',
    organization: 'Helios Renewable Infrastructure',
    enquiryType: 'Enterprise R&D Partnership',
    timeline: 'Immediate (Next 30 Days)',
    message:
      'We would like to scope a 12-week field pilot deploying Kinetix-M2 across three 400kV substations.',
  });
  assert.equal(valid.valid, true);
});

test('candidate application status defaults to Pending and transitions to Approved / Rejected', () => {
  type AppStatus = 'Pending' | 'Approved' | 'Rejected';
  interface TestApp {
    id: string;
    fullName: string;
    status?: AppStatus;
  }

  const rawApps: TestApp[] = [
    { id: 'APP-101', fullName: 'Mukilan Muthuvalathan' },
    { id: 'APP-102', fullName: 'Kavitha R', status: 'Approved' },
  ];

  // Default missing status to 'Pending'
  const normalized = rawApps.map((a) => ({
    ...a,
    status: a.status || 'Pending',
  }));

  assert.equal(normalized[0].status, 'Pending');
  assert.equal(normalized[1].status, 'Approved');

  // Transition status
  const updateStatus = (id: string, nextStatus: AppStatus) =>
    normalized.map((a) => (a.id === id ? { ...a, status: nextStatus } : a));

  const afterApprove = updateStatus('APP-101', 'Approved');
  assert.equal(afterApprove.find((a) => a.id === 'APP-101')?.status, 'Approved');

  const afterReject = updateStatus('APP-101', 'Rejected');
  assert.equal(afterReject.find((a) => a.id === 'APP-101')?.status, 'Rejected');

  const afterReset = updateStatus('APP-101', 'Pending');
  assert.equal(afterReset.find((a) => a.id === 'APP-101')?.status, 'Pending');
});

test('verifyAdminPassword accurately validates master admin password', () => {
  assert.equal(ADMIN_MASTER_PASSWORD, 'Mukilan@197886');
  assert.equal(verifyAdminPassword('Mukilan@197886'), true);
  assert.equal(verifyAdminPassword('  Mukilan@197886  '), true);
  assert.equal(verifyAdminPassword('wrongpassword'), false);
  assert.equal(verifyAdminPassword('Mukilan'), false);
  assert.equal(verifyAdminPassword(''), false);
});

test('toggleThemeValue toggles between light and dark themes accurately', async () => {
  const { toggleThemeValue, getInitialTheme } = await import('./theme');
  assert.equal(toggleThemeValue('light'), 'dark');
  assert.equal(toggleThemeValue('dark'), 'light');
  assert.equal(getInitialTheme(), 'light');
});



