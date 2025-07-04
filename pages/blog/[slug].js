import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import styles from '../../styles/blog.module.css';

export async function getStaticPaths() {
  const blogDir = path.join(process.cwd(), 'blog');
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  const paths = files.map(filename => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const blogDir = path.join(process.cwd(), 'blog');
  const filePath = path.join(blogDir, `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const html = marked(content);
  
  // Get all blog posts for related posts
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  const allPosts = files.map(filename => {
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      category: data.category || null,
      cover: data.cover || null
    };
  });
  
  // Get related posts (excluding current post)
  const relatedPosts = allPosts
    .filter(post => post.slug !== params.slug)
    .slice(0, 3);
  
  return { 
    props: { 
      post: {
        slug: params.slug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        category: data.category || null,
        cover: data.cover || null,
        content: content,
        contentHtml: html
      },
      relatedPosts
    } 
  };
}

export default function BlogPost({ post, relatedPosts = [] }) {
  // Calculate reading time
  const wordCount = post?.contentHtml ? post.contentHtml.replace(/<[^>]*>/g, '').split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <NavigationBar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Blog */}
          <div className="mb-8">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group text-sm font-medium"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Blog</span>
            </Link>
          </div>

          {/* Article Header */}
          <article className="mb-12">
            {/* Category Badge */}
            {post?.category && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/20 border border-blue-700/50 mb-6">
                <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-blue-400 text-xs font-semibold uppercase tracking-wide">{post.category}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
              {post?.title || 'Blog Post'}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{post?.date ? format(new Date(post.date), 'MMM d, yyyy') : 'No date'}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>{wordCount} words</span>
              </div>
            </div>

            {/* Cover Image */}
            {post?.cover && (
              <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden mb-12 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
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
              </div>
            )}
          </article>

          {/* Main Content */}
          <div className={`prose prose-lg max-w-none prose-invert ${styles.prose}`}>
            {post?.contentHtml ? (
              <div 
                className="text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-400">Content not available</p>
              </div>
            )}
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-bold text-white mb-8">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.slice(0, 3).map((relatedPost, index) => (
                  <div key={relatedPost.slug} className="group">
                    <Link href={`/blog/${relatedPost.slug}`} className="block h-full">
                      <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden h-full transform transition-all duration-300 hover:border-blue-500 hover:shadow-[0_8px_30px_rgba(59,130,246,0.3)]">
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
                          <div className="absolute bottom-3 left-3 bg-gray-800/90 backdrop-blur-sm text-xs font-semibold text-gray-200 px-3 py-1.5 rounded-full">
                            {relatedPost.date && format(new Date(relatedPost.date), 'MMM d, yyyy')}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-lg font-bold mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex justify-end">
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                              <svg className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
      </div>
      </main>

      <Footer />
    </div>
  );
}