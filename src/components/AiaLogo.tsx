import React from 'react';

interface AiaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  isEn?: boolean;
}

export const AiaLogo: React.FC<AiaLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  isEn = false,
}) => {
  const iconDimensions = {
    sm: { w: 34, h: 34 },
    md: { w: 44, h: 44 },
    lg: { w: 56, h: 56 },
    xl: { w: 72, h: 72 },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none min-w-0 ${className}`}>
      {/* Official AIA Monogram & Pillars Symbol Image */}
      <div 
        className="relative flex items-center justify-center shrink-0 rounded-xl overflow-hidden bg-white dark:bg-stone-900 shadow-sm border border-stone-300 dark:border-stone-700 transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10 p-1"
        style={{ width: iconDimensions.w, height: iconDimensions.h }}
      >
        <img
          src="/assets/aistudio/image_83ee1dd5.png"
          alt="شعار مكتب المحامي عبدالرحمن بن عقيل العنزي AIA"
          className="w-full h-full object-contain dark:invert transition-all"
          loading="eager"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-start leading-tight min-w-0">
          <span className="font-extrabold text-stone-900 dark:text-stone-50 tracking-tight text-xs sm:text-sm md:text-base truncate">
            {isEn ? 'Abdulrahman bin Aqeel Al-Anazi' : 'المحامي عبدالرحمن بن عقيل العنزي'}
          </span>
          <span className="text-[10px] sm:text-xs font-medium text-stone-600 dark:text-stone-400 tracking-wide flex items-center gap-1 sm:gap-1.5 mt-0.5 truncate">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400 shrink-0" />
            <span className="truncate">{isEn ? 'Attorney at Law & Legal Consultant' : 'محامي ومستشار قانوني'}</span>
          </span>
        </div>
      )}
    </div>
  );
};
