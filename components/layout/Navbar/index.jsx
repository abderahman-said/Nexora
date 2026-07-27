import { NavbarAnimatedShell } from "./NavbarAnimatedShell";
import { NavLogo, NavLinks, NavCTA } from "./NavElements";

export default function Navbar() {
  return (
    <NavbarAnimatedShell>
      <NavLogo />
      <NavLinks />
      <NavCTA />
    </NavbarAnimatedShell>
  );
}