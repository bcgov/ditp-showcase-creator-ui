"use client";

import { OnboardingPage } from "@/components/pages/OnboardingPage";
import { useShowcase } from "@/hooks/use-showcase";

export default function CharacterPage() {
  const { showcaseJSON, setShowcaseJSON, selectedCharacter } = useShowcase();
  return (
    <OnboardingPage
      showcaseJSON={showcaseJSON}
      selectedCharacter={selectedCharacter}
      setShowcaseJSON={setShowcaseJSON}
    />
  );
}
