export const INTERESTS = [
  'Travel', 'Music', 'Sports', 'Gaming', 'Art', 'Technology',
  'Food', 'Fitness', 'Photography', 'Reading', 'Movies', 'Fashion',
] as const;

export type Interest = typeof INTERESTS[number];

export const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
] as const;

export const PREFERENCES = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'everyone', label: 'Everyone' },
] as const;

export const APP_NAME = 'GoMilap';
