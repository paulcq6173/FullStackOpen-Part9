import { useAppSelector } from '@/reducers/hooks';
import { selectNotify } from '@/reducers/notifySlice';

const NotifyHandler = () => {
  const { message, success } = useAppSelector(selectNotify);

  if (!message) {
    return null;
  }

  const color = success ? 'green' : 'red';
  const inlineStyle = {
    border: `2px solid ${color}`,
    borderRadius: '5px',
    color,
  };

  return (
    <div
      style={{
        border: '2px solid gray',
        borderRadius: '5px',
        backgroundColor: 'lightyellow',
      }}
    >
      <div style={inlineStyle}>{message}</div>
    </div>
  );
};

export default NotifyHandler;
