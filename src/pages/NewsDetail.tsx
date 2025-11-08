import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, Article } from '../lib/supabase';
import { Calendar, User, ArrowLeft, Loader } from 'lucide-react';

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size={48} className="animate-spin text-blue-900" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
          <Link
            to="/news"
            className="text-blue-900 font-semibold hover:text-blue-700 inline-flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour aux actualités
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/news"
          className="inline-flex items-center text-blue-900 font-semibold hover:text-blue-700 transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour aux actualités
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />

          <div className="p-8 md:p-12">
            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
              <span className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>{formatDate(article.published_at)}</span>
              </span>
              <span className="flex items-center space-x-2">
                <User size={18} />
                <span>{article.author}</span>
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
              {article.title}
            </h1>

            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.article>

        <div className="mt-12 bg-blue-50 border-l-4 border-blue-900 p-8 rounded-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            Rejoignez notre mouvement
          </h3>
          <p className="text-gray-700 mb-6">
            Vous partagez notre vision? Devenez membre et participez activement à la
            construction d'une économie forte et équitable.
          </p>
          <Link
            to="/join"
            className="inline-block bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            S'inscrire Maintenant
          </Link>
        </div>
      </div>
    </div>
  );
}
