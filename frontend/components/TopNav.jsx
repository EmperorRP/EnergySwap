import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from 'next/router';

export default function TopNav() {

    const router = useRouter();
    const currentUrl = router.asPath;

    return (
        <div className="flex items-center justify-between w-full p-10">
            {/* logo */}
            <Link href={`/`} className="flex items-center justify-center gap-6">
                <Image src="/logo.svg" alt="logo" width={57} height={64} />
                <div className={"font-poppins font-normal font-medium text-32 leading-48 text-white"}>EnergySwap</div>
            </Link>

            {/* connect btn */}
            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                }) => {
                    // Note: If your app doesn't use authentication, you
                    // can remove all 'authenticationStatus' checks
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                            authenticationStatus === 'authenticated');

                    return (
                        <div
                            {...(!ready && {
                                'aria-hidden': true,
                                'style': {
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                },
                            })}
                        >
                            {(() => {

                                if (!connected && currentUrl == '/') {
                                    return (
                                        <Link href={`/ConnectWallet`} className="flex items-center justify-center gap-6">
                                            <button className={"border-4 border-borderWalletBtn rounded-lg bg-transparent text-white hover:bg-green-500 hover:text-white font-poppins font-normal font-semibold text-24 leading-36 text-center px-4 py-2 transition-colors duration-300"}>
                                                Connect Wallet
                                            </button>
                                        </Link>
                                    );
                                }

                                if (!connected) {
                                    return (
                                        <button
                                            className="text-white hover:text-green-500 font-poppins font-normal font-semibold text-[32px] leading-[48px] text-center px-4 py-2 transition-colors duration-300"

                                            onClick={openConnectModal} type="button">
                                            connect wallet
                                        </button>
                                    );
                                }

                                if (chain.unsupported) {
                                    return (
                                        <button onClick={openChainModal} type="button">
                                            Wrong network
                                        </button>
                                    );
                                }

                                if (currentUrl == '/') {
                                    return (

                                        <Link href={`/ConnectWallet`}
                                            className="text-white hover:text-green-500 font-poppins font-normal font-semibold text-[32px] leading-[48px] text-center px-4 py-2 transition-colors duration-300"
                                            type="button">
                                            connected wallet
                                        </Link>
                                    )
                                }

                                return (
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <button

                                            className="text-white hover:text-green-500 font-poppins font-normal font-semibold text-[32px] leading-[48px] text-center px-4 py-2 transition-colors duration-300"

                                            onClick={openChainModal}
                                            style={{ display: 'flex', alignItems: 'center' }}
                                            type="button"
                                        >
                                            {chain.hasIcon && (
                                                <div
                                                    style={{
                                                        background: "tranparent",
                                                        width: "40px", height: "40px",
                                                        borderRadius: 999,
                                                        overflow: 'hidden',
                                                        marginRight: 4,
                                                    }}
                                                >
                                                    {chain.iconUrl && (
                                                        <img
                                                            alt={chain.name ?? 'Chain icon'}
                                                            src={chain.iconUrl}
                                                            style={{ width: "40px", height: "40px" }}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {chain.name}
                                        </button>

                                        <button

                                            className="text-white hover:text-green-500 font-poppins font-normal font-semibold text-[32px] leading-[48px] text-center px-4 py-2 transition-colors duration-300"
                                            onClick={openAccountModal} type="button">
                                            {account.displayName}<br />
                                            {/* {account.displayBalance
                                                        ? ` (${account.displayBalance})`
                                                        : ''} */}
                                            connected wallet
                                        </button>
                                    </div>
                                );
                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        </div>
    );
}