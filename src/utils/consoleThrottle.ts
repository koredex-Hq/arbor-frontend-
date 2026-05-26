/**
 * Console Throttling Utility
 * 
 * Intercepts console.error and console.warn to prevent "error storms" 
 * from crashing the browser tab by limiting the number of logs per second.
 */

const LOG_LIMIT_PER_SECOND = 10;
const logCounts: Record<string, { count: number; timestamp: number }> = {};

function shouldThrottle(type: string): boolean {
  const now = Date.now();
  if (!logCounts[type] || now - logCounts[type].timestamp > 1000) {
    logCounts[type] = { count: 1, timestamp: now };
    return false;
  }

  logCounts[type].count++;
  return logCounts[type].count > LOG_LIMIT_PER_SECOND;
}

export function initConsoleThrottle() {
  const originalError = console.error;
  const originalWarn = console.warn;

  console.error = (...args: any[]) => {
    if (!shouldThrottle("error")) {
      originalError(...args);
    } else if (logCounts["error"].count === LOG_LIMIT_PER_SECOND + 1) {
      originalError("[Throttle] Error storm detected. Further errors suppressed for this second.");
    }
  };

  console.warn = (...args: any[]) => {
    if (!shouldThrottle("warn")) {
      originalWarn(...args);
    } else if (logCounts["warn"].count === LOG_LIMIT_PER_SECOND + 1) {
      originalWarn("[Throttle] Warning storm detected. Further warnings suppressed for this second.");
    }
  };

  console.log("[Throttle] Console throttling initialized.");
}
