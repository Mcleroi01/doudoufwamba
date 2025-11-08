import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, Event } from '../lib/supabase';
import { Calendar, MapPin, Users, Loader } from 'lucide-react';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className=""
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Événements</h1>
            <p className="text-xl text-gray-200 max-w-3xl">
              Participez à nos événements et rencontrez des milliers de citoyens engagés.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader size={48} className="animate-spin text-blue-900" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              Aucun événement à venir pour le moment. Revenez bientôt!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link to={`/events/${event.slug}`}>
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="p-6">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                      <Calendar size={18} className="mt-0.5 flex-shrink-0 text-blue-900" />
                      <div>
                        <div className="font-semibold">{formatDate(event.date)}</div>
                        <div>{formatTime(event.date)}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                      <MapPin size={18} className="mt-0.5 flex-shrink-0 text-blue-900" />
                      <span>{event.location}</span>
                    </div>
                    {event.capacity && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users size={18} className="flex-shrink-0 text-blue-900" />
                        <span>Capacité: {event.capacity} personnes</span>
                      </div>
                    )}
                  </div>

                  <Link to={`/events/${event.slug}`}>
                    <h2 className="text-xl font-bold text-blue-900 mb-3 hover:text-blue-700 transition-colors">
                      {event.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                  <Link
                    to={`/events/${event.slug}`}
                    className="block w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-blue-800 transition-colors"
                  >
                    Participer
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
