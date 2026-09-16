import type { ExecutionStep } from "./execution-types";
import type { ExecutionStepId } from "./execution-types";
import { telecom, systems } from "./telecom";
import type { IconName } from "@/components/ui/Icon";

export type ExecutionCase = {
  id: string; label: string; request: string; outcome: string; result: string;
  sensitive: string; token: string; skills: string[]; agents: string[];
  systems: { name: string; icon: IconName }[]; steps: ExecutionStep[];
  knowledge: string; action: string;
};

export function getExecutionStep(example: ExecutionCase, id: ExecutionStepId): ExecutionStep {
  const step = example.steps.find(step => step.id === id);
  if (!step) throw new Error(`Execution case "${example.id}" is missing the "${id}" step.`);
  return step;
}

// Illustrative workflows, not live integrations or customer evidence.
export const executionCases: ExecutionCase[] = [
  { ...telecom, id: "telecom", label: "Telecom", result: "Billing updated", sensitive: "Customer ID 847291", token: "{CUSTOMER_ID}",
    skills: ["customer.identify", "plan.eligibility", "plan.change"], agents: ["Customer Agent", "Plan Agent", "Knowledge Agent"], systems,
    knowledge: "Customer profile, current contract and available plans ground the request.", action: "The plan change is executed in Billing." },
  { id: "finance", label: "Financial Services", request: "I need to replace my credit card.", outcome: "Card replacement initiated", result: "Previous card blocked · Reissue requested",
    sensitive: "Card ending 4821", token: "{CARD}", skills: ["card.validate", "card.block", "card.reissue"], agents: ["Customer Agent", "Card Agent", "Knowledge Agent"],
    systems: [{ name: "Identity", icon: "key" }, { name: "Knowledge", icon: "book" }, { name: "CRM", icon: "database" }, { name: "APIs", icon: "code" }, { name: "Core Systems", icon: "layers" }],
    knowledge: "Customer identity, card status and replacement rules inform the request.", action: "The current card is blocked and a reissue is requested through Core Systems.",
    steps: [
      { id: "understand", label: "Understand", title: "Replacement requested", description: "Replace credit card", detail: "A card replacement request becomes an actionable intent.", system: "CRM", icon: "signal" },
      { id: "know", label: "Know", title: "Card context retrieved", description: "Customer identity · Card status · Replacement rules", detail: "Retrieve the context needed to validate the replacement.", system: "Knowledge", icon: "book" },
      { id: "protect", label: "Protect", title: "Card data protected", description: "Sensitive card reference detected", detail: "Card references are tokenized before model invocation.", system: "Identity", icon: "shield" },
      { id: "orchestrate", label: "Orchestrate", title: "Replacement skills selected", description: "Validate · Block · Reissue", detail: "Coordinate validation, blocking and reissue in sequence.", system: "APIs", icon: "layers" },
      { id: "act", label: "Act", title: "Requesting replacement…", description: "Block current card · Request reissue", detail: "The Action Engine invokes Core Systems for the replacement.", system: "Core Systems", icon: "code" },
      { id: "observe", label: "Observe", title: "Replacement traced", description: "Blocking and reissue request recorded", detail: "The replacement request is traceable across its execution.", system: "APIs", icon: "check" },
    ] },
  { id: "retail", label: "Retail", request: "I need to change my delivery date.", outcome: "Delivery rescheduled", result: "New delivery date recorded",
    sensitive: "Order #10482", token: "{ORDER}", skills: ["order.retrieve", "delivery.check", "delivery.reschedule"], agents: ["Customer Agent", "Delivery Agent", "Knowledge Agent"],
    systems: [{ name: "CRM", icon: "database" }, { name: "Knowledge", icon: "book" }, { name: "Identity", icon: "key" }, { name: "APIs", icon: "code" }, { name: "Core Systems", icon: "layers" }],
    knowledge: "Order details, delivery status and available dates ground the rescheduling request.", action: "The delivery date is updated through the enterprise order system.",
    steps: [
      { id: "understand", label: "Understand", title: "Delivery change requested", description: "Change delivery date", detail: "Identify the delivery change the customer needs.", system: "CRM", icon: "signal" },
      { id: "know", label: "Know", title: "Order retrieved", description: "Order details · Delivery status · Available dates", detail: "Retrieve the order and available scheduling options.", system: "Knowledge", icon: "book" },
      { id: "protect", label: "Protect", title: "Order reference protected", description: "Sensitive customer-linked reference detected", detail: "Replace the order reference with a token for model context.", system: "Identity", icon: "shield" },
      { id: "orchestrate", label: "Orchestrate", title: "Delivery skills selected", description: "Retrieve order · Check dates · Reschedule", detail: "Coordinate order retrieval and delivery rescheduling.", system: "APIs", icon: "layers" },
      { id: "act", label: "Act", title: "Rescheduling delivery…", description: "Update the delivery date", detail: "The Action Engine updates the delivery in the enterprise order system.", system: "Core Systems", icon: "code" },
      { id: "observe", label: "Observe", title: "Delivery change traced", description: "New delivery date recorded", detail: "The scheduling change is recorded in the execution trace.", system: "APIs", icon: "check" },
    ] },
];
