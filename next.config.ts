/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }, // Wichtig für statischen Export auf vielen Hosts
};
export default nextConfig;