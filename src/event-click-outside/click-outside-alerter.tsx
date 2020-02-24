import React, { useEffect } from "react";


export function useClickOutsideAlerter(ref: React.RefObject<any>, onClickOutside: (e: any) => void) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event: any) {
    if (ref.current && !ref.current.contains(event.target) && onClickOutside)
      onClickOutside(event);
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}
