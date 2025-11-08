import { motion } from 'framer-motion';
import { Target, Heart, TrendingUp, Award, Users, Globe } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <TrendingUp size={40} />,
      title: 'Croissance Économique',
      description:
        'Nous œuvrons pour une croissance économique forte, inclusive et durable qui profite à tous les citoyens.',
    },
    {
      icon: <Users size={40} />,
      title: 'Inclusion Sociale',
      description:
        'Nous luttons contre les inégalités et créons des opportunités pour tous, sans discrimination.',
    },
    {
      icon: <Target size={40} />,
      title: 'Excellence',
      description:
        'Nous encourageons l\'excellence, l\'innovation et le professionnalisme dans tous les secteurs.',
    },
    {
      icon: <Heart size={40} />,
      title: 'Solidarité',
      description:
        'La solidarité et l\'entraide sont au cœur de notre action. Ensemble, nous sommes plus forts.',
    },
    {
      icon: <Award size={40} />,
      title: 'Intégrité',
      description:
        'Nous agissons avec transparence, honnêteté et responsabilité envers nos membres et citoyens.',
    },
    {
      icon: <Globe size={40} />,
      title: 'Vision Panafricaine',
      description:
        'Nous croyons en une Afrique unie, forte et prospère qui occupe sa place sur la scène mondiale.',
    },
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Fondation du Mouvement',
      description:
        'Lancement officiel du Mouvement pour la Renaissance Économique avec 1 000 membres fondateurs.',
    },
    {
      year: '2024',
      title: 'Expansion Nationale',
      description:
        'Présence établie dans les 26 provinces avec plus de 10 000 membres actifs.',
    },
    {
      year: '2025',
      title: 'Programmes d\'Action',
      description:
        'Lancement de programmes concrets: entrepreneuriat jeunesse, agriculture moderne, éducation.',
    },
    {
      year: 'Avenir',
      title: 'Transformation Nationale',
      description:
        'Objectif: devenir le principal moteur de la transformation économique du pays.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className=""
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">À Propos</h1>
            <p className="text-xl text-gray-200 max-w-3xl">
              Découvrez notre vision, nos valeurs et notre engagement pour une Afrique prospère.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://africafinancetrade.gwu.edu/sites/g/files/zaxdzs6666/files/styles/d07/public/2025-04/doudou_roussel_fwamba_likunde.jpg?itok=fHfAA-hQ"
                alt="Doudou Roussel Fwamba Likunde"
                className="rounded-xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
                Notre Vision
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  Le Mouvement pour la Renaissance Économique est né d'une conviction profonde:
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
                <p className="font-semibold text-blue-900">
                  Ensemble, nous construisons l'Afrique de demain.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className=" mb-16"
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Nos Valeurs</h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Les principes qui guident notre action quotidienne.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-900 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className=" mb-16"
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Notre Parcours</h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              De la fondation à aujourd'hui, notre engagement ne cesse de grandir.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-200"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative pl-20"
                >
                  <div className="absolute left-0 w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {item.year}
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold text-blue-900 mb-2">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Rejoignez Notre Mission
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Faites partie du changement. Ensemble, construisons l'Afrique de demain.
            </p>
            <a
              href="/join"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-10 py-5 rounded-lg font-bold text-xl transition-all shadow-2xl"
            >
              Devenir Membre
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
