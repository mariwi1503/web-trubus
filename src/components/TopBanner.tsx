import React from 'react';

const TopBanner: React.FC = () => {
  return (
    <div className="w-full relative h-16 md:h-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006245990_69a87c68.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-900/40 to-transparent" />
      <div className="relative h-full max-w-[1200px] mx-auto px-4 flex items-center">
        <img
          src="https://d64gsuwffb70l.cloudfront.net/69cc6ef559614323ecb418b6_1775005534622_8cc099ee.png"
          alt="Trubus"
          className="h-8 md:h-10 object-contain"
        />
        <div className="ml-4 hidden md:flex items-center gap-2 text-white/80 text-sm">
          <span>Portal Informasi Pertanian Indonesia</span>
          <span className="mx-2">|</span>
          <span>Selasa, 31 Maret 2026</span>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
