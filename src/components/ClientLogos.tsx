import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


interface ClientLogosProps {
  className?: string;
}

const ClientLogos: React.FC<ClientLogosProps> = ({ className = '' }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  
  // Liste des logos clients
  const clientLogos = [
    "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Sacred_Union_of_the_Nation_logo.jpg/250px-Sacred_Union_of_the_Nation_logo.jpg",
    "https://upload.wikimedia.org/wikipedia/en/7/76/Union_for_Democracy_and_Social_Progress.png",
    "https://finances.gouv.cd/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.649630aa.png&w=640&q=75",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_cPFwpTebUe9ifsZ7T_sfp0wgOJWYeCqccw&s",
  
  ];

  // Animation de défilement horizontal
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    
    let frame: number;
    let pos = 0;
    const speed = 0.8; // Vitesse de défilement (pixels par frame)
    let isPaused = false;

    const animate = () => {
      if (isPaused) {
        frame = requestAnimationFrame(animate);
        return;
      }
      
      pos += speed;
      if (pos >= (el.scrollWidth / 2)) {
        pos = 0;
      }
      el.scrollLeft = pos;
      frame = requestAnimationFrame(animate);
    };

    // Démarrer l'animation
    frame = requestAnimationFrame(animate);

    // Gestion du survol
    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Dupliquer les logos pour un effet de défilement fluide
  const logos = [...clientLogos, ...clientLogos];

  return (
    <section className={`py-12 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div
          ref={rowRef}
          className="overflow-hidden w-full py-6 cursor-grab active:cursor-grabbing"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)",
          }}
        >
          <div className="flex gap-8 md:gap-12 w-max">
            {logos.map((src, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 flex items-center justify-center h-16 md:h-20 w-32 md:w-40"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img
                  src={src}
                  alt={`Logo do cliente ${(i % clientLogos.length) + 1}`}
                  className="h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
