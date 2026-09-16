export function getResultItems(result) {
  return [
    {
      id: "original-url",
      label: "Original URL",
      value: result.original_url,
      href: result.original_url,
    },
    {
      id: "short-url-link",
      label: "Short URL Link",
      value: result.shortUrlLink,
      href: result.shortUrlLink,
    },
    {
      id: "short-url",
      label: "Short URL",
      value: result.short_url,
      href: result.short_url,
    },
    {
      id: "created-date",
      label: "Created Date",
      value: result.createdDate,
    },
  ];
}
