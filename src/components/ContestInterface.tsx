import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, X, Settings, Type, MousePointer, Code, Image, Monitor, Tablet, Smartphone, RotateCcw } from 'lucide-react';
import beachImage from '@/assets/beach-reading-banner.jpg';

export const ContestInterface = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [previewMode, setPreviewMode] = useState('desktop');
  
  // Text elements state
  const [textElements, setTextElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  
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

  // Text management functions
  const addTextElement = () => {
    const newElement = {
      id: Date.now(),
      text: 'Nouveau texte',
      x: 50,
      y: 50,
      fontSize: 16,
      color: '#000000',
      fontWeight: 'normal',
      fontFamily: 'inter',
      isDragging: false
    };
    setTextElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  };

  const updateTextElement = (id, updates) => {
    setTextElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const deleteTextElement = (id) => {
    setTextElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const handleMouseDown = (e, elementId) => {
    e.preventDefault();
    setSelectedElement(elementId);
    
    const element = textElements.find(el => el.id === elementId);
    if (!element) return;

    // Limiter le déplacement à la zone bannière en mode 1
    const bannerElement = config.mode === 1 ? 
      e.currentTarget.closest('.preview-container').querySelector('.banner-zone') : 
      e.currentTarget.closest('.preview-container');
    
    if (!bannerElement) return;

    const containerRect = bannerElement.getBoundingClientRect();
    const startX = e.clientX - containerRect.left - element.x;
    const startY = e.clientY - containerRect.top - element.y;

    const handleMouseMove = (e) => {
      const newX = e.clientX - containerRect.left - startX;
      const newY = e.clientY - containerRect.top - startY;
      
      updateTextElement(elementId, { 
        x: Math.max(0, Math.min(newX, containerRect.width - 100)), 
        y: Math.max(0, Math.min(newY, containerRect.height - 30))
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
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
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Éléments de texte</h3>
                  <Button 
                    onClick={addTextElement}
                    className="bg-green-600 hover:bg-green-500 text-white text-xs px-2 py-1 h-auto"
                  >
                    + Ajouter
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {textElements.map((element) => (
                    <div 
                      key={element.id} 
                      className={`p-2 bg-slate-700 rounded border cursor-pointer ${
                        selectedElement === element.id ? 'border-orange-500' : 'border-slate-600'
                      }`}
                      onClick={() => setSelectedElement(element.id)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs truncate">{element.text}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTextElement(element.id);
                          }}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedElement && (
                  <div className="space-y-3 border-t border-slate-500 pt-3">
                    <h4 className="text-sm font-medium">Modifier l'élément sélectionné</h4>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Texte</label>
                      <input
                        type="text"
                        value={textElements.find(el => el.id === selectedElement)?.text || ''}
                        onChange={(e) => updateTextElement(selectedElement, { text: e.target.value })}
                        className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white w-full text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Taille</label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const current = textElements.find(el => el.id === selectedElement);
                            if (current && current.fontSize > 8) {
                              updateTextElement(selectedElement, { fontSize: current.fontSize - 2 });
                            }
                          }}
                          className="bg-slate-600 hover:bg-slate-500 text-white px-2 py-1 rounded text-xs"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="8"
                          max="72"
                          value={textElements.find(el => el.id === selectedElement)?.fontSize || 16}
                          onChange={(e) => updateTextElement(selectedElement, { fontSize: parseInt(e.target.value) })}
                          className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white w-16 text-sm"
                        />
                        <button
                          onClick={() => {
                            const current = textElements.find(el => el.id === selectedElement);
                            if (current && current.fontSize < 72) {
                              updateTextElement(selectedElement, { fontSize: current.fontSize + 2 });
                            }
                          }}
                          className="bg-slate-600 hover:bg-slate-500 text-white px-2 py-1 rounded text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Police</label>
                      <select
                        value={textElements.find(el => el.id === selectedElement)?.fontFamily || 'inter'}
                        onChange={(e) => updateTextElement(selectedElement, { fontFamily: e.target.value })}
                        className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white w-full text-sm"
                      >
                        <option value="inter">Inter (Sans-serif)</option>
                        <option value="playfair">Playfair Display (Serif)</option>
                        <option value="roboto">Roboto (Sans-serif)</option>
                        <option value="montserrat">Montserrat (Sans-serif)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Couleur</label>
                      <input
                        type="color"
                        value={textElements.find(el => el.id === selectedElement)?.color || '#000000'}
                        onChange={(e) => updateTextElement(selectedElement, { color: e.target.value })}
                        className="w-full h-8 rounded cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Style</label>
                      <select
                        value={textElements.find(el => el.id === selectedElement)?.fontWeight || 'normal'}
                        onChange={(e) => updateTextElement(selectedElement, { fontWeight: e.target.value })}
                        className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white w-full text-sm"
                      >
                        <option value="normal">Normal</option>
                        <option value="bold">Gras</option>
                      </select>
                    </div>
                  </div>
                )}
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
            className={`shadow-2xl overflow-hidden transition-all duration-300 preview-container relative ${
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
            {/* Custom text elements overlay */}
            {textElements.map((element) => (
              <div
                key={element.id}
                className={`absolute cursor-move select-none ${
                  selectedElement === element.id ? 'ring-2 ring-orange-500' : ''
                } font-${element.fontFamily}`}
                style={{
                  left: `${element.x}px`,
                  top: `${element.y}px`,
                  fontSize: `${element.fontSize}px`,
                  color: element.color,
                  fontWeight: element.fontWeight,
                  zIndex: 50
                }}
                onMouseDown={(e) => handleMouseDown(e, element.id)}
              >
                {element.text}
              </div>
            ))}
            
            {config.mode === 1 ? (
              <>
                {/* Mode 1: Header with banner */}
                <div className="relative banner-zone">
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
