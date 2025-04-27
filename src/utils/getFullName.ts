export default function getFullName(firstName?: string, lastName?: string) {
  return `${firstName ? firstName + ' ' : ''}${lastName ? lastName : ''}`;
}
