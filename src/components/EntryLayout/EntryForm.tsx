import useField from '@/hooks/useField';
import { useAppDispatch } from '@/reducers/hooks';
import { resetNotify, setNotify } from '@/reducers/notifySlice';
import patientService from '@/services/patients';
import { HealthCheckRating, TEntry, TRegEntry } from '@/types';
import ErrorHandler from '@/utils/errorHandler';
import { SetStateAction } from 'react';

interface IProps {
  entryOption: string;
  patientId: string;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  entries: Array<TEntry>;
  setEntries: React.Dispatch<SetStateAction<Array<TEntry>>>;
}

const EntryForm = ({
  entryOption,
  patientId,
  entries,
  setOpen,
  setEntries,
}: IProps) => {
  const dispatch = useAppDispatch();
  const useDesc = useField('text');
  const useDate = useField('date');
  const useSpecialist = useField('text');
  const useDiagnosis = useField('text');
  const useHealthCheck = useField('number');
  const useDischargeDate = useField('date');
  const useDischargeCrit = useField('text');
  const useEmployer = useField('text');
  const useSickLeaveStart = useField('date');
  const useSickLeaveEnd = useField('date');
  const inlineFormDiv = {
    display: 'grid',
    gridTemplateColumn: '1fr 1fr',
    border: '2px solid gray',
    borderRadius: '5px',
    margin: '0px',
    padding: '5px',
  };
  const inlineInput = {
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    outline: 'none',
    color: 'white',
  };
  let formTitle: string = 'New Health Check Entry';

  switch (entryOption) {
    case 'HealthCheck':
      break;
    case 'Hospital':
      formTitle = 'New Hospital Entry';
      break;
    case 'OccupationalHealthcare':
      formTitle = 'New Occupational Health care Entry';
      break;
    default:
      throw new Error('Incorrect entry type found');
  }

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const description = useDesc.value;
    const date = useDate.value;
    const specialist = useSpecialist.value;
    const diagnosiString = useDiagnosis.value;
    let diagnosisCodes: string[] = [];
    if (diagnosiString) {
      diagnosisCodes = diagnosiString.split(',');
    }

    let specEntry;
    let response: TEntry;

    switch (entryOption) {
      case 'HealthCheck':
        const type1: 'HealthCheck' = entryOption;
        const healthCheckRating: HealthCheckRating = Number(
          useHealthCheck.value
        );
        specEntry = { type: type1, healthCheckRating };
        break;
      case 'Hospital':
        const type2: 'Hospital' = entryOption;
        const date = useDischargeDate.value;
        const criteria = useDischargeCrit.value;
        if (!date || !criteria) {
          dispatch(
            setNotify({ message: 'Fields of Discharge cannot be blank' })
          );
          setTimeout(() => {
            dispatch(resetNotify());
          }, 5000);
          return;
        }
        specEntry = {
          type: type2,
          discharge: {
            date,
            criteria,
          },
        };
        break;
      case 'OccupationalHealthcare':
        const type3: 'OccupationalHealthcare' = entryOption;
        const employerName = useEmployer.value;
        const startDate = useSickLeaveStart.value;
        const endDate = useSickLeaveEnd.value;
        if ((startDate && !endDate) || (!startDate && endDate)) {
          dispatch(setNotify({ message: 'Fields of Sick Leave not filled' }));
          setTimeout(() => {
            dispatch(resetNotify());
          }, 5000);
          return;
        } else if (startDate && endDate) {
          specEntry = {
            type: type3,
            employerName,
            sickLeave: {
              startDate,
              endDate,
            },
          };
        } else {
          specEntry = { type: type3, employerName };
        }
        break;
    }

    const toRegEntry: TRegEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
      ...specEntry,
    };

    try {
      response = await patientService.createEntry(patientId, toRegEntry);
    } catch (error: unknown) {
      ErrorHandler(error);
      return;
    }

    if (!response) {
      dispatch(setNotify({ message: 'Failed to create new entry' }));
      setTimeout(() => {
        dispatch(resetNotify());
      }, 5000);
      return;
    }

    useDesc.onReset();
    useDate.onReset();
    useSpecialist.onReset();
    useDiagnosis.onReset();
    useHealthCheck.onReset();
    useDischargeDate.onReset();
    useDischargeCrit.onReset();
    useEmployer.onReset();
    useSickLeaveStart.onReset();
    useSickLeaveEnd.onReset();

    setEntries(entries.concat(response));
    dispatch(setNotify({ message: 'new entry created', success: true }));
    setTimeout(() => {
      dispatch(resetNotify());
    }, 5000);
  };

  return (
    <div style={inlineFormDiv}>
      <form onSubmit={submit}>
        <div>
          <h2>{formTitle}</h2>
        </div>
        <label>Description</label>
        <div>
          <input style={inlineInput} name="description" {...useDesc} />
        </div>
        <label>Date</label>
        <div>
          <input style={inlineInput} name="date" {...useDate} />
        </div>
        <label>Specialist</label>
        <div>
          <input style={inlineInput} name="specialist" {...useSpecialist} />
        </div>
        {entryOption === 'HealthCheck' && (
          <div>
            <label>Health Check Rating</label>
            <div>
              <input
                style={inlineInput}
                min="0"
                max="3"
                name="healthcheck"
                {...useHealthCheck}
              />
            </div>
          </div>
        )}
        <label>Diagnosis codes</label>
        <div>
          <input style={inlineInput} name="diagnosisCodes" {...useDiagnosis} />
        </div>
        {entryOption === 'OccupationalHealthcare' && (
          <div>
            <label>Employer Name</label>
            <div>
              <input style={inlineInput} name="employerName" {...useEmployer} />
            </div>
            <div>
              <h3>Sick Leave</h3>
              <label>Start Date</label>
              <div>
                <input
                  style={inlineInput}
                  name="employerName"
                  {...useSickLeaveStart}
                />
              </div>

              <label>End Date</label>
              <div>
                <input
                  style={inlineInput}
                  name="employerName"
                  {...useSickLeaveEnd}
                />
              </div>
            </div>
          </div>
        )}
        {entryOption === 'Hospital' && (
          <div>
            <h3>Discharge</h3>
            <label>Date</label>
            <div>
              <input
                style={inlineInput}
                name="dischargeDate"
                {...useDischargeDate}
              />
            </div>

            <label>Criteria</label>
            <div>
              <input
                style={inlineInput}
                name="dischargeCrit"
                {...useDischargeCrit}
              />
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button>create</button>
          <button onClick={() => setOpen(false)}>cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;
