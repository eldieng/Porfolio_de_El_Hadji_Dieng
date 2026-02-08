import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaTags, FaArrowRight } from 'react-icons/fa';
import { getRecentBlogPosts, getAllCategories } from '../../data/blogData';
import SectionTitle from '../common/SectionTitle';
import OptimizedImage from '../common/OptimizedImage';
import { Helmet } from 'react-helmet-async';

const BlogSectionEnhanced = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  
  useEffect(() => {
    // Récupérer les articles récents
    const recentPosts = getRecentBlogPosts(3);
    setPosts(recentPosts);
    
    // Récupérer les catégories
    const allCategories = ['Tous', ...getAllCategories()];
    setCategories(allCategories);
  }, []);
  
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <BlogSectionContainer>
      {/* Ajout de données structurées pour le SEO */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "headline": "Blog & Ressources - El Hadji Dieng",
            "description": "Articles, tutoriels et conseils sur le développement web, le design UI/UX et les technologies web modernes.",
            "author": {
              "@type": "Person",
              "name": "El Hadji Dieng"
            },
            "blogPost": posts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "datePublished": post.date,
              "author": {
                "@type": "Person",
                "name": "El Hadji Dieng"
              },
              "keywords": post.tags.join(", "),
              "url": `https://elhadji-dieng.com/blog/${post.slug}`
            }))
          })}
        </script>
      </Helmet>
      
      <SectionTitle 
        title="Blog & Ressources" 
        subtitle="Découvrez mes derniers articles et tutoriels sur le développement web et le design UI/UX" 
      />
      
      <CategoryFilter>
        {categories.map((category) => (
          <CategoryButton 
            key={category}
            isActive={category === selectedCategory}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryFilter>
      
      <BlogPostsGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {posts.map((post) => (
          <BlogPostCard
            key={post.id}
            as={motion.article}
            variants={itemVariants}
          >
            <PostImageContainer>
              <StyledOptimizedImage src={post.image} alt={post.title} objectFit="cover" />
              <PostCategory>{post.category}</PostCategory>
            </PostImageContainer>
            
            <PostContent>
              <PostTitle>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </PostTitle>
              
              <PostMeta>
                <MetaItem>
                  <FaCalendarAlt aria-hidden="true" /> 
                  <span>{formatDate(post.date)}</span>
                </MetaItem>
                <MetaItem>
                  <FaClock aria-hidden="true" /> 
                  <span>{post.readTime}</span>
                </MetaItem>
              </PostMeta>
              
              <PostExcerpt>{post.excerpt}</PostExcerpt>
              
              <PostTags>
                <FaTags aria-hidden="true" />
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span key={index}>
                    {tag}{index < Math.min(post.tags.length, 3) - 1 ? ', ' : ''}
                  </span>
                ))}
              </PostTags>
              
              <ReadMoreLink to={`/blog/${post.slug}`}>
                Lire l'article <FaArrowRight aria-hidden="true" />
              </ReadMoreLink>
            </PostContent>
          </BlogPostCard>
        ))}
      </BlogPostsGrid>
      
      <ViewAllButton to="/blog">
        Voir tous les articles
      </ViewAllButton>
      
      <NewsletterSignup>
        <NewsletterContent>
          <h3>Restez informé des dernières tendances</h3>
          <p>Abonnez-vous à ma newsletter pour recevoir mes derniers articles, tutoriels et conseils directement dans votre boîte mail.</p>
          
          <NewsletterForm>
            <input type="email" placeholder="Votre adresse email" aria-label="Votre adresse email" />
            <button type="submit">S'abonner</button>
          </NewsletterForm>
          
          <PrivacyNote>Je respecte votre vie privée. Désabonnez-vous à tout moment.</PrivacyNote>
        </NewsletterContent>
      </NewsletterSignup>
    </BlogSectionContainer>
  );
};

const BlogSectionContainer = styled.section`
  padding: 80px 20px;
  background-color: var(--color-background-light);
`;

const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 30px 0;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  border-radius: 30px;
  background-color: ${props => props.isActive ? 'var(--color-blue)' : 'var(--color-white)'};
  color: ${props => props.isActive ? 'white' : 'var(--color-text)'};
  border: 1px solid ${props => props.isActive ? 'var(--color-blue)' : 'var(--color-gray-light)'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background-color: ${props => props.isActive ? 'var(--color-blue-dark)' : 'var(--color-gray-light)'};
  }
`;

const BlogPostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  
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

// Utilisation du composant OptimizedImage avec des styles spécifiques
const StyledOptimizedImage = styled(OptimizedImage)`
  width: 100%;
  height: 100%;
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
  margin-bottom: 15px;
  line-height: 1.6;
  flex-grow: 1;
`;

const PostTags = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 0.85rem;
  color: var(--color-gray);
  flex-wrap: wrap;
  
  span {
    cursor: pointer;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--color-blue);
    }
  }
`;

const ReadMoreLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-blue);
  font-weight: 600;
  text-decoration: none;
  margin-top: auto;
  transition: all 0.3s ease;
  
  svg {
    font-size: 0.8rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: var(--color-blue-dark);
    
    svg {
      transform: translateX(3px);
    }
  }
`;

const ViewAllButton = styled(Link)`
  display: block;
  width: fit-content;
  margin: 40px auto 0;
  padding: 12px 25px;
  background: linear-gradient(to right, var(--color-blue));
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 123, 255, 0.3);
  }
`;

const NewsletterSignup = styled.div`
  margin-top: 80px;
  padding: 40px;
  background: linear-gradient(135deg, var(--color-blue), var(--color-blue-dark));
  border-radius: 15px;
  color: black;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 10px 30px rgba(0, 123, 255, 0.3);
`;

const NewsletterContent = styled.div`
  text-align: center;
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }
  
  p {
    margin-bottom: 25px;
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  
  input {
    flex: 1;
    padding: 15px;
    border: none;
    border-radius: 30px 0 0 30px;
    font-size: 1rem;
    outline: none;
  }
  
  button {
    padding: 15px 25px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 0 30px 30px 0;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color:rgb(1, 6, 12);
    }
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    
    input {
      border-radius: 30px;
      margin-bottom: 10px;
    }
    
    button {
      border-radius: 30px;
    }
  }
`;

const PrivacyNote = styled.p`
  font-size: 0.8rem;
  margin-top: 15px;
  opacity: 0.7;
`;

export default BlogSectionEnhanced;
