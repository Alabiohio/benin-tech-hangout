import Button from './Button';

export default function PartnerCTA() {
    return (
        <div className="container mx-auto px-6 py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-black font-righteous text-gray-900 mb-8 leading-tight">
                Grow With the <span className="text-biro-blue">Ecosystem</span>
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-500 font-medium mb-12">
                Partner with us to reach a fast-growing tech audience and position your brand at the center of innovation in Benin City.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button href="/sponsor" variant="outline">
                            Become a Sponsor
                        </Button>
            </div>
        </div>
    );
}
