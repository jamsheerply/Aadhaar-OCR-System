function extractName(text: string): string {
  // Split text into lines

  console.log("text", text);

  const lines = text.split("\n");

  // Known markers that appear before or after names in Aadhaar cards
  const beforeMarkers = ["Government of India", "भारत सरकार"];
  const afterMarkers = ["Date of Birth", "DOB:", "Male/", "MALE"];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) {
      continue;
    }

    // Check if current line is a marker that typically precedes names
    const isBeforeMarker = beforeMarkers.some((marker) =>
      line.includes(marker)
    );

    if (isBeforeMarker) {
      // Look at next line(s) for name
      for (let j = i + 1; j < lines.length; j++) {
        const nextLine = lines[j].trim();

        // Skip empty lines
        if (!nextLine) {
          continue;
        }

        // Check for after markers
        const foundAfterMarker = afterMarkers.some((marker) =>
          nextLine.includes(marker)
        );
        if (foundAfterMarker) {
          break;
        }

        // Clean the line by removing common prefixes and trailing punctuation
        let cleanedLine = nextLine
          .replace(/^(Sl|Shri|Smt|Sri|Mr|Mrs|Ms)\.?\s+/i, "") // Remove common prefixes
          .replace(/[;:|[\]]+$/, "") // Remove trailing punctuation
          .trim();

        // More flexible name pattern that allows for initials and multiple words
        const isNamePattern = /^[A-Z][a-zA-Z\s.]+([\s.][A-Z][a-zA-Z]*)*$/.test(
          cleanedLine
        );
        const containsMarker = [...beforeMarkers, ...afterMarkers].some(
          (marker) => cleanedLine.includes(marker)
        );

        if (isNamePattern && !containsMarker && cleanedLine.length > 2) {
          return cleanedLine;
        }
      }
    }
  }

  return "";
}

export default extractName;
