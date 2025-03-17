import TrafficManagementSystem from './components/TrafficManagementSystem'

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <TrafficManagementSystem />
      
      <footer className="mt-auto bg-blue-900 text-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logot2.png" alt="TrafficHive Logo" className="w-8 h-8" />
                <h3 className="text-xl font-bold">TrafficHive</h3>
              </div>
              <p className="text-blue-200/80">
                Pioneering smart traffic solutions for the cities of tomorrow.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Access</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:support@traffichive.com" className="hover:text-white transition-colors">
                    support@traffichive.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                <a href="#" className="hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-blue-800">
            <p className="text-center text-sm text-blue-200/60">
              © 2025 TrafficHive. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App