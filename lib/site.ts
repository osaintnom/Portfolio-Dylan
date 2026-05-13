/**
 * Central site config. Edit one place to change name, tagline, or contact info.
 */
export const site = {
  name: "Dylan Sbrizza",
  tagline: "Photography Portfolio",
  // Short positioning line shown under the tagline.
  positioning:
    "Commercial photography — automobiles, product & studio work.",
  // Rendered as a mailto: link only — never used to send mail server-side.
  email: "dylansbrizza09@gmail.com",
  // Rendered as a tel: link only — never used server-side.
  // Display form (formatted) and dial form (E.164-style, digits only) kept separate.
  phoneDisplay: "(786) 778-8160",
  phoneDial: "+17867788160",
  location: "Miami",
  // Optional social links — leave empty strings to hide them in the contact section.
  socials: {
    instagram: "",
    behance: ""
  }
} as const;
