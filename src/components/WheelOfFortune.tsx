import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, RotateCw } from 'lucide-react';
import { ContactForm } from './ContactForm';

interface WheelSegment {
  id: number;
  text: string;
  color: string;
  textColor: string;
}

interface WheelOfFortuneProps {
  mode: 1 | 2;
  segments?: WheelSegment[];
  onGameComplete?: (result: string) => void;
}

const defaultSegments: WheelSegment[] = [
  { id: 1, text: "Livre gratuit", color: "hsl(var(--contest-red))", textColor: "white" },
  { id: 2, text: "20% de réduction", color: "hsl(var(--contest-pink))", textColor: "hsl(var(--contest-text))" },
  { id: 3, text: "Marque-page", color: "hsl(var(--contest-beige))", textColor: "hsl(var(--contest-text))" },
  { id: 4, text: "Magazine offert", color: "hsl(var(--contest-red))", textColor: "white" },
  { id: 5, text: "50% de réduction", color: "hsl(var(--contest-pink))", textColor: "hsl(var(--contest-text))" },
  { id: 6, text: "Abonnement 1 mois", color: "hsl(var(--contest-beige))", textColor: "hsl(var(--contest-text))" },
  { id: 7, text: "Tote bag", color: "hsl(var(--contest-red))", textColor: "white" },
  { id: 8, text: "Newsletter VIP", color: "hsl(var(--contest-pink))", textColor: "hsl(var(--contest-text))" }
];

export const WheelOfFortune: React.FC<WheelOfFortuneProps> = ({ 
  mode, 
  segments = defaultSegments, 
  onGameComplete 
}) => {
  const [gameState, setGameState] = useState<'initial' | 'form' | 'wheel' | 'result'>('initial');
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string>('');
  const [rotation, setRotation] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const spins = 3 + Math.random() * 3; // 3-6 full rotations
    const segmentAngle = 360 / segments.length;
    const randomSegment = Math.floor(Math.random() * segments.length);
    const finalAngle = randomSegment * segmentAngle + (segmentAngle / 2);
    const totalRotation = spins * 360 + finalAngle;
    
    setRotation(prev => prev + totalRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      setResult(segments[randomSegment].text);
      setGameState('result');
      console.log('Game state changed to result, should show button now');
      onGameComplete?.(segments[randomSegment].text);
    }, 3000);
  };

  const handleFormSubmit = () => {
    setShowContactForm(false);
    if (mode === 1) {
      setGameState('wheel');
    } else {
      // In mode 2, just close the modal and change state to 'wheel' so user can manually spin
      setGameState('wheel');
    }
  };

  const resetGame = () => {
    setGameState('initial');
    setResult('');
    setRotation(0);
    setIsSpinning(false);
    setShowContactForm(false);
  };

  const renderWheel = () => {
    const segmentAngle = 360 / segments.length;
    
    return (
      <div className="relative w-full h-full">
        <div 
          ref={wheelRef}
          className="relative w-full h-full rounded-full border-4 md:border-8 border-contest-shadow shadow-2xl overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
          }}
        >
          {segments.map((segment, index) => {
            const angle = segmentAngle * index;
            const nextAngle = segmentAngle * (index + 1);
            
            return (
              <div
                key={segment.id}
                className="absolute w-full h-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(from ${angle}deg, ${segment.color} 0deg, ${segment.color} ${segmentAngle}deg, transparent ${segmentAngle}deg)`,
                  clipPath: `polygon(50% 50%, 
                    ${50 + 50 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 90) * Math.PI / 180)}%, 
                    ${50 + 50 * Math.cos((nextAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((nextAngle - 90) * Math.PI / 180)}%)`
                }}
              >
                <div 
                  className="text-sm font-semibold text-center px-2"
                  style={{ 
                    color: segment.textColor,
                    transform: `rotate(${angle + segmentAngle/2}deg)`,
                    transformOrigin: '50% 100px'
                  }}
                >
                  {segment.text}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Center pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-contest-shadow"></div>
        </div>
        
        {/* Spin button */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Button
            onClick={spinWheel}
            disabled={isSpinning || (mode === 2 && gameState === 'initial')}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-contest-red hover:bg-contest-red/90 text-white shadow-lg disabled:opacity-50"
            size="icon"
          >
            <RotateCw className={`w-4 h-4 md:w-6 md:h-6 ${isSpinning ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
    );
  };

  // Mode 1: Just the wheel component (no background, no layout)
  if (mode === 1) {
    return (
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          {renderWheel()}
        </div>
        <p className="text-lg">
          Cliquez sur le bouton central pour faire tourner la roue !
        </p>
      </div>
    );
  }

  // Mode 2: Wheel always visible without background gradient
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
      <div className="text-center space-y-4 md:space-y-8 max-w-4xl mx-auto">
        <div className="space-y-2 md:space-y-4">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-contest-text animate-fade-in">
            🎡 Roue de la Fortune
          </h1>
          <p className="text-base md:text-xl text-contest-text/80 max-w-lg mx-auto animate-fade-in px-4">
            {gameState === 'initial' ? 'Remplissez le formulaire pour pouvoir jouer !' : 
             'Cliquez sur le bouton central pour faire tourner la roue !'}
          </p>
        </div>

        <div className="relative flex justify-center animate-scale-in">
          {/* Wheel container with fixed size that scales */}
          <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {renderWheel()}
          </div>

          {/* Result overlay - positioned over the wheel */}
          {gameState === 'result' && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl max-w-xs md:max-w-sm mx-4 animate-fade-in border-2 border-contest-red">
                <h3 className="text-lg md:text-2xl font-bold text-contest-text mb-2">🎉 Bravo !</h3>
                <p className="text-base md:text-xl font-bold text-contest-red mb-3">
                  Vous avez gagné : {result}
                </p>
                <p className="text-xs md:text-sm text-contest-text/80 mb-4">
                  Votre prix vous sera envoyé sous 48h.
                </p>
                <div className="flex justify-center">
                  <Button
                    onClick={() => {
                      console.log('Rejouer clicked');
                      resetGame();
                    }}
                    variant="contest"
                    size="lg"
                    className="px-4 md:px-8 py-2 md:py-4 text-sm md:text-lg font-bold"
                  >
                    🎲 REJOUER
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Participate button for mode 2 */}
        {gameState === 'initial' && (
          <div className="text-center mt-4 md:mt-8">
            <Button
              onClick={() => setShowContactForm(true)}
              variant="contest"
              size="xl"
              className="px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl font-bold animate-pulse hover:animate-none"
            >
              🎯 Participer
            </Button>
          </div>
        )}
      </div>

      {/* Modal for contact form in mode 2 */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-contest-text">Vos informations</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowContactForm(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <ContactForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};