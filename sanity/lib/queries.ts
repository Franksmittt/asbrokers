export const insightsListQuery = `
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    locale,
    publishedAt,
    excerpt
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
