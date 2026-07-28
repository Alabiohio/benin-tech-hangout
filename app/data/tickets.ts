export interface TicketTier {
    name: string;
    price: string;
    features: string[];
    aosAnime?: string;
    highlight?: boolean;
}

export const ticketTiersList: TicketTier[] = [
    {
        name: "Community Pass",
        price: "Free Access",
        features: [
            "Access to all general sessions",
            "Networking sessions",
            "Exhibitions booths",
            "Registration is Compulsory",
        ],
        aosAnime: "fade-right",
        highlight: false,
    },
    {
        name: "Explorer Pass",
        price: "₦3,500",
        features: [
            "Everything in Community Pass + Event badge",
            "Exhibitions booths",
            "Priority registration",
            "Digital certificate of attendance",
            "Limited seats",
        ],
        aosAnime: "fade-right",
        highlight: false,
    },
    {
        name: "Builders Pass",
        price: "₦10,000",
        features: [
            "Everything in Explorer Pass",
            "Access to Talent Matching Company ",
            "Exclusive networking opportunities",
            "Workshops",
            "Tech Skill Scholarship",
            "Access to Partners Merch",
            "Refreshments",
        ],
        aosAnime: "fade-up",
        highlight: true,
    },
    {
        name: "Founders Pass",
        price: "₦20,000",
        features: [
            "Everything in Builder Pass + Startup showcase",
            "Reserved Seat",
            "Connect with investors",
            "founders roundtable, startup resources",
            "Access high-level sessions & Recordings",
            "Access to the Founders Network in Edo State",
            "Access to Startup Mentorship Programs",
            "Access to the Founders Network in Benin",
            "Event Branded merch",
            "Branded merch",
            "Refreshments"
        ],
        aosAnime: "fade-up",
        highlight: false,
    },
    {
        name: "VIP Pass",
        price: "₦50,000",
        features: [
            "Priority Seat",
            "Connect with investors",
            "Access to speaker meet-and-greet",
            "Refreshment & Gift Pack",
            "Branded Merch",
            "Access to After Party",
            "Priority Media Coverage",
            "With one free regular ticket",
            "business networking",
        ],
        aosAnime: "fade-up",
        highlight: false,
    },
    {
        name: "Investors Pass",
        price: "₦200,000",
        features: [
            "Curated meetings with selected startups",
            "Priority Seat at front",
            "Access to Deal Room",
            "Access to VIP Lounge",
            "Access to all Startups",
            "Assigned PA at the Event",
            "Access to Investors Guide Deck"
        ],
        aosAnime: "fade-left",
        highlight: false,
    }
];

// Keyed lookup by slug for registration page
export const ticketTiersMap: Record<string, TicketTier> = {
    community: ticketTiersList[0],
    explorer: ticketTiersList[1],
    builders: ticketTiersList[2],
    founders: ticketTiersList[3],
    vip: ticketTiersList[4],
    investors: ticketTiersList[5],
};
