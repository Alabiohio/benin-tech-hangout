import Image from "next/image";
import volunteerImg from "@/assets/images/volunteer/volunteer.png";
import Link from "next/link";


export default function Volunteer() {
  return (
    <div className="w-full bg-[var(--color-blue)] flex flex-col gap-10 items-start p-10">
      {/* Volunteer Image */}
      <div className="w-full aspect-[1360/720] relative overflow-hidden rounded-lg">
        <Image
          src={volunteerImg}
          alt="Volunteer at BTF 2.0"
          className="w-full h-full object-cover"
          width={1360}
          height={720}
        />
      </div>

      {/* Content - Two Columns */}
      <div className="w-full flex flex-col md:flex-row gap-10 items-stretch">
        {/* Volunteer Section */}
        <div data-aos="fade-up" className="flex-1 flex flex-col gap-4">
          <h2 className="text-[40px] font-semibold font-['Bricolage_Grotesque'] leading-[1] text-[var(--color-neutral)] tracking-[-1.6px]">
            Volunteer for BTF 2.0
          </h2>
          <p className="text-[18px] font-normal font-['Inter'] leading-[1.4] text-[var(--color-neutral)] tracking-[-0.36px]">
            Be part of the team that brings Benin Tech Fest 2.0 to life. Help shape the most impactful tech convergence in Edo State's history.
          </p>
          <Link href="https://forms.gle/kkEu2pQNmznFTDpw8" target="_blank" className="w-fit px-6 py-4 bg-[var(--color-static-black)] text-[var(--color-static-white)] rounded-full font-['Bricolage_Grotesque'] font-medium text-[20px] leading-[1] uppercase tracking-[-0.4px] hover:opacity-90 transition">
            APPLY TO VOLUNTEER
          </Link>
        </div>

        {/* Community Section */}
        <div data-aos="fade-up" className="flex-1 flex flex-col gap-4">
          <h2 className="text-[40px] font-semibold font-['Bricolage_Grotesque'] leading-[1] text-[var(--color-neutral)] tracking-[-1.6px]">
            Connect with others
          </h2>
          <p className="text-[18px] font-normal font-['Inter'] leading-[1.4] text-[var(--color-neutral)] tracking-[-0.36px]">
            Join our large and growing community on WhatsApp and don't miss out on updates, sessions, trainings, webinars and giveaway contests and lots more.
          </p>
          <Link href="https://chat.whatsapp.com/J8KczV8DmAZ5ixIbkFT3EU" className="w-fit px-6 py-4 bg-[var(--color-static-black)] text-[var(--color-static-white)] rounded-full font-['Bricolage_Grotesque'] font-medium text-[20px] leading-[1] uppercase tracking-[-0.4px] hover:opacity-90 transition">
            JOIN COMMUNITY
          </Link>
        </div>
      </div>
    </div>
  );
}
