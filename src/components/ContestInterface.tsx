import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, X } from 'lucide-react';
import beachImage from '@/assets/beach-reading-banner.jpg';

export const ContestInterface = () => {
  return (
    <div className="min-h-screen bg-outer-bg flex items-center justify-center p-4">
      {/* Contest iframe simulation */}
      <div className="w-full max-w-4xl bg-contest-bg rounded-lg shadow-2xl overflow-hidden">
        {/* Header with banner */}
        <div className="relative">
          {/* Social icons and rules button overlay */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            <div className="flex gap-2">
              <Button variant="social" size="icon">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="social" size="icon" className="bg-black hover:bg-gray-800">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="rules">
              Règlement
            </Button>
          </div>

          {/* Main banner image */}
          <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
            <img 
              src={beachImage} 
              alt="Personnes lisant sur la plage" 
              className="w-full h-full object-cover"
            />
            
            {/* Title overlays */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="bg-contest-pink/90 px-6 py-2 rounded-md mb-2 backdrop-blur-sm">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-contest-text">
                  GRAND JEU
                </h1>
              </div>
              <div className="bg-contest-beige/90 px-8 py-2 rounded-md backdrop-blur-sm">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-contest-text">
                  LECTURES DE L'ÉTÉ
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 md:p-8 lg:p-12">
          {/* Description text */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-contest-text leading-relaxed text-justify">
              Valentine et son frère aîné, Antoine, ont 13 ans d'écart. Orphelins de mère, ils viennent de perdre leur père, César Mestre. Le jour des obsèques, une inconnue leur remet une lettre de leur père. La lettre n'explicite pas grand-chose, mais évoque une fracture, des réparations qui n'ont pas eu le temps d'être faites. Antoine s'en détourne vite et retourne à sa vie rangée avec sa femme et ses enfants. Mais Valentine ne reconnaît pas dans ces lignes l'enfance qu'elle a vécue et se donne pour mission de comprendre ce que leur père a voulu leur dire et va enquêter. À son récit s'enchâsse celui de Laure, factrice à Loisel, un petit village normand, et qui vient de faire la connaissance de César. Elle s'est réfugiée là quatre ans plus tôt, après une dépression, et laissant la garde de son fils à son ex-mari, fils avec lequel elle tente peu à peu de renouer un lien fort. Le destin des deux femmes va se croiser.
            </p>
          </div>

          {/* Publisher link */}
          <div className="text-center mb-6">
            <a 
              href="https://editions.flammarion.com" 
              className="text-contest-red font-bold hover:underline text-lg"
              target="_blank" 
              rel="noopener noreferrer"
            >
              editions.flammarion.com
            </a>
          </div>

          {/* Prize description */}
          <div className="text-center mb-8">
            <p className="text-contest-text font-bold italic">
              Jouez et tentez de remporter l'un des 10 exemplaires de "Les notes invisibles" d'une valeur unitaire de 21 euros !
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button variant="contest" size="xl" className="min-w-48">
              PARTICIPER !
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};