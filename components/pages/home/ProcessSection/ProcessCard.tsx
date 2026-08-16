"use client";

import React from "react";
import InteractiveCard from "@/components/ui/InteractiveCard";
import type { ProcessCardProps } from "./types";

export function ProcessCard({ step }: ProcessCardProps) {
  if (!step) return null;

  return (
    <InteractiveCard
      stepNumber={step.step}
      badge={step.badge}
      icon={step.icon}
      title={step.title}
      description={step.description}
      features={step.features}
      className="h-full min-h-[320px] md:min-h-[363px]"
    />
  );
}
