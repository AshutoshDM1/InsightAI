import '../App.css'

type CardsProps = {
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const MiniCards: React.FC<CardsProps> = ({text , onClick }) => {
  
  return (
    
    <>
      <div 
      onClick={onClick}
      className={`h-36 rounded-2xl w-px p-3 bg-zinc-800 cursor-pointer hover:bg-zinc-600 ease-in-out duration-200 `}>
        <h1 className='text-white font-semibold text-base'  >{text}</h1>
      </div>
    </>
  );
};
export default MiniCards;
