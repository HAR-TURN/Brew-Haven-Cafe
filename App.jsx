import React, { useState, useEffect } from 'react';

// Main App component
const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  // Define menu items and gallery images using free, copyright-free images
  const menuItems = [
    { 
      title: "Espresso", 
      desc: "A strong, concentrated coffee with a rich aroma. Our beans are sourced from the finest plantations.",
      price: "₹150", 
      img: "https://images.unsplash.com/photo-1596952954288-16862d37405b?q=80&w=1974&auto=format&fit=crop",
      placeholderSvg: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-brown-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.9 7.42A7.993 7.993 0 0012 4c-4.418 0-8 3.582-8 8s3.582 8 8 8a7.993 7.993 0 006.9-3.42l-1.9-1.9A5.986 5.986 0 0112 18c-3.313 0-6-2.687-6-6s2.687-6 6-6c1.378 0 2.65.485 3.65 1.3L18.9 7.42zM12 12c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm0-4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
        </svg>
      )
    },
    { 
      title: "Latte", 
      desc: "Espresso with steamed milk and a light layer of foam. Enjoy it hot or iced!",
      price: "₹200", 
      img: "https://images.unsplash.com/photo-1621135177072-57c9b6242e7a?q=80&w=1974&auto=format&fit=crop",
      placeholderSvg: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-brown-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM12 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z"/>
        </svg>
      )
    },
    { 
      title: "Cappuccino", 
      desc: "Espresso with steamed milk, topped with a thick layer of milk foam. The perfect morning pick-me-up.",
      price: "₹200", 
      img: "https://images.unsplash.com/photo-1602320574582-741740d4fcd7?q=80&w=1974&auto=format&fit=crop",
      placeholderSvg: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-brown-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM12 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z"/>
        </svg>
      )
    },
    { 
      title: "Croissant", 
      desc: "A buttery, flaky viennoiserie pastry, baked fresh every morning. Available with chocolate or almond filling.",
      price: "₹100", 
      img: "https://images.unsplash.com/photo-1681218079567-35aef7c8e7e4?q=80&w=1974&auto=format&fit=crop",
      placeholderSvg: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-brown-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM12 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z"/>
        </svg>
      )
    },
    { 
      title: "Chocolate Cake", 
      desc: "A decadent slice of rich chocolate cake, made with premium cocoa. A perfect companion to your coffee.",
      price: "₹250", 
      img: "https://images.unsplash.com/photo-1713274782299-0b97a3e435f3?q=80&w=1974&auto=format&fit=crop",
      placeholderSvg: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-brown-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM12 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z"/>
        </svg>
      )
    },
    { 
      title: "Veggie Sandwich", 
      desc: "Fresh vegetables and savory cheese in toasted artisan bread, served with a side of chips.",
      price: "₹180", 
      img: "https://images.unsplash.com/photo-1662980481719-dfc4e52c1a47?q=80&w=1974&auto=format&fit=crop",
      placeholderSvg: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-brown-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM12 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z"/>
        </svg>
      )
    }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1659462925993-d8cda4dbd983?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1706581089932-92d687b33858?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1639927804438-cd103e59cd0e?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1697603899581-095022d5edd9?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585265160431-1fb3615eb00f?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1744995537091-0d1de55288d2?q=80&w=1974&auto=format&fit=crop"
  ];
  
  // Custom scroll behavior for "active" link highlighting
  useEffect(() => {
    const handleScroll = () => {
      const home = document.getElementById('home').getBoundingClientRect();
      const menu = document.getElementById('menu').getBoundingClientRect();
      const about = document.getElementById('about').getBoundingClientRect();
      const gallery = document.getElementById('gallery').getBoundingClientRect();
      const contact = document.getElementById('contact').getBoundingClientRect();

      const scrollPosition = window.scrollY;
      
      if (scrollPosition < menu.top + window.scrollY) {
        setActiveLink('home');
      } else if (scrollPosition < about.top + window.scrollY) {
        setActiveLink('menu');
      } else if (scrollPosition < gallery.top + window.scrollY) {
        setActiveLink('about');
      } else if (scrollPosition < contact.top + window.scrollY) {
        setActiveLink('gallery');
      } else {
        setActiveLink('contact');
      }

      // Show/hide scroll-to-top button
      setShowScrollToTop(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggles mobile navigation menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Smooth scrolls to a section when a link is clicked
  const handleLinkClick = (id) => {
    setActiveLink(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Toggles between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  // Scrolls back to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  // Opens the modal with the selected menu item
  const openModal = (item) => {
    setModalItem(item);
  };

  // Closes the modal
  const closeModal = () => {
    setModalItem(null);
  };

  // Reusable Image component with lazy loading and error handling
  const ImageComponent = ({ src, alt, className, placeholderSvg }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Placeholder to show while the image is loading or has an error
    const Placeholder = () => (
      <div className={`flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}>
        {placeholderSvg}
      </div>
    );

    if (hasError) {
      return <Placeholder />;
    }

    return (
      <div className={`relative w-full h-full ${className}`}>
        {!isLoaded && <Placeholder />}
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          loading="lazy"
        />
      </div>
    );
  };

  return (
    <div className="bg-cream-100 dark:bg-gray-900 text-brown-900 dark:text-cream-100 font-sans transition-colors duration-300">
      {/* Custom Styles for Warmth */}
      <style>
        {`
          html { scroll-behavior: smooth; }
          .bg-cream-100 { background-color: #F5F5DC; }
          .text-brown-900 { color: #4B3832; }
          .bg-brown-900 { background-color: #4B3832; }
          .bg-brown-800 { background-color: #6F4E37; }
          
          /* Keyframes for fade-in animation */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          /* Keyframes for pulse animation */
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          
          /* Utility class for applying animations */
          .fade-in { animation: fadeIn 0.5s ease-in-out; }
          .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        `}
      </style>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg transition-colors duration-300">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold text-brown-900 dark:text-cream-100">Brew Haven Café</a>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            <li><button onClick={() => handleLinkClick('home')} className={`hover:text-brown-800 ${activeLink === 'home' ? 'text-brown-800 font-bold' : ''}`}>Home</button></li>
            <li><button onClick={() => handleLinkClick('menu')} className={`hover:text-brown-800 ${activeLink === 'menu' ? 'text-brown-800 font-bold' : ''}`}>Menu</button></li>
            <li><button onClick={() => handleLinkClick('about')} className={`hover:text-brown-800 ${activeLink === 'about' ? 'text-brown-800 font-bold' : ''}`}>About Us</button></li>
            <li><button onClick={() => handleLinkClick('gallery')} className={`hover:text-brown-800 ${activeLink === 'gallery' ? 'text-brown-800 font-bold' : ''}`}>Gallery</button></li>
            <li><button onClick={() => handleLinkClick('contact')} className={`hover:text-brown-800 ${activeLink === 'contact' ? 'text-brown-800 font-bold' : ''}`}>Contact</button></li>
          </ul>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle Button */}
            <button onClick={toggleDarkMode} className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-800">
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cream-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brown-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="focus:outline-none focus:ring-2 focus:ring-brown-800 rounded-md p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gray-900 bg-opacity-95 md:hidden">
          <div className="flex justify-end p-4">
            <button onClick={toggleMobileMenu} className="text-cream-100 focus:outline-none focus:ring-2 focus:ring-brown-800 rounded-md p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col items-center space-y-6 text-xl text-cream-100">
            <li><button onClick={() => handleLinkClick('home')} className="hover:text-brown-800">Home</button></li>
            <li><button onClick={() => handleLinkClick('menu')} className="hover:text-brown-800">Menu</button></li>
            <li><button onClick={() => handleLinkClick('about')} className="hover:text-brown-800">About Us</button></li>
            <li><button onClick={() => handleLinkClick('gallery')} className="hover:text-brown-800">Gallery</button></li>
            <li><button onClick={() => handleLinkClick('contact')} className="hover:text-brown-800">Contact</button></li>
          </ul>
        </div>
      )}

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center p-8 bg-cover bg-center text-center text-white relative animate-fade-in" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1559055417-0f81d13f3607?q=80&w=2000&auto=format&fit=crop')` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold animate-slide-in-down">
            Experience the warmth of Brew Haven Café
          </h1>
          <p className="mt-4 text-lg sm:text-xl animate-slide-in-up">
            Your daily escape for artisanal coffee and homemade delights.
          </p>
          <button onClick={() => handleLinkClick('menu')} className="mt-8 inline-block px-8 py-3 text-lg font-medium text-white bg-brown-800 rounded-full shadow-lg hover:bg-brown-900 focus:outline-none focus:ring-4 focus:ring-brown-400 transition-transform transform hover:-translate-y-1">
            Explore Our Menu
          </button>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="container mx-auto p-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer relative"
              onClick={() => openModal(item)}
            >
              <div className="h-48 w-full">
                <ImageComponent 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  placeholderSvg={item.placeholderSvg}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
                <div className="mt-4 font-bold text-lg text-brown-800 dark:text-brown-400">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="bg-brown-800 dark:bg-gray-800 p-8 py-16 text-white transition-colors duration-300">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Our Story</h2>
          <p className="text-lg mb-6">
            Brew Haven Café was founded with a simple vision: to create a cozy corner where our community could gather, relax, and enjoy great coffee. We believe in the power of a perfectly brewed cup to start your day, spark a conversation, or simply offer a moment of peace.
          </p>
          <p className="text-lg">
            Our team is a small, passionate group of baristas and bakers dedicated to crafting every drink and treat with love. We source high-quality beans and use only the freshest ingredients to ensure every visit is a memorable one.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="container mx-auto p-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((img, index) => (
            <div key={index} className="rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative">
              <div className="h-64 w-full">
                <ImageComponent
                  src={img}
                  alt={`Brew Haven Café - Gallery Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  placeholderSvg={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brown-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM5 19V5h14l.001 14H5zm14-11l-3 3-2-2-4 4-2-2-4 4v3h16V9.414l-2-2-2 2z"/>
                    </svg>
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="p-8 py-16 bg-cream-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Visit Us</h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-start justify-center text-brown-900 dark:text-cream-100">
              <h3 className="text-2xl font-semibold mb-4">Opening Hours</h3>
              <ul className="space-y-2">
                <li>Monday - Friday: 8 AM - 6 PM</li>
                <li>Saturday: 9 AM - 5 PM</li>
                <li>Sunday: Closed</li>
              </ul>
              <h3 className="text-2xl font-semibold mt-6 mb-4">Contact</h3>
              <p>Email: <a href="mailto:contact@brewhavencafe.com" className="text-brown-800 dark:text-cream-200">contact@brewhavencafe.com</a></p>
              <p>Phone: <a href="tel:+911234567890" className="text-brown-800 dark:text-cream-200">+91 12345 67890</a></p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-brown-900 dark:text-cream-100">Location</h3>
              <div className="bg-gray-200 dark:bg-gray-700 w-full h-64 rounded-md overflow-hidden">
                <iframe
                  title="Brew Haven Café Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1565.341499595561!2d-74.0059725838036!3d40.71277649999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a319f05b%3A0x9d72134f5d6a2f7c!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1692131234567!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brown-900 dark:bg-gray-950 text-white text-center p-6">
        <p>&copy; 2025 Brew Haven Café. All rights reserved.</p>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 p-3 rounded-full bg-brown-800 text-white shadow-lg transition-transform duration-300 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Modal for Menu Items */}
      {modalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-lg w-full relative transform scale-95 transition-transform duration-300">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="h-64 w-full mb-6">
              <ImageComponent 
                src={modalItem.img} 
                alt={modalItem.title} 
                className="w-full h-full object-cover rounded-xl fade-in"
                placeholderSvg={modalItem.placeholderSvg}
              />
            </div>
            <h3 className="text-3xl font-bold mb-2">{modalItem.title}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">{modalItem.desc}</p>
            <p className="mt-4 text-2xl font-bold text-brown-800 dark:text-brown-400">{modalItem.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
