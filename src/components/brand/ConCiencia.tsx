interface ConCienciaProps {
    mode?: "modular" | "inline";
    className?: string;
  }
  
  export function ConCiencia({ mode = "modular", className = "" }: ConCienciaProps) {
    if (mode === "inline") {
      return (
        <span className={`inline-flex items-baseline font-display ${className}`}>
          <span>con</span>
          <span className="font-bold text-salvia-700">ciencia</span>
        </span>
      );
    }
  
    return (
      <span className={`inline-flex items-center font-display align-baseline ${className}`}>
        <span>con</span>
        <span className="ml-[0.1em] inline-flex items-center font-bold text-salvia-700 leading-none tracking-normal shadow-xs">
          ciencia
        </span>
      </span>
    );
  }