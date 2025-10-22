import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../sheet';
import { sectionLinks, snsLinks } from './navigationLinks';

export const MobileHamburgerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open navigation menu"
        className="rounded-md p-1.5 text-foreground/80 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="left" className="w-60">
        <nav className="flex flex-col gap-5 p-4">
          <div className="flex flex-col gap-3">
            {sectionLinks.map(({ label, to }) => (
              <SheetClose key={label} asChild>
                <Link
                  to={to}
                  className="text-base font-medium text-foreground transition hover:text-primary"
                >
                  {label}
                </Link>
              </SheetClose>
            ))}
          </div>

          <div className="space-y-2 border-t border-border/40 pt-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              SNS
            </span>
            <ul className="flex flex-col gap-2">
              {snsLinks.map(({ label, href, icon }) => (
                <li key={label}>
                  <SheetClose asChild>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-base font-medium text-foreground transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <img src={icon} alt="" aria-hidden="true" className="h-5 w-5 opacity-80" />
                      {label}
                    </a>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
