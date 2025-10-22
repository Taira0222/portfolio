import type { KeywordEntry } from '../../tokens';

type KeywordLabelProps = {
  entry: KeywordEntry;
};

export const KeywordLabel = ({ entry }: KeywordLabelProps) => {
  if (!entry.mobileLabel) {
    return <span className="uppercase">{entry.label}</span>;
  }

  return (
    <>
      <span className="uppercase md:hidden">{entry.mobileLabel}</span>
      <span className="hidden uppercase md:inline">{entry.label}</span>
    </>
  );
};
