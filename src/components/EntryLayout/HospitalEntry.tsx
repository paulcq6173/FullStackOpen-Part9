import { IHospitalEntry } from '@/types';
import DiagnosisCodes from './DiagnosisCodes';

const HospitalEntry = ({ entry }: { entry: IHospitalEntry }) => {
  const { description, date, specialist, diagnosisCodes, discharge } = entry;
  return (
    <div>
      <h4>Hospital Entry</h4>
      <p>{date}</p>
      <p>{description}</p>
      {diagnosisCodes && <DiagnosisCodes diagnosisCodes={diagnosisCodes} />}
      <p>Diagnosed by {specialist}</p>
      <h4>discharge</h4>
      <ul>
        <li>{discharge.date}</li>
        <li>{discharge.criteria}</li>
      </ul>
    </div>
  );
};

export default HospitalEntry;
