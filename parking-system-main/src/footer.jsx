import React from 'react';
import { 
  Car, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Clock,
  ParkingCircle 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ParkingCircle size={24} />
              <h3 className="text-xl font-bold">Traffic Hive</h3>
            </div>
            <p className="text-gray-400">
              Smart parking solutions for modern cities. Making parking hassle-free since 2023.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 flex items-center gap-2">
                  <Car size={16} />
                  Find Parking
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 flex items-center gap-2">
                  <Clock size={16} />
                  Book in Advance
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 flex items-center gap-2">
                  <MapPin size={16} />
                  Locations
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={16} />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={16} />
                <span>support@traffichive.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                <span>Delhi NCR, India</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Traffic Hive Parking. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-blue-400">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-400">Terms of Service</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-400">Help Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
