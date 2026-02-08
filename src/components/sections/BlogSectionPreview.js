import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { getRecentBlogPosts } from '../../data/blogData';
import SectionTitle from '../common/SectionTitle';

const BlogSectionPreview = () => {
  const recentPosts = getRecentBlogPosts(3);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <BlogSection>
      <SectionTitle
        title="Blog & Ressources"
        subtitle="Découvrez mes derniers articles et tutoriels sur le développement web et le design"
      />
      
      <BlogPostsContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {recentPosts.map((post) => (
          <BlogPostCard
            key={post.id}
            as={motion.div}
            variants={itemVariants}
          >
            <PostImageContainer>
              <PostImage src={post.image} alt={post.title} loading="lazy" />
              <PostCategory>{post.category}</PostCategory>
            </PostImageContainer>
            
            <PostContent>
              <PostTitle>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </PostTitle>
              
              <PostMeta>
                <MetaItem>
                  <FaCalendarAlt /> {formatDate(post.date)}
                </MetaItem>
                <MetaItem>
                  <FaClock /> {post.readTime}
                </MetaItem>
              </PostMeta>
              
              <PostExcerpt>{post.excerpt}</PostExcerpt>
              
              <ReadMoreLink to={`/blog/${post.slug}`}>
                Lire l'article <FaArrowRight />
              </ReadMoreLink>
            </PostContent>
          </BlogPostCard>
        ))}
      </BlogPostsContainer>
      
      <ViewAllContainer>
        <ViewAllButton to="/blog">
          Voir tous les articles <FaArrowRight />
        </ViewAllButton>
      </ViewAllContainer>
    </BlogSection>
  );
};

const BlogSection = styled.section`
  padding: 80px 0;
  background-color: var(--color-light);
`;

const BlogPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogPostCard = styled.article`
  background-color: var(--color-white);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const PostImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${BlogPostCard}:hover & {
    transform: scale(1.05);
  }
`;

const PostCategory = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const PostContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const PostTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
  line-height: 1.4;
  
  a {
    color: var(--color-blue-dark);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--color-blue);
    }
  }
`;

const PostMeta = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 0.85rem;
  color: var(--color-gray);
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PostExcerpt = styled.p`
  color: var(--color-gray-dark);
  margin-bottom: 20px;
  line-height: 1.6;
  flex-grow: 1;
`;

const ReadMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-blue);
  font-weight: 600;
  text-decoration: none;
  margin-top: auto;
  transition: all 0.3s ease;
  
  &:hover {
    gap: 12px;
  }
`;

const ViewAllContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const ViewAllButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
  color: black;
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(26, 35, 126, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(26, 35, 126, 0.3);
    gap: 15px;
  }
`;

export default BlogSectionPreview;
