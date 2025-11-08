import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus } from 'lucide-react';
import AdminArticles from '../components/AdminArticles';
import AdminEvents from '../components/AdminEvents';

export default function Admin() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'articles' | 'events'>('articles');

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Tableau de Bord</h1>
              <p className="text-gray-200">Gérez le contenu du site</p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleSignOut}
              className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg font-semibold transition-all"
            >
              <LogOut size={20} />
              <span>Déconnexion</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'articles'
                  ? 'bg-blue-900 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'events'
                  ? 'bg-blue-900 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Événements
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'articles' ? <AdminArticles /> : <AdminEvents />}
          </div>
        </div>
      </div>
    </div>
  );
}
