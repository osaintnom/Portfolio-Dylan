/**
 * Central site config. Edit one place to change name, tagline, or contact info.
 */
export const site = {
  name: "Dylan Sbrizza",
  tagline: "Photography Portfolio",
  // Short positioning line shown under the tagline.
  positioning:
    "Commercial photography — automotive, product & studio work.",
  // Replace with the real contact email before deploy.
  // This value is rendered as a mailto: link only — never used to send mail server-side.
  email: "hello@dylansbrizza.com",
  location: "Available for commissions",
  // Optional social links — leave empty strings to hide them in the contact section.
  socials: {
    instagram: "",
    behance: ""
  }
} as const;
