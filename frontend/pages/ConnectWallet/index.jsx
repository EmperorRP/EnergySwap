import Head from "next/head";
import styles from "../../styles/ConnectWallet.module.css";
import TopNav from "../../components/TopNav";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
    useBalance,
    useNetwork
} from 'wagmi'


export default function ConnectWallet() {

    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { data: balance, isLoading, error, refetch } = useBalance({ address })
    const { chain } =
        useNetwork()

    const [walletConnected, setWalletConnected] = useState(false);

    useEffect(() => {
        if (isConnected) {
            setWalletConnected(true)
        }
        else {
            setWalletConnected(false)
        }

    }, [isConnected])

    return (
        <div>
            <Head>
                <title>ConnectWallet</title>
                <meta name="description" content="ConnectWallet" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main} flex flex-col items-center justify-start`}>
                <TopNav />

                {!walletConnected ?
                    (<>
                        {/* Instructionscontainer */}
                        < div className="z-20 flex flex-col items-start justify-start w-[70%] mt-[60px]">
                            {/* heading */}
                            <div className="font-poppins font-bold text-[48px] leading-[72px] text-white">Instructions:</div>
                            {/* instruction */}
                            <div className="flex items-start justify-start gap-[20px] font-poppins font-normal text-[32px] leading-[48px] text-white w-[81%] px-[20px] mt-[50px]">
                                <div>1.</div>
                                <div>
                                    Click on ‘connect wallet’ to establish a connection with your wallet
                                </div>
                            </div>
                            {/* instruction */}
                            <div className="flex items-start justify-start gap-[20px] font-poppins font-normal text-[32px] leading-[48px] text-white w-[81%] px-[20px] mt-[50px]">
                                <div>2.</div>
                                <div>
                                    Once your wallet is connected, click on the ‘Go to Dashboard’ below. It will turn green once a wallet connection has been established.
                                </div>
                            </div>
                        </div>
                        {/* dashbord btn disabled*/}
                        <button className={"z-20 border-4 border-[#787878] px-[40px] py-[5px] my-[120px] rounded-lg bg-transparent font-poppins font-bold text-[32px] leading-[48px] text-[#787878] text-center"}>
                            Go to Dashboard
                        </button>
                    </>
                    ) :

                    (<>
                        {/* Info Container */}
                        < div className="flex flex-col items-center justify-center mt-[60px]" >
                            {/* details */}
                            < div className="z-20 font-poppins font-bold text-[32px] leading-[48px] text-white" >
                                {ensAvatar != undefined &&
                                    <>
                                        <img src={ensAvatar} alt="ENS Avatar" /><br />
                                    </>
                                }
                                {ensName != null &&
                                    <>
                                        <span className="font-normal">Name: </span>{ensName}<br />
                                    </>
                                }
                                <span className="font-normal">Address: </span>{address}<br />
                                {balance != undefined &&
                                    <>
                                        <span className="font-normal">Balance: </span>{balance?.formatted + ' ' + balance?.symbol}<br />
                                    </>}
                                <span className="font-normal">Network: </span>{chain?.name}<br />
                            </div >
                        </div >
                        {/* dashbord btn enabled*/}
                        <Link href={`/Dashboard`} className="z-20">
                            < button className={"border-4 border-borderWalletBtn px-[40px] py-[5px] my-[120px] rounded-lg bg-transparent hover:bg-green-500 hover:text-white font-poppins font-bold text-[32px] leading-[48px] text-white text-center transition-colors duration-300"} >
                                Go to Dashboard
                            </button >
                        </Link>
                    </>
                    )
                }
                <div className={styles.bgPatch1}></div>
                <div className={styles.bgPatch2Container}>
                    <div className={styles.bgPatch2}></div>
                </div>
            </main >
        </div >
    )
}