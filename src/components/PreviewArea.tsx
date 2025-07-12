import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, X } from 'lucide-react';
import beachImage from '@/assets/beach-reading-banner.jpg';
import { WheelOfFortune } from './WheelOfFortune';
import { ContactForm } from './ContactForm';
import { ContestConfig, TextElement, ImageElement } from '@/hooks/useContestState';

interface PreviewAreaProps {
  previewMode: string;
  config: ContestConfig;
  textElements: TextElement[];
  imageElements: ImageElement[];
  gameStep: 'description' | 'form' | 'wheel' | 'result';
  handleParticipate: () => void;
  handleFormSubmit: () => void;
  handleGameComplete: () => void;
  handlePlayAgain: () => void;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({
  previewMode,
  config,
  textElements,
  imageElements,
  gameStep,
  handleParticipate,
  handleFormSubmit,
  handleGameComplete,
  handlePlayAgain
}) => {
  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-slate-800">
      <div
        className={`shadow-2xl overflow-hidden transition-all duration-300 preview-container relative ${
          config.mode === 2 && previewMode === 'desktop' ? 'w-full max-w-6xl aspect-video' :
          previewMode === 'desktop' ? 'w-full max-w-4xl' :
          previewMode === 'tablet' ? 'w-full max-w-2xl' : 'w-full max-w-sm'
        }`}
        style={{
          backgroundColor: config.backgroundColor,
          borderRadius: `${config.borderRadius}px`,
          maxWidth: config.mode === 2 && previewMode === 'desktop' ? '1200px' : undefined,
          height: config.mode === 2 && previewMode === 'desktop' ? 'auto' : undefined
        }}
      >
        {/* Custom text elements */}
        {textElements.map(el => (
          <div
            key={el.id}
            className="absolute select-none"
            style={{
              left: `${el.x}px`,
              top: `${el.y}px`,
              fontSize: `${el.fontSize}px`,
              color: el.color,
              fontWeight: el.fontWeight,
              fontFamily: el.fontFamily,
              zIndex: 50
            }}
          >
            {el.text}
          </div>
        ))}

        {/* Custom images */}
        {imageElements.map(el => (
          <div key={el.id} className="absolute" style={{ left: `${el.x}px`, top: `${el.y}px`, zIndex: 45 }}>
            <img
              src={el.src}
              alt="custom"
              style={{ width: `${el.width}px`, height: `${el.height}px`, objectFit: 'cover', borderRadius: '4px' }}
              draggable={false}
            />
          </div>
        ))}

        {config.mode === 1 ? (
          <div className="relative banner-zone">
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
              <div className="flex gap-2">
                <Button variant="social" size="icon">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="social" size="icon" className="bg-black hover:bg-gray-800">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="rules">Règlement</Button>
            </div>
            <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
              <img src={beachImage} alt="Banner" className="w-full h-full object-cover" />
            </div>

            {config.displayMode === 1 && gameStep === 'description' && (
              <div className="text-center p-6">
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
              <div className="max-w-md mx-auto p-6">
                <ContactForm onSubmit={handleFormSubmit} />
              </div>
            )}

            {config.displayMode === 1 && gameStep === 'wheel' && (
              <div className="text-center p-6">
                <WheelOfFortune mode={1} onGameComplete={handleGameComplete} />
              </div>
            )}

            {config.displayMode === 1 && gameStep === 'result' && (
              <div className="text-center space-y-4 p-6">
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
              <div className="text-center p-6">
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
            )}
          </div>
        ) : (
          <div
            className="relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex flex-col items-center justify-center"
            style={{
              backgroundImage: `url(${beachImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
              <div className="flex gap-2">
                <Button variant="social" size="icon">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="social" size="icon" className="bg-black hover:bg-gray-800">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="rules">Règlement</Button>
            </div>
            <WheelOfFortune mode={config.displayMode as 1 | 2} />
          </div>
        )}
      </div>
    </div>
  );
};
