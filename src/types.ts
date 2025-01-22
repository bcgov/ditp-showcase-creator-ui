interface Attribute {
  name: string;
  value: string;
  type?: string;
}

interface Credential {
  issuer_name: string;
  name: string;
  version: string;
  icon: string;
  attributes: Attribute[];
}

interface Credentials {
  student_card: Credential;
  test_card_id: Credential;
}

interface RevocationInfo {
  credentialName: string;
  credentialIcon: string;
  title: string;
  description: string;
}

interface ProgressBarItem {
  name: string;
  onboardingStep: string;
  iconLight: string;
  iconDark: string;
}

interface OnboardingScreen {
  screenId: string;
  title: string;
  text: string;
  image?: string;
  credentials?: string[];
}

interface ProofRequestAttributes {
  attributes: string[];
  restrictions: string[];
}

interface ProofRequestPredicates {
  name: string;
  type: string;
  value: number;
  restrictions: string[];
}

interface ProofRequest {
  attributes: {
    test_card_id: ProofRequestAttributes;
    student_card: ProofRequestAttributes;
  };
  predicates: {
    test_card_id_expiry_date: ProofRequestPredicates;
    student_card_expiry_date: ProofRequestPredicates;
  };
}

interface RequestOptions {
  type: string;
  title: string;
  text: string;
  proofRequest: ProofRequest;
}

interface ScenarioStep {
  type: string;
  title: string;
  text: string;
  requestOptions: RequestOptions;
}

interface ScenarioOverview {
  title: string;
  text: string;
  image: string;
}

interface Scenario {
  id: string;
  name: string;
  overview: ScenarioOverview;
  summary: ScenarioOverview;
  steps: ScenarioStep[];
}

export interface Persona {
  name: string;
  type: string;
  headshot_image: string;
  body_image: string;
  description: string;
  credentials: Credentials;
  revocationInfo: RevocationInfo[];
  progressBar: ProgressBarItem[];
  onboarding: OnboardingScreen[];
  scenarios: Scenario[];
}

export interface ShowcaseJSON {
  personas: Persona[];
}
