import type { Metadata } from "next";
import { SiDotnet, SiReact, SiGo, SiKotlin, SiSwift } from "react-icons/si";
import StructuredData from "@/components/StructuredData";
import { founderSchema, aboutPageSchema, generateBreadcrumbSchema } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | HOTFIX d.o.o.",
  description:
    "Learn about HOTFIX d.o.o., founded by Josip Budalić in Croatia. Discover our mission, values, and expertise in full-stack and mobile development with C#, React, Golang, Kotlin (KMM), and Swift.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    url: `${SITE_URL}/about`,
    type: "website",
    siteName: "HOTFIX d.o.o.",
    title: "About HOTFIX d.o.o. | Founded by Josip Budalić",
    description: "Learn about HOTFIX d.o.o., founded by Josip Budalić in Croatia. Our mission, values, and expertise in full-stack and mobile development.",
  },
};

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema, founderSchema, aboutPageSchema]} />
      {/* Hero Section */}
      <section className="gradient-mesh relative overflow-hidden py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="pill-tag-soft mb-6">about hotfix</span>
            <h1 className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-[var(--ink)] md:text-[56px] md:leading-[1.03] md:tracking-[-1.4px]">
              Senior product engineering from Croatia.
            </h1>
            <p className="text-[16px] leading-[1.4] text-[var(--ink-secondary)]">
              Founded by Josip Budalić, we&apos;re an EU-based team of passionate developers in Croatia dedicated to building
              exceptional software solutions that make a difference for businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24" aria-labelledby="our-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-eyebrow mb-4 block">story</span>
              <h2 id="our-story" className="section-title mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                <p>
                  HOTFIX d.o.o. was founded by <strong>Josip Budalić</strong> in Croatia with a simple yet powerful vision:
                  to deliver world-class software solutions that empower
                  businesses to thrive in the digital age.
                </p>
                <p>
                  We recognized the growing need for reliable, scalable
                  development partners who truly understand modern technology
                  stacks and can deliver exceptional results. Our expertise
                  spans the full spectrum of development, from robust backend
                  systems to beautiful web interfaces and native mobile applications.
                </p>
                <p>
                  Under the leadership of founder Josip Budalić, HOTFIX d.o.o. has grown to become a trusted EU-based software development company. Operating from Croatia, we&apos;re proud to work with businesses of all sizes worldwide,
                  helping them transform their ideas into reality through
                  cutting-edge technology and innovative solutions across web and mobile platforms.
                </p>
              </div>
            </div>
            <div className="card-dashboard-mockup bg-[var(--brand-dark-900)] p-8 text-white">
              <div className="space-y-8">
                <div>
                  <div className="tabular mb-2 text-[48px] font-bold leading-[1.15] tracking-[-0.96px]">100%</div>
                  <div className="text-[15px] opacity-80">Client Satisfaction</div>
                </div>
                <div>
                  <div className="tabular mb-2 text-[48px] font-bold leading-[1.15] tracking-[-0.96px]">50+</div>
                  <div className="text-[15px] opacity-80">Projects Delivered</div>
                </div>
                <div>
                  <div className="tabular mb-2 text-[48px] font-bold leading-[1.15] tracking-[-0.96px]">24/7</div>
                  <div className="text-[15px] opacity-80">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-[var(--canvas-soft)] py-24" aria-labelledby="mission-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="section-eyebrow mb-4 block">principles</span>
            <h2 id="mission-values" className="section-title mb-5">
              Our Mission & Values
            </h2>
            <p className="section-lede max-w-2xl">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Mission */}
            <div className="card-feature-light">
              <h3 className="mb-4 text-[26px] font-bold leading-[1.12] tracking-[-0.26px] text-[var(--ink)]">
                Our Mission
              </h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                To empower businesses with innovative, reliable, and scalable
                software solutions that drive growth and success. We&apos;re
                committed to delivering excellence in every line of code and
                every client interaction.
              </p>
            </div>

            {/* Values */}
            <div className="card-feature-light">
              <h3 className="mb-4 text-[26px] font-bold leading-[1.12] tracking-[-0.26px] text-[var(--ink)]">
                Our Values
              </h3>
              <ul className="space-y-3 text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                  <span>Excellence in craftsmanship</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                  <span>Transparent communication</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                  <span>Continuous innovation</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                  <span>Long-term partnerships</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24" aria-labelledby="our-expertise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="section-eyebrow mb-4 block">expertise</span>
            <h2 id="our-expertise" className="section-title mb-5">
              Our Expertise
            </h2>
            <p className="section-lede max-w-2xl">
              Deep technical knowledge across the full development stack
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* C# / .NET */}
            <div className="card-feature-light">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[var(--primary)]">
                <SiDotnet className="text-3xl" />
              </div>
              <h3 className="mb-3 text-[20px] font-bold leading-[1.4] tracking-[-0.2px] text-[var(--ink)]">
                C# & .NET
              </h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                Enterprise-grade backend solutions with .NET Core, ASP.NET, and
                Entity Framework.
              </p>
            </div>

            {/* React */}
            <div className="card-feature-light">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[var(--primary)]">
                <SiReact className="text-3xl" />
              </div>
              <h3 className="mb-3 text-[20px] font-bold leading-[1.4] tracking-[-0.2px] text-[var(--ink)]">
                React & Next.js
              </h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                Modern, performant frontends with React and Next.js for web applications.
              </p>
            </div>

            {/* Golang */}
            <div className="card-feature-light">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[var(--primary)]">
                <SiGo className="text-3xl" />
              </div>
              <h3 className="mb-3 text-[20px] font-bold leading-[1.4] tracking-[-0.2px] text-[var(--ink)]">Golang</h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                High-performance, concurrent systems for microservices and APIs.
              </p>
            </div>

            {/* Kotlin */}
            <div className="card-feature-light">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[var(--primary)]">
                <SiKotlin className="text-3xl" />
              </div>
              <h3 className="mb-3 text-[20px] font-bold leading-[1.4] tracking-[-0.2px] text-[var(--ink)]">Kotlin</h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                Modern, expressive language for Android and backend development.
              </p>
            </div>

            {/* KMM (Kotlin Multiplatform Mobile) */}
            <div className="card-feature-light">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[var(--primary)]">
                <SiKotlin className="text-3xl" />
              </div>
              <h3 className="mb-3 text-[20px] font-bold leading-[1.4] tracking-[-0.2px] text-[var(--ink)]">
                KMM
              </h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                Kotlin Multiplatform Mobile for sharing code between Android and iOS.
              </p>
            </div>

            {/* Swift */}
            <div className="card-feature-light">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[var(--primary)]">
                <SiSwift className="text-3xl" />
              </div>
              <h3 className="mb-3 text-[20px] font-bold leading-[1.4] tracking-[-0.2px] text-[var(--ink)]">Swift</h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                Native iOS development with Swift for elegant Apple platform apps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-[var(--canvas-soft)] py-24" aria-labelledby="our-approach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="section-eyebrow mb-4 block">approach</span>
            <h2 id="our-approach" className="section-title mb-5">
              Our Approach
            </h2>
            <p className="section-lede max-w-2xl">
              How we work with clients to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="card-feature-light">
              <div className="tabular mb-4 text-[26px] font-bold leading-[1.12] tracking-[-0.26px] text-[var(--primary)]">
                1
              </div>
              <h3 className="mb-2 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                Discovery
              </h3>
              <p className="text-[13px] leading-[1.4] text-[var(--ink-mute)]">
                Understanding your needs, goals, and technical requirements
              </p>
            </div>

            <div className="card-feature-light">
              <div className="tabular mb-4 text-[26px] font-bold leading-[1.12] tracking-[-0.26px] text-[var(--primary)]">
                2
              </div>
              <h3 className="mb-2 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">Planning</h3>
              <p className="text-[13px] leading-[1.4] text-[var(--ink-mute)]">
                Architecting solutions and creating detailed project roadmaps
              </p>
            </div>

            <div className="card-feature-light">
              <div className="tabular mb-4 text-[26px] font-bold leading-[1.12] tracking-[-0.26px] text-[var(--primary)]">
                3
              </div>
              <h3 className="mb-2 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                Development
              </h3>
              <p className="text-[13px] leading-[1.4] text-[var(--ink-mute)]">
                Building with best practices, testing, and continuous feedback
              </p>
            </div>

            <div className="card-feature-light">
              <div className="tabular mb-4 text-[26px] font-bold leading-[1.12] tracking-[-0.26px] text-[var(--primary)]">
                4
              </div>
              <h3 className="mb-2 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">Support</h3>
              <p className="text-[13px] leading-[1.4] text-[var(--ink-mute)]">
                Ongoing maintenance, updates, and optimization for long-term
                success
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
