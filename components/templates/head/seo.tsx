import Head from "next/head";

interface SeoProps {
  content?: {
    data?: {
      pageTitle?: string;
      description?: string;
      shareImage?: {
        url: string;
      };
      article?: boolean;
    };
  };
}

export default function Seo({ content }: SeoProps) {
  const { data = {} } = { ...content };
  const shareImage = data?.shareImage?.url;

  return (
    <>
      {data && (
        <Head>
          {data.pageTitle && (
            <>
              <title>{data.pageTitle}</title>
              <meta property="og:title" content={data.pageTitle} />
              <meta name="twitter:title" content={data.pageTitle} />
            </>
          )}
          {data.description && (
            <>
              <meta name="description" content={data.description} />
              <meta
                property="og:description"
                content={data.description}
              />
              <meta
                name="twitter:description"
                content={data.description}
              />
            </>
          )}
          {data.shareImage && (
            <>
              <meta property="og:image" content={shareImage} />
              <meta name="twitter:image" content={shareImage} />
              <meta name="image" content={shareImage} />
            </>
          )}
          {data.article && <meta property="og:type" content="article" />}
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
      )}
    </>
  );
}
