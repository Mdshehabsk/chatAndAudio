/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'], //Domain of image host
  },
}

module.exports = nextConfig
