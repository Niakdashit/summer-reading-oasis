import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
}

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  newsletter: boolean;
  terms: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    newsletter: false,
    terms: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Prénom requis';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nom requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.terms) {
      newErrors.terms = 'Vous devez accepter les conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateField = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">Prénom *</Label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            className={errors.firstName ? 'border-red-500' : ''}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Nom *</Label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            className={errors.lastName ? 'border-red-500' : ''}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          placeholder="Optionnel"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="newsletter"
          checked={formData.newsletter}
          onCheckedChange={(checked) => updateField('newsletter', checked as boolean)}
        />
        <Label htmlFor="newsletter" className="text-sm">
          Je souhaite recevoir la newsletter et les offres spéciales
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={formData.terms}
          onCheckedChange={(checked) => updateField('terms', checked as boolean)}
        />
        <Label htmlFor="terms" className="text-sm">
          J'accepte les conditions générales et la politique de confidentialité *
        </Label>
      </div>
      {errors.terms && (
        <p className="text-red-500 text-sm">{errors.terms}</p>
      )}

      <Button
        type="submit"
        variant="contest"
        className="w-full"
        size="lg"
      >
        🎯 Valider et continuer
      </Button>
    </form>
  );
};