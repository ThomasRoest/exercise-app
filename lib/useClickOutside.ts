import { useEffect, useLayoutEffect, useRef } from "react";

type CallbackFunction = (event: MouseEvent | TouchEvent) => void;

export const useClickOutside = <T extends HTMLElement, >(callback: CallbackFunction) => {
  const ref = useRef<T >(null);
  const refCallback = useRef<CallbackFunction>(callback);

  useLayoutEffect(() => {
    refCallback.current = callback;
  });

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      const element = ref.current;
      const target = event.target as Node;

      if (element && !element.contains(target)) {
        refCallback.current(event);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  return ref;
};
