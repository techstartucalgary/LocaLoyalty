import Link from "next/link";
import { IconType } from 'react-icons';
import { useNavBarStore } from '../utils/NavBarState';
import { useNavBarOptionState } from '../utils/NavBarOptionState';

interface SideNavBarOptionProps {
    title: string;
    icon: IconType;
    link: string;
    id: string;
}

const SideNavBarOptions = ({title, icon: Icon, link, id}: SideNavBarOptionProps) => {

    const { open } = useNavBarStore();

    const { activeButton, setActiveButton } = useNavBarOptionState();

    const handleClick = () => {
        if (activeButton !== id) {
        setActiveButton(id);
        }
    };

    return (
        <Link href={link} onClick={handleClick} className={`flex flex-row items-center p-4 hover:bg-gray-100 rounded-md ${activeButton === id ? 'outline outline-2 border-black border-500' : 'border-none'}`}>
            <Icon size={24} className="flex-shrink-0"/>
            <h3 className={`font-semibold pl-4 text-sm whitespace-nowrap ${!open && "hidden"}`}>{title}</h3>
        </Link>
    );
};

export default SideNavBarOptions;