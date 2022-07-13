import { useContext } from 'react';
import { DockContext } from './DockProvider';

const useDock = () => {
  return useContext(DockContext);
};

export default useDock;
