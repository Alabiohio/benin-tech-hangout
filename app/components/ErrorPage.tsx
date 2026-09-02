import Image from "next/image";
import Footer from "./Footer";
import Navbar from "./Navbar";

type ErrorPageProps = {
  code: string;
  message: React.ReactNode;
};

export default function ErrorPage({ code, message }: ErrorPageProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-10 pb-20 pt-24 text-center text-black">
        <h1 className="relative z-10 text-[clamp(5rem,11.72vw,7.5rem)] font-bold leading-[0.8] tracking-[-0.08em]">
          {code}
        </h1>

        <p className="relative z-10 mt-10 max-w-[25rem] text-[clamp(2rem,3.125vw,2.5rem)] font-normal leading-none tracking-[-0.04em]">
          {message}
        </p>

        <div className="absolute inset-x-10 bottom-[-23px] aspect-[2880/640] opacity-20">
          <Image
            src="/assets/404-banner.png"
            alt=""
            fill
            priority
            sizes="calc(100vw - 80px)"
            className="object-cover"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
