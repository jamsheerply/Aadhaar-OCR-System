function isGovernmentOfIndiaDocument(text: string): boolean {
  // Check for exact phrase "Government of India"
  const exactGovRegex = /Government\s+of\s+India/i;

  // Alternative texts that might appear due to OCR errors
  const alternativeGovTexts = [
    /Government.*of.*India/i, // Handles cases with extra characters between words
    /Govt\s*of\s*India/i, // Common abbreviation
    /[Gg]overnment.*[oO]f.*[Ii]ndia/i, // Partial match with possible OCR errors
  ];

  // Check for exact match first
  if (exactGovRegex.test(text)) {
    console.log("Found exact Government of India text match");
    return true;
  }

  // Check for alternative patterns
  for (const pattern of alternativeGovTexts) {
    if (pattern.test(text)) {
      console.log("Found alternative Government of India text match");
      return true;
    }
  }

  console.log("No Government of India text found");
  return false;
}

export default isGovernmentOfIndiaDocument;
