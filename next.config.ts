/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // Creates /about/index.html instead of /about.html - better for Apache
  images: { unoptimized: true }, // Important for static export on most hosts
};
export default nextConfig;