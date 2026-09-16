import type { IconName } from "@/components/ui/Icon";

export type ExecutionStepId = "understand" | "know" | "protect" | "orchestrate" | "act" | "observe";

export type ExecutionStep = {
  id: ExecutionStepId;
  label: string;
  title: string;
  description: string;
  detail: string;
  system: string;
  icon: IconName;
};
