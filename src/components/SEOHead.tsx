import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  ogImage?: string;
  ogUrl?: string;
  jsonLd?: object;
}

const SEOHead = ({ title, description, ogImage, ogUrl, jsonLd }: SEOHeadProps) => {
  const fullTitle = `${title} — VEXALED`;
  const defaultOgImage = '/og-image.png';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage ?? defaultOgImage} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage ?? defaultOgImage} />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
