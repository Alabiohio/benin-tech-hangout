declare module "aos" {
    interface AOSOptions {
        duration?: number;
        easing?: string;
        delay?: number;
        once?: boolean;
        mirror?: boolean;
        anchorPlacement?: string;
        offset?: number;
    }

    const AOS: {
        init(options?: AOSOptions): void;
        refresh(): void;
        refreshHard(): void;
    };

    export default AOS;
}
