
const Navbar: React.FC = () => {
  return (
    <div className="navbar h-6h sticky top-0 w-full flex justify-between bg-main text-white pr-4 pl-4 pt-4">
      <h1 className="font-bold text-2xl cursor-pointer ">Insigh AI</h1>
      <div className="flex gap-5" >
        <h1 className="font-light text-xl cursor-pointer ">Signup</h1>
        <h1 className="font-light text-xl cursor-pointer ">FAQ</h1>
      </div>
    </div>
  );
};
export default Navbar;
