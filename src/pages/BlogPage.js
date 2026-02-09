import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaTags } from 'react-icons/fa';
import { blogPosts, getAllCategories, getAllTags } from '../data/blogData';
import SEOHelmet from '../utils/SEOHelmet';
import { seoData } from '../data/seoData';
import PageHeader from '../components/common/PageHeader';

const BlogPage = () => {
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [activeTag, setActiveTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = ['Tous', ...getAllCategories()];
  const tags = getAllTags();
  
  useEffect(() => {
    let result = [...blogPosts];
    
    // Filtrer par catégorie
    if (activeCategory !== 'Tous') {
      result = result.filter(post => post.category === activeCategory);
    }
    
    // Filtrer par tag
    if (activeTag) {
      result = result.filter(post => post.tags.includes(activeTag));
    }
    
    // Filtrer par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.excerpt.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term)
      );
    }
    
    // Trier par date (plus récent d'abord)
    result.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setFilteredPosts(result);
  }, [activeCategory, activeTag, searchTerm]);
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setActiveTag('');
  };
  
  const handleTagClick = (tag) => {
    setActiveTag(tag === activeTag ? '' : tag);
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
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
    <>
      <SEOHelmet
        title={seoData.blog.title}
        description={seoData.blog.description}
        canonicalUrl="/blog"
        schema={seoData.blog.schema}
      />
      
      <PageHeader
        title="Blog & Ressources"
        subtitle="Découvrez mes articles, tutoriels et conseils sur le développement web et le design"
        backgroundImage="/assets/images/headers/blog-header.jpg"
      />
      
      <BlogContainer>
        <BlogSidebar>
          <SearchBox>
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>
          
          <SidebarSection>
            <SidebarTitle>Catégories</SidebarTitle>
            <CategoryList>
              {categories.map((category) => (
                <CategoryItem 
                  key={category}
                  isActive={category === activeCategory}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </CategoryItem>
              ))}
            </CategoryList>
          </SidebarSection>
          
          <SidebarSection>
            <SidebarTitle>Tags</SidebarTitle>
            <TagsCloud>
              {tags.map((tag) => (
                <TagItem 
                  key={tag}
                  isActive={tag === activeTag}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </TagItem>
              ))}
            </TagsCloud>
          </SidebarSection>
        </BlogSidebar>
        
        <BlogContent>
          {filteredPosts.length === 0 ? (
            <NoResults>
              Aucun article ne correspond à votre recherche.
            </NoResults>
          ) : (
            <PostsGrid
              as={motion.div}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPosts.map((post) => (
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
                    
                    <PostTags>
                      <FaTags />
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} onClick={() => handleTagClick(tag)}>
                          {tag}{index < Math.min(post.tags.length, 3) - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </PostTags>
                    
                    <ReadMoreLink to={`/blog/${post.slug}`}>
                      Lire l'article
                    </ReadMoreLink>
                  </PostContent>
                </BlogPostCard>
              ))}
            </PostsGrid>
          )}
        </BlogContent>
      </BlogContainer>
    </>
  );
};

const BlogContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  gap: 40px;
  
  @media (max-width: 1024px) {
    padding: 40px 20px;
    gap: 30px;
  }
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const BlogSidebar = styled.aside`
  flex: 0 0 300px;
  
  @media (max-width: 992px) {
    flex: 0 0 100%;
  }
`;

const BlogContent = styled.main`
  flex: 1;
`;

const SearchBox = styled.div`
  margin-bottom: 30px;
  
  input {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid var(--color-gray-light);
    border-radius: 30px;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: var(--color-blue);
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }
`;

const SidebarSection = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background-color: var(--color-white);
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--color-blue-dark);
  position: relative;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CategoryItem = styled.li`
  padding: 8px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${props => props.isActive ? 'var(--color-blue)' : 'var(--color-gray-dark)'};
  font-weight: ${props => props.isActive ? '600' : '400'};
  
  &:hover {
    color: var(--color-blue);
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-gray-light);
  }
`;

const TagsCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagItem = styled.span`
  display: inline-block;
  padding: 5px 12px;
  background-color: ${props => props.isActive ? 'var(--color-blue)' : 'var(--color-gray-light)'};
  color: ${props => props.isActive ? 'white' : 'var(--color-gray-dark)'};
  border-radius: 20px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.isActive ? 'var(--color-blue-dark)' : 'var(--color-gray)'};
    color: white;
  }
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  
  @media (max-width: 1024px) {
    gap: 20px;
  }
  
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
`;

const PostTags = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 0.85rem;
  color: var(--color-gray);
  
  span {
    cursor: pointer;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--color-blue);
    }
  }
`;

const ReadMoreLink = styled(Link)`
  display: inline-block;
  color: var(--color-blue);
  font-weight: 600;
  text-decoration: none;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--color-blue);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px 0;
  color: var(--color-gray);
  font-size: 1.1rem;
`;

export default BlogPage;
