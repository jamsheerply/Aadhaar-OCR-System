function isUIDDocument(text: string): boolean {
  // Check for exact phrase "Unique Identification Authority of India"
  const uidaiRegex = /Unique\s+Identification\s+Authority\s+of\s+India/i;

  // Alternative texts that might appear due to OCR errors
  const alternativeTexts = [
    /Unique.*Identification.*Authority.*India/i, // Handles cases with extra characters between words
    /UIDAI/i, // Common abbreviation
    /[uU]nique.*[iI]dentification/i, // Partial match with possible OCR errors
  ];

  // Check for exact match first
  if (uidaiRegex.test(text)) {
    console.log("Found exact UIDAI text match");
    return true;
  }

  // Check for alternative patterns
  for (const pattern of alternativeTexts) {
    if (pattern.test(text)) {
      console.log("Found alternative UIDAI text match");
      return true;
    }
  }

  console.log("No UIDAI text found");
  return false;
}

export default isUIDDocument;
