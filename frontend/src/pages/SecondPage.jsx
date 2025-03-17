import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Models from '../components/Models';
import Glimpses from '../components/Glimpses';
import Footer from '../components/Footer';
import AmbientSpheres from '../components/AmbientSpheres';
import './SecondPage.css';

const SecondPage = () => {
  return (
    <motion.div 
      className="second-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <AmbientSpheres />
      <Models />
      <Glimpses />
      <Footer />
    </motion.div>
  );
};

export default SecondPage; 