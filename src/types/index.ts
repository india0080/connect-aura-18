export type Gender = 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
export type Preference = 'men' | 'women' | 'everyone';
export type RequestStatus = 'pending' | 'accepted' | 'rejected';

export interface Profile {
  id: string;
  full_name: string;
  email: string | null;
  avatar_url: string | null;
  gender: Gender | null;
  preference: Preference | null;
  bio: string | null;
  interests: string[];
  religion: string | null;
  languages: string[];
  location: string | null;
  relationship_status: string | null;
  onboarding_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface FriendRequest {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  chat_room_id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  read: boolean;
  created_at: string;
}
