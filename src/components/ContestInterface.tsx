import React from 'react';
import { Monitor, Tablet, Smartphone, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfigPanel } from './ConfigPanel';
import { PreviewArea } from './PreviewArea';
import { useContestState } from '@/hooks/useContestState';

export const ContestInterface = () => {
  // Centralisation de tous les états via le hook customisé
  const state = useContestState();
  const { previewMode, setPreviewMode } = state;

  return (
    <div className="min-h-screen bg-outer-bg flex">
      {/* Panneau de configuration latéral */}
      <ConfigPanel {...state} />
      <div className="flex-1 flex flex-col">
        {/* Header des modes de preview */}
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
        {/* Zone de preview */}
        <PreviewArea
          previewMode={previewMode}
          config={state.config}
          textElements={state.textElements}
          imageElements={state.imageElements}
          gameStep={state.gameStep}
          handleParticipate={state.handleParticipate}
          handleFormSubmit={state.handleFormSubmit}
          handleGameComplete={state.handleGameComplete}
          handlePlayAgain={state.handlePlayAgain}
        />
      </div>
    </div>
  );
};
