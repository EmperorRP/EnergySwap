import Head from "next/head";
import styles from "../styles/Home.module.css";
import TopNav from "../components/TopNav";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
 
  return (
    <div>
      <Head>
        <title>EnergySwap</title>
        <meta name="description" content="Trade your excess electricity for crypto!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} flex flex-col items-center justify-start w-full`}>
        {/* <InstructionsComponent></InstructionsComponent> */}

        <TopNav />
        {/* tradeIconsContainer */}
        <div className="flex items-center justify-center gap-[50px] mt-[60px]">
          {/* icon container */}
          <div className={`${styles.iconContainercircle} bg-backgroundIconContainer border-2 border-black shadow-md flex items-center justify-center rounded-full p-10`}>
            <Image src="/images/spark.svg" alt="spark" width={84} height={174} />
          </div>
          {/* convertionIcons Container*/}
          <div className="flex flex-col items-center justify-center gap-5">
            <Image className={styles.rightSlide} src="/images/convertionRight.svg" alt="convertionRight" width={164} height={29} />
            <Image className={styles.leftSlide} src="/images/convertionLeft.svg" alt="convertionLeft" width={164} height={29} />
          </div>
          {/* icon container */}
          <div className={`${styles.iconContainercircle} bg-backgroundIconContainer border-2 border-black shadow-md flex items-center justify-center rounded-full p-10 font-poppins font-normal font-medium text-[140px] leading-[210px] text-center text-iconContainerDollar`}>
            $
          </div>
        </div>
        {/* subtitle */}
        <div className="font-poppins font-normal font-light text-[24px] leading-[36px] text-center text-white mt-[60px]">
          Trade your excess electricity for crypto!
        </div>
        {/* welcome text */}
        <div className="font-poppins font-semibold text-4xl lg:text-5xl xl:text-6xl leading-[1.5] text-center text-white mt-[12px]">
          Welcome to <span className={styles.welcomeTextGradient}>EnergySwap</span>!
        </div>
        {/* intro text */}
        <div className={"font-poppins font-normal text-light text-[24px] leading-[36px] text-center text-white w-[52%] mt-[37px]"}>
          Buy and Sell your electricity using our decentralized peer-to-peer (P2P) energy trading platform that uses blockchain technology and the Internet of Things (IoT).
        </div>
        {/* get Started Btn */}
        <Link href={`/ConnectWallet`}>
          <button className="bg-[#12AE35] rounded-lg px-[20px] py-[5px] mt-[45px] hover:bg-green-500 font-poppins font-semibold text-[36px] leading-[54px] text-white transition-colors duration-300">
            Get Started
          </button>
        </Link>

        {/* Row */}
        <div
          className={`flex items-center justify-between gap-[36px] w-[90%] mt-[120px]`}>
          {/* row box */}
          <div className={`${styles.boxGradient} z-20 flex items-center justify-center py-[35px] px-[30px] font-poppins font-light text-[40px] leading-[60px] text-white text-center h-[264px]`}>
            Trust, Transparency, Efficiency
          </div>
          {/* row box */}
          <div className={`${styles.boxGradient} z-20 flex items-center justify-center py-[35px] px-[30px] font-poppins font-light text-[40px] leading-[60px] text-white text-center h-[264px]`}>
            Seamless Energy Transactions
          </div>
          {/* row box */}
          <div className={`${styles.boxGradient} z-20 flex items-center justify-center py-[35px] px-[30px] font-poppins font-light text-[40px] leading-[60px] text-white text-center h-[264px]`}>
            Empowering Sustainability
          </div>
        </div>
        {/* How to use Container */}
        {/* heading */}
        <div className="z-20 font-barlow font-semibold text-[60px] leading-[72px] text-white mt-[100px]">
          How to use?
        </div>
        {/* stepContainer */}
        <div className="z-20 flex flex-col items-start justify-center w-[70%] mt-[60px] gap-[20px]">
          {/* step */}
          <div className="flex items-center justify-start gap-[20px]">
            {/* step no. */}
            <div className={`flex items-center justify-center p-[15px] ${styles.numContainer}`}>
              <div className={`flex items-center justify-center font-montserrat font-semibold text-[48px] w-full leading-[58.51px] text-white ${styles.numContainerInner}`}>
                1
              </div>
            </div>
            {/* step text */}
            <div className="font-poppins font-light text-[40px] leading-[60px] text-white">
              Connect Wallet
            </div>
          </div>

          {/* step */}
          <div className="flex items-center justify-start gap-[20px]">
            {/* step no. */}
            <div className={`flex items-center justify-center p-[15px] ${styles.numContainer}`}>
              <div className={`flex items-center justify-center font-montserrat font-semibold text-[48px] w-full leading-[58.51px] text-white ${styles.numContainerInner}`}>
                2
              </div>
            </div>
            {/* step text */}
            <div className="font-poppins font-light text-[40px] leading-[60px] text-white">
              Go to Market page
            </div>
          </div>

          {/* step */}
          <div className="flex items-center justify-start gap-[20px]">
            {/* step no. */}
            <div className={`flex items-center justify-center p-[15px] ${styles.numContainer}`}>
              <div className={`flex items-center justify-center font-montserrat font-semibold text-[48px] w-full leading-[58.51px] text-white ${styles.numContainerInner}`}>
                3
              </div>
            </div>
            {/* step text */}
            <div className="font-poppins font-light text-[40px] leading-[60px] text-white">
              Select Seller and place order!
            </div>
          </div>

        </div>
        {/* get Started Btn 2 */}
        <Link href={`/ConnectWallet`} className="z-20">
          <button className={" border-4 border-borderWalletBtn my-[100px] px-[20px] py-[5px] rounded-lg bg-transparent text-white hover:bg-green-500 hover:text-white font-poppins font-semibold text-[36px] leading-[54px] text-white text-center transition-colors duration-300"}>
            Get Started
          </button>
        </Link>

        <div className={styles.bgPatch1}></div>
        <div className={styles.bgPatch2}></div>
        <div className={styles.bgPatch3Container}>
          <div className={styles.bgPatch3}>
          </div>
        </div>
      </main>
    </div>
  );
}
