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

const HR_SLUG = "kako-uvesti-ai-u-razvojni-proces";
const EN_SLUG = "bringing-ai-into-the-development-process";

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
    pathname: BLOG_ARTICLE_ROUTES.aiAdoption,
    locale: isEn ? "en" : "hr",
  });
}

export default async function AIAdoptionArticle({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(locale);
  const isEn = loc === "en";
  const post = isEn ? postEn : postHr;
  const t = await getTranslations("blog");

  const ctaTitle = isEn
    ? "Want to introduce AI into development without losing control?"
    : "Želite uvesti AI u razvoj bez gubitka kontrole?";
  const ctaDescription = isEn
    ? "We help teams set up AI coding workflows, review rules, security boundaries, and milestones before the tool becomes part of daily work."
    : "Pomažemo timovima postaviti AI coding workflowe, review pravila, sigurnosne granice i mjerne točke prije nego alat postane dio svakodnevnog rada.";

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t("breadcrumbHome"), url: getLocalizedPath(ROUTES.home, loc) },
    { name: "Blog", url: getLocalizedPath(ROUTES.blog, loc) },
    {
      name: post.title,
      url: getLocalizedPath(BLOG_ARTICLE_ROUTES.aiAdoption, loc),
    },
  ], loc);

  const articleSchema = generateBlogPostingSchema({
    post,
    pathname: BLOG_ARTICLE_ROUTES.aiAdoption,
    locale: loc,
    articleSection: isEn ? "AI adoption" : "AI adopcija",
  });

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema, articleSchema]} />

      <BlogArticleLayout
        post={post}
        locale={loc}
        ctaTitle={ctaTitle}
        ctaDescription={ctaDescription}
        ctaSource="blog_ai_adoption_process"
      >
        {isEn ? (
          <>
            <section className="space-y-5">
              <p className="text-[20px] leading-[1.55] text-[var(--ink-secondary)]">
                The most common mistake with AI adoption in a software team is
                starting from the tool. The team buys access, a few developers
                speed up individual tasks, and then nobody knows what&apos;s
                standard, what&apos;s an experiment, and where the risk to the
                codebase begins.
              </p>
              <p>
                A better starting point is mapping the existing development
                process: where waiting happens, where manual work repeats, where
                review is slow, and where errors most commonly slip through.
                Only after that does it make sense to decide where AI enters
                the workflow.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Start with one narrow workflow
              </h2>
              <p>
                A good first AI workflow isn&apos;t &quot;let the tool write
                features.&quot; Better candidates are tasks with clear input,
                clear output, and simple quality verification: specification
                preparation, edge case review, test matrix generation, or
                explaining part of the codebase to a new team member.
              </p>
              <div className="card-feature-light">
                <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">A good pilot has</h3>
                <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                  <li>one clearly defined task</li>
                  <li>known data and limited access</li>
                  <li>rules for review and human accountability</li>
                  <li>a success metric: less waiting, better tests, or less rework</li>
                </ul>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Guardrails are part of the process, not an add-on at the end
              </h2>
              <p>
                An AI coding tool shouldn&apos;t bypass rules that already apply
                to humans. If a change is normally reviewed, tested, and
                documented, the same applies when part of the code was created
                with Claude Code, Codex, or another tool. The difference is that
                boundaries need to be written down more explicitly.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">What to define</h3>
                  <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                    <li>which repositories and data the tool can see</li>
                    <li>which changes require human review before commit</li>
                    <li>when to use a read-only subagent for verification</li>
                    <li>what must be tested before merge</li>
                  </ul>
                </div>
                <div className="card-cream-band">
                  <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">What to avoid</h3>
                  <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                    <li>vague rule that &quot;developer decides on their own&quot;</li>
                    <li>sending sensitive data without review</li>
                    <li>AI-generated changes without specification</li>
                    <li>measuring only lines of code written</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Measure impact on delivery, not the feeling of speed
              </h2>
              <p>
                AI often creates a feeling of speed because the first draft
                appears quickly. But the real value shows up later: is the
                review shorter, are there fewer back-and-forth changes, are the
                tests better, and can someone else maintain the result in three
                months.
              </p>
              <p>
                That&apos;s why AI adoption should be tied to{" "}
                <Link href={ROUTES.productivity} className="text-[var(--primary)]">
                  engineering productivity
                </Link>{" "}
                and delivery quality, not an abstract goal of &quot;we use
                AI.&quot; If the tool doesn&apos;t improve the actual workflow,
                the problem isn&apos;t the developers — it&apos;s the choice of
                use case.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Conclusion
              </h2>
              <p>
                Responsible AI adoption isn&apos;t slow. What&apos;s slow is
                introducing a tool without rules, then fixing security holes,
                bad code, and lost team trust later. Start from a narrow
                workflow, set guardrails, measure impact, and scale only what
                has proven useful.
              </p>
              <p>
                For teams that want a structured start,{" "}
                <Link href={ROUTES.aiConsulting} className="text-[var(--primary)]">
                  AI consulting
                </Link>{" "}
                is most valuable when it connects the tool, process, and
                ownership into one sustainable way of working.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-5">
              <p className="text-[20px] leading-[1.55] text-[var(--ink-secondary)]">
                Najčešća greška kod AI adopcije u software timu je početi od alata.
                Tim kupi pristup, nekoliko developera ubrza pojedine zadatke, a
                zatim nitko ne zna što je standard, što je eksperiment i gdje počinje
                rizik za codebase.
              </p>
              <p>
                Bolji početak je mapirati postojeći razvojni proces: gdje nastaje
                čekanje, gdje se ponavlja ručni rad, gdje review kasni i gdje se
                greške najčešće provuku. Tek nakon toga ima smisla odlučiti gdje AI
                ulazi u workflow.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Počnite od jednog uskog workflowa
              </h2>
              <p>
                Dobar prvi AI workflow nije &quot;neka alat piše featuree&quot;. Bolji
                kandidati su poslovi s jasnim ulazom, jasnim izlazom i jednostavnom
                provjerom kvalitete: priprema specifikacije, review edge caseova,
                generiranje test matrice ili objašnjenje dijela codebasea novom
                članu tima.
              </p>
              <div className="card-feature-light">
                <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Dobar pilot ima</h3>
                <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                  <li>jedan jasno definiran zadatak</li>
                  <li>poznate podatke i ograničen pristup</li>
                  <li>pravila za review i ljudsku odgovornost</li>
                  <li>mjeru uspjeha: manje čekanja, bolji testovi ili manje reworka</li>
                </ul>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Guardraili su dio procesa, ne dodatak na kraju
              </h2>
              <p>
                AI coding alat ne bi trebao zaobilaziti pravila koja već vrijede za
                ljude. Ako se promjena inače reviewa, testira i dokumentira, isto
                vrijedi i kada je dio koda nastao uz Claude Code, Codex ili drugi
                alat. Razlika je u tome što treba eksplicitnije zapisati granice.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Što definirati</h3>
                  <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                    <li>koje repozitorije i podatke alat smije vidjeti</li>
                    <li>koje promjene traže ljudski review prije commita</li>
                    <li>kada se koristi read-only subagent za provjeru</li>
                    <li>što se mora testirati prije mergea</li>
                  </ul>
                </div>
                <div className="card-cream-band">
                  <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Što izbjeći</h3>
                  <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                    <li>nejasno pravilo da &quot;developer procijeni sam&quot;</li>
                    <li>slanje osjetljivih podataka bez pregleda</li>
                    <li>AI-generated promjene bez specifikacije</li>
                    <li>mjerenje samo broja napisanih linija koda</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Mjerite učinak na delivery, ne dojam brzine
              </h2>
              <p>
                AI često stvara osjećaj brzine jer se prvi draft pojavi brzo. Ali
                stvarna vrijednost se vidi kasnije: je li review kraći, ima li manje
                povratnih izmjena, jesu li testovi bolji i može li netko drugi
                održavati rezultat za tri mjeseca.
              </p>
              <p>
                Zato AI adopciju treba vezati uz <Link href={ROUTES.productivity} className="text-[var(--primary)]">engineering produktivnost</Link> i
                kvalitetu isporuke, a ne uz apstraktni cilj &quot;koristimo AI&quot;. Ako
                alat ne poboljšava stvarni workflow, nije problem u developerima
                nego u izboru use casea.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Zaključak
              </h2>
              <p>
                Odgovorna AI adopcija nije spora. Sporo je uvoditi alat bez pravila,
                pa kasnije popravljati sigurnosne rupe, loš kod i izgubljeno
                povjerenje tima. Krenite od uskog workflowa, postavite guardraile,
                mjerite učinak i širite tek ono što se pokazalo korisnim.
              </p>
              <p>
                Za timove koji žele strukturiran početak, <Link href={ROUTES.aiConsulting} className="text-[var(--primary)]">AI consulting</Link> najviše
                vrijedi kada poveže alat, proces i ownership u jedan održiv način
                rada.
              </p>
            </section>
          </>
        )}
      </BlogArticleLayout>
    </div>
  );
}
