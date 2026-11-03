/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/vs", destination: "/torneo", permanent: true }];
  },
};
export default nextConfig;
