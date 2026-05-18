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

const post = getBlogPost("ai-context-management-lessons")!;

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
  articleSection: "AI context management",
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

export default async function AIContextManagementArticle({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(locale);
  const currentPost = getBlogPost("ai-context-management-lessons", loc) ?? post;
  const t = await getTranslations("blog");

  const ctaTitle =
    loc === "en"
      ? "AI workflow stuck because of too much context?"
      : "AI workflow zapinje zbog previše konteksta?";
  const ctaDescription =
    loc === "en"
      ? "We help teams design AI-assisted development processes, context boundaries, specifications, and evaluations that reduce noise."
      : "Pomažemo timovima dizajnirati AI-assisted development proces, granice konteksta, specifikacije i evaluacije koje smanjuju šum.";

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
        ctaSource="blog_ai_context_management"
      >
        {loc === "en" ? (
          <>
            <section className="space-y-5">
              <p className="text-[20px] leading-[1.55] text-[var(--ink-secondary)]">
                A large context window sounds like a dream: you throw in documentation, the entire codebase, past decisions, logs, and conversation, and the model &quot;has everything.&quot; In practice, &quot;everything&quot; often means a lot of irrelevant, outdated, or contradictory context.
              </p>
              <p>
                After enough AI coding sessions, it becomes clear that the problem isn&apos;t just context capacity. The problem is context quality, the timing of when you introduce it, and a clear decision about what the model actually needs to do.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                More context can reduce focus
              </h2>
              <p>
                The model doesn&apos;t always know what&apos;s most important. If you give it ten possible directions, it will often try to satisfy all of them. This can produce an implementation that looks diligent but solves the wrong problem or pulls decisions from documentation that&apos;s no longer valid.
              </p>
              <div className="card-feature-light">
                <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Bad signal in context</h3>
                <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                  <li>old architectural decisions without a note that they&apos;re outdated</li>
                  <li>unfinished experiments that look like standards</li>
                  <li>too many tool definitions that aren&apos;t relevant to the task</li>
                  <li>a long conversation history full of direction changes</li>
                </ul>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Good context is selective
              </h2>
              <p>
                For most tasks, a smaller, well-chosen package is better: relevant files, current specification, constraints, expected output, and a few examples of local style. If the model needs more, it can ask for it or read targeted files.
              </p>
              <p>
                This is a similar principle to software architecture: boundaries exist to reduce the number of things you need to hold in your head at once. An AI workflow without boundaries quickly becomes slow, expensive, and unpredictable.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Specification beats a pile of history
              </h2>
              <p>
                If the task isn&apos;t clearly defined, the model will fill in the gaps. More context then just provides more material for wrong guesses. A short specification with the goal, non-goals, edge cases, and acceptance criteria is often worth more than thousands of lines of conversation.
              </p>
              <p>
                That&apos;s why AI-assisted development works better when combined with a{" "}
                <a href={`${ROUTES.blog}/${BLOG_SLUGS.specDrivenDevelopment}`} className="text-[var(--primary)]">
                  spec-driven approach
                </a>
                . The specification gives the model intent, and selective context gives it enough local knowledge for implementation.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                A practical checklist before a big AI session
              </h2>
              <div className="card-cream-band">
                <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                  <li>What is the one decision or change I want to get?</li>
                  <li>Which files are actually relevant?</li>
                  <li>Which documents are outdated or contradictory?</li>
                  <li>What output do I expect: patch, plan, review, or research?</li>
                  <li>Which risks must be checked before finishing?</li>
                </ul>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Conclusion
              </h2>
              <p>
                A large context window is useful, but it&apos;s not a strategy. Strategy is knowing what the model needs to do, which information it needs, and which information gets in the way.
              </p>
              <p>
                Teams that want to use AI tools seriously need to think about context management as part of the engineering process: specifications, relevant sources, clear boundaries, and review. Without that, more context just increases the surface area for wrong conclusions.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-5">
              <p className="text-[20px] leading-[1.55] text-[var(--ink-secondary)]">
                Veliki context window zvuči kao san: ubacite dokumentaciju, cijeli
                codebase, prošle odluke, logove i razgovor, pa model &quot;ima sve&quot;.
                U praksi, &quot;sve&quot; često znači i puno nevažnog, zastarjelog ili
                kontradiktornog konteksta.
              </p>
              <p>
                Nakon dovoljno AI coding sesija postane jasno da problem nije samo
                kapacitet konteksta. Problem je kvaliteta konteksta, trenutak kada ga
                uvodite i jasna odluka što model zapravo treba napraviti.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Više konteksta može smanjiti fokus
              </h2>
              <p>
                Model ne zna uvijek što je najvažnije. Ako mu date deset mogućih
                smjerova, često će pokušati zadovoljiti sve. To može proizvesti
                implementaciju koja izgleda marljivo, ali rješava krivi problem ili
                vuče odluke iz dokumentacije koja više nije važeća.
              </p>
              <div className="card-feature-light">
                <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Loš signal u kontekstu</h3>
                <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                  <li>stare arhitekturne odluke bez oznake da su zastarjele</li>
                  <li>nedovršeni eksperimenti koji izgledaju kao standard</li>
                  <li>previše tool definicija koje nisu relevantne za zadatak</li>
                  <li>duga povijest razgovora puna promjena smjera</li>
                </ul>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Dobar kontekst je selektivan
              </h2>
              <p>
                Za većinu zadataka bolji je manji, dobro odabran paket: relevantni
                fileovi, trenutna specifikacija, ograničenja, očekivani output i
                nekoliko primjera lokalnog stila. Ako model treba više, može ga
                zatražiti ili pročitati ciljano.
              </p>
              <p>
                To je sličan princip kao kod software arhitekture: granice postoje
                da bi smanjile broj stvari koje morate držati u glavi odjednom.
                AI workflow bez granica brzo postane spor, skup i nepredvidljiv.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Specifikacija pobjeđuje gomilu povijesti
              </h2>
              <p>
                Ako zadatak nije jasno definiran, model će popuniti praznine. Veći
                kontekst tada samo daje više materijala za pogrešno popunjavanje.
                Kratka specifikacija s ciljem, non-goals, edge caseovima i acceptance
                kriterijima često vrijedi više od tisuća linija razgovora.
              </p>
              <p>
                Zato AI-assisted development bolje radi kada ga spojite sa{" "}
                <a href={`${ROUTES.blog}/${BLOG_SLUGS.specDrivenDevelopment}`} className="text-[var(--primary)]">
                  spec-driven pristupom
                </a>
                . Specifikacija modelu daje namjeru, a selektivni kontekst mu daje
                dovoljno lokalnog znanja za implementaciju.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Praktičan checklist prije velike AI sesije
              </h2>
              <div className="card-cream-band">
                <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                  <li>Koja je jedna odluka ili promjena koju želim dobiti?</li>
                  <li>Koji fileovi su stvarno relevantni?</li>
                  <li>Koji dokumenti su zastarjeli ili kontradiktorni?</li>
                  <li>Koji output očekujem: patch, plan, review ili istraživanje?</li>
                  <li>Koji rizici moraju biti provjereni prije završetka?</li>
                </ul>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Zaključak
              </h2>
              <p>
                Veliki context window je koristan, ali nije strategija. Strategija je
                znati što model treba napraviti, koje informacije su mu potrebne i
                koje informacije mu smetaju.
              </p>
              <p>
                Timovi koji žele ozbiljno koristiti AI alate trebaju razmišljati o
                context managementu kao o dijelu engineering procesa: specifikacije,
                relevantni izvori, jasne granice i review. Bez toga, veći kontekst
                samo povećava površinu za pogrešan zaključak.
              </p>
            </section>
          </>
        )}
      </BlogArticleLayout>
    </div>
  );
}
