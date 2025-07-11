import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, X, Settings, Type, MousePointer, Code, Image, Monitor, Tablet, Smartphone, RotateCcw } from 'lucide-react';
import beachImage from '@/assets/beach-reading-banner.jpg';

export const ContestInterface = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [previewMode, setPreviewMode] = useState('desktop');
  
  // Configuration states
  const [config, setConfig] = useState({
    mode: 1, // 1 = bannière + texte, 2 = fond seul
    width: 810,
    height: 1200,
    anchor: 'fixe',
    bannerImage: beachImage,
    backgroundColor: '#ffffff',
    titleColor: '#e91e63',
    subtitleColor: '#ffc107',
    textColor: '#000000',
    linkColor: '#dc2626',
    buttonColor: '#dc2626',
    buttonTextColor: '#ffffff',
    borderRadius: 8,
    padding: 24,
    titleSize: 'text-2xl md:text-3xl lg:text-4xl',
    subtitleSize: 'text-lg md:text-xl lg:text-2xl',
    textSize: 'text-base'
  });

  const updateConfig = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

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
        <div className="p-4 bg-slate-600 space-y-4 max-h-96 overflow-y-auto">
          {activeTab === 'general' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Mode d'affichage</label>
                <select 
                  value={config.mode} 
                  onChange={(e) => updateConfig('mode', parseInt(e.target.value))}
                  className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-full"
                >
                  <option value={1}>Mode 1 - Bannière + zone de texte</option>
                  <option value={2}>Mode 2 - Fond seul (paysage)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Largeur</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={config.width} 
                    onChange={(e) => updateConfig('width', parseInt(e.target.value))}
                    className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-20" 
                  />
                  <span className="text-slate-300">px</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hauteur</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={config.height} 
                    onChange={(e) => updateConfig('height', parseInt(e.target.value))}
                    className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-20" 
                  />
                  <span className="text-slate-300">px</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ancre</label>
                <select 
                  value={config.anchor} 
                  onChange={(e) => updateConfig('anchor', e.target.value)}
                  className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-full"
                >
                  <option value="fixe">Fixe</option>
                  <option value="center">Centré</option>
                  <option value="top">Haut</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bannière (810 x free)</label>
                <div className="bg-slate-700 border border-slate-500 rounded p-4 h-32 flex items-center justify-center cursor-pointer hover:bg-slate-600 transition-colors">
                  <div className="text-center">
                    <Image className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-sm text-slate-400">Cliquer pour changer</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Couleur de fond</label>
                <input 
                  type="color" 
                  value={config.backgroundColor} 
                  onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
            </>
          )}

          {activeTab === 'zone' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Padding (espacement interne)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={config.padding} 
                    onChange={(e) => updateConfig('padding', parseInt(e.target.value))}
                    className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-20" 
                  />
                  <span className="text-slate-300">px</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bordure arrondie</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={config.borderRadius} 
                    onChange={(e) => updateConfig('borderRadius', parseInt(e.target.value))}
                    className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-20" 
                  />
                  <span className="text-slate-300">px</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Couleur d'arrière-plan</label>
                <input 
                  type="color" 
                  value={config.backgroundColor} 
                  onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
            </>
          )}

          {activeTab === 'texts' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Taille titre principal</label>
                <select 
                  value={config.titleSize} 
                  onChange={(e) => updateConfig('titleSize', e.target.value)}
                  className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-full"
                >
                  <option value="text-lg md:text-xl lg:text-2xl">Petit</option>
                  <option value="text-xl md:text-2xl lg:text-3xl">Moyen</option>
                  <option value="text-2xl md:text-3xl lg:text-4xl">Grand</option>
                  <option value="text-3xl md:text-4xl lg:text-5xl">Très grand</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Taille sous-titre</label>
                <select 
                  value={config.subtitleSize} 
                  onChange={(e) => updateConfig('subtitleSize', e.target.value)}
                  className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-full"
                >
                  <option value="text-sm md:text-base lg:text-lg">Petit</option>
                  <option value="text-base md:text-lg lg:text-xl">Moyen</option>
                  <option value="text-lg md:text-xl lg:text-2xl">Grand</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Couleur titre</label>
                <input 
                  type="color" 
                  value={config.titleColor} 
                  onChange={(e) => updateConfig('titleColor', e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Couleur sous-titre</label>
                <input 
                  type="color" 
                  value={config.subtitleColor} 
                  onChange={(e) => updateConfig('subtitleColor', e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Couleur texte</label>
                <input 
                  type="color" 
                  value={config.textColor} 
                  onChange={(e) => updateConfig('textColor', e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Couleur lien</label>
                <input 
                  type="color" 
                  value={config.linkColor} 
                  onChange={(e) => updateConfig('linkColor', e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
            </>
          )}

          {activeTab === 'buttons' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Couleur bouton principal</label>
                <input 
                  type="color" 
                  value={config.buttonColor} 
                  onChange={(e) => updateConfig('buttonColor', e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Couleur texte bouton</label>
                <input 
                  type="color" 
                  value={config.buttonTextColor} 
                  onChange={(e) => updateConfig('buttonTextColor', e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Arrondis des boutons</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={config.borderRadius} 
                    onChange={(e) => updateConfig('borderRadius', parseInt(e.target.value))}
                    className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-20" 
                  />
                  <span className="text-slate-300">px</span>
                </div>
              </div>
            </>
          )}

          {activeTab === 'code' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">CSS personnalisé</label>
                <textarea 
                  placeholder="/* Ajoutez votre CSS ici */"
                  className="bg-slate-700 border border-slate-500 rounded px-3 py-2 text-white w-full h-24 text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">JavaScript personnalisé</label>
                <textarea 
                  placeholder="// Ajoutez votre JS ici"
                  className="bg-slate-700 border border-slate-500 rounded px-3 py-2 text-white w-full h-24 text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags de tracking</label>
                <textarea 
                  placeholder="<script>// Tags Google Analytics, Facebook Pixel, etc.</script>"
                  className="bg-slate-700 border border-slate-500 rounded px-3 py-2 text-white w-full h-24 text-sm font-mono"
                />
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
      <div className="flex-1 flex flex-col">
        {/* Preview Mode Controls */}
        <div className="bg-slate-800 p-4 flex items-center justify-center gap-4 border-b border-slate-600">
          <div className="flex items-center gap-2 bg-slate-700 rounded-lg p-1">
            <Button
              variant={previewMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewMode('desktop')}
              className={previewMode === 'desktop' ? 'bg-blue-600 hover:bg-blue-500' : 'text-slate-300 hover:text-white'}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={previewMode === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewMode('tablet')}
              className={previewMode === 'tablet' ? 'bg-blue-600 hover:bg-blue-500' : 'text-slate-300 hover:text-white'}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={previewMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewMode('mobile')}
              className={previewMode === 'mobile' ? 'bg-blue-600 hover:bg-blue-500' : 'text-slate-300 hover:text-white'}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
            <RotateCcw className="w-4 h-4 mr-2" />
            Rafraîchir
          </Button>
        </div>

        {/* Preview Area */}
        <div className="flex-1 flex items-center justify-center p-4 bg-slate-800">
          {/* Contest iframe simulation with responsive preview */}
          <div 
            className={`shadow-2xl overflow-hidden transition-all duration-300 ${
              config.mode === 2 && previewMode === 'desktop' 
                ? 'w-full max-w-6xl aspect-video' 
                : previewMode === 'desktop' ? 'w-full max-w-4xl' :
                  previewMode === 'tablet' ? 'w-full max-w-2xl' :
                  'w-full max-w-sm'
            }`}
            style={{
              backgroundColor: config.backgroundColor,
              borderRadius: `${config.borderRadius}px`,
              maxWidth: config.mode === 2 && previewMode === 'desktop' ? '1200px' : previewMode === 'desktop' ? `${config.width}px` : undefined,
              height: config.mode === 2 && previewMode === 'desktop' ? 'auto' : undefined
            }}
          >
            {config.mode === 1 ? (
              <>
                {/* Mode 1: Header with banner */}
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
                      <div className="px-6 py-2 rounded-md mb-2 backdrop-blur-sm" style={{ backgroundColor: config.titleColor + '90' }}>
                        <h1 className={`font-bold text-white ${config.titleSize}`}>
                          GRAND JEU
                        </h1>
                      </div>
                      <div className="px-8 py-2 rounded-md backdrop-blur-sm" style={{ backgroundColor: config.subtitleColor + '90' }}>
                        <h2 className={`font-semibold text-white ${config.subtitleSize}`}>
                          LECTURES DE L'ÉTÉ
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content section */}
                <div style={{ padding: `${config.padding}px` }}>
                  {/* Description text */}
                  <div className="prose prose-lg max-w-none mb-8">
                    <p 
                      className={`leading-relaxed text-justify ${config.textSize}`}
                      style={{ color: config.textColor }}
                    >
                      Valentine et son frère aîné, Antoine, ont 13 ans d'écart. Orphelins de mère, ils viennent de perdre leur père, César Mestre. Le jour des obsèques, une inconnue leur remet une lettre de leur père. La lettre n'explicite pas grand-chose, mais évoque une fracture, des réparations qui n'ont pas eu le temps d'être faites. Antoine s'en détourne vite et retourne à sa vie rangée avec sa femme et ses enfants. Mais Valentine ne reconnaît pas dans ces lignes l'enfance qu'elle a vécue et se donne pour mission de comprendre ce que leur père a voulu leur dire et va enquêter. À son récit s'enchâsse celui de Laure, factrice à Loisel, un petit village normand, et qui vient de faire la connaissance de César. Elle s'est réfugiée là quatre ans plus tôt, après une dépression, et laissant la garde de son fils à son ex-mari, fils avec lequel elle tente peu à peu de renouer un lien fort. Le destin des deux femmes va se croiser.
                    </p>
                  </div>

                  {/* Publisher link */}
                  <div className="text-center mb-6">
                    <a 
                      href="https://editions.flammarion.com" 
                      className="font-bold hover:underline text-lg"
                      style={{ color: config.linkColor }}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      editions.flammarion.com
                    </a>
                  </div>

                  {/* Prize description */}
                  <div className="text-center mb-8">
                    <p 
                      className="font-bold italic"
                      style={{ color: config.textColor }}
                    >
                      Jouez et tentez de remporter l'un des 10 exemplaires de "Les notes invisibles" d'une valeur unitaire de 21 euros !
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center">
                    <button 
                      className="px-8 py-4 font-bold text-lg min-w-48 transition-all duration-200 hover:scale-105"
                      style={{ 
                        backgroundColor: config.buttonColor,
                        color: config.buttonTextColor,
                        borderRadius: `${config.borderRadius}px`
                      }}
                    >
                      PARTICIPER !
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Mode 2: Full background only */}
                <div 
                  className="relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex flex-col items-center justify-center"
                  style={{
                    backgroundImage: `url(${beachImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
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

                  {/* Title overlays centered */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="px-6 py-2 rounded-md mb-2 backdrop-blur-sm" style={{ backgroundColor: config.titleColor + '90' }}>
                      <h1 className={`font-bold text-white ${config.titleSize}`}>
                        GRAND JEU
                      </h1>
                    </div>
                    <div className="px-8 py-2 rounded-md backdrop-blur-sm" style={{ backgroundColor: config.subtitleColor + '90' }}>
                      <h2 className={`font-semibold text-white ${config.subtitleSize}`}>
                        LECTURES DE L'ÉTÉ
                      </h2>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
