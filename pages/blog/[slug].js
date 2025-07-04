import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import BlogPost from '../../components/BlogPost';

export async function getStaticPaths() {
  const blogDir = path.join(process.cwd(), 'blog');
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  const paths = files.map(filename => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const blogDir = path.join(process.cwd(), 'blog');
    const filePath = path.join(blogDir, `${params.slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const html = marked(content);
    
    // Get all blog posts for related posts
    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
    const relatedPosts = files
      .filter(filename => filename !== `${params.slug}.md`)
      .slice(0, 3)
      .map(filename => {
        const filePath = path.join(blogDir, filename);
        const { data } = matter(fs.readFileSync(filePath, 'utf-8'));
        return {
          slug: filename.replace(/\.md$/, ''),
          title: data.title || '',
          date: data.date || '',
          excerpt: data.excerpt || '',
          category: data.category || '',
          cover: data.cover || ''
        };
      });

    const post = {
      slug: params.slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      category: data.category || '',
      cover: data.cover || '',
      author: data.author || '',
      tags: data.tags || [],
      content: content,
      html: html
    };

    return { 
      props: { 
        post,
        relatedPosts
      }
    };
  } catch (error) {
    console.error(`Error processing blog post: ${error.message}`);
    return {
      notFound: true
    };
  }
}

export default function BlogPostPage({ post, relatedPosts }) {
  if (!post) {
    return null;
  }

  return (
    <BlogPost
      post={post}
      relatedPosts={relatedPosts}
    />
  );
}