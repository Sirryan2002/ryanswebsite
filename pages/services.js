import Head from 'next/head';
import Card from '../components/Card';
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import WebsiteContainer from '@/components/Container';

export default function Services() {
  return (
    <WebsiteContainer>
        <Head>
            <title>Ryan Longo - Services</title>
        </Head>
        <NavBar />
        <ServicesContent />
        <Footer />
    </WebsiteContainer>
  );
}

const ServicesContent = () => {
  return (
    <>

      <section id="portfolio-cards" className="" style={{"padding-bottom" : "20em"}}>
        <div className="cards">
          <Card
            href="https://www.fiverr.com/s/7Yj0xzb"
            imgSrc="/Fiverr.png"
            imgAlt="Coding Portfolio"
            title="Fiverr"
            description="My Fiverr Gigs"
            size="medium"
          />
          <Card
            href="https://www.upwork.com/freelancers/~017a1056b71eeebe7b?mp_source=share"
            imgSrc="/upwork-logo.png"
            imgAlt="University Portfolio"
            title="Upwork"
            description="My Upwork Profile"
            size="medium"
          />
        </div>
      </section>
    </>
  );
};