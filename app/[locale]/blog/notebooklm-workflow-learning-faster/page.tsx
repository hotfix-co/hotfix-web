import type { Metadata } from "next";
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

const post = getBlogPost("notebooklm-workflow-learning-faster")!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale === "en" ? "en" : "hr";
  const currentPost =
    getBlogPost("notebooklm-workflow-learning-faster", loc) ?? post;

  return generateBlogMetadata({
    post: currentPost,
    pathname: BLOG_ARTICLE_ROUTES.notebookLmWorkflow,
    locale: loc,
  });
}

export default async function NotebookLMWorkflowArticle({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(locale);
  const currentPost = getBlogPost("notebooklm-workflow-learning-faster", loc) ?? post;
  const t = await getTranslations("blog");
  const articleSchema = generateBlogPostingSchema({
    post: currentPost,
    pathname: BLOG_ARTICLE_ROUTES.notebookLmWorkflow,
    locale: loc,
    articleSection: "AI research workflow",
  });

  const ctaTitle =
    loc === "en"
      ? "Need to turn research into operational knowledge?"
      : "Trebate pretvoriti istraživanje u operativno znanje?";
  const ctaDescription =
    loc === "en"
      ? "We help teams build AI research and knowledge workflows that end up as useful documents, decisions, and reusable materials."
      : "Pomažemo timovima složiti AI research i knowledge workflowe koji završavaju korisnim dokumentima, odlukama i reusable materijalima.";

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t("breadcrumbHome"), url: getLocalizedPath(ROUTES.home, loc) },
    { name: "Blog", url: getLocalizedPath(ROUTES.blog, loc) },
    {
      name: currentPost.title,
      url: getLocalizedPath(BLOG_ARTICLE_ROUTES.notebookLmWorkflow, loc),
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
        ctaSource="blog_notebooklm_workflow"
      >
        {loc === "en" ? (
          <>
            <section className="space-y-5">
              <p className="text-[20px] leading-[1.55] text-[var(--ink-secondary)]">
                The worst way to learn a new topic is to open twenty tabs, read half of them, and hope the brain organizes the structure on its own. That usually ends with a bookmark folder you never return to.
              </p>
              <p>
                That&apos;s why for deeper topics, I use a workflow where Claude helps find and filter sources, notebooklm-py pushes them into NotebookLM, and final notes end up in Obsidian. The goal isn&apos;t to &quot;consume content faster,&quot; but to reach knowledge that can be reused faster.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                First step: define a question, not a topic
              </h2>
              <p>
                &quot;Teach me about RAG&quot; is too broad. A better question is: &quot;How do I evaluate whether RAG makes sense for an internal document base with sensitive data?&quot; A good question immediately changes the type of sources you look for, quality criteria, and final output.
              </p>
              <div className="card-feature-light">
                <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Before research, I write down</h3>
                <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                  <li>what decision I want to make after the research</li>
                  <li>which sources are reliable enough</li>
                  <li>which assumptions I need to verify</li>
                  <li>what format of notes I want at the end</li>
                </ul>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Claude does discovery, NotebookLM does synthesis
              </h2>
              <p>
                I use Claude for initial source mapping: documentation, relevant blogs, GitHub repositories, technical reports, and counterarguments. Its job isn&apos;t to write a conclusion, but to assemble a quality package of materials.
              </p>
              <p>
                Then through notebooklm-py, I create a NotebookLM notebook with curated sources. NotebookLM is useful because it ties answers to sources and handles synthesis of multiple documents well. This reduces the risk of a conclusion based on a single convincing but weak text.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Final notes must be usable
              </h2>
              <p>
                The most important part of the workflow is exporting conclusions into a format that can be used in work. If notes stay in the tool where they were created, they often get lost. That&apos;s why the final output goes to Obsidian as a short document with decisions, open questions, and links to sources.
              </p>
              <div className="card-cream-band">
                <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">My final format</h3>
                <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                  <li>short topic summary in five sentences</li>
                  <li>decision or recommendation, if the research had a clear goal</li>
                  <li>arguments for and against</li>
                  <li>risks and assumptions that still need verification</li>
                  <li>sources worth reopening</li>
                </ul>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Why this isn&apos;t just a personal productivity trick
              </h2>
              <p>
                The same pattern applies to teams that need to quickly evaluate a new technology, vendor tool, AI use case, or architectural decision. The problem isn&apos;t a lack of content. The problem is turning content into a decision the team understands and can defend.
              </p>
              <p>
                In consulting work, this kind of workflow helps prepare discovery, compare options, and document tradeoffs before the decision becomes an expensive refactor.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Conclusion
              </h2>
              <p>
                An AI research workflow is only valuable if it ends with useful knowledge. Claude, NotebookLM, and Obsidian are just tools. The real value is in the discipline: a good question, curated sources, verifiable synthesis, and notes that feed back into real decisions.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-5">
              <p className="text-[20px] leading-[1.55] text-[var(--ink-secondary)]">
                Najgori način učenja nove teme je otvoriti dvadeset tabova, pročitati
                polovicu i nadati se da će mozak sam posložiti strukturu. To obično
                završi bookmark mapom kojoj se nikad ne vratite.
              </p>
              <p>
                Zato za dublje teme koristim workflow u kojem Claude pomaže pronaći
                i filtrirati izvore, notebooklm-py ih ubacuje u NotebookLM, a završne
                bilješke završavaju u Obsidianu. Cilj nije &quot;brže konzumirati
                sadržaj&quot;, nego brže doći do znanja koje se može ponovno koristiti.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Prvi korak: definirati pitanje, ne temu
              </h2>
              <p>
                &quot;Nauči me o RAG-u&quot; je preširoko. Bolje pitanje je: &quot;Kako procijeniti
                ima li RAG smisla za internu bazu dokumenata s osjetljivim podacima?&quot;
                Dobro pitanje odmah mijenja tip izvora koje tražite, kriterije
                kvalitete i završni output.
              </p>
              <div className="card-feature-light">
                <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Prije istraživanja zapišem</h3>
                <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                  <li>koju odluku želim donijeti nakon istraživanja</li>
                  <li>koji izvori su dovoljno pouzdani</li>
                  <li>koje pretpostavke moram provjeriti</li>
                  <li>kakav format bilješki želim na kraju</li>
                </ul>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Claude radi discovery, NotebookLM radi sintezu
              </h2>
              <p>
                Claude koristim za početno mapiranje izvora: dokumentacija,
                relevantni blogovi, GitHub repozitoriji, tehnički izvještaji i
                kontraargumenti. Njegov zadatak nije napisati zaključak, nego složiti
                kvalitetan paket materijala.
              </p>
              <p>
                Zatim kroz notebooklm-py stvaram NotebookLM notebook s kuriranim
                izvorima. NotebookLM je koristan jer odgovore veže uz izvore i dobro
                radi sintezu većeg broja dokumenata. Time smanjujem rizik da se
                zaključak temelji na jednom uvjerljivom, ali slabom tekstu.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Završne bilješke moraju biti upotrebljive
              </h2>
              <p>
                Najvažniji dio workflowa je izvoz zaključaka u format koji se može
                koristiti u radu. Ako bilješke ostanu u alatu u kojem su nastale,
                često se izgube. Zato finalni output ide u Obsidian kao kratki
                dokument s odlukama, otvorenim pitanjima i linkovima na izvore.
              </p>
              <div className="card-cream-band">
                <h3 className="mb-3 text-[20px] font-bold text-[var(--ink)]">Moj završni format</h3>
                <ul className="list-inside list-disc space-y-2 text-[15px] text-[var(--ink-mute)]">
                  <li>kratki sažetak teme u pet rečenica</li>
                  <li>odluka ili preporuka, ako je istraživanje imalo jasan cilj</li>
                  <li>argumenti za i protiv</li>
                  <li>rizici i pretpostavke koje još treba provjeriti</li>
                  <li>izvori koje vrijedi ponovno otvoriti</li>
                </ul>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Zašto ovo nije samo osobni productivity trik
              </h2>
              <p>
                Isti obrazac vrijedi za timove koji moraju brzo procijeniti novu
                tehnologiju, vendor alat, AI use case ili arhitekturnu odluku.
                Problem nije nedostatak sadržaja. Problem je pretvaranje sadržaja u
                odluku koju tim razumije i može braniti.
              </p>
              <p>
                U consulting radu ovakav workflow pomaže pripremiti discovery,
                usporediti opcije i dokumentirati tradeoffe prije nego što odluka
                postane skupi refaktor.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Zaključak
              </h2>
              <p>
                AI research workflow vrijedi samo ako završava korisnim znanjem.
                Claude, NotebookLM i Obsidian su samo alati. Prava vrijednost je u
                disciplini: dobro pitanje, kurirani izvori, provjerljiva sinteza i
                bilješke koje se vraćaju u stvarne odluke.
              </p>
            </section>
          </>
        )}
      </BlogArticleLayout>
    </div>
  );
}
