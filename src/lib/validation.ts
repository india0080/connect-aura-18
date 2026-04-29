import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'At least 8 characters')
  .regex(/[A-Z]/, 'At least one uppercase letter')
  .regex(/[0-9]/, 'At least one number')
  .regex(/[^A-Za-z0-9]/, 'At least one special character');

export const signupSchema = z
  .object({
    fullName: z.string().trim().min(2, 'Please enter your name').max(80),
    email: z.string().trim().email('Invalid email').max(254),
    password: passwordSchema,
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    path: ['confirm'],
    message: 'Passwords do not match',
  });

export const loginSchema = z.object({
  email: z.string().trim().email('Invalid email'),
  password: z.string().min(1, 'Required'),
  remember: z.boolean().optional(),
});

export const emailOnlySchema = z.object({
  email: z.string().trim().email('Invalid email'),
});

export const profileSchema = z.object({
  full_name: z.string().trim().min(2).max(80),
  bio: z.string().max(150).optional().default(''),
  gender: z.enum(['male', 'female', 'non-binary', 'prefer-not-to-say']),
  preference: z.enum(['men', 'women', 'everyone']),
  interests: z.array(z.string()).min(1, 'Pick at least one interest').max(12),
});

export function passwordStrength(pw: string): { score: 0 | 1 | 2 | 3 | 4; label: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'] as const;
  return { score: score as 0 | 1 | 2 | 3 | 4, label: labels[score] };
}
