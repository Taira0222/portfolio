import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './sheet';
import { Link } from 'react-router-dom';

export const MobileHamburgerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-6 w-6 text-gray-500 hover:text-gray-700" />
      </SheetTrigger>
      <SheetContent side="left" className="w-48">
        <div className="flex flex-col space-y-4 p-4">
          <Link to="/" className="text-lg">
            Home
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
