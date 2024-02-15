import Link from "next/link";
import { usePublicNavBarOptionState } from '../utils/PublicNavBarOptionState';

interface SideNavBarOptionProps {
    title: string;
    link: string;
    id: string;
}

const PublicNavBarOptions = ({title, link, id}: SideNavBarOptionProps) => {

    const { activeButton, setActiveButton } = usePublicNavBarOptionState();

    const handleClick = () => {
        if (activeButton !== id) {
        setActiveButton(id);
        }
    };

    return (
        <Link href={link} onClick={handleClick}>
            <h1 className={`text-lg ${activeButton === id ? 'font-bold underline decoration-[3px] underline-offset-[10px]' : 'font-normal border-none'}`}>{title}</h1>
        </Link>
    );
};

export default PublicNavBarOptions;