import '../App.css'

type CardsProps = {
  text :string,
 }

const MiniCards: React.FC<CardsProps> = ({text}) => {
  
  return (
    
    <>
      <div className={`h-70h rounded-2xl w-10w p-3 bg-zinc-800 cursor-pointer hover:bg-zinc-600 ease-in-out duration-200`}>
        <h1 className='text-white font-semibold text-base' >{text}</h1>
      </div>
    </>
  );
};
export default MiniCards;
