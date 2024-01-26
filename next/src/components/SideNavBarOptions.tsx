import Link from "next/link";
import { IconType } from 'react-icons';

interface SideNavBarOptionsProps {
    title: string;
    icon: IconType;
    link: string;
}

const SideNavBarOptions = ({title, icon: Icon, link}: SideNavBarOptionsProps) => {

    return (
        <Link href={link} className="flex flex-row items-center p-4">
        <Icon size={25}/>
        <h3 className="font-semibold pl-4 text-sm">{title}</h3>
        </Link>
    );
};

export default SideNavBarOptions;