import type { AnalysisState, Posture, RiskLevel, Severity, Tone } from "@/lib/data/types";

export const severityTone: Record<Severity, Tone> = {
  critical: "danger",
  high: "danger",
  medium: "warning",
  low: "success",
  info: "info",
  unassigned: "neutral",
};

export const riskTone: Record<RiskLevel, Tone> = {
  high: "danger",
  medium: "warning",
  low: "success",
};

export const postureFor: Record<RiskLevel, Posture> = { high: "poor", medium: "fair", low: "good" };

export const postureTone: Record<Posture, Tone> = {
  good: "success",
  fair: "warning",
  poor: "danger",
};

export const analysisTone: Record<AnalysisState, Tone> = {
  NOT_SET: "neutral",
  EXPLOITABLE: "danger",
  IN_TRIAGE: "warning",
  FALSE_POSITIVE: "info",
  NOT_AFFECTED: "success",
  RESOLVED: "success",
};

export const toneText: Record<Tone, string> = {
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
  neutral: "text-neutral",
};

export const toneSolid: Record<Tone, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-neutral",
};

export const toneSoft: Record<Tone, string> = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  neutral: "bg-neutral-soft text-neutral",
};
