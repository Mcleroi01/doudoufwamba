import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/news', label: 'Actualités' },
    { to: '/events', label: 'Événements' },
    { to: '/about', label: 'À Propos' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white  shadow-md sticky top-0 z-50 border-b-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">FW</span>
            </div>
            <div className="hidden md:block">
              <div className="text-blue-900 font-bold text-lg leading-tight">
                Doudou Roussel Fwamba Likunde
              </div>
              <div className="text-amber-500 font-medium text-lg leading-tight">
                Ministre des Finances de la RDC
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-semibold transition-colors ${
                  isActive(link.to)
                    ? 'text-blue-900'
                    : 'text-gray-700 hover:text-blue-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/join"
            className="hidden md:block bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-3 rounded-md font-semibold hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg"
          >
            Rejoignez-nous
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-900"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-base font-semibold transition-colors ${
                  isActive(link.to)
                    ? 'text-blue-900'
                    : 'text-gray-700 hover:text-blue-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/join"
              onClick={() => setIsMenuOpen(false)}
              className="block bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-3 rounded-md font-semibold text-center hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg"
            >
              Rejoignez-nous
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
