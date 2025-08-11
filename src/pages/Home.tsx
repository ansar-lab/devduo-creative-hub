import { FounderCard } from '@/components/FounderCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Smartphone, Megaphone, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import tvSathwikImage from '@/assets/tv-sathwik-sai.png';
import mdAnsarImage from '@/assets/md-ansar-vali.png';

const Home = () => {
  const services = [
    {
      icon: Code,
      title: 'Website Creation',
      description: 'Modern, responsive websites built with cutting-edge technologies'
    },
    {
      icon: Smartphone,
      title: 'App Development',
      description: 'Native and cross-platform mobile applications'
    },
    {
      icon: Megaphone,
      title: 'AI-Powered Ads',
      description: 'Smart advertising solutions powered by artificial intelligence'
    },
    {
      icon: Palette,
      title: 'Graphic Design',
      description: 'Creative posters and visual designs that captivate audiences'
    }
  ];

  const founders = [
    {
      name: 'TV Sathwik Sai',
      image: tvSathwikImage,
      linkedin: 'https://www.linkedin.com/in/sathwik-sai-t-v-ba202830a',
      instagram: 'https://www.instagram.com/sathwik__s_a_i__',
      email: 'mailto:tvsathwiktvsathwiksai@gmail.com'
    },
    {
      name: 'MD Ansar Vali',
      image: mdAnsarImage,
      linkedin: 'https://www.linkedin.com/in/mohammad-ansar-vali-80b099317',
      instagram: 'https://www.instagram.com/_kakashi_3_',
      email: 'mailto:ansavali3231@gmail.com'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              DEV DUO
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Your Creative Tech Partner for Digital Excellence
          </p>
          <p className="text-lg text-foreground/80 mb-12 max-w-4xl mx-auto animate-fade-in-up animation-delay-400">
            We specialize in crafting exceptional digital experiences through modern web development, 
            mobile applications, AI-powered marketing solutions, and stunning visual designs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <Link to="/projects">
              <Button className="btn-gradient group">
                View Our Work
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-border hover:bg-accent">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in-up">
            Our <span className="text-primary">Services</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="project-card bg-card p-6 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <service.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in-up">
            Meet the <span className="text-primary">Founders</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <FounderCard {...founder} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="project-card bg-card p-12 max-w-4xl mx-auto animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6">
              Ready to bring your ideas to life?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Let's collaborate to create something extraordinary together.
            </p>
            <Link to="/contact">
              <Button className="btn-gradient">
                Start Your Project
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;