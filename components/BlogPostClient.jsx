'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link as LinkIcon,
  Clock,
  Calendar,
  ArrowLeft,
  Share2,
  BookOpen,
  Tag,
  Eye,
  Heart,
  MessageCircle
} from 'lucide-react';
import styles from '../styles/BlogPost.module.css';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function BlogPostClient({ post, relatedPosts = [], breadcrumbJsonLd, blogPostingJsonLd }) {
  const [isTableOfContentsVisible, setIsTableOfContentsVisible] = useState(false);
  const [activeHeading, setActiveHeading] = useState('');
  const [readingTime, setReadingTime] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Calculate reading time
  useEffect(() => {
    if (post?.contentHtml) {
      // Strip HTML tags and count words
      const textContent = post.contentHtml.replace(/<[^>]*>/g, '');
      const wordCount = textContent.split(/\s+/).length;
      const wordsPerMinute = 200;
      setReadingTime(Math.ceil(wordCount / wordsPerMinute));
    }
  }, [post?.contentHtml]);

  // Extract headings for table of contents
  const headings = useMemo(() => {
    return post?.contentHtml
      ? post.contentHtml.match(/<h([2-6])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-6]>/g)?.map(heading => {
          const match = heading.match(/<h([2-6])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-6]>/);
          if (match) {
            const level = parseInt(match[1]);
            const id = match[2];
            const text = match[3].replace(/<[^>]*>/g, '');
            return { level, text, id };
          }
          return null;
        }).filter(Boolean) || []
      : [];
  }, [post?.contentHtml]);

  // Intersection Observer for active heading
  useEffect(() => {
    if (typeof window === 'undefined' || !headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Add IDs to headings in content
  const processedContent = post?.content
    ? post.content.replace(/^(#{1,3})\s+(.+)$/gm, (match, hashes, text) => {
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return `${hashes} <span id="${id}">${text}</span>`;
      })
    : '';

  // Use HTML content if available, otherwise fall back to processed markdown
  const displayContent = post?.contentHtml || processedContent;

  // Share functionality
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post?.title || '';

  const shareData = {
    title: shareTitle,
    text: post?.excerpt || '',
    url: shareUrl,
  };

  const handleShare = async (platform) => {
    try {
      switch (platform) {
        case 'native':
          if (navigator.share) {
            await navigator.share(shareData);
          } else {
            setShowShareMenu(true);
          }
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
          break;
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
          break;
        case 'copy':
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          break;
        default:
          break;
      }
      setShowShareMenu(false);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <main className={`min-h-screen bg-white text-black font-sans overflow-x-hidden relative ${styles.prose}`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: blogPostingJsonLd }}
      />
      {/* Brand Gradient/Glassy Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-1/2 w-[200vw] h-[200vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600/10 via-blue-400/5 to-transparent rounded-full blur-3xl opacity-50" />
        {/* Glassy floating circle */}
        <div className="absolute -left-20 top-40 w-60 h-60 bg-white/10 rounded-full blur-2xl opacity-60 animate-float pointer-events-none" />
      </div>
      
      <div className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="pt-24 pb-16"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back to Blog */}
            <motion.div variants={itemVariants} className="mb-8">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors group text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Blog</span>
              </Link>
            </motion.div>

            {/* Article Header */}
            <motion.article variants={itemVariants} className="mb-12">
              {/* Category Badge */}
              {post?.category && (
                <motion.div 
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6"
                >
                  <Tag className="w-3 h-3 text-blue-600" />
                  <span className="text-blue-600 text-xs font-semibold uppercase tracking-wide">{post.category}</span>
                </motion.div>
              )}

              {/* Title */}
              <motion.h1 
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tight"
              >
                {post?.title || 'Blog Post'}
              </motion.h1>

              {/* Meta Information */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post?.date ? format(new Date(post.date), 'MMM d, yyyy') : 'No date'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{post?.contentHtml ? post.contentHtml.replace(/<[^>]*>/g, '').split(/\s+/).length : 0} words</span>
                </div>
              </motion.div>

              {/* Cover Image */}
              {post?.cover && (
                <motion.div 
                  variants={itemVariants}
                  className="relative w-full h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden mb-12 shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
                >
                  {post.cover.startsWith('http') ? (
                    <Image
                      src={post.cover}
                      alt={post?.title || 'Blog Post'}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <Image
                      src={post.cover.startsWith('/') ? post.cover : `/images/blog/${post.cover}`}
                      alt={post?.title || 'Blog Post'}
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </motion.div>
              )}

              {/* Social Actions */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-between mb-12 pb-8 border-b border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      isLiked 
                        ? 'bg-red-50 text-red-600 border border-red-200' 
                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">Like</span>
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 border border-gray-200 rounded-full hover:bg-gray-100 transition-all">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Comment</span>
                  </button>
                </div>

                <div className="relative">
                  <button
                    onClick={() => handleShare('native')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 border border-gray-200 rounded-full hover:bg-gray-100 transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Share</span>
                  </button>

                  {/* Share Menu */}
                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-3 z-50"
                      >
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleShare('facebook')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                            title="Share on Facebook"
                          >
                            <Facebook className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleShare('twitter')}
                            className="p-2 text-blue-400 hover:bg-blue-50 rounded-xl transition-colors"
                            title="Share on Twitter"
                          >
                            <Twitter className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleShare('linkedin')}
                            className="p-2 text-blue-700 hover:bg-blue-50 rounded-xl transition-colors"
                            title="Share on LinkedIn"
                          >
                            <Linkedin className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleShare('copy')}
                            className={`p-2 rounded-xl transition-colors ${
                              copied 
                                ? 'text-green-600 bg-green-50' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                            title={copied ? 'Copied!' : 'Copy link'}
                          >
                            <LinkIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.article>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Table of Contents */}
              {headings.length > 0 && (
                <motion.div 
                  variants={itemVariants}
                  className="lg:col-span-1 order-2 lg:order-1"
                >
                  <div className="sticky top-32">
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h3>
                      <nav className="space-y-3">
                        {headings.map((heading, index) => (
                          <a
                            key={index}
                            href={`#${heading.id}`}
                            className={`block text-sm transition-colors ${
                              activeHeading === heading.id
                                ? 'text-blue-600 font-semibold'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                            style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}
                          >
                            {heading.text}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Article Content */}
              <motion.div 
                variants={itemVariants}
                className={`order-1 ${headings.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'}`}
              >
                <div className="prose prose-lg max-w-none">
                  {displayContent ? (
                    <div 
                      className="text-gray-800 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: displayContent }}
                    />
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-500">Content not available</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <motion.section 
                variants={itemVariants}
                className="mt-20"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.slice(0, 3).map((relatedPost, index) => (
                    <motion.div
                      key={relatedPost.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <Link href={`/blog/${relatedPost.slug}`} className="block h-full">
                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden h-full transform transition-all duration-300 hover:border-blue-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                          {/* Image */}
                          <div className="relative h-48 w-full overflow-hidden">
                            {relatedPost.cover ? (
                              relatedPost.cover.startsWith('http') ? (
                                <Image
                                  src={relatedPost.cover}
                                  alt={relatedPost.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                  unoptimized
                                />
                              ) : (
                                <Image
                                  src={relatedPost.cover.startsWith('/') ? relatedPost.cover : `/images/blog/${relatedPost.cover}`}
                                  alt={relatedPost.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              )
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                                <svg className="w-12 h-12 text-blue-400/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            
                            {/* Date Badge */}
                            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 px-3 py-1.5 rounded-full">
                              {relatedPost.date && format(new Date(relatedPost.date), 'MMM d, yyyy')}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {relatedPost.excerpt}
                            </p>
                            <div className="flex justify-end">
                              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                                <svg className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}