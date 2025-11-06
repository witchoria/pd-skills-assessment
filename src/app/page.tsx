import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center">
        {/* Product Designer - cofo-sans-mono */}
        <h2 className="font-body text-[clamp(32px,3.33vw,85px)] font-bold text-text leading-[1.1]">
          Product Designer
        </h2>

        {/* skill aura - stadio-now */}
        <h1 className="font-header text-[clamp(80px,13.9vw,356px)] font-bold text-text leading-[0.9]">
          skill aura
        </h1>

        {/* CTA Button with fluid spacing */}
        <div className="mt-[clamp(24px,2.22vw,57px)]">
          <Link
            href="/assessment/1"
            className="btn"
          >
            Start assessment
          </Link>
        </div>
      </div>
    </div>
  );
}
