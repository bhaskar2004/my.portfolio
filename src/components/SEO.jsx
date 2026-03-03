import { Helmet } from 'react-helmet-async'

/**
 * SEO Component — Optimised for entity-based ranking on "Bhaskar" / "Bhaskar T"
 *
 * Ranking strategy:
 *  1. ProfilePage schema  → tells Google this IS Bhaskar's canonical page
 *  2. Reinforced Person   → full entity graph with verified sameAs links
 *  3. WebSite + Sitelinks SearchBox
 *  4. BreadcrumbList      → crawl-path clarity
 *  5. Optional FAQ schema → captures "who is bhaskar" zero-click snippets
 *  6. Title format        → "Bhaskar T – <page>" (name always leads)
 *  7. All meta signals    → canonical, og, twitter with name-first copy
 */
const SEO = ({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    jsonLd,          // extra page-level schema passed from outside
    article,         // { publishedTime, modifiedTime }
    faq,             // [{ question, answer }] — renders FAQPage schema
    isHome = false,  // set true on the homepage only
}) => {
    /* ── Site-wide constants ────────────────────────────────────────── */
    const SITE_NAME = 'Bhaskar T'
    const SITE_URL = 'https://bhaskar.xyz'
    const TWITTER = '@bhaskar_t'
    const DEFAULT_IMG = `${SITE_URL}/logo.png`

    const DEFAULT_DESC =
        'Bhaskar T (bhaskar2004) – Software Tester and Problem Solver based in India. ' +
        'Official portfolio of Bhaskar at bhaskar.xyz. Explore projects, skills, and the tech journey of Bhaskar T.'

    const DEFAULT_KW =
        'Bhaskar, Bhaskar T, bhaskar2004, bhaskar.xyz, Bhaskar portfolio, ' +
        'Bhaskar software tester, Bhaskar India, Bhaskar developer, who is Bhaskar T'

    /* ── Derived meta values ────────────────────────────────────────── */
    // Name ALWAYS leads the title — critical for name-query ranking
    const metaTitle = title ? `${SITE_NAME} – ${title}` : SITE_NAME
    const metaDesc = description || DEFAULT_DESC
    const metaKw = keywords
        ? `Bhaskar, Bhaskar T, ${keywords}`   // name variants always prepended
        : DEFAULT_KW
    const metaImage = image
        ? image.startsWith('http') ? image : `${SITE_URL}${image}`
        : DEFAULT_IMG
    const metaUrl = url
        ? url.startsWith('http') ? url : `${SITE_URL}${url}`
        : SITE_URL

    /* ══════════════════════════════════════════════════════════════════
       SCHEMA DEFINITIONS
       Order matters — Google parses in sequence, name-bearing schemas first
    ══════════════════════════════════════════════════════════════════ */

    /**
     * 1. ProfilePage  ← NEW
     * This is the single most impactful addition.
     * Google explicitly uses ProfilePage to identify personal/portfolio sites
     * and to build Knowledge Panel candidates.
     */
    const profilePageSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        name: `${SITE_NAME} – Official Portfolio`,
        url: SITE_URL,
        description: DEFAULT_DESC,
        dateCreated: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        inLanguage: 'en',
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
        about: {
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
        },
        breadcrumb: {
            '@type': 'BreadcrumbList',
            '@id': `${SITE_URL}/#breadcrumb`,
        },
    }

    /**
     * 2. Person  — richer entity graph
     * More properties = stronger entity confidence for Google.
     * Fill in real values where marked ← UPDATE.
     */
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Bhaskar T',
        givenName: 'Bhaskar',
        familyName: 'T',
        alternateName: ['Bhaskar', 'bhaskar2004', 'Bhaskar T'],
        url: SITE_URL,
        image: {
            '@type': 'ImageObject',
            url: DEFAULT_IMG,
            width: 400,
            height: 400,
        },
        /* ── sameAs: ONLY list URLs you actually own/control ── */
        sameAs: [
            'https://github.com/bhaskar2004',        // ← UPDATE if different
            'https://linkedin.com/in/bhaskart',      // ← UPDATE to real LinkedIn
            'https://twitter.com/bhaskar_t',         // ← UPDATE to real Twitter/X
            // 'https://dev.to/bhaskar2004',          // uncomment if applicable
            // 'https://hashnode.com/@bhaskar2004',   // uncomment if applicable
        ],
        jobTitle: 'Software Tester',
        worksFor: {
            '@type': 'Organization',
            name: 'Self-employed',              // ← UPDATE if you work somewhere
        },
        nationality: {
            '@type': 'Country',
            name: 'India',
        },
        description: DEFAULT_DESC,
        knowsAbout: [
            'Software Testing',
            'Quality Assurance',
            'Problem Solving',
            'Web Development',
            'Test Automation',
        ],
        mainEntityOfPage: {
            '@type': 'ProfilePage',
            '@id': `${SITE_URL}/#profilepage`,
        },
    }

    /**
     * 3. WebSite — with Sitelinks SearchBox
     * Enables the search box that can appear beneath your result in Google.
     */
    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Bhaskar T',
        alternateName: ['Bhaskar', 'bhaskar.xyz'],
        url: SITE_URL,
        description: DEFAULT_DESC,
        inLanguage: 'en',
        author: { '@type': 'Person', '@id': `${SITE_URL}/#person` },
        copyrightHolder: { '@type': 'Person', '@id': `${SITE_URL}/#person` },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${SITE_URL}/?s={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    }

    /**
     * 4. BreadcrumbList — site hierarchy for crawlers
     */
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/#breadcrumb`,
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Bhaskar T',
                item: SITE_URL,
            },
            ...(url && metaUrl !== SITE_URL
                ? [{
                    '@type': 'ListItem',
                    position: 2,
                    name: title || 'Page',
                    item: metaUrl,
                }]
                : []),
        ],
    }

    /**
     * 5. FAQPage (optional, pass faq prop)
     * Captures zero-click snippets for "who is bhaskar", "what does bhaskar t do", etc.
     * Example usage:
     *   <SEO faq={[{ question: 'Who is Bhaskar T?', answer: 'Bhaskar T is a...' }]} />
     */
    const faqSchema = faq?.length
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map(({ question, answer }) => ({
                '@type': 'Question',
                name: question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: answer,
                },
            })),
        }
        : null

    /**
     * 6. Article schema (optional, pass article prop)
     */
    const articleSchema = article
        ? {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: metaTitle,
            description: metaDesc,
            url: metaUrl,
            image: metaImage,
            author: { '@type': 'Person', '@id': `${SITE_URL}/#person` },
            publisher: { '@type': 'Person', '@id': `${SITE_URL}/#person` },
            datePublished: article.publishedTime,
            dateModified: article.modifiedTime || article.publishedTime,
        }
        : null

    /* ══════════════════════════════════════════════════════════════════
       RENDER
    ══════════════════════════════════════════════════════════════════ */
    return (
        <Helmet>
            {/* ── Language & Charset ───────────────────────────────── */}
            <html lang="en" />
            <meta charSet="utf-8" />

            {/* ── Core meta ────────────────────────────────────────── */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDesc} />
            <meta name="keywords" content={metaKw} />
            <meta name="author" content="Bhaskar T" />

            {/* ── Crawl directives ─────────────────────────────────── */}
            <meta name="robots"
                content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow" />
            <link rel="canonical" href={metaUrl} />

            {/* ── Entity / discovery signals ───────────────────────── */}
            {/*
                These help Google associate your page with a real-world entity
                ("Bhaskar T") rather than just a keyword match.
            */}
            <meta name="subject" content="Bhaskar T – Official Software Tester Portfolio" />
            <meta name="classification" content="Portfolio, Personal" />
            <meta name="category" content="Technology" />
            <meta name="coverage" content="Worldwide" />
            <meta name="owner" content="Bhaskar T" />
            <meta name="identifier-URL" content={SITE_URL} />
            <meta name="revisit-after" content="7 days" />
            <meta name="rating" content="general" />

            {/* ── Open Graph ───────────────────────────────────────── */}
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDesc} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:image:alt" content={`${SITE_NAME} – Portfolio Preview`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Bhaskar T" />
            <meta property="og:see_also" content="https://github.com/bhaskar2004" />
            <meta property="og:see_also" content="https://linkedin.com/in/bhaskart" />
            {article && (
                <meta property="og:type" content="article" />
            )}
            {article?.publishedTime && (
                <meta property="article:published_time" content={article.publishedTime} />
            )}
            {article?.modifiedTime && (
                <meta property="article:modified_time" content={article.modifiedTime} />
            )}
            {article && (
                <meta property="article:author" content="Bhaskar T" />
            )}

            {/* ── Twitter / X ──────────────────────────────────────── */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={TWITTER} />
            <meta name="twitter:creator" content={TWITTER} />
            <meta name="twitter:url" content={metaUrl} />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDesc} />
            <meta name="twitter:image" content={metaImage} />
            <meta name="twitter:image:alt" content={`${SITE_NAME} – Portfolio Preview`} />

            {/* ── Structured Data (order: ProfilePage → Person → WebSite → …) */}
            {isHome && (
                <script type="application/ld+json">
                    {JSON.stringify(profilePageSchema)}
                </script>
            )}
            <script type="application/ld+json">
                {JSON.stringify(personSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(websiteSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>

            {faqSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            )}

            {articleSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
                </script>
            )}

            {/* Page-level custom schema passed as prop */}
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    )
}

