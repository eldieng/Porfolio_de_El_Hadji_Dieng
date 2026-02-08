import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaTags, FaArrowLeft, FaLinkedin, FaFacebook, FaTwitter, FaUser } from 'react-icons/fa';
import { getBlogPostBySlug, getRecentBlogPosts } from '../data/blogData';
import SEOHelmet from '../utils/SEOHelmet';
import ReactGA from 'react-ga4';

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getBlogPostBySlug(slug);
  const recentPosts = getRecentBlogPosts(3).filter(p => p.slug !== slug);
  
  useEffect(() => {
    // Remonter en haut de la page
    window.scrollTo(0, 0);
    
    // Si l'article n'existe pas, rediriger vers la page blog
    if (!post) {
      navigate('/blog');
      return;
    }
    
    // Enregistrer la vue de l'article dans Google Analytics
    ReactGA.event({
      category: 'Blog',
      action: 'View Post',
      label: post.title
    });
  }, [post, navigate, slug]);
  
  if (!post) return null;
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  // Générer le schéma JSON-LD pour l'article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'image': `https://www.elhadji-dieng.com${post.image}`,
    'datePublished': post.date,
    'dateModified': post.date,
    'author': {
      '@type': 'Person',
      'name': 'El Hadji Dieng'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'El Hadji Dieng',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.elhadji-dieng.com/assets/images/logo.png'
      }
    },
    'description': post.excerpt
  };
  
  const shareUrl = `https://www.elhadji-dieng.com/blog/${post.slug}`;
  const shareTitle = post.title;

  return (
    <>
      <SEOHelmet
        title={`${post.title} | Blog d'El Hadji Dieng`}
        description={post.excerpt}
        canonicalUrl={`/blog/${post.slug}`}
        schema={articleSchema}
        ogImage={post.image}
      />
      
      <HeroSection bgImage={post.image}>
        <HeroOverlay />
        <HeroContent>
          <PostCategory>{post.category}</PostCategory>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {post.title}
          </motion.h1>
          <PostMeta>
            <MetaItem>
              <FaCalendarAlt /> {formatDate(post.date)}
            </MetaItem>
            <MetaItem>
              <FaClock /> {post.readTime}
            </MetaItem>
            {post.author && (
              <MetaItem>
                <FaUser /> {post.author}
              </MetaItem>
            )}
          </PostMeta>
        </HeroContent>
      </HeroSection>
      
      <BlogPostContainer
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <BackToButton to="/blog">
          <FaArrowLeft /> Retour aux articles
        </BackToButton>
        
        <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <PostTags>
          <TagsTitle>
            <FaTags /> Tags:
          </TagsTitle>
          <TagsList>
            {post.tags.map((tag, index) => (
              <TagItem key={index}>
                <Link to={`/blog?tag=${tag}`}>{tag}</Link>
              </TagItem>
            ))}
          </TagsList>
        </PostTags>
        
        <ShareSection>
          <ShareTitle>Partager cet article</ShareTitle>
          <ShareButtons>
            <ShareButton 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Partager sur LinkedIn"
              color="#0077B5"
            >
              <FaLinkedin />
            </ShareButton>
            <ShareButton 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Partager sur Facebook"
              color="#3b5998"
            >
              <FaFacebook />
            </ShareButton>
            <ShareButton 
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Partager sur Twitter"
              color="#1DA1F2"
            >
              <FaTwitter />
            </ShareButton>
          </ShareButtons>
        </ShareSection>
        
        <AuthorSection>
          <AuthorImage src="/assets/images/profile.jpg" alt="El Hadji Dieng" />
          <AuthorInfo>
            <AuthorName>El Hadji Dieng</AuthorName>
            <AuthorBio>
              Développeur web et designer UX/UI basé à Dakar, spécialisé dans la création d'expériences web modernes et performantes.
            </AuthorBio>
          </AuthorInfo>
        </AuthorSection>
        
        {recentPosts.length > 0 && (
          <RelatedPosts>
            <SectionTitle>Articles similaires</SectionTitle>
            <RelatedPostsGrid>
              {recentPosts.map((relatedPost) => (
                <RelatedPostCard key={relatedPost.id}>
                  <RelatedPostImage src={relatedPost.image} alt={relatedPost.title} />
                  <RelatedPostContent>
                    <RelatedPostTitle>
                      <Link to={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                    </RelatedPostTitle>
                    <RelatedPostDate>
                      <FaCalendarAlt /> {formatDate(relatedPost.date)}
                    </RelatedPostDate>
                  </RelatedPostContent>
                </RelatedPostCard>
              ))}
            </RelatedPostsGrid>
          </RelatedPosts>
        )}
      </BlogPostContainer>
    </>
  );
};

const BlogPostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BackToButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--color-blue);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-bottom: 20px;
  padding: 12px 24px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(26, 35, 126, 0.1);
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: var(--color-blue);
    color: var(--color-white);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(26, 35, 126, 0.2);
    
    svg {
      transform: translateX(-5px);
    }
  }
`;

const HeroSection = styled.div`
  position: relative;
  height: 60vh;
  min-height: 400px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    height: 50vh;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    line-height: 1.2;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    
    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }
`;


const PostCategory = styled.div`
  display: inline-block;
  background-color: var(--color-blue);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;


const PostMeta = styled.div`
  display: flex;
  gap: 20px;
  color: var(--color-gray-light);
  font-size: 0.9rem;
  margin-top: 15px;
  justify-content: center;
  
  @media (max-width: 576px) {
    flex-wrap: wrap;
    gap: 15px;
  }
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
`;


const PostContent = styled.div`
  line-height: 1.8;
  color: var(--color-gray-dark);
  margin-bottom: 40px;
  
  h2 {
    font-size: 1.8rem;
    color: var(--color-blue-dark);
    margin: 40px 0 20px;
  }
  
  h3 {
    font-size: 1.4rem;
    color: var(--color-blue-dark);
    margin: 30px 0 15px;
  }
  
  p {
    margin-bottom: 20px;
  }
  
  ul, ol {
    margin-bottom: 20px;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  a {
    color: var(--color-blue);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin: 20px 0;
  }
  
  blockquote {
    border-left: 4px solid var(--color-blue);
    padding-left: 20px;
    margin: 30px 0;
    font-style: italic;
    color: var(--color-gray);
  }
  
  code {
    background-color: #f5f5f5;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: monospace;
  }
  
  pre {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    margin: 20px 0;
    
    code {
      background-color: transparent;
      padding: 0;
    }
  }
`;

const PostTags = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--color-gray-light);
`;

const TagsTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-gray);
  font-weight: 600;
`;

const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const TagItem = styled.span`
  a {
    display: inline-block;
    padding: 5px 12px;
    background-color: var(--color-gray-light);
    color: var(--color-gray-dark);
    border-radius: 20px;
    font-size: 0.85rem;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: var(--color-blue);
      color: white;
    }
  }
`;

const ShareSection = styled.div`
  margin-bottom: 40px;
`;

const ShareTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--color-blue-dark);
`;

const ShareButtons = styled.div`
  display: flex;
  gap: 15px;
`;

const ShareButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color};
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
`;

const AuthorSection = styled.div`
  display: flex;
  gap: 20px;
  padding: 30px;
  background-color: var(--color-white);
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const AuthorImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: var(--color-blue-dark);
`;

const AuthorBio = styled.p`
  color: var(--color-gray-dark);
  line-height: 1.6;
`;

const RelatedPosts = styled.div`
  margin-top: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: var(--color-blue-dark);
  position: relative;
  padding-bottom: 15px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
  }
`;

const RelatedPostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const RelatedPostCard = styled.article`
  background-color: var(--color-white);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const RelatedPostImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const RelatedPostContent = styled.div`
  padding: 15px;
`;

const RelatedPostTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 10px;
  line-height: 1.4;
  
  a {
    color: var(--color-blue-dark);
    text-decoration: none;
    
    &:hover {
      color: var(--color-blue);
    }
  }
`;

const RelatedPostDate = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  color: var(--color-gray);
`;

export default BlogPostPage;
