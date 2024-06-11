import { EContentType } from '@/types/content';
import * as z from 'zod';
export const signInSchema = z.object({
  userName: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const onboardingSchema = z.object({
  currentKnowledge: z.string().min(1),
  codingAmbitions: z.array(z.string()).min(1),
  preferredSkills: z.array(z.string().max(17)).min(1),
});

export const profileSchema = z.object({
  userId: z.string(),
  userName: z.string().optional(),
  name: z.string().optional().optional(),
  email: z
    .string({ required_error: 'Email is required!' })
    .trim()
    .email('Please provide valid email address!')
    .optional(),
  preferredSkills: z.array(z.string()).optional(),
  contents: z.array(z.string()).optional(),
  likedContents: z.array(z.string()).optional(),
  bio: z.string().optional(),
  avatarImg: z.string().optional(),
  createdAt: z.date().optional(),
  instagramName: z.string().optional(),
  instagramLink: z.string().optional(),
  linkedinName: z.string().optional(),
  linkedinLink: z.string().optional(),
  twitterName: z.string().optional(),
  twitterLink: z.string().optional(),
  followers: z.number().optional(),
  following: z.number().optional(),
});

export const createContentSchema = z.object({
  authorId: z.string(),
  title: z.string().min(3).max(100),
  type: z.nativeEnum(EContentType),
  groupId: z.object({
    value: z.string().min(1),
    label: z.string().min(1),
  }),
  coverImage: z.string().optional(),
  meetupLocation: z.string().min(3),
  meetupDate: z.coerce.date(),
  podcastFile: z.string().min(3),
  podcastTitle: z.string().min(3),
  description: z.string().min(30),
  tags: z
    .array(
      z.object({
        label: z.string().min(1).max(20, ' Tag must be max 20 characters long'),
      })
    )
    .max(5),
});

const preferredSkillsSchema = z.object({
  value: z.string().trim().min(1, 'Tag must be at least 2 characters long!'),
  label: z.string().trim().min(1, 'Tag must be at least 2 characters long!'),
});

export const updateProfileSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(2, 'User name must be at least 2 character long'),
  name: z
    .string()
    .trim()
    .min(2, 'User name must be at least 2 character long')
    .optional(),
  preferredSkills: z
    .array(preferredSkillsSchema)
    .min(1, 'Please add at least one skill to your profile.'),
  bio: z.string().optional(),
  avatarImg: z.string().optional(),
  instagramName: z.string().optional(),
  instagramLink: z.string().url().optional().or(z.literal('')),
  linkedinName: z.string().optional(),
  linkedinLink: z.string().url().optional().or(z.literal('')),
  twitterName: z.string().optional(),
  twitterLink: z.string().url().optional().or(z.literal('')),
});

export const createGroupSchema = z.object({
  authorId: z.string(),
  name: z.string().min(1).max(50),
  profileImage: z.string().optional(),
  coverImage: z.string().optional(),
  bio: z.string().min(1),
  members: z.array(
    z.object({
      userId: z.string(),
      groupId: z.string().optional(),
      role: z.string(),
    })
  ),
});
