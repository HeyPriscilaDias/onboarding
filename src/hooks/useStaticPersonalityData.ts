import { useState, useEffect, useMemo } from "react";

type PersonalityRawData = {
  [title: string]: string; // The entire personality type text blob keyed by title
};

type TitleConverter = {
  [key: string]: string; // e.g. "SOCIAL_AGREEABLENESS" -> "Compassionate Advocate"
};

export type ParsedSuperpower = {
  name: string;
  description: string;
};

export type PersonalityData = {
  title: string;
  typeKey: string;
  shortDescription: string;
  superpowers: ParsedSuperpower[];
  workStyle: string;
  areasToImprove: string;
  communicationStyle: string;
};

// Parse the "Your Superpowers" section from the raw text
function parseSuperpowers(rawText: string): ParsedSuperpower[] {
  const superpowersMatch = rawText.match(
    /Your Superpowers\s*([\s\S]*?)(?=Areas You Can Improve|How You Communicate|$)/i
  );
  if (!superpowersMatch) return [];

  const lines = superpowersMatch[1]
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  return lines.map((line) => {
    // Remove leading "You're" or "You " for the name, keep full as description
    const cleaned = line.replace(/^[-•]\s*/, "");
    const dashIndex = cleaned.indexOf("—");
    if (dashIndex > -1) {
      return {
        name: cleaned.substring(0, dashIndex).trim(),
        description: cleaned.substring(dashIndex + 1).trim(),
      };
    }
    // No dash — use first few words as name
    const words = cleaned.split(" ");
    const name = words.slice(0, 4).join(" ");
    const description = cleaned;
    return { name, description };
  });
}

// Parse the short description (first paragraph)
function parseShortDescription(rawText: string): string {
  const match = rawText.match(
    /What Does It Mean[\s\S]*?\?\s*([\s\S]*?)(?=Your Superpowers|$)/i
  );
  if (match) return match[1].trim().split("\n")[0].trim();

  // Fallback: first sentence after the congratulations
  const sentences = rawText.split(". ");
  if (sentences.length > 1) return sentences[0] + ". " + sentences[1] + ".";
  return rawText.substring(0, 200);
}

// Parse work style section
function parseWorkStyle(rawText: string): string {
  const match = rawText.match(
    /Work Style[:\s]*([\s\S]*?)(?=Relationship|Study|Career|Your Personal|Inspirational|$)/i
  );
  if (match) {
    const lines = match[1].trim().split("\n").filter((l) => l.trim().length > 0);
    return lines[0]?.trim() || "";
  }
  return "";
}

// Parse areas to improve
function parseAreasToImprove(rawText: string): string {
  const match = rawText.match(
    /Areas You Can Improve\s*([\s\S]*?)(?=How You Communicate|$)/i
  );
  if (match) {
    const lines = match[1].trim().split("\n").filter((l) => l.trim().length > 0);
    return lines.map((l) => l.replace(/^[-•]\s*/, "").trim()).join(" ");
  }
  return "";
}

export const useStaticPersonalityData = (personalityTypeKey: string | undefined) => {
  const [rawData, setRawData] = useState<PersonalityRawData | null>(null);
  const [titleConverter, setTitleConverter] = useState<TitleConverter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [personalities, converter] = await Promise.all([
          fetch("/assets/data/personalitiesforai.json").then((r) => r.json()),
          fetch("/assets/data/personalityTitleConverter.json").then((r) => r.json()),
        ]);
        setRawData(personalities);
        setTitleConverter(converter);
      } catch (err) {
        console.warn("Failed to load personality data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const personalityData = useMemo((): PersonalityData | null => {
    if (!rawData || !titleConverter || !personalityTypeKey) return null;

    // Convert key like "SOCIAL_AGREEABLENESS" to title format used in converter
    // The converter uses format "Social_Agreeableness" -> "Compassionate Advocate"
    const converterKey = personalityTypeKey
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join("_")
      // Handle "Emotional Stability" special case
      .replace("Emotionalstability", "Emotional Stability");

    const displayTitle = titleConverter[converterKey];
    if (!displayTitle) return null;

    const rawText = rawData[displayTitle];
    if (!rawText) return null;

    return {
      title: displayTitle,
      typeKey: personalityTypeKey,
      shortDescription: parseShortDescription(rawText),
      superpowers: parseSuperpowers(rawText),
      workStyle: parseWorkStyle(rawText),
      areasToImprove: parseAreasToImprove(rawText),
      communicationStyle: "",
    };
  }, [rawData, titleConverter, personalityTypeKey]);

  return { personalityData, isLoading };
};
