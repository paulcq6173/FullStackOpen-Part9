import { TEntry } from '@/types';
import EntryDetails from './EntryDetails';

const EntryLayout = ({ entries }: { entries: TEntry[] }) => {
  if (entries.length === 0) {
    return (
      <div>
        <p>No entry found</p>
      </div>
    );
  }

  return (
    <div>
      <h3>entries</h3>
      {entries.map((e, i) => (
        <div key={i}>
          <EntryDetails entry={e} />
        </div>
      ))}
    </div>
  );
};

export default EntryLayout;
