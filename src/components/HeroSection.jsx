import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
const brandLogo = "https://res.cloudinary.com/dtbjdbbtk/image/upload/v1773299233/logo_smk_mdqcth.jpg";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-float hero-float-1" />
      <div className="hero-float hero-float-2" />
      <div className="hero-float hero-float-3" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={brandLogo}
          alt="The Boys Mens Wear"
          className="hero-logo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Premium Men's Fashion
        </motion.p>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Dress Bold.<br />
          <span className="line2">Live Bolder.</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Discover curated collections of premium and affordable menswear that
          redefines your everyday style.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Link to="/shop" className="hero-cta">
            Shop Collection <HiArrowRight />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
