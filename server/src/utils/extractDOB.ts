function extractDOB(text: string): string {
  // Look for date pattern
  const dobRegex = /\d{2}\/\d{2}\/\d{4}/;
  const match = text.match(dobRegex);
  return match ? match[0] : "";
}

export default extractDOB;
