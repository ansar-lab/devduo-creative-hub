import { Instagram, Linkedin, Mail } from 'lucide-react';

interface FounderCardProps {
  name: string;
  image: string;
  linkedin: string;
  instagram: string;
  email: string;
}

export const FounderCard = ({ name, image, linkedin, instagram, email }: FounderCardProps) => {
  return (
    <div className="founder-card p-6 max-w-sm mx-auto animate-fade-in-up">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-80 object-cover rounded-xl mb-4"
        />
        
        {/* Social Icons - Hidden by default, shown on hover */}
        <div className="founder-social-icons">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-primary rounded-full hover:bg-primary-glow transition-colors"
          >
            <Linkedin size={20} className="text-primary-foreground" />
          </a>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-primary rounded-full hover:bg-primary-glow transition-colors"
          >
            <Instagram size={20} className="text-primary-foreground" />
          </a>
          <a
            href={email}
            className="p-3 bg-primary rounded-full hover:bg-primary-glow transition-colors"
          >
            <Mail size={20} className="text-primary-foreground" />
          </a>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-center mt-4">{name}</h3>
      <p className="text-muted-foreground text-center mt-2">Co-Founder</p>
    </div>
  );
};