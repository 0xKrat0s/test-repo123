import BlogPostClient from './BlogPostClient';

export default function BlogPost({ post, relatedPosts, breadcrumbJsonLd, blogPostingJsonLd }) {
  return (
    <BlogPostClient 
      post={post}
      relatedPosts={relatedPosts}
      breadcrumbJsonLd={breadcrumbJsonLd}
      blogPostingJsonLd={blogPostingJsonLd}
    />
  );
}
