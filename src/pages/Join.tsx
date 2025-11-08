import { motion } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle, Loader } from 'lucide-react';

export default function Join() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    province: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const provinces = [
    'Kinshasa',
    'Kongo Central',
    'Kwango',
    'Kwilu',
    'Mai-Ndombe',
    'Kasaï',
    'Kasaï Central',
    'Kasaï Oriental',
    'Lomami',
    'Sankuru',
    'Maniema',
    'Sud-Kivu',
    'Nord-Kivu',
    'Ituri',
    'Haut-Uélé',
    'Tshopo',
    'Bas-Uélé',
    'Nord-Ubangi',
    'Mongala',
    'Sud-Ubangi',
    'Équateur',
    'Tshuapa',
    'Tanganyika',
    'Haut-Lomami',
    'Lualaba',
    'Haut-Katanga',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('movement_registrations')
        .insert([formData]);

      if (insertError) throw insertError;

      setSuccess(true);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        province: '',
        message: '',
      });
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Rejoignez Notre Mouvement
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Devenez membre du Mouvement pour la Renaissance Économique et participez
              activement à la construction d'une économie forte et équitable.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl p-12 text-center"
          >
            <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Bienvenue dans le Mouvement!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Votre inscription a été enregistrée avec succès. Vous recevrez bientôt un
              e-mail de confirmation avec plus d'informations.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Inscrire une autre personne
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Formulaire d'Inscription
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Nom Complet *
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition"
                  placeholder="Votre nom complet"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Adresse E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition"
                  placeholder="votre.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Numéro de Téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition"
                  placeholder="+243 XXX XXX XXX"
                />
              </div>

              <div>
                <label
                  htmlFor="province"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Province *
                </label>
                <select
                  id="province"
                  name="province"
                  required
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition"
                >
                  <option value="">Sélectionnez votre province</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Message (Optionnel)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition resize-none"
                  placeholder="Parlez-nous de vos motivations ou de vos compétences..."
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader size={24} className="animate-spin" />
                    <span>Inscription en cours...</span>
                  </>
                ) : (
                  <span>S'inscrire Maintenant</span>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
