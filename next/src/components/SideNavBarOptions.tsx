import Link from "next/link";
import { IconType } from 'react-icons';
import { useNavBarStore } from '../utils/NavBarState';

interface SideNavBarOptionProps {
    title: string;
    icon: IconType;
    link: string;
}

const SideNavBarOptions = ({title, icon: Icon, link}: SideNavBarOptionProps) => {

    const { open } = useNavBarStore();

    return (
        <Link href={link} className="flex flex-row items-center p-4 hover:bg-gray-100 rounded-md">
            <Icon size={25} className="flex-shrink-0"/>
            <h3 className={`font-semibold pl-4 text-sm whitespace-nowrap ${!open && "hidden"}`}>{title}</h3>
        </Link>
    );
};

export default SideNavBarOptions;