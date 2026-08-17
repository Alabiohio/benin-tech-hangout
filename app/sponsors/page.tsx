import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sponsorLogo = 'https://www.figma.com/api/mcp/asset/1ef28490-04bd-46d5-b819-4858501196da.png';
const arrowIcon = 'https://www.figma.com/api/mcp/asset/39743a13-d921-4bfe-b417-cdc44ca03976.svg';
const strategicSponsor1 = 'https://www.figma.com/api/mcp/asset/4d4374aa-7305-469b-87b0-4fb584806c14.png';
const strategicSponsor2 = 'https://www.figma.com/api/mcp/asset/3e8f36d7-a57f-4422-9b62-b8c673fd045e.png';
const strategicSponsor3 = 'https://www.figma.com/api/mcp/asset/8e08c05e-663a-43bd-8251-e0ae63ce71a1.png';

const strategicCards = [
  {
    image: strategicSponsor1,
    name: 'Edo Innovates',
    site: 'EDOINNOVATE.COM',
  },
  {
    image: strategicSponsor2,
    name: 'METASPACE CONSULTING',
    site: 'METASPACE.COM',
  },
  {
    image: strategicSponsor3,
    name: 'THE CATALIST INITIATIVE',
    site: 'THECATALYSTINITIATIVE.COM',
  },
   {
    image: strategicSponsor1,
    name: 'THE AFRICAN CREATIVE ECONOMY',
    site: 'TACN.COM',
  },
  {
    image: strategicSponsor2,
    name: 'EDO CREATIVE HUB',
    site: 'EDOCREATIVEHUB.COM',
  },
  {
    image: strategicSponsor3,
    name: 'WALKFRONT',
    site: 'WALKFRONT.COM',
  },
     {
    image: strategicSponsor1,
    name: 'JCI',
    site: 'JCI.COM',
  },
  {
    image: strategicSponsor2,
    name: 'I4C',
    site: 'I4C.COM',
  },
  {
    image: strategicSponsor3,
    name: 'WALKFRONT2',
    site: 'WALKFRONT.COM',
  },
];

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <main className="pt-[96px] pb-8 md:pb-14">
        <div className="mx-auto mt-14 mb-12 w-full max-w-[1440px] px-4 md:px-8 xl:px-10">
          <h2 className="text-[40px] font-light leading-[0.8] tracking-[-0.04em] text-colors-inverted md:text-[60px] lg:text-[80px]">
            Meet the BTF 2.0
            <span className="block font-bold text-colors-inverted">Partners & Sponsors</span>
          </h2>
        </div>

        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 xl:px-10">
          <div className="flex flex-col gap-7 md:gap-10">
            <div className="flex flex-col gap-5 md:gap-7">
              <p className="text-[20px] font-normal uppercase leading-[1.2] tracking-[-0.8px] text-black md:text-[24px]">
                HEADLINE SPONSORS
              </p>

              <div className="flex h-[250px] w-full items-center justify-center overflow-hidden bg-[rgba(0,0,0,0.08)] md:h-[320px]">
                <div className="flex h-[160px] w-[160px] items-center justify-center bg-white md:h-[200px] md:w-[200px]">
                  <img
                    src={sponsorLogo}
                    alt="BLW Zone J"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-[24px] font-bold uppercase leading-[1.2] tracking-[-0.8px] text-black md:text-[32px]">
                  BLW Zone J
                </h2>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 self-start text-[18px] font-medium uppercase tracking-[-0.4px] text-black opacity-60 underline decoration-from-font underline-offset-4 md:text-[20px]"
                >
                  <span>BLWZONEJ.COM</span>
                  <img src={arrowIcon} alt="" aria-hidden="true" className="h-[18px] w-[18px] md:h-[24px] md:w-[24px]" />
                </a>
              </div>
            </div>

            <div className="border-t border-[var(--color-gray-neutral)] pt-6 md:pt-8">
              <p className="mb-5 text-[20px] font-normal uppercase leading-[1.2] tracking-[-0.8px] text-black md:mb-7 md:text-[24px]">
                STRATEGIC SPONSORS
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {strategicCards.map((card) => (
                  <div key={card.name} className="flex flex-col gap-5">
                    <div className="flex h-[248px] items-center justify-center overflow-hidden bg-[rgba(0,0,0,0.08)] px-4 py-6 md:h-[248px]">
                      <div className="flex h-full w-full items-center justify-center bg-white">
                        <img
                          src={card.image}
                          alt={card.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-[20px] font-bold uppercase leading-[1.2] tracking-[-0.8px] text-black md:text-[22px]">
                        {card.name}
                      </h3>

                      <a
                        href="#"
                        className="inline-flex items-center gap-2 self-start text-[18px] font-medium uppercase tracking-[-0.4px] text-black opacity-60 underline decoration-from-font underline-offset-4 md:text-[20px]"
                      >
                        <span>{card.site}</span>
                        <img src={arrowIcon} alt="" aria-hidden="true" className="h-[18px] w-[18px] md:h-[24px] md:w-[24px]" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
