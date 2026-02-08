module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Optimisation du code splitting
      if (webpackConfig.optimization) {
        if (webpackConfig.optimization.splitChunks) {
          webpackConfig.optimization.splitChunks = {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 20000,
            maxSize: 244000,
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                  // Obtenir le nom du package à partir du path du module
                  const packageName = module.context.match(
                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                  )[1];
                  
                  // Regrouper les packages React ensemble
                  if (packageName.includes('react') || 
                      packageName.includes('redux') ||
                      packageName.includes('scheduler')) {
                    return 'react-vendor';
                  }
                  
                  // Regrouper les packages de style ensemble
                  if (packageName.includes('styled-components') || 
                      packageName.includes('css') ||
                      packageName.includes('style')) {
                    return 'style-vendor';
                  }
                  
                  // Regrouper les packages d'animation ensemble
                  if (packageName.includes('framer-motion') || 
                      packageName.includes('animation')) {
                    return 'animation-vendor';
                  }
                  
                  // Regrouper les icônes ensemble
                  if (packageName.includes('icons') || 
                      packageName.includes('icon')) {
                    return 'icons-vendor';
                  }
                  
                  // npm package names are URL-safe, but some servers don't like @ symbols
                  return `vendor.${packageName.replace('@', '')}`;
                },
              },
              // Regrouper les composants communs
              common: {
                test: /[\\/]src[\\/]components[\\/]common[\\/]/,
                name: 'common',
                minChunks: 2,
                priority: -10
              },
              // Regrouper les utilitaires
              utils: {
                test: /[\\/]src[\\/]utils[\\/]/,
                name: 'utils',
                minChunks: 2,
                priority: -15
              },
              // Regrouper les données
              data: {
                test: /[\\/]src[\\/]data[\\/]/,
                name: 'data',
                minChunks: 2,
                priority: -20
              }
            },
          };
        }
      }
      
      // Activer la compression des bundles
      if (process.env.NODE_ENV === 'production') {
        const CompressionPlugin = require('compression-webpack-plugin');
        webpackConfig.plugins.push(
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
          })
        );
      }
      
      return webpackConfig;
    },
  },
  // Optimisation des images
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          // Règle pour les images
          const imageRule = webpackConfig.module.rules.find(
            rule => rule.test && rule.test.toString().includes('svg|')
          );
          
          if (imageRule) {
            // Augmenter la limite pour l'inlining des petites images
            imageRule.oneOf.forEach(oneOf => {
              if (oneOf.loader && oneOf.loader.includes('url-loader')) {
                oneOf.options.limit = 5000; // 5KB
              }
            });
          }
          
          return webpackConfig;
        }
      }
    }
  ]
};
