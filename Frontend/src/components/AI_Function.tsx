import css from "../style/deshboard.module.css";

interface AI_FunctionProps {
  Input: string;
  AIData: string;
}

const AI_Function: React.FC<AI_FunctionProps> = ({ Input , AIData }) => {
  if (!Input) {
    return null;
  }
  return (
    <>
      <div className={css.main}>
        <div className={css.container1}>
          <h1 className={css.title}>{Input}</h1>
        </div>
        <div className={css.container2}>
          <h2 className={css.content}>
            {AIData}
          </h2>
        </div>
      </div>
    </>
  );
};

export default AI_Function;
