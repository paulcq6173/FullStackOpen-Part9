import { HealthCheckRating, TEntry } from '@/types';
import { validNumberEnum } from '@/utils/typeHelper';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

const EntryComponent: React.FC<{ entry: TEntry }> = ({ entry }) => {
  const assertNever = (param: never) => {
    throw new Error('Unexpected value: ' + param);
  };

  // Type checks
  switch (entry.type) {
    case 'HealthCheck':
      const rating = entry.healthCheckRating;
      const typeSafe = validNumberEnum(HealthCheckRating, rating);
      if (!typeSafe) {
        throw new Error('Unexpected value: ' + rating);
      }

      return <HealthCheckEntry entry={entry} />;
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const EntryDetails = ({ entry }: { entry: TEntry }) => {
  return (
    <div
      style={{
        border: '2px solid black',
        borderRadius: '5px',
        margin: '4px',
        padding: '4px',
      }}
    >
      <EntryComponent entry={entry} />
    </div>
  );
};

export default EntryDetails;
