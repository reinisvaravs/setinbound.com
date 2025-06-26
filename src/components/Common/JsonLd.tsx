export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SetInbound",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://setinbound.com",
    },
    description:
      "Transform your sales with AI-powered voice agents that qualify leads, schedule appointments, and educate customers 24/7. Scale your business while reducing operational costs.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "John Smith",
        },
        datePublished: "2024-01-15",
        reviewBody:
          "SetInbound has transformed our sales process. The AI agent handles initial customer interactions perfectly.",
      },
    ],
    featureList: [
      "AI-powered voice agents",
      "24/7 lead qualification",
      "Automated appointment scheduling",
      "Customer education",
      "Multi-language support",
    ],
    permissions: "Requires internet connection",
    releaseNotes:
      "Latest version includes enhanced AI capabilities and improved scheduling features",
    browserRequirements: "Works with all modern browsers",
    softwareRequirements: "No installation required, cloud-based solution",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
