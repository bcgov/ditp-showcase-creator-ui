import { ScenarioFormData } from '@/schemas/scenario';
import { 
  Scenario,
  ScenarioStep,
  StepType,
  RequestType,
  ProofRequestPredicates
} from '@/types';

type PredicateType = ">=" | "<=" | "=" | "none";

const transformPredicate = (predicate: ProofRequestPredicates): {
  name: string;
  value: number;
  type: PredicateType;
  restrictions: string[];
} => {
  return {
    name: predicate.name,
    value: predicate.value,
    type: (predicate.type as PredicateType) || "none",
    restrictions: predicate.restrictions
  };
};

const transformStep = (step: ScenarioStep): ScenarioFormData['steps'][number] => {
  if (step.type === StepType.CONNECT_AND_VERIFY) {
    const transformedPredicates: Record<string, ReturnType<typeof transformPredicate>> = {};
        
    Object.entries(step.requestOptions.proofRequest.predicates).forEach(([key, value]) => {
      transformedPredicates[key] = transformPredicate(value);
    });

    return {
      screenId: step.screenId,
      title: step.title,
      text: step.text,
      type: StepType.CONNECT_AND_VERIFY as const,
      requestOptions: {
        title: step.requestOptions.title,
        text: step.requestOptions.text,
        type: RequestType.OOB as const,
        proofRequest: {
          attributes: step.requestOptions.proofRequest.attributes,
          predicates: transformedPredicates
        }
      }
    };
  }
  
  return {
    screenId: step.screenId,
    title: step.title,
    text: step.text,
    type: StepType.BASIC as const,
    requestOptions: {
      title: step.requestOptions.title,
      text: step.requestOptions.text,
      type: RequestType.BASIC as const,
      proofRequest: {
        attributes: {},
        predicates: {}
      }
    }
  };
};

export const scenarioToFormData = (scenario: Scenario): ScenarioFormData => ({
  id: scenario.id,
  name: scenario.name,
  status: scenario.status,
  overview: {
    title: scenario.overview.title,
    text: scenario.overview.text,
    image: scenario.overview.image || '',
  },
  summary: {
    title: scenario.summary.title,
    text: scenario.summary.text,
    image: scenario.summary.image || '',
  },
  steps: scenario.steps.map(transformStep)
});