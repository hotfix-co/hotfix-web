import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import StructuredData from "@/components/StructuredData";
import BlogArticleLayout from "@/components/BlogArticleLayout";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { getBlogPost, type Locale } from "@/lib/blogData";
import { BLOG_SLUGS, ROUTES, SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return [{ locale: "hr" }, { locale: "en" }];
}

const post = getBlogPost("spec-driven-development")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: {
    canonical: `${SITE_URL}/blog/${post.slug}`,
    languages: {
      "hr-HR": `${SITE_URL}${ROUTES.blog}/${post.slug}`,
      "x-default": `${SITE_URL}${ROUTES.blog}/${post.slug}`,
    },
  },
  openGraph: {
    url: `${SITE_URL}/blog/${post.slug}`,
    type: "article",
    siteName: "HOTFIX d.o.o.",
    locale: "hr_HR",
    title: post.title,
    description: post.description,
    publishedTime: post.publishedAt,
    authors: [post.author.name],
    tags: post.tags,
    images: [`${SITE_URL}/logo.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description,
    images: [`${SITE_URL}/logo.png`],
  },
  keywords: post.tags,
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt || post.publishedAt,
  inLanguage: "hr-HR",
  articleSection: "Software delivery",
  author: {
    "@type": "Person",
    name: post.author.name,
    jobTitle: post.author.role,
    url: `${SITE_URL}${ROUTES.about}`,
  },
  publisher: {
    "@type": "Organization",
    name: "HOTFIX d.o.o.",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/${post.slug}`,
  },
  keywords: post.tags.join(", "),
};

