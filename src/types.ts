export interface Attribute {
  name: string;
  value: string;
  type?: string;
}

export interface Credential {
  issuer_name: string;
  name: string;
  version: string;
  icon: string;
  attributes: Attribute[];
}

export interface Credentials {
  [key: string]: Credential;
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
    [key: keyof Credentials]: ProofRequestAttributes;
  };
  predicates: {
    [key: string]: ProofRequestPredicates;
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

export type CredentialElement = [Exclude<keyof Credential, 'attributes'>] | ['attributes', keyof Attribute];
