// Footer.tsx — Server Component (مفيهوش "use client")
import { ArrowUp } from "lucide-react";
import { FooterBrand } from "./FooterBrand";
import { FooterNav } from "./FooterNav";
import { FooterContact } from "./FooterContact";
import { FooterBottomBar } from "./FooterBottomBar";
import { FooterSidePanel } from "./FooterSidePanel";
import { FooterAnimatedShell } from "./FooterAnimatedShell";
 
export default function Footer() {
  return (
    <FooterAnimatedShell
      columns={
        <>
          <FooterBrand />
          <FooterNav />
          <FooterContact />
        </>
      }
      sidePanel={<FooterSidePanel />}
      bottomBar={<FooterBottomBar />}
    />
  );
}