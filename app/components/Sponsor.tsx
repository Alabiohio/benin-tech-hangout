import Link from "next/link";
import { motion } from "framer-motion";
import handshake from "@/assets/images/sponsor/handshake.png";
import organicFill from "@/assets/images/sponsor/organicFill.png";

const ArrowRightIcon = () => (
  <svg
    className="w-7 h-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

interface SponsorLogo {
  id: string;
  image: string;
  objectFit?: 'cover' | 'contain' | 'bottom';
  overlay?: boolean;
}

const SPONSOR_LOGOS: SponsorLogo[] = [
  {
    id: '1',
    image: '/partners/Edo Innovates Logo  PNG.png',
    objectFit: 'contain',
  },
  {
    id: '2',
    image: '/partners/Edo Innovates Logo  PNG.png',
    objectFit: 'cover',
  },
  {
    id: '3',
    image: '/partners/Edo Innovates Logo  PNG.png',
    objectFit: 'contain',
  },
  {
    id: '4',
    image: '/partners/Edo Innovates Logo  PNG.png',
    objectFit: 'cover',
  },
  {
    id: '5',
    image: '/partners/Edo Innovates Logo  PNG.png',
    objectFit: 'cover',
  },
  {
    id: '6',
    image: '/partners/Edo Innovates Logo  PNG.png',
    objectFit: 'contain',
  },
  {
    id: '7',
    image: '/partners/Edo Innovates Logo  PNG.png',
    objectFit: 'cover',
    overlay: true,
  },
  {
    id: '8',
    image: '/partners/Edo Innovates Logo  PNG.png',
    objectFit: 'contain',
  },
  {
    id: '9',
    image: '/partners/Edo Innovates Logo  PNG.png',
    objectFit: 'cover',
    overlay: true,
  },
  {
    id: '10',
    image: '/partners/Edo Innovates Logo  PNG.png',
    objectFit: 'bottom',
  },
  {
    id: '11',
    image: '/partners/Edo Innovates Logo  PNG.png',
    objectFit: 'cover',
  },
  {
    id: '12',
    image: '/partners/Edo Innovates Logo  PNG.png',
    objectFit: 'cover',
  },
];

function BrandLogoCard({ sponsor }: { sponsor: SponsorLogo }) {
  return (
    <div className="relative aspect-square bg-[var(--color-static-white)] rounded-lg flex items-center justify-center py-10 overflow-hidden">
      <img
        src={sponsor.image}
        alt={`Sponsor ${sponsor.id}`}
        className={`w-full h-full ${sponsor.objectFit === 'bottom' ? 'object-bottom' : `object-${sponsor.objectFit || 'contain'}`
          }`}
      />
      {sponsor.overlay && (
        <div className="absolute inset-0 z-10 bg-black/10 pointer-events-none" />
      )}
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

      {/* Section 2: Sponsors & Partners */}
      {/* 
      <div className="w-full flex flex-col gap-10 items-start">
        // Heading with "See All Sponsors" button
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <h2 className="text-[2.7rem] md:text-[80px] font-light font-cabinet-grotesk leading-[0.8] text-[var(--color-inverted)] tracking-[-1.4px] flex-1">
            Thank You to our BTF 2.0 <br />
            <span className="font-bold"> Sponsors & partners</span>
          </h2>
          <button className="flex gap-2 items-center py-4 px-0 text-[var(--color-inverted)] font-cabinet-grotesk font-medium text-[20px] uppercase leading-[1] tracking-[-0.4px] underline hover:opacity-75 transition whitespace-nowrap">
            <span>SEE ALL SPONSORS</span>
            <ArrowRightIcon />
          </button>
        </div>

        // 6x2 Grid of Sponsors
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 w-full">
          {SPONSOR_LOGOS.map((sponsor) => (
            <BrandLogoCard key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>
      </div>
      */}
    </div>
  );
}
