import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Projects', 'Experience', 'Education', 'Messages', 'Dashboard', 'Stats', 'TechStack', 'PageContent'],
  endpoints: (builder) => ({
    // Auth
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/v1/auth',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Stats (Home page stats)
    getStats: builder.query({
      query: () => '/api/v1/stats',
      providesTags: ['Stats'],
      transformResponse: (response) => {
        const data = Array.isArray(response) && response.length > 0 ? response[0] : {
          yearsExperience: '0',
          systemDeployed: '0',
          uptimeSLA: '0%',
          commitsLogged: '0',
          status: 'Offline',
          objective: 'N/A'
        };
        return data;
      },
    }),
    addStats: builder.mutation({
      query: (stats) => ({
        url: '/api/v1/stats',
        method: 'POST',
        body: stats,
      }),
      invalidatesTags: ['Stats'],
    }),
    updateStats: builder.mutation({
      query: ({ id, ...stats }) => ({
        url: `/api/v1/stats/${id}`,
        method: 'PUT',
        body: stats,
      }),
      invalidatesTags: ['Stats'],
    }),

    // Tech Stack
    getTechStack: builder.query({
      query: () => '/api/v1/stacks',
      providesTags: ['TechStack'],
      transformResponse: (response) => {
        const result = {
          languages: [],
          databases: [],
          infrastructure: [],
          messaging: [],
          _ids: {}
        };
        
        if (Array.isArray(response)) {
          response.forEach(stack => {
            const key = stack.stackType.toLowerCase();
            if (result[key] !== undefined && stack.technologies) {
              result[key] = stack.technologies;
              result._ids[key] = stack.id;
            }
          });
        }
        
        return result;
      }
    }),
    // The backend uses a list of stacks, but the frontend treats it as one object.
    // For now, let's just add/update functionality is complex due to structure diff.
    // I will add a simple mutation that matches the structure for now.
    addTechStack: builder.mutation({
      query: (stack) => ({
        url: '/api/v1/stacks',
        method: 'POST',
        body: stack,
      }),
      invalidatesTags: ['TechStack'],
    }),
    updateTechStack: builder.mutation({
      query: ({ id, ...stack }) => ({
        url: `/api/v1/stacks/${id}`,
        method: 'PUT',
        body: stack,
      }),
      invalidatesTags: ['TechStack'],
    }),

    // Page Content
    getPageContent: builder.query({
      query: () => '/api/v1/contents',
      providesTags: ['PageContent'],
      transformResponse: (response) => {
        const result = {
          home: { title: '', subtitle: '' },
          projects: { title: '', subtitle: '' },
          experience: { title: '', subtitle: '' },
          education: { title: '', subtitle: '' },
          contact: { title: '', subtitle: '' },
          _ids: {}
        };
        if (Array.isArray(response)) {
          response.forEach(content => {
            const key = content.sectionType.toLowerCase();
            if (result[key] && content.sectionContent) {
              result[key] = content.sectionContent;
              result._ids[key] = content.id;
            }
          });
        }
        return result;
      }
    }),
    addPageContent: builder.mutation({
      query: (content) => ({
        url: '/api/v1/contents',
        method: 'POST',
        body: content,
      }),
      invalidatesTags: ['PageContent'],
    }),
    updatePageContent: builder.mutation({
      query: ({ id, ...content }) => ({
        url: `/api/v1/contents/${id}`,
        method: 'PUT',
        body: content,
      }),
      invalidatesTags: ['PageContent'],
    }),

    // Dashboard
    getDashboardData: builder.query({
      query: () => '/api/v1/dashboardData', // No backend equivalent yet?
      providesTags: ['Dashboard'],
    }),

    // Projects
    getProjects: builder.query({
      query: () => '/api/v1/projects',
      providesTags: ['Projects'],
    }),
    addProject: builder.mutation({
      query: (project) => ({
        url: '/api/v1/projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Projects'],
    }),
    updateProject: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/api/v1/projects/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Projects'],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/api/v1/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Projects'],
    }),

    // Experience
    getExperience: builder.query({
      query: () => '/api/v1/experiences',
      providesTags: ['Experience'],
    }),
    addExperience: builder.mutation({
      query: (exp) => ({
        url: '/api/v1/experiences',
        method: 'POST',
        body: exp,
      }),
      invalidatesTags: ['Experience'],
    }),
    updateExperience: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/api/v1/experiences/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Experience'],
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/api/v1/experiences/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Experience'],
    }),

    // Education
    getEducation: builder.query({
      query: () => '/api/v1/educations',
      providesTags: ['Education'],
    }),
    addEducation: builder.mutation({
      query: (edu) => ({
        url: '/api/v1/educations',
        method: 'POST',
        body: edu,
      }),
      invalidatesTags: ['Education'],
    }),
    updateEducation: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/api/v1/educations/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Education'],
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `/api/v1/educations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Education'],
    }),

    // Messages
    getMessages: builder.query({
      query: () => '/api/v1/messages',
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: (msg) => ({
        url: '/api/v1/messages',
        method: 'POST',
        body: msg,
      }),
      invalidatesTags: ['Messages'],
    }),
    updateMessageStatus: builder.mutation({
      query: ({ id, type, body }) => {
        if (type === 'read') {
          return {
            url: `/api/v1/messages/read/${id}`,
            method: 'POST',
          };
        }
        return {
          url: `/api/v1/messages/${id}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['Messages'],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/api/v1/messages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetStatsQuery,
  useAddStatsMutation,
  useUpdateStatsMutation,
  useGetTechStackQuery,
  useAddTechStackMutation,
  useUpdateTechStackMutation,
  useGetPageContentQuery,
  useAddPageContentMutation,
  useUpdatePageContentMutation,
  useGetDashboardDataQuery,
  useGetProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetExperienceQuery,
  useAddExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  useGetEducationQuery,
  useAddEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  useGetMessagesQuery,
  useAddMessageMutation,
  useUpdateMessageStatusMutation,
  useDeleteMessageMutation,
} = apiSlice;
