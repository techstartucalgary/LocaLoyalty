import { UserButton, SignedOut } from "@clerk/nextjs";
import { FaRegBell } from "react-icons/fa";

const NotifAccount = () => {
  return (
    <>
    <div className="text-black flex flex-row items-center gap-4 px-6 pt-6">
        <button>
            <FaRegBell size={24} className="flex-shrink-0"/>
        </button>
        <UserButton afterSignOutUrl="/" />
    </div>
    </>
  );
};

export default NotifAccount;