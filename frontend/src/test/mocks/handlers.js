import { http, HttpResponse } from 'msw';
import { API_URL } from '../../config';

export const handlers = [
  // Mock Auth for Login Test
  http.post(`${API_URL}/api/v1/auth`, () => {
    return HttpResponse.json({ token: 'mock-admin-token' });
  }),

  // Mock Stats
  http.get(`${API_URL}/api/v1/stats`, () => {
    return HttpResponse.json([{
      yearsExperience: "08",
      systemDeployed: "40+",
      uptimeSLA: "99.9%",
      commitsLogged: "12k",
      status: "Online"
    }]);
  }),

  // Mock Messages POST for Contact Form
  http.post(`${API_URL}/api/v1/messages`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: 'mocked-id', ...body }, { status: 201 });
  }),
  
  // Mock Experience
  http.get(`${API_URL}/api/v1/experiences`, () => {
    return HttpResponse.json([
      {
        id: "1",
        title: "Mock Architect",
        company: "Mock Corp",
        period: "2020 - 2024",
        bullets: ["Mock bullet 1", "Mock bullet 2"],
        technologies: ["React", "Redux"],
        icon: "dns",
        colorClass: "primary"
      }
    ]);
  }),

  // Mock Projects
  http.get(`${API_URL}/api/v1/projects`, () => {
    return HttpResponse.json([
      {
        id: "1",
        title: "Mock Project",
        subtitle: "Mock Subtitle",
        description: "Mock Description",
        technologies: ["React", "Node"],
        codeSnippet: "console.log('test')",
        icon: "code"
      }
    ]);
  }),

  // Mock Education
  http.get(`${API_URL}/api/v1/educations`, () => {
    return HttpResponse.json([
      {
        id: "1",
        typeEducation: "DEGREE",
        degree: "BS",
        title: "Mock Degree",
        institution: "Mock University",
        period: "2015 - 2019",
        specialization: "Mock Specialization",
        architectures: ["Arch1", "Arch2"],
        colorClass: "primary"
      }
    ]);
  }),

  // Mock Page Content
  http.get(`${API_URL}/api/v1/contents`, () => {
    return HttpResponse.json([
      { sectionType: "HOME", sectionContent: { title: "MOCK_ARCHITECTING DISTRIBUTED SYSTEMS.", subtitle: "Mock subtitle" } },
      { sectionType: "PROJECTS", sectionContent: { title: "MOCK_PROJECTS", subtitle: "Mock project subtitle" } },
      { sectionType: "EXPERIENCE", sectionContent: { title: "MOCK_EXPERIENCE", subtitle: "Mock experience subtitle" } },
      { sectionType: "EDUCATION", sectionContent: { title: "MOCK_EDUCATION", subtitle: "Mock education subtitle" } },
      { sectionType: "CONTACT", sectionContent: { title: "MOCK_CONTACT", subtitle: "Mock contact subtitle" } }
    ]);
  }),

  // Mock Tech Stack
  http.get(`${API_URL}/api/v1/stacks`, () => {
    return HttpResponse.json([
      { stackType: "LANGUAGES", technologies: ["MockLang"] },
      { stackType: "DATABASES", technologies: ["MockDB"] },
      { stackType: "INFRASTRUCTURE", technologies: ["MockInfra"] },
      { stackType: "MESSAGING", technologies: ["MockMsg"] }
    ]);
  }),
];
