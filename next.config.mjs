/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // All photos live in /public/photos and are served locally — no remote
    // hosts are whitelisted. If you ever load an external CDN, add it here:
    //   remotePatterns: [{ protocol: "https", hostname: "your-cdn.com" }]
    remotePatterns: []
  },
  // Security headers — sensible defaults for a static portfolio.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      }
    ];
  }
};

export default nextConfig;
