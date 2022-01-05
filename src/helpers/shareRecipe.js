import copy from 'clipboard-copy';
import { toast } from 'react-toastify';

const shareRecipe = ({ pathname }) => {
  const linkToShare = pathname.split('/in-progress').shift();
  copy(`http://localhost:3000${linkToShare}`);
  toast.success('Link copiado!');
};

export default shareRecipe;
