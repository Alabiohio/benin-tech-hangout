import Image from "next/image";
import pitchBanner from "@/assets/images/pitch/pitchBanner.png";
import Link from "next/link";


export default function Pitch() {
  return (
    <div className="w-full bg-[var(--color-inverted)] flex flex-col gap-10 items-center justify-center px-10 py-20" id="pitch">
      {/* Pitch Banner */}
      <div className="w-full max-w-[1080px] aspect-[1750/1050] relative overflow-hidden rounded-lg max-h-[648px]">
        <Image
          src={pitchBanner}
          alt="Pitch Your Business Idea"
          className="w-full h-full object-cover"
          width={1080}
          height={648}
        />
      </div>

      {/* Description Text */}
      <div className="text-center">
        <p className="text-[20px] font-normal font-['Bricolage_Grotesque'] leading-[1.2] text-[var(--color-neutral)] tracking-[-0.8px]">
          Pitch your product or business idea potential to investors.
        </p>
        <p className="text-[20px] font-normal font-['Bricolage_Grotesque'] leading-[1.2] text-[var(--color-neutral)] tracking-[-0.8px]">
          Get mentorship from business experts and access N10m prize pool.
        </p>
      </div>

      {/* Apply to Pitch Button */}
      <Link href="https://forms.gle/uGBYW1cQ7ShDAjh38" className="px-6 py-4 bg-[var(--color-static-blue)] text-[var(--color-static-white)] rounded-full font-['Bricolage_Grotesque'] font-medium text-[20px] leading-[1] uppercase tracking-[-0.4px] hover:opacity-90 transition">
        APPLY TO PITCH
      </Link>
    </div>
  );
}
