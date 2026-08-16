"use client";

import React from "react";
import InteractiveCard from "@/components/ui/InteractiveCard";
import type { ProcessCardProps } from "./types";

export function ProcessCard({ step }: ProcessCardProps) {
  if (!step) return null;

  return (
    <InteractiveCard
      badge={step.badge}
      icon={step.icon}
      title={step.title}
      description={step.description}
      className="h-full min-h-[241px] md:min-h-[287px]"
      variant="ghost"
    />
  );
}