export default SEO


/* ════════════════════════════════════════════════════════════════════════
   USAGE EXAMPLES
   ════════════════════════════════════════════════════════════════════════

   ── Homepage ────────────────────────────────────────────────────────────
   <SEO isHome />

   ── Projects page ───────────────────────────────────────────────────────
   <SEO
     title="Projects"
     description="All projects by Bhaskar T – software tester and developer."
     url="/projects"
   />

   ── Blog post ───────────────────────────────────────────────────────────
   <SEO
     title="How I approach QA testing"
     url="/blog/qa-approach"
     type="article"
     article={{
       publishedTime: '2024-06-01T00:00:00Z',
       modifiedTime:  '2024-06-15T00:00:00Z',
     }}
   />

   ── Homepage with FAQ (captures "who is bhaskar" snippet) ───────────────
   <SEO
     isHome
     faq={[
       {
         question: 'Who is Bhaskar T?',
         answer:
           'Bhaskar T (also known as bhaskar2004) is a Software Tester and ' +
           'Problem Solver based in India. He builds projects and shares his ' +
           'tech journey at bhaskar.xyz.',
       },
       {
         question: 'What does Bhaskar T do?',
         answer:
           'Bhaskar T specialises in software testing, quality assurance, ' +
           'and problem solving. He also works on web development projects.',
       },
     ]}
   />
════════════════════════════════════════════════════════════════════════ */