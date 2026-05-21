import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import StructuredData from "@/components/StructuredData";
import BlogArticleLayout from "@/components/BlogArticleLayout";
import { Link } from "@/i18n/navigation";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { getBlogPost, type Locale } from "@/lib/blogData";
import { BLOG_ARTICLE_ROUTES, ROUTES } from "@/lib/constants";
import {
  generateBlogMetadata,
  generateBlogPostingSchema,
} from "@/lib/blogSeo";
import { getLocalizedPath } from "@/lib/seo";

export function generateStaticParams() {
  return [{ locale: "hr" }, { locale: "en" }];
}

const post = getBlogPost("claude-code-skills-productivity")!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale === "en" ? "en" : "hr";
  const currentPost = getBlogPost("claude-code-skills-productivity", loc) ?? post;

  return generateBlogMetadata({
    post: currentPost,
    pathname: BLOG_ARTICLE_ROUTES.claudeCodeSkills,
    locale: loc,
  });
}

export default async function ClaudeCodeSkillsProductivityArticle({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(locale);
  const currentPost = getBlogPost("claude-code-skills-productivity", loc) ?? post;
  const t = await getTranslations("blog");
  const articleSchema = generateBlogPostingSchema({
    post: currentPost,
    pathname: BLOG_ARTICLE_ROUTES.claudeCodeSkills,
    locale: loc,
    articleSection: "Claude Code",
  });

  const ctaTitle =
    loc === "en"
      ? "Want to standardize AI coding in your team?"
      : "Želite standardizirati AI coding u timu?";
  const ctaDescription =
    loc === "en"
      ? "We help teams design Claude Code skills, subagents, review rules, and workflows that are versioned, secure, and aligned with your codebase."
      : "Pomažemo timovima dizajnirati Claude Code skills, subagente, review pravila i workflowe koji su verzionirani, sigurni i usklađeni s vašim codebaseom.";

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t("breadcrumbHome"), url: getLocalizedPath(ROUTES.home, loc) },
    { name: "Blog", url: getLocalizedPath(ROUTES.blog, loc) },
    {
      name: currentPost.title,
      url: getLocalizedPath(BLOG_ARTICLE_ROUTES.claudeCodeSkills, loc),
    },
  ], loc);

  const skillCode = loc === "en"
    ? `---
name: api-endpoint-review
description: Use when you need to review a backend API endpoint before merge.
---

Check:
- request validation
- auth and authorization
- error handling
- test coverage
- logging and observability

Return prioritized findings with file:line references.`
    : `---
name: api-endpoint-review
description: Koristi kada treba pregledati backend API endpoint prije mergea.
---

Check:
- request validation
- auth and authorization
- error handling
- test coverage
- logging and observability

Return prioritized findings with file:line references.`;

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema, articleSchema]} />

      <BlogArticleLayout
        post={currentPost}
        locale={loc}
        ctaTitle={ctaTitle}
        ctaDescription={ctaDescription}
        ctaSource="blog_claude_code_skills"
      >
        {loc === "en" ? (
          <>
            <section className="space-y-5">
              <p className="text-[20px] leading-[1.55] text-[var(--ink-secondary)]">
                If every developer on the team repeats the same instructions to Claude Code every day, the problem isn&apos;t the tool — it&apos;s the process. &quot;Use our naming conventions,&quot; &quot;tests go like this,&quot; &quot;don&apos;t touch migrations without review&quot; — these are all team rules that shouldn&apos;t live only in someone&apos;s head or the history of one session.
              </p>
              <p>
                Claude Code skills are a practical way to turn repetitive instructions into a versioned workflow. They don&apos;t solve everything, but they solve an annoying and important problem very well: giving the AI tool the same standard every time.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                A skill isn&apos;t a long prompt
              </h2>
              <p>
                A bad skill is a document where you&apos;ve stuffed everything you know about the project. A good skill is narrowly defined: when it&apos;s used, what input it expects, what steps the agent is allowed to take, what it must check, and what output it should return.
              </p>
              <div className="card-dashboard-mockup card-dashboard-mockup-dark overflow-x-auto p-6">
                <pre className="whitespace-pre-wrap font-mono text-[13px] leading-6 text-white/85">
                  {skillCode}
                </pre>
              </div>
              <p>
                This kind of skill has a clear boundary. It doesn&apos;t try to be &quot;our entire engineering process,&quot; but rather one repeatable review task.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Where skills help most
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Good candidates</h3>
                  <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                    <li>code review checklists</li>
                    <li>API endpoint generation following local standards</li>
                    <li>migration preparation with security rules</li>
                    <li>release notes from diff</li>
                    <li>debugging workflow for known problem types</li>
                  </ul>
                </div>
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Bad candidates</h3>
                  <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                    <li>overly broad instructions like &quot;write better code&quot;</li>
                    <li>rules nobody on the team actually enforces</li>
                    <li>workflows requiring production permissions without oversight</li>
                    <li>documentation that doesn&apos;t get maintained with the codebase</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Team skills should live in the repository
              </h2>
              <p>
                Personal skills are useful for individual habits, but the real shift comes when project skills live alongside the codebase. Then they get reviewed in pull requests, changed together with architecture, and become part of onboarding materials.
              </p>
              <p>
                That&apos;s an important distinction: the AI workflow becomes an engineering artifact, not one developer&apos;s private magic. When the testing or deployment standard changes, the skill changes too.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Skills aren&apos;t a replacement for specification
              </h2>
              <p>
                A skill defines how to work. A specification defines what to build and why. The best results come when you use both: a spec-driven approach gives the model a clear problem, and a skill gives it the team standards for implementation.
              </p>
              <p>
                If you&apos;re interested in that part, a related topic is{" "}
                <Link href={BLOG_ARTICLE_ROUTES.specDrivenDevelopment} className="text-[var(--primary)]">
                  spec-driven development and AI
                </Link>
                . In practice, skills and specifications are two sides of a responsible AI-assisted development process.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Conclusion
              </h2>
              <p>
                Claude Code skills make sense when they eliminate repetition and preserve standards. If you write them as short, narrow, and maintainable workflows, they can seriously improve the consistency of AI output in a team.
              </p>
              <p>
                If you use them as a place for every possible instruction, you&apos;ve just created a new form of documentation that nobody reads. As with any engineering process, value comes from clarity, boundaries, and regular maintenance.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-5">
              <p className="text-[20px] leading-[1.55] text-[var(--ink-secondary)]">
                Ako svaki developer u timu svaki dan ponavlja Claude Codeu iste
                upute, problem nije u alatu nego u procesu. &quot;Koristi naše naming
                konvencije&quot;, &quot;testovi idu ovako&quot;, &quot;ne diraj migracije bez reviewa&quot; -
                sve su to timska pravila koja ne bi smjela živjeti samo u nečijoj
                glavi ili historyju jedne sesije.
              </p>
              <p>
                Claude Code skills su praktičan način da se ponavljive upute pretvore
                u verzionirani workflow. Ne rješavaju sve, ali jako dobro rješavaju
                dosadan i važan problem: kako AI alatu dati isti standard svaki put.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Skill nije dugačak prompt
              </h2>
              <p>
                Loš skill je dokument u koji ste ubacili sve što znate o projektu.
                Dobar skill je usko definiran: kada se koristi, koji input očekuje,
                koje korake agent smije napraviti, što mora provjeriti i kakav
                output treba vratiti.
              </p>
              <div className="card-dashboard-mockup card-dashboard-mockup-dark overflow-x-auto p-6">
                <pre className="whitespace-pre-wrap font-mono text-[13px] leading-6 text-white/85">
                  {skillCode}
                </pre>
              </div>
              <p>
                Ovakav skill ima jasnu granicu. Ne pokušava biti &quot;naš cijeli
                engineering proces&quot;, nego jedan ponovljiv review zadatak.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Gdje skills najviše pomažu
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Dobri kandidati</h3>
                  <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                    <li>code review checklisti</li>
                    <li>generiranje API endpointa po lokalnom standardu</li>
                    <li>priprema migracija uz sigurnosna pravila</li>
                    <li>pisanje release notesa iz diff-a</li>
                    <li>debugging workflow za poznate tipove problema</li>
                  </ul>
                </div>
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Loši kandidati</h3>
                  <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                    <li>preširoke upute tipa &quot;piši bolji kod&quot;</li>
                    <li>pravila koja nitko u timu ne provodi</li>
                    <li>workflowi koji zahtijevaju produkcijske ovlasti bez kontrole</li>
                    <li>dokumentacija koja se ne održava s codebaseom</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Timski skills trebaju živjeti u repozitoriju
              </h2>
              <p>
                Osobni skills su korisni za individualne navike, ali pravi pomak
                dolazi kada projektni skills žive uz codebase. Tada se reviewaju u
                pull requestovima, mijenjaju zajedno s arhitekturom i postaju dio
                onboarding materijala.
              </p>
              <p>
                To je važna razlika: AI workflow postaje engineering artefakt, ne
                privatna magija jednog developera. Kada se promijeni standard za
                testiranje ili deploy, mijenja se i skill.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Skills nisu zamjena za specifikaciju
              </h2>
              <p>
                Skill definira kako raditi. Specifikacija definira što se gradi i
                zašto. Najbolji rezultati dolaze kada koristite oboje: spec-driven
                pristup daje modelu jasan problem, a skill mu daje timske standarde
                za implementaciju.
              </p>
              <p>
                Ako vas zanima taj dio, povezana tema je{" "}
                <Link href={BLOG_ARTICLE_ROUTES.specDrivenDevelopment} className="text-[var(--primary)]">
                  spec-driven development i AI
                </Link>
                . U praksi su skills i specifikacije dvije strane istog odgovornog
                AI-assisted development procesa.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Zaključak
              </h2>
              <p>
                Claude Code skills imaju smisla kada uklanjaju ponavljanje i čuvaju
                standarde. Ako ih pišete kao kratke, uske i održavane workflowe,
                mogu ozbiljno poboljšati konzistentnost AI outputa u timu.
              </p>
              <p>
                Ako ih koristite kao mjesto za sve moguće upute, samo ste stvorili
                novi oblik dokumentacije koju nitko ne čita. Kao i kod svakog
                engineering procesa, vrijednost dolazi iz jasnoće, granica i redovitog
                održavanja.
              </p>
            </section>
          </>
        )}
      </BlogArticleLayout>
    </div>
  );
}
