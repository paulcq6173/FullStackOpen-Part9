import axios from 'axios';
import { Patient, PatientFormValues, TEntry, TRegEntry } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (reqId: string, object: TRegEntry) => {
  const { data } = await axios.post<TEntry>(
    `${apiBaseUrl}/patients/${reqId}/entry`,
    object
  );

  return data;
};

const getPatientById = async (reqId: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${reqId}`);

  return data;
};

export default {
  getAll,
  create,
  getPatientById,
  createEntry,
};
