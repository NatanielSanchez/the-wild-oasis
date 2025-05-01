import { useEffect } from "react";

// execute the callback when a key is pressed
export function useKey(key, callback) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key.toLowerCase() === key.toLowerCase()) callback?.();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [key, callback]);
}
