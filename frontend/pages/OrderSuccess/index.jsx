import Head from "next/head";
import styles from "../../styles/OrderSuccess.module.css";
import SideBar from "../../components/SideBar";
import Image from "next/image";

export default function OrderSuccess() {


    return (
        <div>
            <Head>
                <title>Order Success</title>
                <meta name="description" content="Thanks for using EnergySwap" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SideBar />
            <main className={`${styles.main} flex flex-col items-center justify-start ml-[8.2%]`}>
                {/* container */}
                <div className={`${styles.container} z-20 flex flex-col items-center justify-start w-[90%] my-[60px]`}>
                    {/* headning */}
                    <div className="font-barlow font-normal text-white text-[56px] leading-[67px] text-center mt-[50px]">Order Successful</div>
                    {/* tick */}
                    <Image src="/images/tick.svg" alt="spark" width={212} height={159} className="mt-[40px]"/>
                    {/* thanks text */}
                    <div className="font-barlow font-normal text-white text-[56px] leading-[42px] text-center mt-[75px]">Thanks for using EnergySwap</div>
                    {/* transaction text */}
                    <div className="font-barlow font-normal text-white text-[40px] leading-[30px] text-center mt-[40px]">Please find your transaction here:</div>
                    {/* transaction link */}
                    <div className="font-poppins font-bold text-[24px] text-center leading-[36px] underline text-white cursor-pointer hover:text-green-500 mt-[70px]">Transaction Link</div>
                </div>

                <div className={styles.bgPatch1}></div>
                <div className={styles.patch2Container}>
                    <div className={styles.bgPatch2}></div>
                </div>
            </main>
        </div>)
}