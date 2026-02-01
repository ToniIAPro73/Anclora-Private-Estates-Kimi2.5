import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative flex items-center justify-center
        w-12 h-12 rounded-full
        transition-all duration-500 ease-out
        border
        ${isDark 
          ? 'bg-anclora-teal-bg border-white/20 text-anclora-gold hover:border-anclora-gold/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
          : 'bg-white border-anclora-navy/10 text-anclora-gold hover:border-anclora-gold/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]'
        }
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Sun Icon */}
      <Sun 
        className={`
          absolute w-5 h-5
          transition-all duration-500 ease-out
          ${isDark 
            ? 'opacity-0 rotate-90 scale-0' 
            : 'opacity-100 rotate-0 scale-100'
          }
        `}
      />
      
      {/* Moon Icon */}
      <Moon 
        className={`
          absolute w-5 h-5
          transition-all duration-500 ease-out
          ${isDark 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-90 scale-0'
          }
        `}
      />

      {/* Glow effect */}
      <span 
        className={`
          absolute inset-0 rounded-full
          transition-opacity duration-500
          ${isDark 
            ? 'bg-gradient-radial from-anclora-gold/10 to-transparent opacity-0' 
            : 'bg-gradient-radial from-anclora-gold/20 to-transparent opacity-100'
          }
        `}
      />
    </button>
  );
}

// Alternative: Compact toggle with sliding animation
export function ThemeToggleCompact() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative flex items-center
        w-14 h-7 rounded-full p-1
        transition-all duration-500 ease-out
        ${isDark 
          ? 'bg-anclora-teal-bg border border-white/20' 
          : 'bg-anclora-gold/20 border border-anclora-gold/30'
        }
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Track icons */}
      <Sun className="absolute left-1.5 w-3.5 h-3.5 text-anclora-gold opacity-50" />
      <Moon className="absolute right-1.5 w-3.5 h-3.5 text-anclora-gold opacity-50" />
      
      {/* Sliding thumb */}
      <span
        className={`
          relative w-5 h-5 rounded-full
          bg-anclora-gold shadow-lg
          transition-all duration-500 ease-out
          flex items-center justify-center
          ${isDark ? 'translate-x-7' : 'translate-x-0'}
        `}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-anclora-teal" />
        ) : (
          <Sun className="w-3 h-3 text-anclora-teal" />
        )}
      </span>
    </button>
  );
}
