export default function isExpired(
  createdAt: Date,
  expirationTime: number = 15 * 60 * 1000,
): boolean {
  return new Date().getTime() - new Date(createdAt).getTime() > expirationTime;
}
