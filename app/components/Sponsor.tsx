import Link from "next/link";
import { motion } from "framer-motion";
import handshake from "@/assets/images/sponsor/handshake.png";
import organicFill from "@/assets/images/sponsor/organicFill.png";

const partners = [
  { name: "Edo State Government", image: "/partners/esg.JPG" },
  { name: "Edo Education Technology Hub", image: "/partners/eeth.JPG" },
  { name: "Edo Community", image: "/partners/Edo Community.png" },
  { name: "Edo Innovates", image: "/partners/Edo Innovates Logo  PNG.png" },
  { name: "Google Developer Student Clubs, University of Benin", image: "/partners/GDSC logo Leftsided.png" },
  { name: "ACE", image: "/partners/images (3).png" },
  { name: "DoLbaF Conference Benin 2023", image: "/partners/IMG-20230901-WA0047.jpg.jpeg" },
  { name: "DES Events", image: "/partners/IMG-20241113-WA0008.jpg.jpeg" },
  { name: "The Catalyst Initiative", image: "/partners/IMG-20250327-WA0006.jpg.jpeg" },
  { name: "She Code Africa, Benin Chapter", image: "/partners/IMG-20250708-WA0039.jpg.jpeg" },
  { name: "Superteam Edo", image: "/partners/Superteam edo.png" },
];

function PartnerLogo({ partner }: { partner: (typeof partners)[number] }) {
  return (
    <div
      tabIndex={0}
      role="group"
      aria-label={partner.name}
      className="group relative flex h-28 w-44 flex-none items-center justify-center overflow-hidden rounded-2xl bg-white p-5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] sm:h-32 sm:w-56 sm:p-7"
    >
      <img
        src={partner.image}
        alt={partner.name}
        className="h-full w-full object-contain"
      />
      <span className="absolute inset-x-0 bottom-0 translate-y-full bg-black/80 px-3 py-2 text-center text-sm font-semibold text-white opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        {partner.name}
      </span>
    </div>
  );
}

export default function Sponsor() {
  return (
    <div className="w-full bg-[var(--color-green-inverted)] flex flex-col gap-10 items-start justify-center pb-10 pt-20 px-4" id="sponsor">
      {/* Section 1: Call to Action */}
      <div className="w-full flex flex-col gap-10 items-start">
        {/* Heading */}
        <h1 className="text-5xl md:text-[80px] font-light font-cabinet-grotesk leading-[0.8] text-[var(--color-inverted)] tracking-[-2.4px]">
          You're invited to <br />
          <span className="font-bold">Sponsor & exhibit</span>
        </h1>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Who can Exhibit? */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="bg-white rounded-[30px] rounded-bl-[0px] px-6 py-10 md:px-10 md:py-12 flex flex-col gap-6 relative overflow-hidden z-10"
          >
            {/* Background Pattern */}
            <div className="absolute -bottom-24 -right-24 w-80 h-80 -z-10 pointer-events-none">
              <img
                src={organicFill.src}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            
            <h2 className="text-[40px] font-semibold font-cabinet-grotesk leading-[1] text-black tracking-[-1.6px]">
              Who can Exhibit?
            </h2>
            <ul className="text-[18px] leading-[1.4] text-[#1A1A1A] space-y-4 list-disc list-outside font-medium pl-5 pr-2">
              <li>Business and brands seeking to connect with ideal clients and customers.</li>
              <li>Startups and founders who want to showcase their latest product, technology and matchmake with potential investors.</li>
              <li>Artists, painters, sculptors and bronze-smiths who passionate about Edo's rich and creative history, art and cultural heritage.</li>
            </ul>
          </motion.div>

          {/* Sponsor Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="bg-[var(--color-brown-inverted)] rounded-[30px] rounded-bl-[0px] overflow-hidden h-auto"
          >
            <img
              src={handshake.src}
              alt="Sponsor"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Exhibit CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="bg-[#029B4A] rounded-[30px] rounded-bl-[0px] px-5 py-10 flex flex-col gap-6"
          >
            <h3 className="text-3xl md:text-[40px] font-semibold font-cabinet-grotesk leading-[1] text-[var(--color-static-white)] tracking-[-1.6px]">
              Exhibit your brand at BTF
            </h3>
            <p className="text-[18px] font-normal font-['Inter'] leading-[1.4] text-[var(--color-static-white)] tracking-[-0.36px]">
              Showcase your business/product or technology to your ideal customers and a mix audience of 3,000+ attendees.
            </p>
            <Link href="/exhibition" className="w-fit px-6 py-4 bg-[var(--color-static-black)] text-[var(--color-static-white)] rounded-full font-cabinet-grotesk font-medium text-[20px] leading-[1] uppercase tracking-[-0.4px] hover:opacity-90 transition inline-block">
              BE AN EXHIBITOR
            </Link>
          </motion.div>

          {/* Sponsor CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
            className="bg-black rounded-[30px] rounded-bl-[0px] px-5 py-10 flex flex-col gap-6"
          >
            <h3 className="text-3xl md:text-[40px] font-semibold font-cabinet-grotesk leading-[1] text-white tracking-[-1.6px]">
              Want to sponsor BTF 2.0?
            </h3>
            <p className="text-[18px] font-normal font-['Inter'] leading-[1.4] text-white tracking-[-0.36px]">
              Be part of the future of tech in Edo State. For sponsorship and enquires, contact us:
            </p>
            <div className="text-[20px] font-bold font-cabinet-grotesk leading-[1.2] text-white tracking-[-0.8px]">
              <p>+234-8142289951,+234-8145658605</p>
              <p>partnership@benintechfest.com.ng</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-full space-y-8 pt-4">
        <h2 className="text-4xl font-light leading-[0.95] tracking-[-1.4px] text-[var(--color-inverted)] sm:text-5xl md:text-6xl">
          Thank you to our <span className="font-bold">partners</span>
        </h2>

        <div
          className="partner-marquee relative overflow-hidden py-2"
          role="region"
          aria-label="Benin Tech Fest partners"
        >
          <div className="partner-marquee-track flex w-max">
            {[0, 1].map((group) => (
              <div
                key={group}
                className="flex flex-none gap-4 pr-4 sm:gap-6 sm:pr-6"
                aria-hidden={group === 1}
              >
                {partners.map((partner, index) => (
                  <PartnerLogo key={`${group}-${index}`} partner={partner} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
