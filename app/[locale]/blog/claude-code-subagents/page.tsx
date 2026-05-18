import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import StructuredData from "@/components/StructuredData";
import BlogArticleLayout from "@/components/BlogArticleLayout";
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

const post = getBlogPost("claude-code-subagents")!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale === "en" ? "en" : "hr";
  const currentPost = getBlogPost("claude-code-subagents", loc) ?? post;

  return generateBlogMetadata({
    post: currentPost,
    pathname: BLOG_ARTICLE_ROUTES.claudeCodeSubagents,
    locale: loc,
  });
}

export default async function ClaudeCodeSubagentsArticle({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;
  const currentPost = getBlogPost("claude-code-subagents", loc) ?? post;
  const t = await getTranslations("blog");
  const articleSchema = generateBlogPostingSchema({
    post: currentPost,
    pathname: BLOG_ARTICLE_ROUTES.claudeCodeSubagents,
    locale: loc,
    articleSection: "AI-assisted development",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t("breadcrumbHome"), url: getLocalizedPath(ROUTES.home, loc) },
    { name: "Blog", url: getLocalizedPath(ROUTES.blog, loc) },
    {
      name: currentPost.title,
      url: getLocalizedPath(BLOG_ARTICLE_ROUTES.claudeCodeSubagents, loc),
    },
  ]);

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema, articleSchema]} />

      <BlogArticleLayout
        post={currentPost}
        locale={loc}
        ctaTitle={loc === "en" ? "Need a better AI-assisted code review?" : "Trebate kvalitetniji AI-assisted code review?"}
        ctaDescription={loc === "en"
          ? "We help teams introduce Claude Code workflows, subagents, skills, and review standards that speed up work without lowering quality."
          : "Pomažemo timovima uvesti Claude Code workflowe, subagente, skills i review standarde koji ubrzavaju rad bez spuštanja kvalitete."}
        ctaSource="blog_claude_code_subagents"
      >
        {locale === "en" ? (
          <>
            <section className="space-y-5">
              <p className="text-[20px] leading-[1.55] text-[var(--ink-secondary)]">
                One of the more useful lessons from working with Claude Code is that the same AI agent that helped write a feature isn&apos;t always the best reviewer of that feature. It knows the tradeoffs you already accepted. It knows the shortcuts it suggested itself. And it often tends to validate the direction rather than questioning it critically enough.
              </p>
              <p>
                That&apos;s why for more important changes, I use a separate, fresh subagent with a clear read-only task. Not because it&apos;s magically smarter, but because it enters the codebase without the emotional and conversational baggage of the implementation session.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                The problem: implementation context creates blind spots
              </h2>
              <p>
                During development, the AI assistant sees every decision: why a certain edge case was deferred, why a test wasn&apos;t added yet, why an integration was made simpler than originally planned. That context is useful while building, but can get in the way when you want an unbiased review.
              </p>
              <p>
                If you ask the same session to &quot;review this code,&quot; you&apos;ll often get a review that sounds reasonable but misses places where the session itself has already rationalized a compromise. This isn&apos;t only an AI tool problem. Human developers also find it easier to defend their own solution than someone else&apos;s.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                The solution: a clean subagent with a narrow task
              </h2>
              <p>
                Instead of reviewing in the same session, I launch a subagent that can only read the code. I give it a specific scope, a list of risks, and an expected response format. Example prompt:
              </p>
              <div className="card-dashboard-mockup card-dashboard-mockup-dark overflow-x-auto p-6">
                <pre className="whitespace-pre-wrap font-mono text-[13px] leading-6 text-white/85">
{`Launch a fresh subagent with read-only access and review the implementation of this flow.
Do not use context from our previous discussion.

Check for:
- security vulnerabilities
- missing edge cases
- poor error handling
- insufficiently tested parts
- places where the solution is unnecessarily complex

Return findings as a prioritized list with file:line references.`}
                </pre>
              </div>
              <p>
                Good formulation matters. &quot;Review the code&quot; is too broad. &quot;Look for security vulnerabilities, unhandled edge cases, and gaps in tests&quot; is specific. The subagent doesn&apos;t need to know the full work history; it needs to know what exactly to challenge.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                When this workflow makes sense
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">I use it for</h3>
                  <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                    <li>security-sensitive changes</li>
                    <li>authorization, billing, and data migrations</li>
                    <li>larger refactors with many touch points</li>
                    <li>AI-generated changes before committing</li>
                  </ul>
                </div>
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">I don&apos;t use it for</h3>
                  <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                    <li>small copy changes</li>
                    <li>simple rename operations</li>
                    <li>quick experiments that won&apos;t be committed</li>
                    <li>reviews without a clear scope</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                A team standard matters more than a one-time trick
              </h2>
              <p>
                If a team wants to use AI coding tools seriously, this kind of workflow shouldn&apos;t depend on someone&apos;s memory. The rule can be written into the project&apos;s <code>CLAUDE.md</code>, a skill, or an internal delivery standard: for changes above a certain risk level, a separate review agent with read-only access is used.
              </p>
              <p>
                That&apos;s part of a broader <Link href={ROUTES.aiConsulting} className="text-[var(--primary)]">AI consulting</Link> approach: AI tools can speed up work, but only if they&apos;re introduced with clear rules for ownership, security, testing, and review. Without that, you get faster iterations but also faster spread of errors.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Conclusion
              </h2>
              <p>
                Claude Code subagents aren&apos;t a replacement for human review, but they&apos;re very useful as an additional layer of verification. They work best when you give them a narrow scope, read-only access, and criteria that match the risk of the change.
              </p>
              <p>
                In practice, the biggest value isn&apos;t in the subagent itself but in the discipline the workflow introduces: clearly defined quality criteria, a fresh perspective, and the habit that AI-generated code doesn&apos;t go to production without independent verification.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-5">
              <p className="text-[20px] leading-[1.55] text-[var(--ink-secondary)]">
                Jedna od korisnijih lekcija iz rada s Claude Codeom je da isti AI
                agent koji je pomagao pisati feature nije uvijek najbolji reviewer
                tog featurea. Zna za kompromise koje ste već prihvatili. Zna za
                prečace koje je sam predložio. I često ima tendenciju potvrditi
                smjer umjesto da ga dovoljno strogo preispita.
              </p>
              <p>
                Zato za važnije promjene koristim odvojeni, svježi subagent s
                jasnim read-only zadatkom. Ne zato što je magično pametniji, nego
                zato što ulazi u codebase bez emocionalnog i konverzacijskog tereta
                implementacije.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Problem: implementacijski kontekst stvara slijepe točke
              </h2>
              <p>
                Tijekom razvoja AI pomoćnik vidi svaku odluku: zašto je neki edge
                case odgođen, zašto test još nije dodan, zašto je integracija
                napravljena jednostavnije nego što je prvotno planirano. Taj
                kontekst je koristan dok gradite, ali može smetati kada tražite
                nepristran review.
              </p>
              <p>
                Ako istu sesiju pitate &quot;reviewaj ovo&quot;, često dobijete pregled koji
                zvuči razumno, ali propušta mjesta gdje je sama sesija već
                racionalizirala kompromis. To nije problem samo AI alata. I ljudski
                developeri lakše brane vlastito rješenje nego tuđe.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Rješenje: čisti subagent s uskim zadatkom
              </h2>
              <p>
                Umjesto reviewa u istoj sesiji, pokrenem subagent koji smije samo
                čitati kod. Dajem mu konkretan opseg, listu rizika i očekivani
                format odgovora. Primjer prompta:
              </p>
              <div className="card-dashboard-mockup card-dashboard-mockup-dark overflow-x-auto p-6">
                <pre className="whitespace-pre-wrap font-mono text-[13px] leading-6 text-white/85">
{`Pokreni svježi subagent s read-only pristupom i pregledaj implementaciju ovog flowa.
Ne koristi kontekst iz naše prethodne rasprave.

Provjeri:
- sigurnosne propuste
- nedostajuće edge caseove
- loš error handling
- nedovoljno testirane dijelove
- mjesta gdje je rješenje nepotrebno kompleksno

Vrati nalaze kao prioritiziranu listu s file:line referencama.`}
                </pre>
              </div>
              <p>
                Dobra formulacija je važna. &quot;Pregledaj kod&quot; je preširoko. &quot;Traži
                sigurnosne propuste, neobrađene edge caseove i rupe u testovima&quot; je
                konkretno. Subagent ne mora znati cijelu povijest rada; mora znati
                što točno treba osporiti.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Kada ovaj workflow ima smisla
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Koristim ga za</h3>
                  <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                    <li>sigurnosno osjetljive promjene</li>
                    <li>autorizaciju, naplatu i podatkovne migracije</li>
                    <li>veće refaktore s više dodirnih točaka</li>
                    <li>AI-generated promjene prije commita</li>
                  </ul>
                </div>
                <div className="card-feature-light">
                  <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Ne koristim ga za</h3>
                  <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                    <li>sitne copy izmjene</li>
                    <li>jednostavne rename promjene</li>
                    <li>brze eksperimente koji se neće commitati</li>
                    <li>review bez jasnog opsega</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Timski standard je važniji od jednokratnog trika
              </h2>
              <p>
                Ako tim želi ozbiljno koristiti AI coding alate, ovakav workflow ne
                bi trebao ovisiti o nečijem pamćenju. Pravilo se može zapisati u
                projektni <code>CLAUDE.md</code>, skill ili interni delivery
                standard: za promjene iznad određene razine rizika koristi se
                odvojeni review agent s read-only pristupom.
              </p>
              <p>
                To je dio šireg <Link href={ROUTES.aiConsulting} className="text-[var(--primary)]">AI consulting</Link> pristupa:
                AI alati mogu ubrzati rad, ali samo ako se uvedu s jasnim pravilima
                za ownership, sigurnost, testiranje i review. Bez toga dobijete
                brže iteracije, ali i brže širenje grešaka.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Zaključak
              </h2>
              <p>
                Claude Code subagenti nisu zamjena za ljudski review, ali su vrlo
                korisni kao dodatni sloj provjere. Najbolje rade kada im date uski
                opseg, read-only pristup i kriterije koji odgovaraju riziku
                promjene.
              </p>
              <p>
                U praksi, najveća vrijednost nije u samom subagentu nego u disciplini
                koju workflow uvodi: jasno definirani kriteriji kvalitete, svježa
                perspektiva i navika da AI-generated kod ne ide u produkciju bez
                neovisne provjere.
              </p>
            </section>
          </>
        )}
      </BlogArticleLayout>
    </div>
  );
}
