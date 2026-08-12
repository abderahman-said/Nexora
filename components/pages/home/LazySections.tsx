import ProjectsSection from "@/components/pages/home/ProjectsSection";
import ProcessSection from "@/components/pages/home/ProcessSection";
import TeamSection from "@/components/pages/home/TeamSection";
import ConsultationSection from "@/components/pages/home/ConsultationSection";
import ClientsSection from "@/components/pages/home/ClientsSection";

export default function LazySections() {
  return (
    <>
      <ProjectsSection />
      <ProcessSection />
      <TeamSection />
      <ClientsSection />
      <ConsultationSection />
    </>
  );
}

