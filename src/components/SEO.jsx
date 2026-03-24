import { Helmet } from 'react-helmet-async'

const SEO = ({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    jsonLd,
    article,
    faq,
    isHome = false,
}) => {
    /* ── Site-wide constants ── */
    const SITE_NAME = 'Bhaskar T'
    const SITE_URL = 'https://bhaskar.xyz'
    const DEFAULT_IMG = `${SITE_URL}/logo.png`

    const DEFAULT_DESC =
        'Bhaskar T (bhaskar2004) – Software Tester and Problem Solver based in India. ' +
        'Official portfolio of Bhaskar at bhaskar.xyz. Explore projects, skills, and the tech journey of Bhaskar T.'

    const DEFAULT_KW =
        'Bhaskar, Bhaskar T, bhaskar2004, bhaskar.xyz, Bhaskar portfolio, ' +
        'Bhaskar software tester, Bhaskar India, Bhaskar developer, who is Bhaskar T'

    /* ── Derived meta values ── */
    const metaTitle = title ? `${SITE_NAME} – ${title}` : SITE_NAME
    const metaDesc = description || DEFAULT_DESC
    const metaKw = keywords ? `Bhaskar, Bhaskar T, ${keywords}` : DEFAULT_KW
    const metaImage = image
        ? image.startsWith('http') ? image : `${SITE_URL}${image}`
        : DEFAULT_IMG
    const metaUrl = url
        ? url.startsWith('http') ? url : `${SITE_URL}${url}`
        : SITE_URL

    /* ── 1. ProfilePage ── */
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
        about: { '@type': 'Person', '@id': `${SITE_URL}/#person` },
        breadcrumb: { '@type': 'BreadcrumbList', '@id': `${SITE_URL}/#breadcrumb` },
    }

    /* ── 2. Person ── */
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
        sameAs: [
            'https://github.com/bhaskar2004',
            'https://www.linkedin.com/in/bhaskart2004/',
        ],
        jobTitle: 'Software Tester',
        worksFor: { '@type': 'Organization', name: 'Self-employed' },
        nationality: { '@type': 'Country', name: 'India' },
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

    /* ── 3. WebSite ── */
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

    /* ── 4. BreadcrumbList ── */
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/#breadcrumb`,
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Bhaskar T', item: SITE_URL },
            ...(url && metaUrl !== SITE_URL
                ? [{ '@type': 'ListItem', position: 2, name: title || 'Page', item: metaUrl }]
                : []),
        ],
    }

    /* ── 5. FAQPage (optional) ── */
    const faqSchema = faq?.length
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map(({ question, answer }) => ({
                '@type': 'Question',
                name: question,
                acceptedAnswer: { '@type': 'Answer', text: answer },
            })),
        }
        : null

    /* ── 6. Article (optional) ── */
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

    return (
        <Helmet>
            {/* ── Core ── */}
            <html lang="en" />
            <meta charSet="utf-8" />
            <title>{metaTitle}</title>
            <meta name="description" content={metaDesc} />
            <meta name="keywords" content={metaKw} />
            <meta name="author" content="Bhaskar T" />

            {/* ── Crawl ── */}
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow" />
            <link rel="canonical" href={metaUrl} />

            {/* ── Entity signals ── */}
            <meta name="subject" content="Bhaskar T – Official Software Tester Portfolio" />
            <meta name="classification" content="Portfolio, Personal" />
            <meta name="category" content="Technology" />
            <meta name="coverage" content="Worldwide" />
            <meta name="owner" content="Bhaskar T" />
            <meta name="identifier-URL" content={SITE_URL} />
            <meta name="revisit-after" content="7 days" />
            <meta name="rating" content="general" />

            {/* ── Open Graph ── */}
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
            <meta property="og:see_also" content="https://www.linkedin.com/in/bhaskart2004/" />
            {article?.publishedTime && (
                <meta property="article:published_time" content={article.publishedTime} />
            )}
            {article?.modifiedTime && (
                <meta property="article:modified_time" content={article.modifiedTime} />
            )}
            {article && (
                <meta property="article:author" content="Bhaskar T" />
            )}

            {/* ── Twitter / X ── */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={metaUrl} />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDesc} />
            <meta name="twitter:image" content={metaImage} />
            <meta name="twitter:image:alt" content={`${SITE_NAME} – Portfolio Preview`} />

            {/* ── Structured Data ── */}
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
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    )
}

export default SEO