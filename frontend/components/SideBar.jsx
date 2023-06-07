import { useState } from 'react';

import styles from "../styles/SideBar.module.css";
import Link from 'next/link';
import Image from 'next/image';

import {
    useAccount,
    useEnsAvatar,
} from 'wagmi'

export default function SideBar() {

    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ address })

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const formatString = (str) => `${str.slice(0, 5)}....${str.slice(-3)}`;


    return (
        <div
            className={`${styles.background} flex flex-col items-start justify-between transition-all duration-300 ease-in-out min-h-screen ${isExpanded ? 'w-[30%]' : 'w-[8.2%]'
                }`}

            onMouseEnter={toggleSidebar}
            onMouseLeave={toggleSidebar}
        >
            {/* logo Container */}
            <div className="flex items-center justify-start gap-10 mt-[30px] ml-[35px]">
                <Image src="/Logo.svg" alt="logo" width={57} height={64} />
                <div className={`${styles.fadeIn} ${isExpanded ? styles.active : ''} p-4 bg-gray-200 my-4  font-poppins font-normal font-medium text-32 leading-48 text-white`}>EnergySwap</div>
            </div>


            <div className='flex flex-col items-start justify-center'>
                {/* Home Container */}
                <Link href={`/`} className="flex items-center justify-start gap-10 ml-[35px] cursor-pointer"
                >
                    <div className={`${styles.iconContainer} flex items-center justify-center`}>
                        <Image src="images/Home.svg" alt="Home" width={37} height={34} />
                    </div>
                    <div className={`${styles.fadeIn} ${isExpanded ? styles.active : ''} hover:text-green-500 font-poppins font-normal font-medium text-[24px] leading-[36px] text-white ml-[98px]`}>Home</div>
                </Link>

                {/* P2P Container */}
                <Link href={`/P2P`} className="flex items-center justify-start gap-10 mt-[45px] ml-[35px] ">
                    <div className={`${styles.iconContainer} flex items-center justify-center`}>
                        <Image src="images/P2P.svg" alt="P2P" width={37} height={34} />
                    </div>
                    <div className={`${styles.fadeIn} ${isExpanded ? styles.active : ''} hover:text-green-500 font-poppins font-normal font-medium text-[24px] leading-[36px] text-white ml-[98px]`}>P2P</div>
                </Link>

                {/* Dashboard Container */}
                <Link href={`/Dashboard`} className="flex items-center justify-start gap-10 mt-[45px] ml-[35px] ">
                    <div className={`${styles.iconContainer} flex items-center justify-center`}>
                        <Image src="images/Dashboard.svg" alt="Dashboard" width={37} height={34} />
                    </div>
                    <div className={`${styles.fadeIn} ${isExpanded ? styles.active : ''} hover:text-green-500 font-poppins font-normal font-medium text-[24px] leading-[36px] text-white ml-[98px]`}>Dashboard</div>
                </Link>

                {/* About Container */}
                <Link href={`/About`} className="flex items-center justify-start gap-10 mt-[45px] ml-[35px] ">
                    <div className={`${styles.iconContainer} flex items-center justify-center`}>
                        <Image src="images/About.svg" alt="About" width={37} height={34} />
                    </div>
                    <div className={`${styles.fadeIn} ${isExpanded ? styles.active : ''} hover:text-green-500 font-poppins font-normal font-medium text-[24px] leading-[36px] text-white ml-[98px]`}>About</div>
                </Link>
            </div>

            {/* Profile Container */}
            <div className="flex items-center justify-start gap-8 mb-[30px] ml-[35px] ">
                <Image src={ensAvatar != undefined ? ensAvatar : "images/profile.svg"} alt="About" width={64} height={64} />
                <div className={`${styles.fadeIn} ${isExpanded ? styles.active : ''} font-poppins font-normal font-medium text-[24px] leading-[36px] text-white`}>{address != undefined ? formatString(address) : '0x265....82a'}</div>
            </div>
        </div>
    );
};