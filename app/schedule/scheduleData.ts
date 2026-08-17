// ─── Types ────────────────────────────────────────────────────────────────────

export type TagColor =
  | "default"   // rgba(0,0,0,0.1) — neutral
  | "blue"      // #1570ef
  | "amber"     // orange
  | "red"       // #c3262d
  | "green";    // #029b4a

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  tag: {
    label: string;
    color: TagColor;
  };
  /** When true, the row gets the subtle dark background (e.g. Arts & Performance) */
  highlighted?: boolean;
}

export interface Speaker {
  name: string;
  role: string;
  /** Absolute URL or local path to headshot image */
  image: string;
}

export interface FeaturedCard {
  dayLabel: string;   // e.g. "DAY 1: NOV 7TH"
  time: string;       // e.g. "1:00PM WAT"
  stage: string;      // e.g. "MAIN STAGE"
  sessionTitle: string;
  tag: {
    label: string;
    color: TagColor;
  };
  /** Up to 4 speakers. Empty slots are auto-filled with filler SVGs tinted by tag color. */
  speakers: Speaker[];
  liveUrl?: string;
}

export interface ScheduleDay {
  /** Short date label shown in the tab, e.g. "DAY 1: Nov 5th" */
  date: string;
  /** Subtitle shown under the date in the tab, e.g. "Talent & Career Day" */
  title: string;
  items: ScheduleItem[];
  /** Featured cards shown in the slideshow for this day */
  featuredCards?: FeaturedCard[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const scheduleDays: ScheduleDay[] = [
  // ── DAY 1 ──────────────────────────────────────────────────────────────────
  {
    date: "DAY 1: Nov 5th",
    title: "Talent & Career Day",
    featuredCards: [
      {
        dayLabel: "DAY 1: NOV 5TH",
        time: "1:00PM WAT",
        stage: "MAIN STAGE",
        sessionTitle: "Startup Policies & MSME Support For Tech Entrepreneurship",
        tag: { label: "KEYNOTE", color: "blue" },
        speakers: [
          {
            name: "Omokaro Osayi",
            role: "Founder, Treskaro & Father Startups",
            image: "https://www.figma.com/api/mcp/asset/071ec6d2-b09a-4f56-92ad-3c6211971154.png",
          },
          // TODO: Add more keynote speakers here (up to 4)
        ],
      },
      {
        dayLabel: "DAY 1: NOV 5TH",
        time: "1:00PM WAT",
        stage: "MAIN STAGE",
        sessionTitle: "Tech Relevance & The Future: Industry Trends vs Realities",
        tag: { label: "PANEL", color: "red" },
        speakers: [
          {
            name: "Omokaro Osayi",
            role: "Founder, Treskaro & Father Startups",
            image: "https://www.figma.com/api/mcp/asset/071ec6d2-b09a-4f56-92ad-3c6211971154.png",
          },
          {
            name: "Omokaro Osayi",
            role: "Founder, Treskaro & Father Startups",
            image: "https://www.figma.com/api/mcp/asset/48260878-efe1-4282-9bb6-6c6073013203.png",
          },
          {
            name: "Omokaro Osayi",
            role: "Founder, Treskaro & Father Startups",
            image: "https://www.figma.com/api/mcp/asset/00aa01f1-9513-4099-b30d-89fe52b5ddc4.png",
          },
          {
            name: "Omokaro Osayi",
            role: "Founder, Treskaro & Father Startups",
            image: "https://www.figma.com/api/mcp/asset/31dcc179-439c-4a8e-b010-f33153f57ac9.png",
          },
        ],
      },
      {
        dayLabel: "DAY 1: NOV 5TH",
        time: "1:00PM WAT",
        stage: "MAIN STAGE",
        sessionTitle: "Tech Relevance & The Future: Industry Trends vs Realities",
        tag: { label: "FIRESIDE", color: "amber" },
        speakers: [
          {
            name: "Omokaro Osayi",
            role: "Founder, Treskaro & Father Startups",
            image: "https://www.figma.com/api/mcp/asset/071ec6d2-b09a-4f56-92ad-3c6211971154.png",
          },
          {
            name: "Omokaro Osayi",
            role: "Founder, Treskaro & Father Startups",
            image: "https://www.figma.com/api/mcp/asset/48260878-efe1-4282-9bb6-6c6073013203.png",
          },
          {
            name: "Omokaro Osayi",
            role: "Founder, Treskaro & Father Startups",
            image: "https://www.figma.com/api/mcp/asset/00aa01f1-9513-4099-b30d-89fe52b5ddc4.png",
          },
          // TODO: Add 4th fireside speaker
        ],
      },
    ],
    items: [
      {
        time: "8:00 AM WAT",
        title: "Registration & Welcoming",
        description:
          "Check-ins, networking, opening interviews, welcome packs and exhibition walkthroughs.",
        tag: { label: "ALL ATTENDEES", color: "default" },
      },
      {
        time: "10:00 AM",
        title: "Opening Ceremony & Keynote",
        description:
          "Official opening address on Edo's digital future followed by keynote session by John Doe.",
        tag: { label: "KEYNOTE", color: "blue" },
      },
      {
        time: "10:30 AM",
        title: "Fireside Chat: Tech Opportunities in Edo and Beyond",
        description:
          "Top leaders and senior professionals from XYZ companies",
        tag: { label: "FIRESIDE", color: "amber" },
      },
      {
        time: "11:15 AM",
        title: "Arts & Special Performance",
        description:
          "Edo arts and cultural display, artist performances, and speed networking.",
        tag: { label: "ENTERTAINMENT", color: "default" },
        highlighted: true,
      },
      {
        time: "12:00 PM",
        title: "Lunch Break & Innovation Hub Onboarding",
        description:
          "Onboarding of trainees, volunteers and mentors into Proline tech innovation hub",
        tag: { label: "NETWORKING", color: "default" },
      },
      {
        time: "12:20 PM",
        title: "Job Fair & Recruitment",
        description:
          "Strategic live hiring and talent recruitment activation launches",
        tag: { label: "JOB FAIR", color: "default" },
      },
      {
        time: "1:00 PM",
        title: "Panel: Relevance & The Future - Industry Trend vs Realities",
        description:
          "Leaders & experts in AI, web3, women in tech and the creative economy",
        tag: { label: "PANEL", color: "red" },
      },
      {
        time: "1:45 PM",
        title: "Workshop Block A — 4 Parallel Tracks",
        description:
          "Tracks: product track, dev tract, design track, and cyber security track",
        tag: { label: "WORKSHOP", color: "green" },
      },
    ],
  },

  // ── DAY 2 ──────────────────────────────────────────────────────────────────
  {
    date: "DAY 2: Nov 6th",
    title: "Startup Weekend",
    items: [
      // TODO: Add Day 2 schedule items here
      // Each item follows the ScheduleItem shape:
      // {
      //   time: "9:00 AM",
      //   title: "...",
      //   description: "...",
      //   tag: { label: "...", color: "blue" | "amber" | "red" | "green" | "default" },
      //   highlighted: false, // optional
      // },
    ],
  },

  // ── DAY 3 ──────────────────────────────────────────────────────────────────
  {
    date: "DAY 3: Nov 7th",
    title: "Awards & Recognition",
    items: [
      // TODO: Add Day 3 schedule items here
    ],
  },
];
