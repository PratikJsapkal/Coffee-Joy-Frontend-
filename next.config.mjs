/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 80],
    domains: ['res.cloudinary.com',
               'cdns.barecms.com'
    ],
  },
};

export default nextConfig;
