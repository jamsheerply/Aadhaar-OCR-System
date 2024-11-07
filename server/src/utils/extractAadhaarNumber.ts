function extractAadhaarNumber(text: string): string {
  // Look for 12 digit number pattern
  const aadhaarRegex = /\d{4}\s\d{4}\s\d{4}/;
  const match = text.match(aadhaarRegex);
  return match ? match[0] : "";
}

export default extractAadhaarNumber;
