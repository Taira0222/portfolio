export type ScrollToSectionOptions = {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  fallbackToTop?: boolean;
};

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

export const scrollToSection = (
  sectionId: string,
  { behavior = 'smooth', block = 'start', fallbackToTop = sectionId !== 'top' }: ScrollToSectionOptions = {}
) => {
  if (!isBrowser()) return;

  if (sectionId === 'top') {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior, block });
    return;
  }

  if (fallbackToTop) {
    window.scrollTo({ top: 0, behavior });
  }
};
