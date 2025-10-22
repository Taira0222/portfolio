import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import type { PortfolioItem } from '../../constants/data';
import { PortfolioCardDialog } from './PortfolioCardDialog';
import { PortfolioCardTrigger } from './PortfolioCardTrigger';

type PortfolioCardProps = {
  item: PortfolioItem;
};

export const PortfolioCard = ({ item }: PortfolioCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PortfolioCardTrigger item={item} />
      </DialogTrigger>
      <PortfolioCardDialog item={item} />
    </Dialog>
  );
};
