/** Deterministic chat room id from two user IDs (sorted). */
export function chatRoomId(a: string, b: string): string {
  return [a, b].sort().join('__');
}

export function otherParticipant(roomId: string, me: string): string {
  const [a, b] = roomId.split('__');
  return a === me ? b : a;
}
