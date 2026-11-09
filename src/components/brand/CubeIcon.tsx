export function CubeIcon({ className = "w-9 h-9" }: { className?: string }) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none">
        <path d="M12 2L20 6.5L12 11L4 6.5L12 2Z" fill="#0D9488" />
        <path d="M4 6.5L12 11V20.5L4 16V6.5Z" fill="#1E1B4B" />
        <path d="M12 11L20 6.5V16L12 20.5V11Z" fill="#D97706" />
        <circle cx="12" cy="11" r="1.5" fill="#FFFFFF" opacity="0.8" />
      </svg>
    );
  }