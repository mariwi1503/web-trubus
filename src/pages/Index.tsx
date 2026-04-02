import React from 'react';
import AppLayout from '@/components/AppLayout';
import { InterstitialAd } from '@/components/InterstitialAd';

const Index: React.FC = () => {
  return (
    <>
      <InterstitialAd />
      <AppLayout />
    </>
  );
};

export default Index;
