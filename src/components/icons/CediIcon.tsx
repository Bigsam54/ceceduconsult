import React from 'react';

interface CediIconProps {
  className?: string;
  size?: number;
}

// Ghana Cedi (₵) glyph sized like a lucide icon, for salary and price labels
export const CediIcon: React.FC<CediIconProps> = ({
  className = "w-4 h-4",
  size
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size || 24}
      height={size || 24}
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <text
        x="12"
        y="18.5"
        textAnchor="middle"
        fontSize="20"
        fontWeight="800"
        fontFamily="'Exo 2', Arial, sans-serif"
      >
        ₵
      </text>
    </svg>
  );
};
