import React from "react";
import SharedHero from "@/components/ui/SharedHero";

export default function ContactHero() {
  return (
    <SharedHero
      id="contact-hero"
      titlePrefix="Contact"
      titleHighlight="Us"
      breadcrumbLabel="Contact Us"
      backgroundImage="/assets/about_banner.webp"
    />
  );
}