export default async function SpecDrivenDevelopmentArticle({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(locale);
  const currentPost = getBlogPost("spec-driven-development", loc) ?? post;
  const t = await getTranslations("blog");

  const ctaTitle =
    loc === "en"
      ? "Want better discovery before AI implementation?"
      : "Želite bolji discovery prije AI implementacije?";
  const ctaDescription =
    loc === "en"
      ? "We help teams turn vague ideas into technical specifications, delivery plans, and AI-assisted workflows that can be properly reviewed."
      : "Pomažemo timovima pretvoriti nejasne ideje u tehničke specifikacije, delivery planove i AI-assisted workflowe koji se mogu kvalitetno reviewati.";

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t("breadcrumbHome"), url: "/" },
    { name: "Blog", url: ROUTES.blog },
    { name: currentPost.title, url: `${ROUTES.blog}/${currentPost.slug}` },
  ]);

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema, articleSchema]} />

      <BlogArticleLayout
        post={currentPost}
        locale={loc}
        ctaTitle={ctaTitle}
        ctaDescription={ctaDescription}
        ctaSource="blog_spec_driven_development"
      >
        {loc === "en" ? (
          <>
            <section className="space-y-5">
              <p className="text-[20px] leading-[1.55] text-[var(--ink-secondary)]">
                AI can speed up development, but it doesn&apos;t fix an unclear requirement. If you give the model an ambiguous problem, you&apos;ll get faster iterations toward something that might be &quot;almost right,&quot; but isn&apos;t what the user or team actually needs.
              </p>
              <p>
                Spec-driven development is a simple counterweight: before code, you write a specification clear enough that everyone knows what&apos;s being built, what&apos;s not being built, which edge cases exist, and how we&apos;ll know the work is done.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Specification isn&apos;t bureaucracy
              </h2>
              <p>
                A bad specification is a long document nobody reads. A good specification is an operational artifact: short, concrete, and precise enough that a developer, reviewer, and AI agent work from the same criteria.
              </p>
              <div className="card-feature-light">
                <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Minimal useful specification</h3>
                <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                  <li>the problem we&apos;re solving</li>
                  <li>users or workflow being changed</li>
                  <li>non-goals and explicit scope boundaries</li>
                  <li>acceptance criteria</li>
                  <li>edge cases and risks</li>
                  <li>impact on existing system</li>
                </ul>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Why AI works better with a specification
              </h2>
              <p>
                AI models are good at filling in gaps. That&apos;s useful when you&apos;re looking for ideas, but dangerous when you&apos;re building a feature that must respect existing architecture, security rules, and business edge cases.
              </p>
              <p>
                A specification reduces the number of gaps the model has to guess. It also gives the reviewer a clear framework: review doesn&apos;t just ask &quot;does the code work,&quot; but &quot;does the code solve the agreed problem in the agreed way.&quot;
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                spec-kit, OpenSpec, or plain Markdown?
              </h2>
              <p>
                The tool is less important than the discipline. spec-kit and OpenSpec can help when you need a more formal structure, versioning of changes, or a larger team process. For smaller changes, a plain Markdown document in the repository is often enough.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[18px] font-bold text-[var(--ink)]">Markdown</h3>
                  <p className="text-[15px] text-[var(--ink-mute)]">Fastest for small and medium features when the team already has good discipline.</p>
                </div>
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[18px] font-bold text-[var(--ink)]">spec-kit</h3>
                  <p className="text-[15px] text-[var(--ink-mute)]">Useful when you want a more structured AI-assisted flow from idea to plan.</p>
                </div>
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[18px] font-bold text-[var(--ink)]">OpenSpec</h3>
                  <p className="text-[15px] text-[var(--ink-mute)]">Good when changes have a long life and need a clear history of decisions.</p>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Specification must not freeze learning
              </h2>
              <p>
                The biggest mistake is treating a spec as a contract that can&apos;t be changed. A good spec changes when you learn something new, but the change is recorded. This way the team doesn&apos;t lose context on why a decision was changed.
              </p>
              <p>
                This is especially important with AI workflows. The model might suggest a better approach, but the direction change must end up in the specification, not just in chat history.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Conclusion
              </h2>
              <p>
                Spec-driven development isn&apos;t a slower way of working. Slow is chaos that looks fast in the first few hours and then eats days through rework, unclear review comments, and direction changes.
              </p>
              <p>
                When AI enters the process, the need for specification becomes greater, not smaller. A well-written spec gives the model boundaries, the team shared context, and the reviewer concrete criteria. That&apos;s the foundation of speed that doesn&apos;t sacrifice control.
              </p>
              <p>
                For broader context, see also{" "}
                <a href={`${ROUTES.blog}/${BLOG_SLUGS.aiContextManagement}`} className="text-[var(--primary)]">
                  AI context management
                </a>
                .
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-5">
              <p className="text-[20px] leading-[1.55] text-[var(--ink-secondary)]">
                AI može ubrzati development, ali ne popravlja nejasan zahtjev. Ako
                modelu date nedorečen problem, dobit ćete brže iteracije prema
                nečemu što je možda &quot;skoro dobro&quot;, ali nije ono što korisnik ili tim
                stvarno treba.
              </p>
              <p>
                Spec-driven development je jednostavna protuteža: prije koda napišete
                dovoljno jasnu specifikaciju da se zna što se gradi, što se ne gradi,
                koji edge caseovi postoje i kako ćemo znati da je posao gotov.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Specifikacija nije birokracija
              </h2>
              <p>
                Loša specifikacija je dugačak dokument koji nitko ne čita. Dobra
                specifikacija je operativni artefakt: kratka, konkretna i dovoljno
                precizna da developer, reviewer i AI agent rade prema istim
                kriterijima.
              </p>
              <div className="card-feature-light">
                <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Minimalna korisna specifikacija</h3>
                <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                  <li>problem koji rješavamo</li>
                  <li>korisnici ili workflow koji se mijenja</li>
                  <li>non-goals i izričite granice opsega</li>
                  <li>acceptance kriteriji</li>
                  <li>edge caseovi i rizici</li>
                  <li>utjecaj na postojeći sustav</li>
                </ul>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Zašto AI bolje radi sa specifikacijom
              </h2>
              <p>
                AI modeli su dobri u popunjavanju praznina. To je korisno kada
                tražite ideje, ali opasno kada gradite feature koji mora poštovati
                postojeću arhitekturu, sigurnosna pravila i poslovne rubne slučajeve.
              </p>
              <p>
                Specifikacija smanjuje broj praznina koje model mora pogađati. Ona
                također daje revieweru jasan okvir: review ne pita samo &quot;radi li kod&quot;,
                nego &quot;rješava li kod dogovoreni problem na dogovoreni način&quot;.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                spec-kit, OpenSpec ili običan Markdown?
              </h2>
              <p>
                Alat je manje važan od discipline. spec-kit i OpenSpec mogu pomoći
                kada trebate formalniju strukturu, verzioniranje promjena ili veći
                timski proces. Za manje promjene često je dovoljan običan Markdown
                dokument u repozitoriju.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[18px] font-bold text-[var(--ink)]">Markdown</h3>
                  <p className="text-[15px] text-[var(--ink-mute)]">Najbrži za male i srednje featuree kada tim već ima dobru disciplinu.</p>
                </div>
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[18px] font-bold text-[var(--ink)]">spec-kit</h3>
                  <p className="text-[15px] text-[var(--ink-mute)]">Koristan kada želite strukturiraniji AI-assisted tok od ideje do plana.</p>
                </div>
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[18px] font-bold text-[var(--ink)]">OpenSpec</h3>
                  <p className="text-[15px] text-[var(--ink-mute)]">Dobar kada promjene imaju dug život i trebaju jasnu povijest odluka.</p>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Specifikacija ne smije zamrznuti učenje
              </h2>
              <p>
                Najveća greška je tretirati spec kao ugovor koji se ne smije
                promijeniti. Dobar spec se mijenja kada naučite nešto novo, ali se
                promjena bilježi. Time tim ne gubi kontekst zašto je odluka
                promijenjena.
              </p>
              <p>
                To je posebno važno kod AI workflowa. Model može predložiti bolji
                pristup, ali promjena smjera mora završiti u specifikaciji, ne samo u
                chat historyju.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Zaključak
              </h2>
              <p>
                Spec-driven development nije sporiji način rada. Spor je kaos koji
                izgleda brzo u prvih nekoliko sati, a zatim pojede dane kroz
                rework, nejasne review komentare i promjene smjera.
              </p>
              <p>
                Kada AI uđe u proces, potreba za specifikacijom postaje veća, ne
                manja. Dobro napisan spec daje modelu granice, timu shared context i
                revieweru konkretne kriterije. To je temelj brzine koja ne žrtvuje
                kontrolu.
              </p>
              <p>
                Za širi kontekst pogledajte i tekst o{" "}
                <a href={`${ROUTES.blog}/${BLOG_SLUGS.aiContextManagement}`} className="text-[var(--primary)]">
                  upravljanju AI kontekstom
                </a>
                .
              </p>
            </section>
          </>
        )}
      </BlogArticleLayout>
    </div>
  );
}
