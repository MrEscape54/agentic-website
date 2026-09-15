import type { IconName } from "@/components/ui/Icon";

export const platformStages: { title: string; copy: string; icon: IconName }[] = [
  { title: "Connect", copy: "Engage across voice, messaging, web and enterprise channels.", icon: "signal" },
  { title: "Understand", copy: "Detect intent, topics and context.", icon: "layers" },
  { title: "Know", copy: "Ground agents in trusted enterprise knowledge.", icon: "book" },
  { title: "Orchestrate", copy: "Coordinate agents, skills and tools to determine the right path.", icon: "code" },
  { title: "Act", copy: "Execute real transactions across enterprise systems.", icon: "arrow" },
  { title: "Insight", copy: "Turn interactions and execution into actionable intelligence.", icon: "database" },
];

export const capabilities = [
  { title: "Conversation & Understanding", description: "Turn conversations into context the platform can act on.", modules: ["Conversation Engine", "Intent Engine", "Topic Engine", "Taxonomy Studio"] },
  { title: "Knowledge & Intelligence", description: "Connect trusted knowledge with actionable intelligence.", modules: ["Knowledge Engine", "Campaign Engine", "Insights Hub"] },
  { title: "Orchestration & Execution", description: "Coordinate agents, reuse skills and execute through controlled platform layers.", modules: ["Orchestration Engine", "Skills Studio", "Action Engine"] },
  { title: "Channels & Humans", description: "Engage across channels and preserve context when a specialist takes over.", modules: ["Channel Hub", "Voice Engine", "Voice Biometrics", "Intelligent Handoff"] },
  { title: "Enterprise Platform", description: "Integrate with existing enterprise controls and observe execution.", modules: ["LLM Gateway", "Integration Hub", "Control Studio", "Telemetry Engine", "Observability Hub"] },
];

export const solutions = [
  { title: "Customer Service", copy: "Resolve requests, execute changes and intelligently escalate exceptions.", flow: ["Request", "Resolve", "Execute"] },
  { title: "Employee Experience", copy: "Connect employees with enterprise knowledge and actions.", flow: ["Ask", "Know", "Act"] },
  { title: "Finance", copy: "Automate knowledge-intensive financial workflows and controlled actions.", flow: ["Request", "Validate", "Execute"] },
  { title: "Operations", copy: "Turn operational requests into orchestrated enterprise workflows.", flow: ["Detect", "Coordinate", "Resolve"] },
];

export const industryCases = [
  { id: "telecom", label: "Telecommunications", request: "I need to change my mobile plan.", goal: "Change mobile plan", flow: ["Identify customer", "Check contract", "Check eligibility", "Update billing", "Confirm"], outcome: "Plan updated", agents: ["Customer Agent", "Plan Agent", "Knowledge Agent"], skills: ["Identify customer", "Check eligibility", "Change plan"], systems: ["CRM", "Billing", "Identity", "APIs", "Knowledge"] },
  { id: "financial-services", label: "Financial Services", request: "I need to replace my credit card.", goal: "Replace credit card", flow: ["Authenticate customer", "Check card", "Block card", "Issue replacement", "Confirm"], outcome: "Card replacement initiated", agents: [], skills: [], systems: [] },
  { id: "retail", label: "Retail", request: "I need to change my delivery date.", goal: "Change delivery date", flow: ["Identify order", "Check shipment", "Validate available options", "Reschedule", "Confirm"], outcome: "Delivery rescheduled", agents: [], skills: [], systems: [] },
];
