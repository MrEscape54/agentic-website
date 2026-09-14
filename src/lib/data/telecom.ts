import type { IconName } from "@/components/ui/Icon";

export const systems: { name: string; icon: IconName }[] = [
  { name: "CRM", icon: "database" }, { name: "Knowledge", icon: "book" },
  { name: "Identity", icon: "key" }, { name: "APIs", icon: "code" }, { name: "Billing", icon: "layers" },
];

export const telecom = {
  request: "I need to change my mobile plan.",
  outcome: "Plan updated",
  steps: [
    { label: "Understand", title: "Intent detected", description: "Change mobile plan", detail: "The request becomes a clear, actionable intent.", system: "CRM", icon: "signal" },
    { label: "Know", title: "Context retrieved", description: "Customer profile · Current contract · Available plans", detail: "Trusted enterprise knowledge grounds the next step.", system: "Knowledge", icon: "book" },
    { label: "Protect", title: "Sensitive data protected", description: "Sensitive information detected", detail: "Sensitive data is tokenized before model invocation.", system: "Identity", icon: "shield" },
    { label: "Orchestrate", title: "3 skills selected", description: "customer.identify · plan.eligibility · plan.change", detail: "The right capabilities, coordinated for this request.", system: "APIs", icon: "layers" },
    { label: "Act", title: "Updating plan…", description: "Connecting to Billing System", detail: "The Action Engine executes the change across business systems.", system: "Billing", icon: "code" },
    { label: "Observe", title: "Execution traced", description: "Plan change recorded", detail: "The execution is traceable, from intent to outcome.", system: "APIs", icon: "check" },
  ] satisfies { label: string; title: string; description: string; detail: string; system: string; icon: IconName }[],
};
