import { useEffect, useState } from "react";

/** Lives in the shared root, so changing pages cannot restart the opening logo. */
export function StartupSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let active = true;
    const hide = () => { if (active) setVisible(false); };
    // No artificial minimum delay and no waiting for images or background requests.
    const timeout = window.setTimeout(hide, 800);
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    void fontsReady.then(hide, hide);
    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, []);

  if (!visible) return null;
  return (
    <div id="app-splash" role="status" aria-label="Uygulama açılıyor">
      <img src="/logo.png" alt="" width={112} height={112} />
      <span className="app-splash-bar" />
    </div>
  );
}