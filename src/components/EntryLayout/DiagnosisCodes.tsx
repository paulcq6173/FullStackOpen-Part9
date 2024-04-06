import diagnoseService from '@/services/diagnosis';
import { Diagnosis } from '@/types';
import { useEffect, useState } from 'react';

const DiagnosisCodes = ({
  diagnosisCodes,
}: {
  diagnosisCodes: Array<Diagnosis['code']>;
}) => {
  const [diagnoses, setDiagnoses] = useState<Array<Diagnosis>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allData = await diagnoseService.getAll();
      setDiagnoses(allData);
    };

    fetchData();
  }, []);

  if (diagnoses.length === 0) {
    return <div>Waiting for diagnoses loading</div>;
  }

  return (
    <ul>
      {diagnosisCodes.map((code, i) => (
        <li key={i}>
          {code} {diagnoses.find((e) => e.code === code)?.name}
        </li>
      ))}
    </ul>
  );
};

export default DiagnosisCodes;
