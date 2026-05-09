export const insightsListQuery = `
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    locale,
    publishedAt,
    excerpt,
    "thumbnailUrl": seo.openGraphImage.asset->url
  }
`;

/** Sitemap: exclude Sanity articles flagged noIndex in CMS. */
export const insightArticlesSitemapQuery = `
  *[_type == "article" && seo.noIndex != true] | order(publishedAt desc) {
    "slug": slug.current,
    locale,
    publishedAt,
    "sanityUpdatedAt": _updatedAt
  }
`;

export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug && locale == $locale][0] {
    _id,
    title,
    "slug": slug.current,
    locale,
    publishedAt,
    excerpt,
    body[] {
      ...,
      _type == "fspDisclosure" => {
        ...,
        "fsp": fspEntity-> {
          _id,
          name,
          fspNumber,
          disclaimerText
        }
      }
    },
    seo
  }
`;

/** Studio safeguard: prevent duplicate slug+locale between Sanity and studio posts. */
export const insightSlugExistsQuery = `
  *[_type == "article" && slug.current == $slug && locale == $locale][0] {
    _id
  }
`;
