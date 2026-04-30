export const INTERESTS = [
  // Original
  'Travel', 'Music', 'Sports', 'Gaming', 'Art', 'Technology',
  'Food', 'Fitness', 'Photography', 'Reading', 'Movies', 'Fashion',
  // Business & Tech
  'Business 💼', 'Entrepreneurship 🚀', 'Startups 📊', 'AI & Tech 🤖',
  // Mind & Spirit
  'Spirituality 🧘', 'Meditation 🧠',
  // Love
  'Dating ❤️', 'Relationships 💑',
  // Growth
  'Self Growth 🌱', 'Motivation 🔥',
  // Creator
  'Social Media 📱', 'Content Creation 🎥', 'Travel Blogging 🌍',
  // Lifestyle
  'Luxury Lifestyle ✨',
  // Wellness
  'Fitness Training 🏋️', 'Yoga 🧘‍♀️',
  // Gaming & Money
  'Gaming Streaming 🎮', 'Crypto & Finance 💰',
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

export const RELIGIONS = [
  'Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Buddhist', 'Other', 'Prefer not to say',
] as const;

export const LANGUAGES = [
  'Hindi', 'English', 'Hinglish', 'Bengali', 'Tamil', 'Telugu',
  'Marathi', 'Gujarati', 'Punjabi', 'Other',
] as const;

export const RELATIONSHIP_STATUSES = [
  'Single', 'In a Relationship', 'Married', 'Complicated', 'Prefer not to say',
] as const;

export const APP_NAME = 'GoMilap';
