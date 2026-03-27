import { Helmet } from 'react-helmet-async'

const SEO = ({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    jsonLd,
}) => {
    const SITE_NAME = 'Bhaskar T'
    const SITE_URL = 'https://bhaskar.xyz'
    const DEFAULT_IMG = `${SITE_URL}/logo.png`

    const DEFAULT_DESC =
        'Bhaskar T — Professional Software Tester & Quality Assurance expert. ' +
        'Exploring test automation, bug hunting, and building reliable software. View my portfolio.'

    const DEFAULT_KW =
        'Software Tester, QA Engineer, Bhaskar T, bhaskar2004, Test Automation, India'

    /* ── Derived meta values ── */
    const metaTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Software Tester Portfolio`
    const metaDesc = description || DEFAULT_DESC
    const metaKw = keywords ? `${keywords}, ${DEFAULT_KW}` : DEFAULT_KW
    const metaImage = image
        ? image.startsWith('http') ? image : `${SITE_URL}${image}`
        : DEFAULT_IMG
    const metaUrl = url
        ? url.startsWith('http') ? url : `${SITE_URL}${url}`
        : SITE_URL

    /* ── Consolidated Schema ── */
    const schema = [
        {
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
            name: 'Bhaskar T',
            url: SITE_URL,
            jobTitle: 'Software Tester',
            sameAs: [
                'https://github.com/bhaskar2004',
                'https://www.linkedin.com/in/bhaskart2004/',
            ],
            description: DEFAULT_DESC,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: 'Bhaskar T',
            url: SITE_URL,
            description: DEFAULT_DESC,
            publisher: { '@id': `${SITE_URL}/#person` },
        }
    ]

    return (
        <Helmet>
            <html lang="en" />
            <meta charSet="utf-8" />
            <title>{metaTitle}</title>
            <meta name="description" content={metaDesc} />
            <meta name="keywords" content={metaKw} />
            
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={metaUrl} />

            {/* OG Tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDesc} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDesc} />
            <meta name="twitter:image" content={metaImage} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    )
}

export default SEO