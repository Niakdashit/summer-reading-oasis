import { useState } from 'react';
import beachImage from '@/assets/beach-reading-banner.jpg';

export interface TextElement {
  id: number;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontWeight: string;
  fontFamily: string;
}

export interface ImageElement {
  id: number;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ContestConfig {
  mode: number;
  displayMode: number;
  width: number;
  height: number;
  anchor: string;
  bannerImage: string;
  backgroundColor: string;
  titleColor: string;
  subtitleColor: string;
  textColor: string;
  linkColor: string;
  buttonColor: string;
  buttonTextColor: string;
  borderRadius: number;
  padding: number;
  titleSize: string;
  subtitleSize: string;
  textSize: string;
  descriptionText: string;
}

export const useContestState = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [gameStep, setGameStep] = useState<'description' | 'form' | 'wheel' | 'result'>('description');
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [imageElements, setImageElements] = useState<ImageElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [selectedImageElement, setSelectedImageElement] = useState<number | null>(null);
  const [config, setConfig] = useState<ContestConfig>({
    mode: 1,
    displayMode: 1,
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
    descriptionText: `Valentine et son frère a\u00een\u00e9, Antoine, ont 13 ans d'\u00e9cart. Orphelins de m\u00e8re, ils viennent de perdre leur p\u00e8re, C\u00e9sar Mestre.`
  });

  const updateConfig = <K extends keyof ContestConfig>(
    key: K,
    value: ContestConfig[K]
  ) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const addTextElement = () => {
    const el: TextElement = {
      id: Date.now(),
      text: 'Nouveau texte',
      x: 50,
      y: 50,
      fontSize: 16,
      color: '#000000',
      fontWeight: 'normal',
      fontFamily: 'inter'
    };
    setTextElements(prev => [...prev, el]);
    setSelectedElement(el.id);
  };

  const updateTextElement = (id: number, updates: Partial<TextElement>) => {
    setTextElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const deleteTextElement = (id: number) => {
    setTextElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement === id) setSelectedElement(null);
  };

  const addImageElement = () => {
    const el: ImageElement = {
      id: Date.now(),
      src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      x: 100,
      y: 100,
      width: 150,
      height: 100
    };
    setImageElements(prev => [...prev, el]);
    setSelectedImageElement(el.id);
  };

  const updateImageElement = (id: number, updates: Partial<ImageElement>) => {
    setImageElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const deleteImageElement = (id: number) => {
    setImageElements(prev => prev.filter(el => el.id !== id));
    if (selectedImageElement === id) setSelectedImageElement(null);
  };

  const handleParticipate = () => setGameStep('form');
  const handleFormSubmit = () => setGameStep('wheel');
  const handleGameComplete = () => setGameStep('result');
  const handlePlayAgain = () => setGameStep('description');

  return {
    activeTab,
    setActiveTab,
    previewMode,
    setPreviewMode,
    gameStep,
    setGameStep,
    config,
    updateConfig,
    textElements,
    addTextElement,
    updateTextElement,
    deleteTextElement,
    selectedElement,
    setSelectedElement,
    imageElements,
    addImageElement,
    updateImageElement,
    deleteImageElement,
    selectedImageElement,
    setSelectedImageElement,
    handleParticipate,
    handleFormSubmit,
    handleGameComplete,
    handlePlayAgain
  };
};
