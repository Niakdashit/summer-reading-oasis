import React from 'react';
import { Button } from '@/components/ui/button';
import { Type, Image as ImageIcon } from 'lucide-react';
import { ContestConfig, TextElement, ImageElement } from '@/hooks/useContestState';

interface ConfigPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  config: ContestConfig;
  updateConfig: <K extends keyof ContestConfig>(
    key: K,
    value: ContestConfig[K]
  ) => void;
  textElements: TextElement[];
  selectedElement: number | null;
  setSelectedElement: (id: number | null) => void;
  addTextElement: () => void;
  updateTextElement: (id: number, updates: Partial<TextElement>) => void;
  deleteTextElement: (id: number) => void;
  imageElements: ImageElement[];
  selectedImageElement: number | null;
  setSelectedImageElement: (id: number | null) => void;
  addImageElement: () => void;
  updateImageElement: (id: number, updates: Partial<ImageElement>) => void;
  deleteImageElement: (id: number) => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  activeTab,
  setActiveTab,
  config,
  updateConfig,
  textElements,
  selectedElement,
  setSelectedElement,
  addTextElement,
  updateTextElement,
  deleteTextElement,
  imageElements,
  selectedImageElement,
  setSelectedImageElement,
  addImageElement,
  updateImageElement,
  deleteImageElement
}) => {
  const tabs = [
    { id: 'general', label: 'Général' },
    { id: 'texts', label: 'Textes', icon: Type },
    { id: 'images', label: 'Images', icon: ImageIcon }
  ];

  return (
    <div className="w-80 bg-slate-700 text-white flex flex-col">
      <div className="p-4 border-b border-slate-600">
        <h2 className="text-lg font-semibold text-orange-400">Iframe : Femme actuelle</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div>
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full p-4 text-left flex items-center gap-3 border-b border-slate-600 hover:bg-slate-600 transition-colors ${activeTab === t.id ? 'bg-orange-500 text-white' : 'text-slate-300'}`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {t.label}
              </button>
            );
          })}
        </div>
        <div className="p-4 space-y-4">
          {activeTab === 'general' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Mode de jeu</label>
                <select
                  value={config.displayMode}
                  onChange={e => updateConfig('displayMode', parseInt(e.target.value))}
                  className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-full"
                >
                  <option value={1}>Mode 1 - Séquentiel</option>
                  <option value={2}>Mode 2 - Roue visible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Largeur</label>
                <input
                  type="number"
                  value={config.width}
                  onChange={e => updateConfig('width', parseInt(e.target.value))}
                  className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hauteur</label>
                <input
                  type="number"
                  value={config.height}
                  onChange={e => updateConfig('height', parseInt(e.target.value))}
                  className="bg-slate-700 border border-slate-500 rounded px-3 py-1 text-white w-full"
                />
              </div>
            </>
          )}

          {activeTab === 'texts' && (
            <>
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Éléments de texte</h3>
                <Button onClick={addTextElement} className="bg-green-600 hover:bg-green-500 text-white text-xs px-2 py-1 h-auto">
                  + Ajouter
                </Button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {textElements.map(el => (
                  <div
                    key={el.id}
                    className={`p-2 bg-slate-700 rounded border cursor-pointer ${selectedElement === el.id ? 'border-orange-500' : 'border-slate-600'}`}
                    onClick={() => setSelectedElement(el.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs truncate">{el.text}</span>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          deleteTextElement(el.id);
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
                  <div>
                    <label className="block text-xs font-medium mb-1">Texte</label>
                    <input
                      type="text"
                      value={textElements.find(el => el.id === selectedElement)?.text || ''}
                      onChange={e => updateTextElement(selectedElement, { text: e.target.value })}
                      className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white w-full text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Taille</label>
                    <input
                      type="number"
                      min="8"
                      max="72"
                      value={textElements.find(el => el.id === selectedElement)?.fontSize || 16}
                      onChange={e => updateTextElement(selectedElement, { fontSize: parseInt(e.target.value) })}
                      className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white w-full text-sm"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'images' && (
            <>
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Images</h3>
                <Button onClick={addImageElement} className="bg-green-600 hover:bg-green-500 text-white text-xs px-2 py-1 h-auto">
                  + Ajouter
                </Button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {imageElements.map(el => (
                  <div
                    key={el.id}
                    className={`p-2 bg-slate-700 rounded border cursor-pointer ${selectedImageElement === el.id ? 'border-orange-500' : 'border-slate-600'}`}
                    onClick={() => setSelectedImageElement(el.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs truncate">{el.src}</span>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          deleteImageElement(el.id);
                        }}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {selectedImageElement && (
                <div className="space-y-3 border-t border-slate-500 pt-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Largeur</label>
                    <input
                      type="number"
                      min="50"
                      max="500"
                      value={imageElements.find(el => el.id === selectedImageElement)?.width || 150}
                      onChange={e => updateImageElement(selectedImageElement, { width: parseInt(e.target.value) })}
                      className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white w-full text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Hauteur</label>
                    <input
                      type="number"
                      min="50"
                      max="500"
                      value={imageElements.find(el => el.id === selectedImageElement)?.height || 100}
                      onChange={e => updateImageElement(selectedImageElement, { height: parseInt(e.target.value) })}
                      className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white w-full text-sm"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
