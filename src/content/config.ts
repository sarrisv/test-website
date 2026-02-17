import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';


// NEWS: Folder-based Markdown
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    image: image(),
  }),
});

// PEOPLE: Single YAML file
const people = defineCollection({
  loader: file('src/content/people.yml'),
  schema: ({ image }) => z.object({
    id: z.string(),
    fullname: z.string(),
    shortname: z.string(),
    roles: z.array(z.enum(['faculty', 'collaborator', 'affiliated', 'former', 'alumni', 'phd', 'ms', 'bs'])),
    department: z.string(),
    image: image(),
    biography: z.string().optional(),
    interests: z.array(z.string()).optional(),
    degrees: z.array(z.object({
      level: z.enum(['phd', 'ms', 'bs']),
      title: z.string(),
      advisors: z.array(z.string()),
      month: z.number().min(1).max(12),
      year: z.number(),
    })).optional(),
  }),
});

// PROJECTS: Single YAML file
const projects = defineCollection({
  loader: file('src/content/projects.yml'),
  schema: z.object({
    id: z.string(),
    link: z.boolean(),
    title: z.string(),
    shortTitle: z.string(),
    shortDesc: z.string(),
    description: z.string(),
    team: z.object({
      faculty: z.array(z.string()).optional(),
      collaborators: z.array(z.string()).optional(),
      gradStudents: z.array(z.string()).optional(),
      ugradStudents: z.array(z.string()).optional(),
    }),
    grants: z.array(z.string()).optional(),
    links: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })).optional(),
    press: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })).optional(),
  }),
});

// COURSES: Single YAML file
const courses = defineCollection({
  loader: file('src/content/courses.yml'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    status: z.enum(['current', 'previous']),
    instructorIds: z.array(z.string()),
    previousInstructorIds: z.array(z.string()),
    url: z.string().url(),
  }),
});

export const collections = { news, people, projects, courses };
