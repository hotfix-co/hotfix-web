import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import StructuredData from "@/components/StructuredData";
import BlogArticleLayout from "@/components/BlogArticleLayout";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { getBlogPost } from "@/lib/blogData";
import type { Locale } from "@/lib/blogData";
import { BLOG_ARTICLE_ROUTES, ROUTES } from "@/lib/constants";
import {
  generateBlogMetadata,
  generateBlogPostingSchema,
} from "@/lib/blogSeo";
import { getLocalizedPath } from "@/lib/seo";

const HR_SLUG = "modernizacija-softwarea-bez-zastoja";
const EN_SLUG = "software-modernization-without-downtime";

export function generateStaticParams() {
  return [{ locale: "hr" }, { locale: "en" }];
}

const postHr = getBlogPost(HR_SLUG, "hr")!;
const postEn = getBlogPost(EN_SLUG, "en")!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const post = isEn ? postEn : postHr;

  return generateBlogMetadata({
    post,
    pathname: BLOG_ARTICLE_ROUTES.softwareModernization,
    locale: isEn ? "en" : "hr",
  });
}

export default async function SoftwareModernizationArticle({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(locale);
  const isEn = loc === "en";
  const post = isEn ? postEn : postHr;
  const t = await getTranslations("blog");

  const ctaTitle = isEn
    ? "Need to modernize existing software?"
    : "Trebate modernizirati postojeći software?";
  const ctaDescription = isEn
    ? "We help teams map technical debt, choose a safe modernization strategy, and deliver changes without stopping development."
    : "Pomažemo timovima mapirati tehnički dug, odabrati sigurnu strategiju modernizacije i isporučivati promjene bez zaustavljanja razvoja.";

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t("breadcrumbHome"), url: getLocalizedPath(ROUTES.home, loc) },
    { name: "Blog", url: getLocalizedPath(ROUTES.blog, loc) },
    {
      name: post.title,
      url: getLocalizedPath(BLOG_ARTICLE_ROUTES.softwareModernization, loc),
    },
  ]);

  const articleSchema = generateBlogPostingSchema({
    post,
    pathname: BLOG_ARTICLE_ROUTES.softwareModernization,
    locale: loc,
    articleSection: isEn ? "Software modernization" : "Modernizacija softwarea",
  });

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema, articleSchema]} />

      <BlogArticleLayout
        post={post}
        locale={loc}
        ctaTitle={ctaTitle}
        ctaDescription={ctaDescription}
        ctaSource="blog_software_modernization"
      >
        {isEn ? (
          <>
            <section className="space-y-5">
              <p className="text-[20px] leading-[1.55] text-[var(--ink-secondary)]">
                Modernization often starts from real pain: the system is slow to
                change, tests don&apos;t protect enough, deployment is stressful,
                or new features get built around old code instead of through it.
                That&apos;s a good reason for change, but not proof that you
                should start a rewrite.
              </p>
              <p>
                A big rewrite sounds clean because it promises a fresh start. In
                practice, it often stops delivery, shows risks late, and ends up
                as a race between the old system that still needs maintenance and
                the new one that isn&apos;t ready yet.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Map the risk first, not the technology
              </h2>
              <p>
                Modernization doesn&apos;t start with the question &quot;which
                stack are we migrating to?&quot; It starts with the question of
                which part of the system most blocks changes or creates
                operational risk. Sometimes it&apos;s architecture, sometimes
                tests, sometimes deployment, and sometimes just unclear ownership.
              </p>
              <div className="card-feature-light">
                <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">A good audit looks for</h3>
                <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                  <li>parts of the codebase that change most frequently</li>
                  <li>modules where bugs keep recurring</li>
                  <li>places without tests or clear contracts between systems</li>
                  <li>manual release steps and operational dependencies</li>
                </ul>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Modernize through verifiable boundaries
              </h2>
              <p>
                The best modernizations have a clear boundary: one module, one
                API, one workflow, or one piece of infrastructure. Such a change
                has a measurable end and can be deployed to production without
                waiting for the entire system to be rewritten.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Good first changes</h3>
                  <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                    <li>test harness around a critical workflow</li>
                    <li>extracting a clear API contract</li>
                    <li>automating deployment or rollback</li>
                    <li>replacing one manual process with an internal tool</li>
                  </ul>
                </div>
                <div className="card-cream-band">
                  <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Warning signs</h3>
                  <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                    <li>plan has no incremental release</li>
                    <li>new system has no users for months</li>
                    <li>feature development stops while rewrite is underway</li>
                    <li>success is measured by the new stack, not better delivery</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                AI can help, but doesn&apos;t replace engineering responsibility
              </h2>
              <p>
                AI tools can speed up codebase analysis, test preparation,
                documenting existing behavior, and scoped refactors. That&apos;s
                useful, but only if the team knows what it&apos;s checking.
                Modernization is too important to be left to a large automated
                patch without understanding system boundaries.
              </p>
              <p>
                In practice, AI helps most when combined with a good{" "}
                <Link href={ROUTES.services} className="text-[var(--primary)]">
                  software consulting
                </Link>{" "}
                process: first define the goal and risk, then use the tool for
                faster analysis and controlled changes.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Conclusion
              </h2>
              <p>
                Modernization without downtime means delivery stays alive while
                the system improves. That requires discipline: small scope, clear
                boundaries, tests, observability, and decisions that can be
                explained to the team.
              </p>
              <p>
                The goal isn&apos;t to have the latest stack. The goal is a
                codebase that&apos;s easier to change, safer to deliver, and
                better supports the business the software is supposed to run.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-5">
              <p className="text-[20px] leading-[1.55] text-[var(--ink-secondary)]">
                Modernizacija često krene iz stvarne boli: sustav je spor za
                mijenjanje, testovi ne štite dovoljno, deployment je stresan ili
                se novi featurei grade oko starog koda umjesto kroz njega. To je
                dobar razlog za promjenu, ali ne i dokaz da treba krenuti u rewrite.
              </p>
              <p>
                Veliki rewrite zvuči uredno jer obećava čisti početak. U praksi
                često zaustavi delivery, kasno pokaže rizike i završi utrkom između
                starog sustava koji još treba održavati i novog koji još nije spreman.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Prvo mapirajte rizik, ne tehnologiju
              </h2>
              <p>
                Modernizacija ne počinje pitanjem &quot;u koji stack prelazimo?&quot;. Počinje
                pitanjem koji dio sustava najviše koči promjene ili stvara operativni
                rizik. Ponekad je to arhitektura, ponekad testovi, ponekad deployment,
                a ponekad samo nejasan ownership.
              </p>
              <div className="card-feature-light">
                <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Dobar audit traži</h3>
                <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                  <li>dijelove codebasea koji se najčešće mijenjaju</li>
                  <li>module u kojima se bugovi ponavljaju</li>
                  <li>mjesta bez testova ili jasnih ugovora između sustava</li>
                  <li>ručne release korake i operativne ovisnosti</li>
                </ul>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Modernizirajte kroz granice koje se mogu provjeriti
              </h2>
              <p>
                Najbolje modernizacije imaju jasnu granicu: jedan modul, jedan API,
                jedan workflow ili jedan dio infrastrukture. Takva promjena ima
                mjerljiv kraj i može se pustiti u produkciju bez čekanja da cijeli
                sustav bude prepisan.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Dobre prve promjene</h3>
                  <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                    <li>test harness oko kritičnog workflowa</li>
                    <li>izdvajanje jasnog API ugovora</li>
                    <li>automatizacija deploymenta ili rollbacka</li>
                    <li>zamjena jednog ručnog procesa internim alatom</li>
                  </ul>
                </div>
                <div className="card-cream-band">
                  <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Rizični signali</h3>
                  <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                    <li>plan nema inkrementalni release</li>
                    <li>novi sustav mjesecima nema korisnike</li>
                    <li>feature razvoj stoji dok rewrite traje</li>
                    <li>uspjeh se mjeri novim stackom, ne boljim deliveryjem</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                AI može pomoći, ali ne mijenja engineering odgovornost
              </h2>
              <p>
                AI alati mogu ubrzati analizu codebasea, pripremu testova,
                dokumentiranje postojećeg ponašanja i refaktore s jasnim opsegom.
                To je korisno, ali samo ako tim zna što provjerava. Modernizacija je
                previše važna da bi se prepustila velikom automatskom patchu bez
                razumijevanja granica sustava.
              </p>
              <p>
                U praksi AI najviše pomaže kada je spojen s dobrim <Link href={ROUTES.services} className="text-[var(--primary)]">software consulting</Link> procesom:
                prvo se definira cilj i rizik, zatim se alat koristi za bržu analizu
                i kontrolirane promjene.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Zaključak
              </h2>
              <p>
                Modernizacija bez zastoja znači da delivery ostaje živ dok se sustav
                poboljšava. To traži disciplinu: mali opseg, jasne granice, testove,
                observability i odluke koje se mogu objasniti timu.
              </p>
              <p>
                Cilj nije imati najnoviji stack. Cilj je codebase koji se lakše
                mijenja, sigurnije isporučuje i bolje podržava posao koji software
                treba raditi.
              </p>
            </section>
          </>
        )}
      </BlogArticleLayout>
    </div>
  );
}
