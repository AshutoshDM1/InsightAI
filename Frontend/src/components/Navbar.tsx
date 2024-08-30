import { getUserDataFromLocalStorage } from "@/services/api";

const Navbar: React.FC = () => {
  const userdata = getUserDataFromLocalStorage();
  return (
    <div className="navbar h-6h sticky top-0 w-full flex justify-between items-center  text-white pr-4 pl-4 pt-4 backdrop-filter backdrop-blur">
      <h1 className="font-bold text-2xl cursor-pointer ">Insigh AI</h1>
      <div className="flex gap-5">
        {userdata?.displayName ? (
          <>
            <h1 className="font-light text-xl cursor-pointer mt-2">
              {userdata?.displayName}
            </h1>
            <img
              className=" rounded-full h-10 w-10 bg-main cursor-pointer "
              src={userdata?.photoURL}
              alt="avatar"
            />
          </>
        ) : (
          <>
            {" "}
            <h1 className="font-light text-xl cursor-pointer ">Signup</h1>
            <h1 className="font-light text-xl cursor-pointer ">FAQ</h1>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
