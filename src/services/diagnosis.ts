import { Diagnosis } from '@/types';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Array<Diagnosis>>(`${apiBaseUrl}/diagnoses`);

  return data;
};

const getDiagnoseByCode = async (code: string) => {
  const { data } = await axios.get<Diagnosis>(
    `${apiBaseUrl}/diagnoses/${code}`
  );

  return data;
};

export default { getDiagnoseByCode, getAll };
