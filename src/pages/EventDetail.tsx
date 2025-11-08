import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, Event } from '../lib/supabase';
import { Calendar, MapPin, Users, ArrowLeft, Loader, CheckCircle } from 'lucide-react';

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (slug) {
      fetchEvent();
    }
  }, [slug]);

  const fetchEvent = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    setRegistering(true);

    try {
      const { error } = await supabase.from('event_registrations').insert([
        {
          event_id: event.id,
          ...formData,
        },
      ]);

      if (error) throw error;

      setRegistered(true);
      setFormData({ full_name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error registering:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setRegistering(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size={48} className="animate-spin text-blue-900" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Événement non trouvé</h1>
          <Link
            to="/events"
            className="text-blue-900 font-semibold hover:text-blue-700 inline-flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour aux événements
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/events"
          className="inline-flex items-center text-blue-900 font-semibold hover:text-blue-700 transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour aux événements
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-64 md:h-96 object-cover"
              />

              <div className="p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
                  {event.title}
                </h1>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3 text-gray-700">
                    <Calendar size={24} className="mt-0.5 flex-shrink-0 text-blue-900" />
                    <div>
                      <div className="font-semibold text-lg">{formatDate(event.date)}</div>
                      <div className="text-gray-600">{formatTime(event.date)}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-gray-700">
                    <MapPin size={24} className="mt-0.5 flex-shrink-0 text-blue-900" />
                    <span className="text-lg">{event.location}</span>
                  </div>
                  {event.capacity && (
                    <div className="flex items-center space-x-3 text-gray-700">
                      <Users size={24} className="flex-shrink-0 text-blue-900" />
                      <span className="text-lg">Capacité: {event.capacity} personnes</span>
                    </div>
                  )}
                </div>

                <div className="prose prose-lg max-w-none">
                  {event.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            {registered ? (
              <div className="bg-white rounded-xl shadow-xl p-8 text-center">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-blue-900 mb-3">
                  Inscription Confirmée!
                </h3>
                <p className="text-gray-700 mb-6">
                  Vous recevrez un e-mail de confirmation avec tous les détails de l'événement.
                </p>
                <button
                  onClick={() => setRegistered(false)}
                  className="text-blue-900 font-semibold hover:text-blue-700"
                >
                  Inscrire une autre personne
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-xl p-8 sticky top-24">
                <h3 className="text-2xl font-bold text-blue-900 mb-6">
                  S'inscrire à l'événement
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-semibold text-gray-700 mb-2">
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
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      E-mail *
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
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Téléphone *
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

                  <button
                    type="submit"
                    disabled={registering}
                    className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {registering ? (
                      <>
                        <Loader size={20} className="animate-spin" />
                        <span>Inscription...</span>
                      </>
                    ) : (
                      <span>Confirmer ma Participation</span>
                    )}
                  </button>
                </form>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Entrée gratuite. Places limitées.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
