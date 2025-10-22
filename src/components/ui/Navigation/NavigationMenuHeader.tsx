import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/Navigation/navigation-menu';
import { navigationMenuTriggerStyle } from './navigationMenuTriggerStyle';
import { sectionLinks, snsLinks } from './navigationLinks';

const snsLinkClass =
  'flex flex-row items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-left transition hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

export const NavigationMenuHeader = () => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="gap-2">
        {sectionLinks.map(({ label, to }) => (
          <NavigationMenuItem key={label}>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to={to}>{label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem className="text-left">
          <NavigationMenuTrigger>SNS</NavigationMenuTrigger>
          <NavigationMenuContent className="md:left-auto md:right-0">
            <ul className="grid min-w-[220px] gap-2 p-2 text-left">
              {snsLinks.map(({ label, href, icon }) => (
                <li key={label} className="list-none">
                  <NavigationMenuLink asChild>
                    <a href={href} target="_blank" rel="noopener noreferrer" className={snsLinkClass}>
                      <img src={icon} alt="" aria-hidden="true" className="h-4 w-4 opacity-80" />
                      {label}
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
