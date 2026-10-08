export const platformJourney = [
  { name: "Connect", copy: "Engage through the channels your customers and employees already use.", icon: "people" as const },
  { name: "Understand", copy: "Identify intent, context and the business goal.", icon: "signal" as const },
  { name: "Know", copy: "Ground decisions in trusted enterprise knowledge.", icon: "book" as const },
  { name: "Orchestrate", copy: "Coordinate agents, skills and tools to determine the next step.", icon: "layers" as const },
  { name: "Act", copy: "Execute authorized actions across business systems.", icon: "code" as const },
  { name: "Insight", copy: "Turn interactions and execution into actionable intelligence.", icon: "signal" as const },
];

export const platformBuildingBlocks = [
  { title: "Agents", copy: "Specialist agents with defined roles, working toward a common business goal.", detail: "The Orchestration Engine coordinates agents, delegation, workflows and execution context through stable contracts and adapters, independent of gateway vendors. Approved identities, permissions and policy bound delegation.", icon: "people" as const },
  { title: "Knowledge", copy: "Trusted context that helps agents understand the situation and choose the next step.", detail: "Customer records, contracts and available plans ground the flow. Sensitive-data protection reduces unnecessary exposure in model context.", icon: "book" as const },
  { title: "Skills", copy: "Reusable business capabilities that can be coordinated across workflows.", detail: "Identify customer → Check eligibility → Prepare plan change. Skills connect task intent to the tools needed for controlled execution.", icon: "layers" as const },
  { title: "Tools & Actions", copy: "Connections to enterprise systems through controlled execution layers.", detail: "The Action Engine validates business actions, resolves trusted parameters, executes through approved tools and handles outcomes. The MCP Gateway governs tool access; it does not replace business execution. Enterprise systems remain authoritative.", icon: "code" as const },
];

export const platformConnections = [
  { title: "Model access", copy: "Provider-independent model access and routing, with sensitive-data protection and model policies.", label: "LLM Gateway", detail: "Stable contracts and adapters separate orchestration from model and gateway implementations. Pluggable access applies approved routing and data policies. Models support reasoning; the Action Engine executes business actions.", icon: "layers" as const },
  { title: "Tool access", copy: "Govern tool discovery and invocation through identity, authorization and tool-level policies.", label: "MCP Gateway", detail: "Interchangeable gateway implementations enforce approved tool access through stable contracts. Customer IAM and application permissions remain authoritative. The MCP Gateway governs access; the Action Engine validates, executes and handles business outcomes.", icon: "code" as const },
  { title: "Agent collaboration", copy: "Delegate to external agent ecosystems with governed identity, policies and continuity of execution context.", label: "A2A Gateway", detail: "Approved agent endpoints connect through stable contracts and adapters. Access controls enforce identity and delegation policies while the Orchestration Engine coordinates workflows and preserves execution context across agents.", icon: "people" as const },
];
