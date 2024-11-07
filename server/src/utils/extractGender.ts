function extractGender(text: string): string {
  // Look for MALE/FEMALE
  const genderRegex = /\b(MALE|FEMALE)\b/i;
  const match = text.match(genderRegex);
  return match ? match[0].toUpperCase() : "";
}

export default extractGender;
