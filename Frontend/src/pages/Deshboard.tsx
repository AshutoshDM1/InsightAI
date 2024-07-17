import Navbar from '@/components/Navbar';
import css from '../style/signup.module.css'

const Deshboard: React.FC = () => {
  return (
    <>
      <div className={`${css.signup_page} h-screen `}>
        <Navbar />
      </div>
    </>
  );
};
export default Deshboard;
