// Enterprise target-state content, grounded in the architecture roadmap.
export const enterpriseControls = [
  { id: "identity", icon: "key" as const, title: "Identity that follows the action.", copy: "Know who initiated the task, which agent is acting and which permissions apply.", points: ["User and agent identity", "Delegated authorization context", "Enterprise roles and scoped tool access"], detail: "Integrate with the enterprise identity provider and propagate user, workload and authorization context across model, tool and agent calls. Existing IAM, MFA and application-level authorization remain authoritative." },
  { id: "policy", icon: "shield" as const, title: "Policy at the point of execution.", copy: "Define which models, tools and agents can be used—and under what conditions.", points: ["Approved assets and tool allowlists", "Cost, quota and delegation limits", "Controls at model, tool and agent boundaries"], detail: "Enterprise Control defines the governance model and policies and coordinates policy decisions. LLM, MCP and A2A gateways enforce decisions at interaction boundaries. Enterprise AI Gateway is the logical umbrella for governed access, not a mandatory proprietary product. Interchangeable implementations must satisfy compatibility and enforcement requirements. Registry approval alone does not grant runtime authorization." },
  { id: "data", icon: "database" as const, title: "Share meaning. Not sensitive data.", copy: "Give models the context needed to reason while minimizing unnecessary sensitive information.", points: ["Sensitive entity detection and tokenization", "Semantic reduction for free text", "Data classification and approved model routing"], detail: "Protect sensitive context before external model invocation through tokenization and semantic reduction. The Action Engine resolves real values internally when authorized execution requires them. Apply data policies to prompts, state, memory and telemetry; model routes must respect approved data boundaries." },
  { id: "oversight", icon: "people" as const, title: "Human judgment where it matters.", copy: "Require an authorized person to decide before a privileged action or exception proceeds.", points: ["Policy-defined review checkpoints", "Approve, reject or request changes", "Recorded decisions and controlled continuation"], detail: "The agent prepares the proposal and pauses execution. Approval permits continuation, rejection stops the action, and requested changes return the revised proposal for review. Link the reviewer, decision and subsequent action in the audit trail." },
];

export const enterpriseBindings = [
  { title: "Identity & secrets", owner: "Enterprise identity and key-management services", behavior: "Propagate authorization context and resolve secrets through approved services." },
  { title: "Models & hosting", owner: "Approved model providers, runtimes and regions", behavior: "Route by data policy, capability, availability and cost; retain provider-specific controls." },
  { title: "State & memory", owner: "Customer-approved persistence and data boundaries", behavior: "Apply isolation, retention, deletion, encryption and backup requirements to workflow state and memory." },
  { title: "Networks & connectivity", owner: "Enterprise network boundaries and egress policy", behavior: "Integrate with private connectivity and customer-controlled routing." },
  { title: "Observability & audit systems", owner: "Enterprise monitoring, SIEM and audit destinations", behavior: "Use open interfaces and pluggable adapters for operational telemetry and separate durable accountability records, with enterprise-governed access, integrity and retention." },
  { title: "Business systems", owner: "Existing applications and systems of record", behavior: "Execute through approved tools and APIs, respecting application-level permissions." },
];

export const operationalTargets = [
  { title: "Availability & recovery", copy: "Define deployment-specific availability, backup and recovery objectives. Validate high-availability and disaster-recovery patterns." },
  { title: "Performance & capacity", copy: "Test representative workloads, failure paths and scale requirements. Set quotas and usage budgets before rollout." },
  { title: "Security validation", copy: "Review threat models, tenant isolation, data exposure and privileged tool access against enterprise requirements." },
  { title: "Repeatable operations", copy: "Establish infrastructure-as-code deployment patterns, operating responsibilities and evidence for enterprise review." },
];

export const enterpriseResponsibilities = [
  { title: "Enterprise Control", copy: "Defines governance and policies; coordinates policy decisions." },
  { title: "Access gateways", copy: "LLM, MCP and A2A gateways enforce policies at model, tool and agent boundaries. Implementations are interchangeable subject to compatibility and enforcement requirements." },
  { title: "AI Asset Registry", copy: "Maintains governed inventory, ownership, lifecycle, risk and approval status. Approval does not grant runtime authorization." },
  { title: "Enterprise IAM", copy: "Customer-controlled identity and permissions remain authoritative; the platform integrates with them." },
  { title: "Orchestration Engine", copy: "Coordinates agents, delegation, workflows and execution context through vendor-independent contracts." },
  { title: "Action Engine", copy: "Validates and executes business actions, resolves trusted parameters and handles outcomes. Tool access does not replace this responsibility." },
  { title: "Observability Hub", copy: "Collects, correlates and distributes operational telemetry through open interfaces and pluggable adapters." },
  { title: "Audit & Accountability", copy: "Maintains durable decision, approval, access and action evidence under enterprise integrity and retention rules, independently of the observability backend." },
  { title: "Integration Hub", copy: "Connects enterprise systems and services while preserving their permissions and authority as systems of record." },
];
