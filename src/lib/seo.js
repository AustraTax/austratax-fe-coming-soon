export function getMeta({
  title,
  description,
  keywords = "",
  url = "",
  image = "",
}) {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
