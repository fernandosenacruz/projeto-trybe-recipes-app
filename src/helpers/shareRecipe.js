import copy from 'clipboard-copy';
import { toast } from 'react-toastify';

const shareRecipe = ({ pathname }) => {
  copy(`http://localhost:3000${pathname}`);
  toast.success('Link copiado!');
};

export default shareRecipe;
