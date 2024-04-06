import { useState } from 'react';

const useField = (type: string) => {
  const [value, setValue] = useState('');

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setValue(e.target.value);
  const onReset = () => setValue('');

  return {
    type,
    value,
    onChange,
    onReset,
  };
};

export default useField;
