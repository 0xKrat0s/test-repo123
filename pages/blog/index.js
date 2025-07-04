import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { motion } from 'framer-motion';
import NavigationBar from '../../components/NavigationBar';

export async function getStaticProps() {
  const blogDir = path.join(process.cwd(), 'blog');
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  const posts = files.map(filename => {
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return {
      slug: filename.replace(/\.md$/, ''),
      ...data,
    };
  });
  return { props: { posts } };
}

export default function BlogList({ posts }) {
  return (
    <>
      <Head>
        <title>Muhsin Bin Irshad</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <NavigationBar />
      
      {/* Premium header section */}
      <section className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Blog
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Insights, tutorials, and thoughts on cybersecurity
          </motion.p>
        </div>
      </section>

      {/* Enhanced search and filters */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full sm:max-w-xs group">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-white bg-white/5 backdrop-blur-sm placeholder-gray-400 group-hover:bg-white/10"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 via-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:via-primary-500/10 group-hover:to-primary-500/5 transition-all duration-300 pointer-events-none"></div>
            </div>
            <select className="w-full sm:w-auto px-4 py-3 rounded-xl border border-white/10 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none bg-white/5 backdrop-blur-sm text-white min-w-[120px] hover:bg-white/10 transition-all">
              <option>All Years</option>
              <option>2024</option>
              <option>2023</option>
            </select>
            <select className="w-full sm:w-auto px-4 py-3 rounded-xl border border-white/10 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none bg-white/5 backdrop-blur-sm text-white min-w-[120px] hover:bg-white/10 transition-all">
              <option>All</option>
              <option>Company</option>
              <option>Technical</option>
            </select>
          </motion.div>
        </div>
      </section>

      {/* Premium blog posts grid */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                className="group relative"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-primary-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                
                <Link href={`/blog/${post.slug}`} className="block relative">
                  <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:shadow-primary-500/20 transition-all duration-500 min-h-[220px] h-[420px] flex flex-col overflow-hidden group-hover:border-white/20">
                    {/* Image container with enhanced styling */}
                    <div className="relative w-full h-48 overflow-hidden">
                      {post.cover ? (
                        <>
                          <Image
                            src={post.cover}
                          alt={post.title}
                            fill
                            className="object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700"
                            unoptimized
                            style={{ objectPosition: 'center' }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl" />
                          {/* Premium date badge */}
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                            {post.date || 'May 16, 2023'}
                          </div>
                          {/* Reading time badge */}
                          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
                            5 min read
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center rounded-2xl">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-primary-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-primary-500/30">
                            <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Enhanced content section */}
                    <div className="flex flex-col flex-1 p-7 gap-4 overflow-hidden">
                      {/* Category tag */}
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-primary-500/20 text-primary-400 text-xs font-semibold rounded-full border border-primary-500/30">
                          {post.category || 'Technical'}
                        </span>
                      </div>

                      {/* Title with enhanced typography */}
                      <h2 className="text-2xl font-black text-white mb-3 leading-tight group-hover:text-primary-400 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Enhanced excerpt */}
                      <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-3 overflow-hidden font-medium">
                        {post.excerpt || 'Explore cutting-edge cybersecurity insights, practical tutorials, and industry best practices. Discover how modern security approaches can protect your digital assets and stay ahead of emerging threats.'}
                      </p>

                      {/* Premium read more section */}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>Read more</span>
                        </div>
                        
                        {/* Enhanced arrow button */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500/20 to-primary-600/20 border border-primary-500/30 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-primary-600 group-hover:border-primary-400 group-hover:shadow-lg group-hover:shadow-primary-500/25">
                          <svg className="w-5 h-5 text-primary-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}