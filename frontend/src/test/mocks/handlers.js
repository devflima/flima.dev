import { http, HttpResponse } from 'msw';
import { API_URL } from '../../config';

export const handlers = [
  // Mock Stats
  http.get(`${API_URL}/stats`, () => {
    return HttpResponse.json({
      yearsExp: "08",
      sysDeployed: "40+",
      uptimeSLA: "99.9%",
      commitsLogged: "12k",
      status: "Online"
    });
  }),

  // Mock Messages POST for Contact Form
  http.post(`${API_URL}/messages`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: 'mocked-id', ...body }, { status: 201 });
  }),
  
  // Mock Experience
  http.get(`${API_URL}/experience`, () => {
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
  http.get(`${API_URL}/projects`, () => {
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
  http.get(`${API_URL}/education`, () => {
    return HttpResponse.json([
      {
        id: "1",
        type: "degree",
        degree: "BS",
        title: "Mock Degree",
        institution: "Mock University",
        period: "2015 - 2019",
        concentration: "Mock Concentration",
        architectures: ["Arch1", "Arch2"],
        colorClass: "primary"
      }
    ]);
  }),

  // Mock Page Content
  http.get(`${API_URL}/pageContent`, () => {
    return HttpResponse.json({
      home: {
        title: "MOCK_ARCHITECTING DISTRIBUTED SYSTEMS.",
        subtitle: "Mock subtitle"
      },
      projects: {
        title: "MOCK_PROJECTS",
        subtitle: "Mock project subtitle"
      },
      experience: {
        title: "MOCK_EXPERIENCE",
        subtitle: "Mock experience subtitle"
      },
      education: {
        title: "MOCK_EDUCATION",
        subtitle: "Mock education subtitle"
      },
      contact: {
        title: "MOCK_CONTACT",
        subtitle: "Mock contact subtitle"
      }
    });
  }),

  // Mock Tech Stack
  http.get(`${API_URL}/techStack`, () => {
    return HttpResponse.json({
      languages: ["MockLang"],
      databases: ["MockDB"],
      infrastructure: ["MockInfra"],
      messaging: ["MockMsg"]
    });
  }),
];
