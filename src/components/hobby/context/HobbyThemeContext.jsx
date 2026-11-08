import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "arbin-hobby-theme-mode"; // "light" | "dark" | "system"

const HobbyThemeContext = createContext({
  mode: "system",
  resolvedTheme: "light",
  isDark: false,
  setMode: () => {},
});

const getSystemTheme = () => {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const HobbyThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    if (typeof window === "undefined") return "system";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved;
    }
    return "system";
  });

  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, mode);
    }
  }, [mode]);

  const resolvedTheme = mode === "system" ? systemTheme : mode;
  const isDark = resolvedTheme === "dark";

  const value = useMemo(
    () => ({
      mode,
      resolvedTheme,
      isDark,
      setMode,
    }),
    [mode, resolvedTheme, isDark],
  );

  return (
    <HobbyThemeContext.Provider value={value}>
      <div
        data-hobby-theme={resolvedTheme}
        style={{ colorScheme: resolvedTheme }}
        className="hobby-theme-root transition-colors duration-300"
      >
        {children}
      </div>
    </HobbyThemeContext.Provider>
  );
};

export const useHobbyTheme = () => useContext(HobbyThemeContext);

export const HobbyThemeToggle = ({ variant = "auto", className = "" }) => {
  const { mode, isDark, setMode } = useHobbyTheme();

  // "glass" variant is used on the hero video navbar; "auto" adapts to current page surface
  const isGlass = variant === "glass";

  const containerClass = isGlass
    ? "inline-flex items-center rounded-full border border-white/25 bg-black/30 p-0.5 text-white backdrop-blur-md"
    : isDark
      ? "inline-flex items-center rounded-full border border-[#eef3ef]/15 bg-[#15221d] p-0.5 text-[#eef3ef]"
      : "inline-flex items-center rounded-full border border-[#17231f]/15 bg-[#f3f0e8] p-0.5 text-[#17231f]";

  const options = [
    {
      id: "light",
      label: "Light",
      icon: (
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ),
    },
    {
      id: "dark",
      label: "Dark",
      icon: (
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ),
    },
    {
      id: "system",
      label: "System",
      icon: (
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
  ];

  return (
    <div
      role="group"
      aria-label="Theme mode selector"
      className={`${containerClass} ${className}`}
    >
      {options.map((option) => {
        const active = mode === option.id;
        let btnClass = "";
        if (active) {
          btnClass = isGlass
            ? "bg-white text-[#17231f] shadow-sm"
            : "bg-[#36745e] text-white shadow-sm";
        } else {
          btnClass = isGlass
            ? "text-white/75 hover:text-white"
            : isDark
              ? "text-[#eef3ef]/65 hover:text-[#eef3ef]"
              : "text-[#17231f]/65 hover:text-[#17231f]";
        }

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setMode(option.id)}
            aria-pressed={active}
            title={`${option.label} mode`}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition ${btnClass}`}
          >
            {option.icon}
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

