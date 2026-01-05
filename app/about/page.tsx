import type { Metadata } from "next";
import { SiDotnet, SiReact, SiGo, SiKotlin, SiSwift } from "react-icons/si";
import StructuredData from "@/components/StructuredData";
import { founderSchema, aboutPageSchema, generateBreadcrumbSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "About Us | HOTFIX d.o.o.",
  description:
    "Learn about HOTFIX d.o.o., founded by Josip Budalic in Croatia. Discover our mission, values, and expertise in full-stack and mobile development with C#, React, Golang, Kotlin, and Swift.",
  alternates: {
    canonical: "https://hotfix-doo.com/about",
  },
  openGraph: {
    url: "https://hotfix-doo.com/about",
    type: "website",
    title: "About HOTFIX d.o.o. | Founded by Josip Budalic",
    description: "Learn about HOTFIX d.o.o., founded by Josip Budalic in Croatia. Our mission, values, and expertise in full-stack and mobile development.",
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
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-gradient">HOTFIX</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founded by Josip Budalic, we're a Croatian team of passionate developers dedicated to building
              exceptional software solutions that make a difference for businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20" aria-labelledby="our-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="our-story" className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  HOTFIX d.o.o. was founded by <strong>Josip Budalic</strong> in Croatia with a simple yet powerful vision:
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
                  Under the leadership of founder Josip Budalic, HOTFIX d.o.o. has grown to become a trusted Croatian software development company. Today, we're proud to work with businesses of all sizes worldwide,
                  helping them transform their ideas into reality through
                  cutting-edge technology and innovative solutions across web and mobile platforms.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] rounded-2xl p-12 text-white">
              <div className="space-y-8">
                <div>
                  <div className="text-5xl font-bold mb-2">100%</div>
                  <div className="text-lg opacity-90">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">50+</div>
                  <div className="text-lg opacity-90">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">24/7</div>
                  <div className="text-lg opacity-90">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gray-50" aria-labelledby="mission-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="mission-values" className="text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 text-lg">
                To empower businesses with innovative, reliable, and scalable
                software solutions that drive growth and success. We're
                committed to delivering excellence in every line of code and
                every client interaction.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Values
              </h3>
              <ul className="space-y-3 text-gray-600 text-lg">
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-2">✓</span>
                  <span>Excellence in craftsmanship</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-2">✓</span>
                  <span>Transparent communication</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-2">✓</span>
                  <span>Continuous innovation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-2">✓</span>
                  <span>Long-term partnerships</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20" aria-labelledby="our-expertise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="our-expertise" className="text-4xl font-bold text-gray-900 mb-4">
              Our Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deep technical knowledge across the full development stack
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* C# / .NET */}
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg text-[#512BD4] mb-6">
                <SiDotnet className="text-5xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                C# & .NET
              </h3>
              <p className="text-gray-600">
                Enterprise-grade backend solutions with .NET Core, ASP.NET, and
                Entity Framework.
              </p>
            </div>

            {/* React */}
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg text-[#61DAFB] mb-6">
                <SiReact className="text-5xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                React & Next.js
              </h3>
              <p className="text-gray-600">
                Modern, performant frontends with React and Next.js for web applications.
              </p>
            </div>

            {/* Golang */}
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg text-[#00ADD8] mb-6">
                <SiGo className="text-5xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Golang</h3>
              <p className="text-gray-600">
                High-performance, concurrent systems for microservices and APIs.
              </p>
            </div>

            {/* Kotlin */}
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg text-[#7F52FF] mb-6">
                <SiKotlin className="text-5xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kotlin</h3>
              <p className="text-gray-600">
                Native Android development with modern Kotlin for powerful mobile apps.
              </p>
            </div>

            {/* Swift */}
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg text-[#F05138] mb-6">
                <SiSwift className="text-5xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Swift</h3>
              <p className="text-gray-600">
                Native iOS development with Swift for elegant Apple platform apps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 bg-gray-50" aria-labelledby="our-approach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="our-approach" className="text-4xl font-bold text-gray-900 mb-4">
              Our Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How we work with clients to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Discovery
              </h3>
              <p className="text-gray-600 text-sm">
                Understanding your needs, goals, and technical requirements
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Planning</h3>
              <p className="text-gray-600 text-sm">
                Architecting solutions and creating detailed project roadmaps
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Development
              </h3>
              <p className="text-gray-600 text-sm">
                Building with best practices, testing, and continuous feedback
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600 text-sm">
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

