import { Helmet } from 'react-helmet-async'

const SEO = ({ title, description, keywords, image, url, type = 'website', jsonLd }) => {
    const siteTitle = 'Bhaskar T | Front-End Developer & Problem Solver'
    const defaultDescription = 'Front-End Developer and Problem Solver. Explore my projects, portfolio, skills, and tech journey at bhaskar.xyz.'
    const defaultKeywords = 'Bhaskar, Bhaskar T, bhaskar2004, Bhaskar portfolio, Bhaskar developer, Front-End Developer, Web Developer, React, Computer Science Student, SJCIT'
    const siteUrl = 'https://bhaskar.xyz'
    const defaultImage = `${siteUrl}/logo.png`

    const metaTitle = title ? `${title} | Bhaskar T` : siteTitle
    const metaDescription = description || defaultDescription
    const metaKeywords = keywords || defaultKeywords
    const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage
    const metaUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl

    return (
        <Helmet>
            {/* Standard Meta Types */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <meta name="author" content="Bhaskar T" />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:site_name" content="Bhaskar.xyz" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@bhaskar_t" />
            <meta name="twitter:url" content={metaUrl} />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* Structured Data */}
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    )
}

export default SEO
