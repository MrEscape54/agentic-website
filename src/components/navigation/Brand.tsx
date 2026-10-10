import Image from "next/image";

export function Brand({ background = "dark" }: { background?: "dark" | "light" }) {
  return <Image className="brand-logo" src={`/brand/lorenza-${background}.svg`} alt="lorenza" width={650} height={190} />;
}
