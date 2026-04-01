import React from 'react';

const TopBanner: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006245990_69a87c68.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-900/40 to-transparent" />
      <div className="relative mx-auto flex min-h-[72px] max-w-[1200px] flex-col justify-center gap-1 px-4 py-3 md:min-h-[80px] md:flex-row md:items-center md:gap-4">
        <img
          src="https://d64gsuwffb70l.cloudfront.net/69cc6ef559614323ecb418b6_1775005534622_8cc099ee.png"
          alt="Trubus"
          className="h-8 md:h-10 object-contain"
        />
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-white/85 sm:text-xs md:text-sm">
          <span>Portal Informasi Pertanian Indonesia</span>
          <span className="hidden sm:inline">|</span>
          <span>Rabu, 1 April 2026</span>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
