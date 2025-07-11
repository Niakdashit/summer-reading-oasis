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
      <div className="relative">
        <div 
          ref={wheelRef}
          className="relative w-80 h-80 rounded-full border-8 border-contest-shadow shadow-2xl overflow-hidden"
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
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            onClick={spinWheel}
            disabled={isSpinning || (mode === 2 && gameState === 'initial')}
            className="w-16 h-16 rounded-full bg-contest-red hover:bg-contest-red/90 text-white shadow-lg disabled:opacity-50"
            size="icon"
          >
            <RotateCw className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
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

  // Mode 2: Wheel always visible with modal form
  return (
    <div className="min-h-screen bg-gradient-to-br from-contest-pink via-contest-beige to-contest-pink relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-8xl">📚</div>
        <div className="absolute top-40 right-32 text-6xl">⭐</div>
        <div className="absolute bottom-32 left-32 text-7xl">🎁</div>
        <div className="absolute bottom-20 right-20 text-5xl">💎</div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-contest-text animate-fade-in">
              🎡 Roue de la Fortune
            </h1>
            <p className="text-xl text-contest-text/80 max-w-lg mx-auto animate-fade-in">
              {gameState === 'initial' ? 'Remplissez le formulaire pour pouvoir jouer !' : 
               'Cliquez sur le bouton central pour faire tourner la roue !'}
            </p>
          </div>

          <div className="flex justify-center animate-scale-in">
            {renderWheel()}
          </div>

          {/* Participate button for mode 2 */}
          {gameState === 'initial' && (
            <div className="text-center mt-8">
              <Button
                onClick={() => setShowContactForm(true)}
                variant="contest"
                size="xl"
                className="px-8 py-4 text-xl font-bold animate-pulse hover:animate-none"
              >
                🎯 Participer
              </Button>
            </div>
          )}

          {gameState === 'result' && (
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-md mx-auto animate-fade-in mt-8 border-2 border-contest-red">
              <h3 className="text-2xl font-bold text-contest-text mb-2">🎉 Bravo !</h3>
              <p className="text-xl font-bold text-contest-red mb-3">
                Vous avez gagné : {result}
              </p>
              <p className="text-sm text-contest-text/80 mb-4">
                Votre prix vous sera envoyé sous 48h.
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => {
                    console.log('Rejouer clicked');
                    resetGame();
                  }}
                  variant="contest"
                  size="lg"
                  className="px-8 py-4 text-lg font-bold"
                >
                  🎲 Rejouer
                </Button>
              </div>
            </div>
          )}
        </div>
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