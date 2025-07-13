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
        {/* Outer glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300/20 via-transparent to-orange-400/20 blur-xl scale-110"></div>
        
        {/* Main wheel container */}
        <div 
          ref={wheelRef}
          className="relative w-full h-full rounded-full overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            boxShadow: `
              0 0 0 6px hsl(var(--contest-shadow)),
              0 0 0 8px rgba(255, 255, 255, 0.1),
              0 15px 30px -5px rgba(0, 0, 0, 0.3),
              0 30px 60px -15px rgba(0, 0, 0, 0.2)
            `
          }}
        >
          {/* Wheel segments using simple approach */}
          {segments.map((segment, index) => {
            const angle = segmentAngle * index;
            const centerX = 50;
            const centerY = 50;
            const radius = 50;
            
            // Calculate the path for each segment
            const startAngle = (angle - 90) * Math.PI / 180;
            const endAngle = ((angle + segmentAngle) - 90) * Math.PI / 180;
            
            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);
            
            const largeArc = segmentAngle > 180 ? 1 : 0;
            
            const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
            
            return (
              <div key={segment.id} className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <path
                    d={pathData}
                    fill={segment.color}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="0.5"
                  />
                  {/* Text positioning */}
                  <text
                    x={centerX + (radius * 0.7) * Math.cos((startAngle + endAngle) / 2)}
                    y={centerY + (radius * 0.7) * Math.sin((startAngle + endAngle) / 2)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={segment.textColor}
                    fontSize="3"
                    fontWeight="bold"
                    transform={`rotate(${angle + segmentAngle/2} ${centerX + (radius * 0.7) * Math.cos((startAngle + endAngle) / 2)} ${centerY + (radius * 0.7) * Math.sin((startAngle + endAngle) / 2)})`}
                  >
                    {segment.text}
                  </text>
                </svg>
              </div>
            );
          })}

          {/* Inner center circle */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: '20%',
              height: '20%',
              background: 'linear-gradient(145deg, #e5e7eb, #9ca3af)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
            }}
          ></div>
        </div>
        
        {/* Enhanced center pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 z-20">
          <div 
            className="relative"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
            }}
          >
            <div 
              className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent"
              style={{
                borderBottomColor: 'hsl(var(--contest-shadow))'
              }}
            ></div>
            <div 
              className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent"
              style={{
                borderBottomColor: 'hsl(var(--contest-red))'
              }}
            ></div>
          </div>
        </div>
        
        {/* Center button */}
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="relative">
            {/* Button glow when active */}
            {gameState === 'wheel' && !isSpinning && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 blur-md animate-pulse scale-150 opacity-60"></div>
            )}
            
            <Button
              onClick={spinWheel}
              disabled={isSpinning || (mode === 2 && gameState === 'initial')}
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full text-white disabled:opacity-50 transition-all duration-300 hover:scale-105"
              size="icon"
              style={{
                background: gameState === 'wheel' && !isSpinning 
                  ? 'linear-gradient(145deg, hsl(var(--contest-red)), #dc2626, hsl(var(--contest-red)))'
                  : 'linear-gradient(145deg, #6b7280, #4b5563, #374151)',
                boxShadow: `
                  0 8px 16px rgba(0,0,0,0.3),
                  0 4px 8px rgba(0,0,0,0.2),
                  inset 0 2px 4px rgba(255,255,255,0.1),
                  inset 0 -2px 4px rgba(0,0,0,0.1)
                `
              }}
            >
              <RotateCw className={`w-6 h-6 md:w-8 md:h-8 ${isSpinning ? 'animate-spin' : ''} drop-shadow-sm`} />
            </Button>
          </div>
        </div>
        
        {/* Glass reflection effect on top */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)'
          }}
        ></div>
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