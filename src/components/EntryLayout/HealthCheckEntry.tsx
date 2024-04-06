import { HealthCheckRating, IHealthCheckEntry } from '@/types';
import DiagnosisCodes from './DiagnosisCodes';

const HealthCheckEntry = ({ entry }: { entry: IHealthCheckEntry }) => {
  const { description, date, specialist, diagnosisCodes, healthCheckRating } =
    entry;
  const result = HealthCheckRating[healthCheckRating];

  return (
    <div>
      <h4>Health Check Result</h4>
      <p>{date}</p>
      <p>result: {result}</p>
      <p>{description}</p>
      {diagnosisCodes && <DiagnosisCodes diagnosisCodes={diagnosisCodes} />}
      <p>Diagnosed by {specialist}</p>
    </div>
  );
};

export default HealthCheckEntry;
