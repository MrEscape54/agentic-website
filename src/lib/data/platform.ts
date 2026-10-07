export const platformJourney = [
  { name: "Connect", copy: "Engage through the channels your customers and employees already use.", icon: "people" as const },
  { name: "Understand", copy: "Identify intent, context and the business goal.", icon: "signal" as const },
  { name: "Know", copy: "Ground decisions in trusted enterprise knowledge.", icon: "book" as const },
  { name: "Orchestrate", copy: "Coordinate agents, skills and tools to determine the next step.", icon: "layers" as const },
  { name: "Act", copy: "Execute authorized actions across business systems.", icon: "code" as const },
  { name: "Insight", copy: "Turn interactions and execution into actionable intelligence.", icon: "signal" as const },
];

export const platformBuildingBlocks = [
  { title: "Agents", copy: "Specialist agents with defined roles, working toward a common business goal.", detail: "Customer and plan agents coordinate through orchestration. Delegation remains bounded by approved identities, permissions and policy.", icon: "people" as const },
  { title: "Knowledge", copy: "Trusted context that helps agents understand the situation and choose the next step.", detail: "Customer records, contracts and available plans ground the flow. Sensitive-data protection reduces unnecessary exposure in model context.", icon: "book" as const },
  { title: "Skills", copy: "Reusable business capabilities that can be coordinated across workflows.", detail: "Identify customer → Check eligibility → Prepare plan change. Skills connect task intent to the tools needed for controlled execution.", icon: "layers" as const },
  { title: "Tools & Actions", copy: "Connections to enterprise systems through controlled execution layers.", detail: "The Action Engine applies transactions through approved tools and APIs. Enterprise applications retain their authorization rules and remain systems of record.", icon: "code" as const },
];

export const platformConnections = [
  { title: "Approved models", copy: "Choose the intelligence that fits the task and your enterprise requirements.", label: "Model access · LLM", detail: "An LLM Gateway connects approved model runtimes and applies routing policies for data, region, capability, availability and cost. Models support reasoning; controlled platform layers execute business transactions.", icon: "layers" as const },
  { title: "Enterprise tools", copy: "Bring business capabilities into the flow through authorized tools and APIs.", label: "Tool access · MCP", detail: "An MCP Gateway governs access to registered tools and servers using identity, scopes and policy. Existing business-system permissions continue to apply, with human approval when required.", icon: "code" as const },
  { title: "Specialist agents", copy: "Coordinate the right expertise across agents with defined responsibilities.", label: "Agent collaboration · A2A", detail: "An A2A Gateway governs delegation between approved agents. Identity, trusted endpoints, permitted peers and execution limits keep cross-agent work bounded and traceable.", icon: "people" as const },
];
