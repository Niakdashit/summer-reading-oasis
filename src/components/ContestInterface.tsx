import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, X, Settings, Type, MousePointer, Code, Image, Monitor, Tablet, Smartphone, RotateCcw } from 'lucide-react';
import beachImage from '@/assets/beach-reading-banner.jpg';
import { WheelOfFortune } from './WheelOfFortune';
import { ContactForm } from './ContactForm';
export const ContestInterface = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [previewMode, setPreviewMode] = useState('desktop');

  // Text elements state
  const [textElements, setTextElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [editingElement, setEditingElement] = useState(null);
  const [snapGuides, setSnapGuides] = useState({
    horizontal: [],
    vertical: []
  });

  // Image elements state
  const [imageElements, setImageElements] = useState([]);
  const [selectedImageElement, setSelectedImageElement] = useState(null);

  // Game state for Mode 1 sequential logic
  const [gameStep, setGameStep] = useState('description'); // description, form, wheel, result

  // Configuration states
  const [config, setConfig] = useState({
    mode: 1,
    displayMode: 1, // 1 = Mode séquentiel, 2 = Mode avec roue visible
    // 1 = bannière + texte, 2 = fond seul
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
    textSize: 'text-base',
    descriptionText: `Valentine et son frère aîné, Antoine, ont 13 ans d'écart. Orphelins de mère, ils viennent de perdre leur père, César Mestre. Le jour des obsèques, une inconnue leur remet une lettre de leur père. La lettre n'explicite pas grand-chose, mais évoque une fracture, des réparations qui n'ont pas eu le temps d'être faites. Antoine s'en détourne vite et retourne à sa vie rangée avec sa femme et ses enfants. Mais Valentine ne reconnaît pas dans ces lignes l'enfance qu'elle a vécue et se donne pour mission de comprendre ce que leur père a voulu leur dire et va enquêter. À son récit s'enchâsse celui de Laure, factrice à Loisel, un petit village normand, et qui vient de faire la connaissance de César. Elle s'est réfugiée là quatre ans plus tôt, après une dépression, et laissant la garde de son fils à son ex-mari, fils avec lequel elle tente peu à peu de renouer un lien fort. Le destin des deux femmes va se croiser.`
  });
  const [editingDescription, setEditingDescription] = useState(false);
  const updateConfig = (key: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Game logic for Mode 1
  const handleParticipate = () => {
    setGameStep('form');
  };

  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    setGameStep('wheel');
  };

  const handleGameComplete = () => {
    setGameStep('result');
  };

  const handlePlayAgain = () => {
    setGameStep('description');
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
    setTextElements(prev => prev.map(el => el.id === id ? {
      ...el,
      ...updates
    } : el));
  };
  const deleteTextElement = id => {
    setTextElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  // Image management functions
  const addImageElement = () => {
    const newElement = {
      id: Date.now(),
      src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      x: 100,
      y: 100,
      width: 150,
      height: 100,
      isDragging: false
    };
    setImageElements(prev => [...prev, newElement]);
    setSelectedImageElement(newElement.id);
  };
  const updateImageElement = (id, updates) => {
    setImageElements(prev => prev.map(el => el.id === id ? {
      ...el,
      ...updates
    } : el));
  };
  const deleteImageElement = id => {
    setImageElements(prev => prev.filter(el => el.id !== id));
    if (selectedImageElement === id) {
      setSelectedImageElement(null);
    }
  };

  // Function to calculate snap guides with element center consideration
  const calculateSnapGuides = (elementId, newX, newY, containerRect, elementWidth = 100) => {
    const snapTolerance = 10;
    const guides = {
      horizontal: [],
      vertical: []
    };

    // Calculate element center positions
    const elementCenterX = newX + elementWidth / 2;
    const elementCenterY = newY + 15; // Approximate text height center

    // Container center guides
    const containerCenterX = containerRect.width / 2;
    const containerCenterY = containerRect.height / 2;

    // Edge guides
    const leftEdge = 20;
    const rightEdge = containerRect.width - 20;
    const topEdge = 20;
    const bottomEdge = containerRect.height - 20;

    // Snap element center to container center
    if (Math.abs(elementCenterX - containerCenterX) < snapTolerance) {
      guides.vertical.push(containerCenterX);
      newX = containerCenterX - elementWidth / 2;
    }
    if (Math.abs(elementCenterY - containerCenterY) < snapTolerance) {
      guides.horizontal.push(containerCenterY);
      newY = containerCenterY - 15;
    }

    // Snap to edges
    if (Math.abs(newX - leftEdge) < snapTolerance) {
      guides.vertical.push(leftEdge);
      newX = leftEdge;
    }
    if (Math.abs(newX - rightEdge) < snapTolerance) {
      guides.vertical.push(rightEdge);
      newX = rightEdge;
    }
    if (Math.abs(newY - topEdge) < snapTolerance) {
      guides.horizontal.push(topEdge);
      newY = topEdge;
    }
    if (Math.abs(newY - bottomEdge) < snapTolerance) {
      guides.horizontal.push(bottomEdge);
      newY = bottomEdge;
    }

    // Snap to other text elements
    textElements.forEach(el => {
      if (el.id !== elementId) {
        const otherCenterX = el.x + 50; // Estimate text width
        const otherCenterY = el.y + 15;
        if (Math.abs(elementCenterX - otherCenterX) < snapTolerance) {
          guides.vertical.push(otherCenterX);
          newX = otherCenterX - elementWidth / 2;
        }
        if (Math.abs(elementCenterY - otherCenterY) < snapTolerance) {
          guides.horizontal.push(otherCenterY);
          newY = otherCenterY - 15;
        }
        if (Math.abs(newX - el.x) < snapTolerance) {
          guides.vertical.push(el.x);
          newX = el.x;
        }
        if (Math.abs(newY - el.y) < snapTolerance) {
          guides.horizontal.push(el.y);
          newY = el.y;
        }
      }
    });

    // Snap to other image elements
    imageElements.forEach(el => {
      if (el.id !== elementId) {
        const otherCenterX = el.x + el.width / 2;
        const otherCenterY = el.y + el.height / 2;
        if (Math.abs(elementCenterX - otherCenterX) < snapTolerance) {
          guides.vertical.push(otherCenterX);
          newX = otherCenterX - elementWidth / 2;
        }
        if (Math.abs(elementCenterY - otherCenterY) < snapTolerance) {
          guides.horizontal.push(otherCenterY);
          newY = otherCenterY - 15;
        }
      }
    });
    return {
      newX,
      newY,
      guides
    };
  };
  const handleMouseDown = (e, elementId) => {
    e.preventDefault();
    setSelectedElement(elementId);
    const element = textElements.find(el => el.id === elementId);
    if (!element) return;

    // Check if it's a resize handle
    const isResizeHandle = e.target.classList.contains('resize-handle');
    if (isResizeHandle) {
      // Handle resizing
      const startSize = element.fontSize;
      const startY = e.clientY;
      const handleMouseMove = e => {
        const deltaY = e.clientY - startY; // Corrected: down = bigger, up = smaller
        const newSize = Math.max(8, Math.min(72, startSize + deltaY * 0.5));
        updateTextElement(elementId, {
          fontSize: Math.round(newSize)
        });
      };
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setSnapGuides({
          horizontal: [],
          vertical: []
        });
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      // Handle dragging
      const bannerElement = config.mode === 1 ? e.currentTarget.closest('.preview-container').querySelector('.banner-zone') : e.currentTarget.closest('.preview-container');
      if (!bannerElement) return;
      const containerRect = bannerElement.getBoundingClientRect();
      const startX = e.clientX - containerRect.left - element.x;
      const startY = e.clientY - containerRect.top - element.y;
      const handleMouseMove = e => {
        let newX = e.clientX - containerRect.left - startX;
        let newY = e.clientY - containerRect.top - startY;

        // Calculate snap guides and adjust position
        const snapResult = calculateSnapGuides(elementId, newX, newY, containerRect);
        newX = snapResult.newX;
        newY = snapResult.newY;
        setSnapGuides(snapResult.guides);
        updateTextElement(elementId, {
          x: Math.max(0, Math.min(newX, containerRect.width - 100)),
          y: Math.max(0, Math.min(newY, containerRect.height - 30))
        });
      };
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setSnapGuides({
          horizontal: [],
          vertical: []
        });
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  // Function to handle image mouse events
  const handleImageMouseDown = (e, imageId) => {
    e.preventDefault();
    setSelectedImageElement(imageId);
    const element = imageElements.find(el => el.id === imageId);
    if (!element) return;

    // Check if it's a resize handle
    const isResizeHandle = e.target.classList.contains('resize-handle-image');
    if (isResizeHandle) {
      // Handle resizing
      const startWidth = element.width;
      const startHeight = element.height;
      const startX = e.clientX;
      const startY = e.clientY;
      const handleMouseMove = e => {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        const newWidth = Math.max(50, Math.min(500, startWidth + deltaX));
        const newHeight = Math.max(50, Math.min(500, startHeight + deltaY));
        updateImageElement(imageId, {
          width: newWidth,
          height: newHeight
        });
      };
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setSnapGuides({
          horizontal: [],
          vertical: []
        });
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      // Handle dragging
      const bannerElement = config.mode === 1 ? e.currentTarget.closest('.preview-container').querySelector('.banner-zone') : e.currentTarget.closest('.preview-container');
      if (!bannerElement) return;
      const containerRect = bannerElement.getBoundingClientRect();
      const startX = e.clientX - containerRect.left - element.x;
      const startY = e.clientY - containerRect.top - element.y;
      const handleMouseMove = e => {
        let newX = e.clientX - containerRect.left - startX;
        let newY = e.clientY - containerRect.top - startY;

        // Calculate snap guides and adjust position
        const snapResult = calculateSnapGuides(imageId, newX, newY, containerRect, element.width);
        newX = snapResult.newX;
        newY = snapResult.newY;
        setSnapGuides(snapResult.guides);
        updateImageElement(imageId, {
          x: Math.max(0, Math.min(newX, containerRect.width - element.width)),
          y: Math.max(0, Math.min(newY, containerRect.height - element.height))
        });
      };
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setSnapGuides({
          horizontal: [],
          vertical: []
        });
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  // Function to handle double-click for inline editing
  const handleDoubleClick = elementId => {
    setEditingElement(elementId);
  };

  // Function to handle text editing
  const handleTextEdit = (elementId, newText) => {
    updateTextElement(elementId, {
      text: newText
    });
    setEditingElement(null);
  };

  // Function to handle description text editing
  const handleDescriptionEdit = newText => {
    // For now, we'll just store it in config - you could extend this
    updateConfig('descriptionText', newText);
  };
  const configTabs = [{
    id: 'general',
    label: 'Général',
    icon: Settings
  }, {
    id: 'zone',
    label: 'Zone de jeu',
    icon: MousePointer
  }, {
    id: 'texts',
    label: 'Textes',
    icon: Type
  }, {
    id: 'images',
    label: 'Images',
    icon: Image
  }, {
    id: 'buttons',
    label: 'Boutons',
    icon: MousePointer
  }, {
    id: 'code',
    label: 'Code personnalisé et tags',
    icon: Code
  }];
  return <div className="min-h-screen bg-outer-bg flex">
      {/* Configuration Panel */}
      <div className="w-80 bg-slate-700 text-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-600">
          <h2 className="text-lg font-semibold text-orange-400">Iframe : Femme actuelle</h2>
        </div>

        {/* Tabs */}
        <div className="flex-1">
          {configTabs.map(tab => {
          const Icon = tab.icon;
          return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full p-4 text-left flex items-center gap-3 border-b border-slate-600 hover:bg-slate-600 transition-colors ${activeTab === tab.id ? 'bg-orange-500 text-white' : 'text-slate-300'}`}>
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>;
        })}
        </div>

        {/* Configuration Content */}
        <div className="p-4 bg-slate-600 space-y-4 max-h-96 overflow-y-auto">
          {activeTab === 'general' && <>
              <div>
                <label className="block text-sm font-medium mb-2">Mode de jeu</label>
                <select value={config.displayMode} onChange={e => updateConfig('displayMode', parseInt(e.target.value))} className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-full">
                  <option value={1}>Mode 1 - Séquentiel (Description → Formulaire → Roue)</option>
                  <option value={2}>Mode 2 - Roue visible (Modal formulaire)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mode d'affichage</label>
                <select value={config.mode} onChange={e => updateConfig('mode', parseInt(e.target.value))} className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-full">
                  <option value={1}>Mode 1 - Bannière + zone de texte</option>
                  <option value={2}>Mode 2 - Fond seul (paysage)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Largeur</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={config.width} onChange={e => updateConfig('width', parseInt(e.target.value))} className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-20" />
                  <span className="text-slate-300">px</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hauteur</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={config.height} onChange={e => updateConfig('height', parseInt(e.target.value))} className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-20" />
                  <span className="text-slate-300">px</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ancre</label>
                <select value={config.anchor} onChange={e => updateConfig('anchor', e.target.value)} className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-full">
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
                <input type="color" value={config.backgroundColor} onChange={e => updateConfig('backgroundColor', e.target.value)} className="w-full h-10 rounded cursor-pointer" />
              </div>
            </>}

          {activeTab === 'zone' && <>
              <div>
                <label className="block text-sm font-medium mb-2">Padding (espacement interne)</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={config.padding} onChange={e => updateConfig('padding', parseInt(e.target.value))} className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-20" />
                  <span className="text-slate-300">px</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bordure arrondie</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={config.borderRadius} onChange={e => updateConfig('borderRadius', parseInt(e.target.value))} className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-20" />
                  <span className="text-slate-300">px</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Couleur d'arrière-plan</label>
                <input type="color" value={config.backgroundColor} onChange={e => updateConfig('backgroundColor', e.target.value)} className="w-full h-10 rounded cursor-pointer" />
              </div>
            </>}

          {activeTab === 'texts' && <>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Éléments de texte</h3>
                  <Button onClick={addTextElement} className="bg-green-600 hover:bg-green-500 text-white text-xs px-2 py-1 h-auto">
                    + Ajouter
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {textElements.map(element => <div key={element.id} className={`p-2 bg-slate-700 rounded border cursor-pointer ${selectedElement === element.id ? 'border-orange-500' : 'border-slate-600'}`} onClick={() => setSelectedElement(element.id)}>
                      <div className="flex justify-between items-center">
                        <span className="text-xs truncate">{element.text}</span>
                        <button onClick={e => {
                    e.stopPropagation();
                    deleteTextElement(element.id);
                  }} className="text-red-400 hover:text-red-300 text-xs">
                          ✕
                        </button>
                      </div>
                    </div>)}
                </div>

                {selectedElement && <div className="space-y-3 border-t border-slate-500 pt-3">
                    <h4 className="text-sm font-medium">Modifier l'élément sélectionné</h4>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Texte</label>
                      <input type="text" value={textElements.find(el => el.id === selectedElement)?.text || ''} onChange={e => updateTextElement(selectedElement, {
                  text: e.target.value
                })} className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white w-full text-sm" />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Taille</label>
                      <div className="flex items-center gap-2">
                        <button onClick={() => {
                    const current = textElements.find(el => el.id === selectedElement);
                    if (current && current.fontSize > 8) {
                      updateTextElement(selectedElement, {
                        fontSize: current.fontSize - 2
                      });
                    }
                  }} className="bg-slate-600 hover:bg-slate-500 text-white px-2 py-1 rounded text-xs">
                          -
                        </button>
                        <input type="number" min="8" max="72" value={textElements.find(el => el.id === selectedElement)?.fontSize || 16} onChange={e => updateTextElement(selectedElement, {
                    fontSize: parseInt(e.target.value)
                  })} className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white w-16 text-sm" />
                        <button onClick={() => {
                    const current = textElements.find(el => el.id === selectedElement);
                    if (current && current.fontSize < 72) {
                      updateTextElement(selectedElement, {
                        fontSize: current.fontSize + 2
                      });
                    }
                  }} className="bg-slate-600 hover:bg-slate-500 text-white px-2 py-1 rounded text-xs">
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Police</label>
                      <select value={textElements.find(el => el.id === selectedElement)?.fontFamily || 'inter'} onChange={e => updateTextElement(selectedElement, {
                  fontFamily: e.target.value
                })} className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white w-full text-sm">
                        <option value="inter">Inter (Sans-serif)</option>
                        <option value="opensans">Open Sans (Sans-serif)</option>
                        <option value="lato">Lato (Sans-serif)</option>
                        <option value="roboto">Roboto (Sans-serif)</option>
                        <option value="montserrat">Montserrat (Sans-serif)</option>
                        <option value="poppins">Poppins (Sans-serif)</option>
                        <option value="nunito">Nunito (Sans-serif)</option>
                        <option value="oswald">Oswald (Sans-serif)</option>
                        <option value="playfair">Playfair Display (Serif)</option>
                        <option value="dancing">Dancing Script (Script)</option>
                        <option value="pacifico">Pacifico (Script)</option>
                        <option value="lobster">Lobster (Script)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Couleur</label>
                      <input type="color" value={textElements.find(el => el.id === selectedElement)?.color || '#000000'} onChange={e => updateTextElement(selectedElement, {
                  color: e.target.value
                })} className="w-full h-8 rounded cursor-pointer" />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Style</label>
                      <select value={textElements.find(el => el.id === selectedElement)?.fontWeight || 'normal'} onChange={e => updateTextElement(selectedElement, {
                  fontWeight: e.target.value
                })} className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white w-full text-sm">
                        <option value="normal">Normal</option>
                        <option value="bold">Gras</option>
                      </select>
                    </div>
                  </div>}
              </div>
            </>}

          {activeTab === 'images' && <>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Éléments d'image</h3>
                  <Button onClick={addImageElement} className="bg-green-600 hover:bg-green-500 text-white text-xs px-2 py-1 h-auto">
                    + Ajouter
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {imageElements.map(element => <div key={element.id} className={`p-2 bg-slate-700 rounded border cursor-pointer ${selectedImageElement === element.id ? 'border-orange-500' : 'border-slate-600'}`} onClick={() => setSelectedImageElement(element.id)}>
                      <div className="flex justify-between items-center">
                        <span className="text-xs truncate">Image {element.id}</span>
                        <button onClick={e => {
                    e.stopPropagation();
                    deleteImageElement(element.id);
                  }} className="text-red-400 hover:text-red-300 text-xs">
                          ✕
                        </button>
                      </div>
                    </div>)}
                </div>

                {selectedImageElement && <div className="space-y-3 border-t border-slate-500 pt-3">
                    <h4 className="text-sm font-medium">Modifier l'image sélectionnée</h4>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Source de l'image</label>
                      <select value={imageElements.find(el => el.id === selectedImageElement)?.src || ''} onChange={e => updateImageElement(selectedImageElement, {
                  src: e.target.value
                })} className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white w-full text-sm">
                        <option value="https://images.unsplash.com/photo-1649972904349-6e44c42644a7">Femme avec laptop</option>
                        <option value="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b">Laptop gris</option>
                        <option value="https://images.unsplash.com/photo-1518770660439-4636190af475">Circuit électronique</option>
                        <option value="https://images.unsplash.com/photo-1461749280684-dccba630e2f6">Code Java</option>
                        <option value="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d">MacBook Pro</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Largeur</label>
                      <div className="flex items-center gap-2">
                        <input type="number" min="50" max="500" value={imageElements.find(el => el.id === selectedImageElement)?.width || 150} onChange={e => updateImageElement(selectedImageElement, {
                    width: parseInt(e.target.value)
                  })} className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white w-16 text-sm" />
                        <span className="text-slate-300">px</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1">Hauteur</label>
                      <div className="flex items-center gap-2">
                        <input type="number" min="50" max="500" value={imageElements.find(el => el.id === selectedImageElement)?.height || 100} onChange={e => updateImageElement(selectedImageElement, {
                    height: parseInt(e.target.value)
                  })} className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white w-16 text-sm" />
                        <span className="text-slate-300">px</span>
                      </div>
                    </div>
                  </div>}
              </div>
            </>}

          {activeTab === 'buttons' && <>
              <div>
                <label className="block text-sm font-medium mb-2">Couleur bouton principal</label>
                <input type="color" value={config.buttonColor} onChange={e => updateConfig('buttonColor', e.target.value)} className="w-full h-10 rounded cursor-pointer" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Couleur texte bouton</label>
                <input type="color" value={config.buttonTextColor} onChange={e => updateConfig('buttonTextColor', e.target.value)} className="w-full h-10 rounded cursor-pointer" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Arrondis des boutons</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={config.borderRadius} onChange={e => updateConfig('borderRadius', parseInt(e.target.value))} className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-20" />
                  <span className="text-slate-300">px</span>
                </div>
              </div>
            </>}

          {activeTab === 'code' && <>
              <div>
                <label className="block text-sm font-medium mb-2">CSS personnalisé</label>
                <textarea placeholder="/* Ajoutez votre CSS ici */" className="bg-slate-700 border border-slate-500 rounded px-3 py-2 text-white w-full h-24 text-sm font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">JavaScript personnalisé</label>
                <textarea placeholder="// Ajoutez votre JS ici" className="bg-slate-700 border border-slate-500 rounded px-3 py-2 text-white w-full h-24 text-sm font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags de tracking</label>
                <textarea placeholder="<script>// Tags Google Analytics, Facebook Pixel, etc.</script>" className="bg-slate-700 border border-slate-500 rounded px-3 py-2 text-white w-full h-24 text-sm font-mono" />
              </div>
            </>}
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
            <Button variant={previewMode === 'desktop' ? 'default' : 'ghost'} size="sm" onClick={() => setPreviewMode('desktop')} className={previewMode === 'desktop' ? 'bg-blue-600 hover:bg-blue-500' : 'text-slate-300 hover:text-white'}>
              <Monitor className="w-4 h-4" />
            </Button>
            <Button variant={previewMode === 'tablet' ? 'default' : 'ghost'} size="sm" onClick={() => setPreviewMode('tablet')} className={previewMode === 'tablet' ? 'bg-blue-600 hover:bg-blue-500' : 'text-slate-300 hover:text-white'}>
              <Tablet className="w-4 h-4" />
            </Button>
            <Button variant={previewMode === 'mobile' ? 'default' : 'ghost'} size="sm" onClick={() => setPreviewMode('mobile')} className={previewMode === 'mobile' ? 'bg-blue-600 hover:bg-blue-500' : 'text-slate-300 hover:text-white'}>
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
          <div className={`shadow-2xl overflow-hidden transition-all duration-300 preview-container relative ${config.mode === 2 && previewMode === 'desktop' ? 'w-full max-w-6xl aspect-video' : previewMode === 'desktop' ? 'w-full max-w-4xl' : previewMode === 'tablet' ? 'w-full max-w-2xl' : 'w-full max-w-sm'}`} style={{
          backgroundColor: config.backgroundColor,
          borderRadius: `${config.borderRadius}px`,
          maxWidth: config.mode === 2 && previewMode === 'desktop' ? '1200px' : previewMode === 'desktop' ? `${config.width}px` : undefined,
          height: config.mode === 2 && previewMode === 'desktop' ? 'auto' : undefined
        }}>
            {/* Snap guides */}
            {snapGuides.vertical.map((x, index) => <div key={`v-${index}`} className="absolute top-0 bottom-0 w-0.5 bg-blue-400 opacity-60 pointer-events-none z-40" style={{
            left: `${x}px`
          }} />)}
            {snapGuides.horizontal.map((y, index) => <div key={`h-${index}`} className="absolute left-0 right-0 h-0.5 bg-blue-400 opacity-60 pointer-events-none z-40" style={{
            top: `${y}px`
          }} />)}

            {/* Custom text elements overlay */}
            {textElements.map(element => <div key={element.id} className={`absolute cursor-move select-none group ${selectedElement === element.id ? 'ring-2 ring-orange-500' : ''} font-${element.fontFamily}`} style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            fontSize: `${element.fontSize}px`,
            color: element.color,
            fontWeight: element.fontWeight,
            zIndex: 50
          }} onMouseDown={e => handleMouseDown(e, element.id)} onDoubleClick={() => handleDoubleClick(element.id)}>
                {editingElement === element.id ? <input type="text" value={element.text} onChange={e => updateTextElement(element.id, {
              text: e.target.value
            })} onBlur={() => setEditingElement(null)} onKeyDown={e => {
              if (e.key === 'Enter') {
                setEditingElement(null);
              }
            }} className="bg-transparent border-none outline-none text-current" style={{
              fontSize: `${element.fontSize}px`,
              color: element.color,
              fontWeight: element.fontWeight,
              fontFamily: element.fontFamily
            }} autoFocus /> : element.text}
                
                {/* Resize handle - only show when selected */}
                {selectedElement === element.id && !editingElement && <div className="resize-handle absolute -bottom-2 -right-2 w-4 h-4 bg-orange-500 rounded-full cursor-nw-resize opacity-80 hover:opacity-100 border-2 border-white shadow-md" onMouseDown={e => handleMouseDown(e, element.id)} />}
              </div>)}

            {/* Custom image elements overlay */}
            {imageElements.map(element => <div key={element.id} className={`absolute cursor-move select-none group ${selectedImageElement === element.id ? 'ring-2 ring-orange-500' : ''}`} style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            zIndex: 45
          }} onMouseDown={e => handleImageMouseDown(e, element.id)}>
                <img src={element.src} alt={`Image ${element.id}`} style={{
              width: `${element.width}px`,
              height: `${element.height}px`,
              objectFit: 'cover',
              borderRadius: '4px'
            }} draggable={false} />
                
                {/* Resize handle - only show when selected */}
                {selectedImageElement === element.id && <div className="resize-handle-image absolute -bottom-2 -right-2 w-4 h-4 bg-orange-500 rounded-full cursor-nw-resize opacity-80 hover:opacity-100 border-2 border-white shadow-md" onMouseDown={e => handleImageMouseDown(e, element.id)} />}
              </div>)}
            
            {config.mode === 1 ? <>
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
                    <img src={beachImage} alt="Personnes lisant sur la plage" className="w-full h-full object-cover" />
                    
                    {/* Title overlays */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      
                      
                    </div>
                  </div>
                </div>

                {/* Content section */}
                <div style={{
              padding: `${config.padding}px`
            }}>
                  {/* Description and static content - only show in description step for Mode 1 */}
                  {(config.displayMode !== 1 || gameStep === 'description') && (
                    <>
                      {/* Description text */}
                      <div className="prose prose-lg max-w-none mb-8">
                        {editingDescription ? <textarea value={config.descriptionText} onChange={e => updateConfig('descriptionText', e.target.value)} onBlur={() => setEditingDescription(false)} onKeyDown={e => {
                      if (e.key === 'Escape') {
                        setEditingDescription(false);
                      }
                    }} className={`w-full bg-transparent border border-blue-300 rounded p-2 leading-relaxed text-justify resize-none ${config.textSize}`} style={{
                      color: config.textColor,
                      minHeight: '120px'
                    }} autoFocus /> : <p className={`leading-relaxed text-justify cursor-pointer hover:bg-gray-100 hover:bg-opacity-20 p-2 rounded transition-colors ${config.textSize}`} style={{
                      color: config.textColor
                    }} onDoubleClick={() => setEditingDescription(true)} title="Double-cliquez pour modifier">
                            {config.descriptionText}
                          </p>}
                      </div>

                      {/* Publisher link */}
                      <div className="text-center mb-6">
                        <a href="https://editions.flammarion.com" className="font-bold hover:underline text-lg" style={{
                      color: config.linkColor
                    }} target="_blank" rel="noopener noreferrer">
                          editions.flammarion.com
                        </a>
                      </div>

                      {/* Prize description */}
                      <div className="text-center mb-8">
                        <p className="font-bold italic" style={{
                      color: config.textColor
                    }}>
                          Jouez et tentez de remporter l'un des 10 exemplaires de "Les notes invisibles" d'une valeur unitaire de 21 euros !
                        </p>
                      </div>
                    </>
                  )}

                  {/* Game Content based on step */}
                  {config.displayMode === 1 && gameStep === 'description' && (
                    <div className="text-center">
                      <button 
                        onClick={handleParticipate}
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
                  )}

                  {config.displayMode === 1 && gameStep === 'form' && (
                    <div className="max-w-md mx-auto">
                      <ContactForm onSubmit={handleFormSubmit} />
                    </div>
                  )}

                  {config.displayMode === 1 && gameStep === 'wheel' && (
                    <div className="text-center">
                      <WheelOfFortune 
                        mode={1} 
                        onGameComplete={handleGameComplete}
                      />
                    </div>
                  )}

                  {config.displayMode === 1 && gameStep === 'result' && (
                    <div className="text-center space-y-4">
                      <h3 className="text-2xl font-bold" style={{ color: config.titleColor }}>
                        Merci d'avoir participé !
                      </h3>
                      <p style={{ color: config.textColor }}>
                        Vous recevrez un email de confirmation avec les détails de votre participation.
                      </p>
                      <button 
                        onClick={handlePlayAgain}
                        className="px-8 py-4 font-bold text-lg min-w-48 transition-all duration-200 hover:scale-105" 
                        style={{
                          backgroundColor: config.buttonColor,
                          color: config.buttonTextColor,
                          borderRadius: `${config.borderRadius}px`
                        }}
                      >
                        JOUER ENCORE
                      </button>
                    </div>
                  )}

                  {config.displayMode === 2 && (
                    <div className="text-center">
                      <button className="px-8 py-4 font-bold text-lg min-w-48 transition-all duration-200 hover:scale-105" style={{
                        backgroundColor: config.buttonColor,
                        color: config.buttonTextColor,
                        borderRadius: `${config.borderRadius}px`
                      }}>
                        PARTICIPER !
                      </button>
                    </div>
                  )}
                </div>
              </> : <>
                {/* Mode 2: Full background only */}
                <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex flex-col items-center justify-center" style={{
              backgroundImage: `url(${beachImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}>
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

                   {/* Wheel of Fortune Game */}
                   <WheelOfFortune mode={config.displayMode as 1 | 2} />
                 </div>
               </>}
           </div>
         </div>
       </div>
     </div>;
 };