import Link from "next/link";

export default function NotFound() {
  return (
    <section className="gradient-mesh flex min-h-[70vh] items-center py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <span className="pill-tag-soft mb-6">404</span>
        <h1 className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-[var(--ink)] md:text-[56px] md:leading-[1.03] md:tracking-[-1.4px]">
          Page not found · Stranica nije pronađena
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-[16px] leading-[1.4] text-[var(--ink-secondary)]">
          The page you&apos;re looking for has moved or no longer exists. Visit the homepage in English or Croatian.
          <br />
          Tražena adresa više ne postoji ili je premještena. Posjetite početnu stranicu na engleskom ili hrvatskom.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/en" className="button-primary-pill focus-ring">
            English homepage
          </Link>
          <Link href="/hr" className="button-secondary-pill focus-ring">
            Hrvatska početna
          </Link>
        </div>
      </div>
    </section>
  );
}
