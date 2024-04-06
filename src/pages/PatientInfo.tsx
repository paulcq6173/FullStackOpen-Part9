import EntryLayout from '@/components/EntryLayout';
import EntryForm from '@/components/EntryLayout/EntryForm';
import patientService from '@/services/patients';
import { Patient, TEntry } from '@/types';
import NotifyHandler from '@/utils/notifyHandler';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PatientInfo = () => {
  const [entries, setEntries] = useState<Array<TEntry>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [patient, setPatient] = useState<Patient>();
  const [option, setOption] = useState('HealthCheck');
  const pathname = useLocation().pathname;
  const patientId = pathname.split('/')[2];

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setOption(e.target.value);
  };

  const ToggleEntryForm = () => {
    const inlineBTN = {
      border: '2px solid darkgoldrod',
      borderRadius: '2px',
      color: 'white',
      backGroundColor: 'goldrod',
    };

    if (open) {
      return (
        <EntryForm
          entryOption={option}
          patientId={patientId}
          setOpen={setOpen}
          entries={entries}
          setEntries={setEntries}
        />
      );
    }

    return (
      <button style={inlineBTN} onClick={() => setOpen(true)}>
        show form
      </button>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await patientService.getPatientById(patientId);
      if (!data) {
        return;
      }
      setPatient(data);
      setEntries(data.entries);
    };

    fetchData();
  }, [patientId]);

  if (!patient) {
    return <div>Loading Now</div>;
  }

  return (
    <div>
      <NotifyHandler />
      <h1>{patient?.name}</h1>
      <p>gender:{patient?.gender}</p>
      <p>ssn:{patient?.ssn}</p>
      <p>occupation:{patient?.occupation}</p>
      <div>
        <label>Entry Option:</label>
        <label>
          <input
            type="radio"
            name="entry1"
            value="HealthCheck"
            checked={option === 'HealthCheck' ? true : false}
            onChange={handleChange}
          />
          Health Check
        </label>

        <label>
          <input
            type="radio"
            name="entry2"
            value="Hospital"
            checked={option === 'Hospital' ? true : false}
            onChange={handleChange}
          />
          Hospital
        </label>

        <label>
          <input
            type="radio"
            name="entry3"
            value="OccupationalHealthcare"
            checked={option === 'OccupationalHealthcare' ? true : false}
            onChange={handleChange}
          />
          Occupational Health care
        </label>
      </div>
      <ToggleEntryForm />
      <EntryLayout entries={entries} />
    </div>
  );
};

export default PatientInfo;
