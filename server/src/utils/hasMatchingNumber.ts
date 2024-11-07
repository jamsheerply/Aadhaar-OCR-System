function hasMatchingNumber(text: string, address: string): boolean {
  // Regular expression to match a 12-digit number format (with optional spaces between groups)
  const numberPattern = /\b(\d{4}\s*\d{4}\s*\d{4})\b/;

  // Extract the first 12-digit number found in each input
  const textMatch = text.match(numberPattern);
  const addressMatch = address.match(numberPattern);

  // Ensure non-null matches and check if the numbers match
  return (
    textMatch !== null &&
    addressMatch !== null &&
    textMatch[0].replace(/\s+/g, "") === addressMatch[0].replace(/\s+/g, "")
  );
}

export default hasMatchingNumber;
