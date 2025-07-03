import { handleGoogleSignIn } from "@/pages/Landing";
import { getUserDataFromLocalStorage } from "@/services/api";
import { useState } from "react";

const Navbar: React.FC = () => {

  const [ , setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await handleGoogleSignIn();
      setIsLoading(false);
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const userdata = getUserDataFromLocalStorage();
  return (
    <div className="navbar h-6h sticky top-0 w-full flex justify-between items-center  text-white pr-4 pl-4 pt-4 backdrop-filter backdrop-blur">
      <h1 className="font-bold text-2xl cursor-pointer ">Insight AI</h1>
      <div className="flex gap-5">
        {userdata?.displayName ? (
          <>
            <h1 className="font-light text-xl cursor-pointer mt-2">
              {userdata?.displayName}
            </h1>
            <img
              className="rounded-full h-10 w-10 bg-main cursor-pointer"
              src={userdata?.photoURL}
              alt="avatar"
            />
          </>
        ) : (
          <>
            {" "}
            <button 
              onClick={handleSignIn} 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:shadow-lg"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
