import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ClientLogos from '../components/ClientLogos';

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const stats = [
    { value: '10,000+', label: 'Membres Actifs' },
    { value: '20+', label: 'Provinces' },
    { value: '100+', label: 'Événements' },
    { value: '20M+', label: 'Vies Touchées' },
  ];





  return (
    <div className="min-h-screen">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="relative   text-white "
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div
          className="absolute inset-0 "
          style={{
            backgroundImage: 'url(https://7sur7.cd/sites/default/files/inline-images/03A8797F-EB4A-4F48-9AB0-E0B921C99392.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Unis pour une Économie
              <span className="block text-amber-400">Forte et Équitable</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              Ensemble, construisons une Afrique prospère où chaque citoyen a sa place
              dans une économie moderne, inclusive et durable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/join"
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-2xl flex items-center justify-center space-x-2"
              >
                <span>Rejoignez Notre Mouvement</span>
                <ArrowRight size={24} />
              </Link>
              <Link
                to="/about"
                className="bg-white hover:bg-gray-100 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-2xl flex items-center justify-center"
              >
                Découvrir la Vision
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF60xWC0PdPoDpcvcI4bhpJJZ7hhLO3UfJSPW7gAzqpZ5XYZ2mT9pQi4fPhQiRHzD7rZY&usqp=CAU)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className=" mb-16 relative z-10 pt-5"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Notre Vision
            </h2>

          </motion.div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 pb-20">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className=""
            >
              <div className="space-y-4 text-gray-800 leading-relaxed text-lg">
                <p className="">
                  Nous croyons en une économie qui profite à tous, pas seulement à une élite.
                </p>
                <p>
                  Doudou Roussel Fwamba Likunde est né d'une conviction profonde:
                  notre continent possède toutes les ressources nécessaires pour devenir
                  une puissance économique mondiale.
                </p>
                <p>
                  Avec une population jeune et dynamique, des ressources naturelles abondantes,
                  et un esprit entrepreneurial remarquable, l'Afrique peut et doit prendre
                  sa place parmi les grandes nations prospères.
                </p>
                <p>
                  Notre mission est de créer les conditions d'une croissance économique forte,
                  inclusive et durable. Nous croyons en une économie qui profite à tous,
                  pas seulement à une élite. Nous travaillons pour un avenir où chaque
                  citoyen a accès aux opportunités et peut réaliser son plein potentiel.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className=""
            >
              <div className="space-y-4 text-gray-800 leading-relaxed text-lg">
                <img src="https://www.opinion-info.cd/sites/default/files/styles/media_interne_1280x720/public/2025-03/IMG-20250316-WA0076.jpg?itok=UJtb6Gbw" className=' rounded-md' alt="" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>



      <section className=" py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 text-white"></div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF60xWC0PdPoDpcvcI4bhpJJZ7hhLO3UfJSPW7gAzqpZ5XYZ2mT9pQi4fPhQiRHzD7rZY&usqp=CAU)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className="max-w-4xl  px-4 sm:px-6 lg:px-8  relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-100">
              Prêt à Faire la Différence?
            </h2>
            <p className="text-xl mb-8 text-gray-400">
              Rejoignez des milliers de citoyens engagés pour bâtir une économie forte et inclusive.
            </p>
            <Link
              to="/join"
              className="inline-flex  space-x-2 bg-amber-500 hover:bg-amber-600 text-white px-10 py-5 rounded-lg font-bold text-xl transition-all shadow-2xl"
            >
              <span>Rejoignez-nous Maintenant</span>
              <ArrowRight size={28} />
            </Link>
          </motion.div>
        </div>
      </section>

      <ClientLogos />
    </div>
  );
}
