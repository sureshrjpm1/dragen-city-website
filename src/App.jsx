import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Categories from './components/Categories';
import Experience from './components/Experience';
import LocationHours from './components/LocationHours';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Categories />
      <Experience />
      <LocationHours />
      <Events />
      <Gallery />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
