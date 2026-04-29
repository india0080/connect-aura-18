import riya from '@/assets/demo/riya.jpg';
import aman from '@/assets/demo/aman.jpg';
import sneha from '@/assets/demo/sneha.jpg';
import rahul from '@/assets/demo/rahul.jpg';
import pooja from '@/assets/demo/pooja.jpg';
import arjun from '@/assets/demo/arjun.jpg';

export interface DemoProfile {
  id: string;
  full_name: string;
  age: number;
  location: string;
  avatar_url: string;
  gender: 'male' | 'female';
  bio: string;
  interests: string[];
}

export const DEMO_PROFILES: DemoProfile[] = [
  {
    id: 'demo-riya',
    full_name: 'Riya Sharma',
    age: 24,
    location: 'Delhi',
    avatar_url: riya,
    gender: 'female',
    bio: 'Love traveling & coffee ☕',
    interests: ['Travel', 'Music'],
  },
  {
    id: 'demo-aman',
    full_name: 'Aman Verma',
    age: 27,
    location: 'Mumbai',
    avatar_url: aman,
    gender: 'male',
    bio: 'Fitness enthusiast & foodie 💪',
    interests: ['Fitness', 'Food'],
  },
  {
    id: 'demo-sneha',
    full_name: 'Sneha Patel',
    age: 23,
    location: 'Ahmedabad',
    avatar_url: sneha,
    gender: 'female',
    bio: 'Artist & nature lover 🎨',
    interests: ['Art', 'Photography'],
  },
  {
    id: 'demo-rahul',
    full_name: 'Rahul Singh',
    age: 28,
    location: 'Bangalore',
    avatar_url: rahul,
    gender: 'male',
    bio: 'Tech guy & gamer 🎮',
    interests: ['Technology', 'Gaming'],
  },
  {
    id: 'demo-pooja',
    full_name: 'Pooja Mehta',
    age: 25,
    location: 'Jaipur',
    avatar_url: pooja,
    gender: 'female',
    bio: 'Book lover & calm soul 📚',
    interests: ['Reading', 'Movies'],
  },
  {
    id: 'demo-arjun',
    full_name: 'Arjun Kapoor',
    age: 26,
    location: 'Chandigarh',
    avatar_url: arjun,
    gender: 'male',
    bio: 'Adventure & bike rides 🏍️',
    interests: ['Travel', 'Sports'],
  },
];
