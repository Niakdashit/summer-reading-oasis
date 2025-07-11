import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, X, Settings, Type, MousePointer, Code, Image } from 'lucide-react';
import beachImage from '@/assets/beach-reading-banner.jpg';

export const ContestInterface = () => {
  const [activeTab, setActiveTab] = useState('general');

  const configTabs = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'zone', label: 'Zone de jeu', icon: MousePointer },
    { id: 'texts', label: 'Textes', icon: Type },
    { id: 'buttons', label: 'Boutons', icon: MousePointer },
    { id: 'code', label: 'Code personnalisé et tags', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-outer-bg flex">
      {/* Configuration Panel */}
      <div className="w-80 bg-slate-700 text-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-600">
          <h2 className="text-lg font-semibold text-orange-400">Iframe : Femme actuelle</h2>
        </div>

        {/* Tabs */}
        <div className="flex-1">
          {configTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full p-4 text-left flex items-center gap-3 border-b border-slate-600 hover:bg-slate-600 transition-colors ${
                  activeTab === tab.id ? 'bg-orange-500 text-white' : 'text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Configuration Content */}
        <div className="p-4 bg-slate-600 space-y-4">
          {activeTab === 'general' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Largeur</label>
                <div className="flex items-center gap-2">
                  <input type="number" value="810" className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-20" readOnly />
                  <span className="text-slate-300">px</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hauteur</label>
                <div className="flex items-center gap-2">
                  <input type="number" value="1200" className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-20" readOnly />
                  <span className="text-slate-300">px</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ancre</label>
                <select className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-full">
                  <option>Fixe</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bannière (810 x free)</label>
                <div className="bg-slate-700 border border-slate-500 rounded p-4 h-32 flex items-center justify-center">
                  <div className="text-center">
                    <Image className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-sm text-slate-400">Description de l'image</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-600 space-y-2">
          <Button className="w-full bg-slate-600 hover:bg-slate-500 text-white">
            ✕ Annuler
          </Button>
          <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">
            💾 Sauvegarder le template
          </Button>
          <Button className="w-full bg-green-600 hover:bg-green-500 text-white">
            ✓ Sauvegarder et quitter
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        {/* Contest iframe simulation */}
        <div className="w-full max-w-2xl bg-contest-bg rounded-lg shadow-2xl overflow-hidden">
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
    </div>
  );
};