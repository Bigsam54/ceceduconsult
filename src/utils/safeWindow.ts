/**
 * Utility functions for safe window interactions inside sandboxed iframes.
 */

export function safeOpenUrl(url: string): void {
  if (typeof window === 'undefined') return;
  try {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch {
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // Ignore if iframe policy prevents opening popup
    }
  }
}

export function safeScrollToTop(): void {
  if (typeof window === 'undefined') return;
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch {
    // Ignore cross-origin or sandboxed scroll errors
  }
}
