import Link from "next/link";
import { IconType } from 'react-icons';
import { useNavBarStore } from '../utils/NavBarState';

interface SideNavBarOptionsProps {
    title: string;
    icon: IconType;
    link: string;
}

const SideNavBarOptions = ({title, icon: Icon, link}: SideNavBarOptionsProps) => {

    const { open } = useNavBarStore();

    return (
        <Link href={link} className="flex flex-row items-center p-4">
            <Icon size={25}/>
            <h3 className={`font-semibold pl-4 text-sm ${!open && "hidden"}`}>{title}</h3>
        </Link>
    );
};

export default SideNavBarOptions;