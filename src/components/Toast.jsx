import { useEffect } from 'react';
import '../css/Toast.css'; 

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); 
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">×</button>
    </div>
  );
}

export default Toast;


