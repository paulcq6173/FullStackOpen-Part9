import { IOccupationalHealthcareEntry } from '@/types';
import DiagnosisCodes from './DiagnosisCodes';

const OccupationalHealthcareEntry = ({
  entry,
}: {
  entry: IOccupationalHealthcareEntry;
}) => {
  const {
    description,
    date,
    specialist,
    diagnosisCodes,
    employerName,
    sickLeave,
  } = entry;

  return (
    <div>
      <h4>Occupational Health care</h4>
      <p>{date}</p>
      <p>Name:{employerName}</p>
      {sickLeave && (
        <div>
          <p>sickLeave</p>
          <li>Start: {sickLeave.startDate}</li>
          <li>End: {sickLeave.endDate}</li>
        </div>
      )}
      <p>{description}</p>
      {diagnosisCodes && <DiagnosisCodes diagnosisCodes={diagnosisCodes} />}
      <p>Diagnosed by {specialist}</p>
    </div>
  );
};

export default OccupationalHealthcareEntry;
