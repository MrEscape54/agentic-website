import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { BusinessValue } from "@/components/home/BusinessValue";
import { PlatformAtWork } from "@/components/home/PlatformAtWork";
import { EnterpriseControl } from "@/components/home/EnterpriseControl";
import { IntelligentHandoff } from "@/components/home/IntelligentHandoff";
import { Omnichannel } from "@/components/home/Omnichannel";
import { Capabilities } from "@/components/home/Capabilities";
import { Integrations } from "@/components/home/Integrations";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Footer } from "@/components/navigation/Footer";
import { ScrollEffects } from "@/components/ui/ScrollEffects";

export default function Home() {
  return <><ScrollEffects /><Navbar /><main id="main"><Hero /><BusinessValue /><EnterpriseControl /><Omnichannel /><IntelligentHandoff /><PlatformAtWork /><Capabilities /><Integrations /><FinalCTA /></main><Footer /></>;
}
