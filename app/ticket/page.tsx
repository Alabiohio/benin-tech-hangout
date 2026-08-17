import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Tickets from '../components/Tickets';

const imgImg = 'https://www.figma.com/api/mcp/asset/9fdea29b-903b-483c-9cc8-973b0457faf0.png';
const imgImg1 = 'https://www.figma.com/api/mcp/asset/9179f0d2-f87b-440d-b90d-ed7f1bfe4a02.png';
const imgImg2 = 'https://www.figma.com/api/mcp/asset/2d68069c-35cc-4772-8780-c28b71e6bdc2.png';
const imgImg3 = 'https://www.figma.com/api/mcp/asset/67b493b5-7df1-47a8-aefc-5902ddbb69cc.png';
const imgImg4 = 'https://www.figma.com/api/mcp/asset/32378825-0647-4b6e-bcbe-dd86f4574e7e.png';
const imgImg5 = 'https://www.figma.com/api/mcp/asset/680a063b-5304-4f61-abf7-eea1a3ddde8c.png';
const imgImg6 = 'https://www.figma.com/api/mcp/asset/177426fd-c2a1-49c1-be3f-9241cb111769.png';
const imgVector = 'https://www.figma.com/api/mcp/asset/088a36c0-5385-4c1d-8d5f-2099142cf300.svg';
const imgVector1 = 'https://www.figma.com/api/mcp/asset/5836aa8f-808e-43a9-b589-6696ec70ce2a.svg';

const communityItems = [
  {
    name: 'THE AFRICAN CREATIVE ECONOMY',
    site: 'TACN.COM',
    logo: imgImg,
  },
  {
    name: 'EDO CREATIVE HUB',
    site: 'EDOCREATIVEHUB.COM',
    logo: imgImg1,
  },
  {
    name: 'WALKFRONT',
    site: 'WALKFRONT.COM',
    logo: imgImg2,
  },
  {
    name: 'Edo Innovates',
    site: 'EDOINNOVATE.COM',
    logo: imgImg3,
  },
  {
    name: 'METASPACE CONSULTING',
    site: 'METASPACE.COM',
    logo: imgImg4,
  },
  {
    name: 'THE CATALIST INITIATIVE',
    site: 'THECATALYSTINITIATIVE.COM',
    logo: imgImg5,
  },
  {
    name: 'BLW Zone J',
    site: 'BLWZONEJ.COM',
    logo: imgImg6,
  },
  {
    name: 'THE AFRICAN CREATIVE ECONOMY',
    site: 'TACN.COM',
    logo: imgImg,
  },
];

function ArrowIcon({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center opacity-50" aria-hidden="true">
      <img src={imgVector1} alt="" width={size} height={size} className="block" />
    </div>
  );
}

export default function TicketPage() {
  return (
    <div className="min-h-screen bg-background text-colors-inverted">
      <Navbar />



      <main className="pt-34 pb-8 md:pb-14">
        <Tickets />
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-8 mb-12 md:mb-16 mt-14" id='communities'>
          <h2 className="text-[40px] md:text-[60px] lg:text-[80px] font-bold leading-[0.8] tracking-[-0.04em] text-colors-inverted">
            Communities
            <span className="block font-light text-colors-inverted">We partner with</span>
          </h2>
        </div>

        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-8">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {communityItems.map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="flex min-h-full flex-col gap-6"
              >
                <div className="bg-[var(--color-trans-10-inverted,rgba(255,255,255,0.1))] flex h-[248px] items-center justify-center overflow-hidden p-6 md:p-8">
                  <div className="flex aspect-square h-full items-center justify-center overflow-hidden bg-background p-4">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className={
                        index === 5
                          ? 'h-full w-full object-cover scale-[1.4] md:scale-[1.2]'
                          : 'h-full w-full object-contain'
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="max-w-[290px] text-[18px] font-bold uppercase leading-[1.2] tracking-[-0.8px] text-colors-inverted md:text-[20px]">
                    {item.name}
                  </h2>

                  <a
                    href="#"
                    className="inline-flex items-center gap-2 self-start uppercase text-[18px] font-medium tracking-[-0.4px] text-colors-inverted opacity-60 underline decoration-from-font underline-offset-4 md:text-[20px]"
                  >
                    <span>{item.site}</span>
                    <ArrowIcon size={24} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
