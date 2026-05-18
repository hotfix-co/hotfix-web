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

const post = getBlogPost("openclaw-usage")!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale === "en" ? "en" : "hr";
  const currentPost = getBlogPost("openclaw-usage", loc) ?? post;

  return generateBlogMetadata({
    post: currentPost,
    pathname: BLOG_ARTICLE_ROUTES.openClawUsage,
    locale: loc,
  });
}

export default async function OpenClawUsageArticle({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(locale);
  const currentPost = getBlogPost("openclaw-usage", loc) ?? post;
  const t = await getTranslations("blog");
  const articleSchema = generateBlogPostingSchema({
    post: currentPost,
    pathname: BLOG_ARTICLE_ROUTES.openClawUsage,
    locale: loc,
    articleSection: "Automation",
  });

  const ctaTitle =
    loc === "en"
      ? "Want to automate manual engineering tasks?"
      : "Želite automatizirati ručne engineering zadatke?";
  const ctaDescription =
    loc === "en"
      ? "We help teams turn repetitive tasks into controlled workflows: from GitHub issue intake to release checklists, runbooks, and AI-assisted processes."
      : "Pomažemo timovima pretvoriti ponavljive zadatke u kontrolirane workflowe: od GitHub issue intakea do release checklisti, runbooka i AI-assisted procesa.";

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t("breadcrumbHome"), url: getLocalizedPath(ROUTES.home, loc) },
    { name: "Blog", url: getLocalizedPath(ROUTES.blog, loc) },
    {
      name: currentPost.title,
      url: getLocalizedPath(BLOG_ARTICLE_ROUTES.openClawUsage, loc),
    },
  ]);

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema, articleSchema]} />

      <BlogArticleLayout
        post={currentPost}
        locale={loc}
        ctaTitle={ctaTitle}
        ctaDescription={ctaDescription}
        ctaSource="blog_openclaw_usage"
      >
        {loc === "en" ? (
          <>
            <section className="space-y-5">
              <p className="text-[20px] leading-[1.55] text-[var(--ink-secondary)]">
                A good GitHub issue usually comes at the wrong moment: while you&apos;re on your phone, in a meeting, or in the middle of testing. If you then open GitHub and try to write a title, description, repro steps, and expected behavior, it&apos;s very easy to give up or leave a note that later doesn&apos;t have enough context.
              </p>
              <p>
                That&apos;s why I built a small workflow with OpenClaw and Signal. The goal isn&apos;t &quot;AI that manages the project,&quot; but something much more modest: capture a short note while it&apos;s fresh and turn it into a good enough issue without manual copy-pasting.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                A workflow that works because it&apos;s intentionally narrow
              </h2>
              <p>
                The system has four parts: a dedicated Signal number, a sender allowlist, an OpenClaw agent with limited GitHub access, and a custom skill that knows how to write an issue. No broad permissions and no open &quot;do what you think is needed&quot; space.
              </p>
              <div className="card-feature-light">
                <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Typical message</h3>
                <p className="text-[15px] text-[var(--ink-mute)]">
                  &quot;On mobile checkout, an error toast disappears before the user can read the message. Happens after a failed card. Need to check timeout and payment retry.&quot;
                </p>
              </div>
              <p>
                The skill turns that into a title, problem, context, repro steps, expected behavior, risk, and suggested labels. The agent doesn&apos;t try to solve the bug. It just prepares a quality intake.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                The most important part is the limitation of permissions
              </h2>
              <p>
                With this kind of automation, it&apos;s not enough to ask &quot;can the agent do this?&quot; It&apos;s more important to ask &quot;what happens when it gets bad input or when the model draws the wrong conclusion?&quot; That&apos;s why the agent has a narrow role: it creates a draft issue, doesn&apos;t touch code, doesn&apos;t change milestones, and doesn&apos;t assign priority without rules.
              </p>
              <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                <li>Signal senders are limited by an allowlist.</li>
                <li>GitHub token has minimal permissions for issue intake.</li>
                <li>Skill defines required fields and issue tone.</li>
                <li>For unclear notes, the agent asks for clarification instead of making up details.</li>
              </ul>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Where the real value is
              </h2>
              <p>
                The value isn&apos;t in AI &quot;writing issues.&quot; The value is that small problems don&apos;t get lost, and the team gets a consistent format that&apos;s good enough for triage. That reduces the mental cost of reporting a bug and increases the chance the problem gets fixed while the context is still fresh.
              </p>
              <p>
                This is a good example of <Link href={ROUTES.productivity} className="text-[var(--primary)]">engineering productivity</Link>: you&apos;re not introducing a big platform, you&apos;re removing one repetitive friction from the process. Such small automations often give a better return than large &quot;AI transformations&quot; that nobody uses.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                What I&apos;d do in a team setting
              </h2>
              <p>
                For team use, I&apos;d add three things: review of the first dozen issues before automatic opening, a clear label policy, and measurement of how many drafts actually end up in the backlog. If most automated issues need manual rework, the skill needs improvement.
              </p>
              <p>
                An AI workflow must be measurable. If you don&apos;t know what it improved, you probably just moved work from one tool to another.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-5">
              <p className="text-[20px] leading-[1.55] text-[var(--ink-secondary)]">
                Dobar GitHub issue obično nastane u pogrešnom trenutku: dok ste na
                mobitelu, na sastanku ili usred testiranja. Ako tada otvorite GitHub
                i pokušate napisati naslov, opis, repro korake i očekivano ponašanje,
                vrlo lako odustanete ili ostavite bilješku koja kasnije više nema
                dovoljno konteksta.
              </p>
              <p>
                Zato sam složio mali workflow s OpenClawom i Signalom. Cilj nije
                &quot;AI koji sam vodi projekt&quot;, nego puno skromnija stvar: uhvatiti
                kratku bilješku dok je svježa i pretvoriti je u dovoljno dobar issue
                bez ručnog copy-pastea.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Workflow koji radi jer je namjerno uzak
              </h2>
              <p>
                Sustav ima četiri dijela: dedicirani Signal broj, allowlistu
                pošiljatelja, OpenClaw agent s ograničenim GitHub pristupom i custom
                skill koji zna kako napisati issue. Nema širokih ovlasti i nema
                otvorenog &quot;radi što misliš da treba&quot; prostora.
              </p>
              <div className="card-feature-light">
                <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Tipična poruka</h3>
                <p className="text-[15px] text-[var(--ink-mute)]">
                  &quot;Na mobile checkoutu error toast nestane prije nego korisnik stigne
                  pročitati poruku. Dogodi se nakon neuspjele kartice. Treba provjeriti
                  timeout i ponovni pokušaj plaćanja.&quot;
                </p>
              </div>
              <p>
                Skill iz toga napravi naslov, problem, kontekst, repro korake,
                očekivano ponašanje, rizik i predložene labele. Agent ne pokušava
                riješiti bug. Samo priprema kvalitetan intake.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Najvažniji dio je ograničenje ovlasti
              </h2>
              <p>
                Kod ovakvih automatizacija nije dovoljno pitati &quot;može li agent ovo
                napraviti?&quot;. Važnije je pitati &quot;što se događa kada dobije loš input
                ili kada model krivo zaključi?&quot;. Zato agent ima usku ulogu: kreira
                draft issue, ne dira kod, ne mijenja milestoneove i ne dodjeljuje
                prioritet bez pravila.
              </p>
              <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                <li>Signal pošiljatelji su ograničeni allowlistom.</li>
                <li>GitHub token ima minimalne ovlasti za issue intake.</li>
                <li>Skill definira obavezna polja i ton issuea.</li>
                <li>Za nejasne bilješke agent traži dopunu umjesto da izmišlja detalje.</li>
              </ul>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Gdje je stvarna vrijednost
              </h2>
              <p>
                Vrijednost nije u tome što AI &quot;piše issuee&quot;. Vrijednost je u tome
                što se mali problemi ne gube, a tim dobiva konzistentan format koji
                je dovoljno dobar za trijažu. To smanjuje mentalni trošak prijave
                buga i povećava šansu da se problem riješi dok je kontekst još
                svjež.
              </p>
              <p>
                Ovo je dobar primjer <Link href={ROUTES.productivity} className="text-[var(--primary)]">engineering produktivnosti</Link>:
                ne uvodi se velika platforma, nego se uklanja jedno ponavljivo trenje
                iz procesa. Takve male automatizacije često daju bolji povrat od
                velikih &quot;AI transformacija&quot; koje nitko ne koristi.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Što bih napravio u timu
              </h2>
              <p>
                Za timsku upotrebu dodao bih tri stvari: pregled prvih desetak
                issuea prije automatskog otvaranja, jasnu politiku labela i mjerenje
                koliko draftova stvarno završi u backlogu. Ako većina automatiziranih
                issuea traži ručnu preradu, skill treba popraviti.
              </p>
              <p>
                AI workflow mora biti mjerljiv. Ako ne znate što je poboljšao,
                vjerojatno ste samo premjestili posao iz jednog alata u drugi.
              </p>
            </section>
          </>
        )}
      </BlogArticleLayout>
    </div>
  );
}
