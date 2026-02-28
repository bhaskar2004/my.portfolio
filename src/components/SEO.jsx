import { Helmet } from 'react-helmet-async'

const SEO = ({ title, description, keywords, image, url, type = 'website', jsonLd, article }) => {
    const siteTitle = 'Bhaskar'
    const defaultDescription =
        'Bhaskar T – Software Tester and Problem Solver based in India. Explore projects, portfolio, skills, and tech journey at bhaskar.xyz.'
    const defaultKeywords =
        'Bhaskar, Bhaskar T, bhaskar2004, Bhaskar portfolio, Bhaskar software tester, bhaskar.xyz, Bhaskar developer'
    const siteUrl = 'https://bhaskar.xyz'
    const defaultImage = `${siteUrl}/logo.png`
    const twitterHandle = '@bhaskar_t'

    const metaTitle = title ? `Bhaskar | ${title}` : siteTitle
    const metaDescription = description || defaultDescription
    const metaKeywords = keywords || defaultKeywords
    const metaImage = image
        ? image.startsWith('http') ? image : `${siteUrl}${image}`
        : defaultImage
    const metaUrl = url
        ? url.startsWith('http') ? url : `${siteUrl}${url}`
        : siteUrl

    /* ── Default Person schema injected on every page ────────────────── */
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Bhaskar T',
        alternateName: ['Bhaskar', 'bhaskar2004'],
        url: siteUrl,
        image: defaultImage,
        sameAs: [
            'https://github.com/bhaskar2004',          // ← update to real URLs
            'https://linkedin.com/in/bhaskart',
            'https://twitter.com/bhaskar_t',
        ],
        jobTitle: 'Software Tester',
        description: defaultDescription,
        knowsAbout: ['Software Testing', 'QA', 'Problem Solving', 'Web Development'],
    }

    /* ── Default WebSite schema with SearchAction ─────────────────────── */
    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Bhaskar',
        alternateName: 'Bhaskar.xyz',
        url: siteUrl,
        description: defaultDescription,
        author: { '@type': 'Person', name: 'Bhaskar T' },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteUrl}/?s={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    }

    /* ── BreadcrumbList – helps Google understand site hierarchy ──────── */
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: siteUrl,
            },
            ...(url && url !== siteUrl
                ? [{ '@type': 'ListItem', position: 2, name: title || 'Page', item: metaUrl }]
                : []),
        ],
    }

    return (
        <Helmet>
            {/* ── Core ───────────────────────────────────────────────── */}
            <html lang="en" />
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <meta name="author" content="Bhaskar T" />
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow" />
            <link rel="canonical" href={metaUrl} />

            {/* ── Identity / discovery signals ───────────────────────── */}
            <meta name="subject" content="Bhaskar T – Software Tester Portfolio" />
            <meta name="classification" content="Portfolio" />
            <meta name="category" content="Technology" />
            <meta name="coverage" content="Worldwide" />
            <meta name="revisit-after" content="7 days" />
            <meta name="rating" content="general" />

            {/* ── Open Graph ─────────────────────────────────────────── */}
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:image:alt" content={`${metaTitle} preview`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Bhaskar.xyz" />
            {article && <meta property="article:author" content="Bhaskar T" />}
            {article?.publishedTime && (
                <meta property="article:published_time" content={article.publishedTime} />
            )}
            {article?.modifiedTime && (
                <meta property="article:modified_time" content={article.modifiedTime} />
            )}

            {/* ── Twitter / X ────────────────────────────────────────── */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={twitterHandle} />
            <meta name="twitter:creator" content={twitterHandle} />
            <meta name="twitter:url" content={metaUrl} />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
            <meta name="twitter:image:alt" content={`${metaTitle} preview`} />

            {/* ── Structured Data ────────────────────────────────────── */}
            <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>

            {/* Page-level custom schema passed as prop */}
            {jsonLd && (
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            )}
        </Helmet>
    )
}

export default SEO