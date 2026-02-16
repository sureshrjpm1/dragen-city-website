import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import WhyDragonCity from './components/WhyDragonCity';
import Categories from './components/Categories';
import Experience from './components/Experience';
import LocationHours from './components/LocationHours';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SectionNav from './components/SectionNav';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className={`relative ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        <Navbar />
        <Hero loading={loading} />
        <Marquee />
        <About />
        <WhyDragonCity />
        <Categories />
        <Experience />
        <Events />
        <LocationHours />
        <Gallery />
        <Footer />
        <ScrollToTop />
        <SectionNav />
      </div>
    </>
  );
}

export default App;
