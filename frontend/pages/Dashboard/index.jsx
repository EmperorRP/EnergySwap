import Head from "next/head";
import styles from "../../styles/Dashboard.module.css";
import SideBar from "../../components/SideBar";
import { useState, useEffect } from "react";
import Graph from "../../components/Graph";

import Spinner from "../../components/Spinner";

export default function Dashboard() {

    const [graphOption, setGraphOption] = useState('7d');
    const [mode, setMode] = useState('Buyer');
    const [energyData, setEnergyData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (mode === 'Buyer' || refresh) {
                    const response = await fetch('http://localhost:4000/user/energyData/consumer');
                    const data = await response.json();
                    setEnergyData(data.consumptionData);
                    setRefresh(false)
                } else if (mode === 'Seller') {
                    const response = await fetch('http://localhost:4000/user/energyData/seller');
                    const data = await response.json();
                    setEnergyData(data.productionData);
                }
            } catch (error) {
                console.error('Error fetching energy data:', error);
            }
        };

        fetchData();
    }, [mode, refresh]);




    console.log('EnergyData', energyData)


    return (
        <div className={`${styles.main} flex items-start justify-between`}>
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Dashboard" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SideBar />
            <main className={`${styles.content} flex flex-col items-center justify-start ml-[8.2%]`}>
                {/* main heading */}
                <div className="font-barlow font-bold text-[56px] leading-[67px] text-white w-[90%] mt-[60px]">Dashboard</div>
                {/* switch btn */}
                <div className="flex items-center justify-end mb-[30px] w-[90%]"
                    onClick={() => mode == 'Buyer' ? setMode('Seller') : mode == 'Seller' && setMode('Buyer')}
                >
                    <div className="font-barlow font-normal font-medium text-white text-right pr-[50px] text-[24px] leading-[29px] underline cursor-pointer hover:text-green-500">
                        Switch to {mode == 'Buyer' ? 'seller' : mode == 'Seller' && 'buyer'} mode</div>
                </div>

                {/* Graph */}
                <div className={`${styles.containerGradient} z-20 w-[90%] h-[548px] pb-[80px] pt-[25px] pl-[60px] pr-[50px]`}>
                    {/* topRow */}
                    <div className={`flex items-center justify-between`}>
                        {/* heading text */}
                        <div className="font-barlow font-medium text-white text-[40px] leading-[48px]">
                            {mode == 'Buyer' ? 'Energy Consumption' : mode == 'Seller' && 'Energy Sold'}
                        </div>
                        {/* options container */}
                        <div className={`flex items-center justify-between border-solid border-[1px] border-white p-[3px] h-[47px] rounded-[11px] bg-[#191B1D]`}>
                            {/* option */}
                            <div className={`font-barlow font-normal text-[24px] leading-[29px] text-white rounded-[10px] p-[8px] cursor-pointer ${graphOption == '1h' && 'bg-[#303030]'}`}
                                onClick={() => setGraphOption('1h')}>
                                1h
                            </div>
                            <div className={`font-barlow font-normal text-[24px] leading-[29px] text-white rounded-[10px] p-[8px] cursor-pointer ${graphOption == '24h' && 'bg-[#303030]'}`}
                                onClick={() => setGraphOption('24h')}
                            >
                                24h
                            </div>
                            <div className={`font-barlow font-normal text-[24px] leading-[29px] text-white rounded-[10px] p-[8px] cursor-pointer ${graphOption == '7d' && 'bg-[#303030]'}`}
                                onClick={() => setGraphOption('7d')}>
                                7d
                            </div>
                            <div className={`font-barlow font-normal text-[24px] leading-[29px] text-white rounded-[10px] p-[8px]  cursor-pointer ${graphOption == '1m' && 'bg-[#303030]'}`}
                                onClick={() => setGraphOption('1m')}>
                                1m
                            </div>

                        </div>
                    </div>

                    <Graph format={graphOption} data={energyData} />
                </div>

                {/* bottom Container */}
                <div className={`flex items-start justify-between w-[90%] mt-[75px]`}>
                    {/* history Container */}
                    <div className={`${styles.containerGradient} w-[67%]  flex flex-col items-center justify-start p-[30px] z-20`}>
                        {/* heading */}
                        <div className="font-barlow font-normal text-white text-[40px] leading-[48px] text-center">
                            Transaction History
                        </div>
                        {/* header row */}
                        <div className="flex items-center justify-between w-[80%] mt-[35px]">
                            {/* Col name */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px]">
                                From
                            </div>
                            {/* Col name */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px]">
                                Hash
                            </div>
                            {/* Col name */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px]">
                                Quantity
                            </div>
                            {/* Col name */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px]">
                                Price
                            </div>
                        </div>
                        {/* divider */}
                        <div className="border-[3px] border-solid border-[#525252] rounded-[150px] w-[90%] mt-[25px]" />

                        {/* data row */}
                        <div className="flex items-center justify-between gap-[13%] w-[90%] mt-[33px]">
                            {/* Col entry */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px] w-[200px] ">
                                0x4df...efa
                            </div>
                            {/* Col entry */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px] w-[200px] ">
                                0x6d7f9...
                            </div>
                            {/* Col entry */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px] w-[200px] ">
                                10 NRGT
                            </div>
                            {/* Col entry */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px] w-[200px] ">
                                $7.88
                            </div>
                        </div>

                        {/* data row */}
                        <div className="flex items-center justify-between gap-[13%] w-[90%] mt-[33px]">
                            {/* Col entry */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px] w-[200px] ">
                                0x4df...efa
                            </div>
                            {/* Col entry */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px] w-[200px] ">
                                0x6d7f9...
                            </div>
                            {/* Col entry */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px] w-[200px] ">
                                10 NRGT
                            </div>
                            {/* Col entry */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px] w-[200px] ">
                                $7.88
                            </div>
                        </div>

                        {/* data row */}
                        <div className="flex items-center justify-between gap-[13%] w-[90%] mt-[33px]">
                            {/* Col entry */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px] w-[200px] ">
                                0x4df...efa
                            </div>
                            {/* Col entry */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px] w-[200px] ">
                                0x6d7f9...
                            </div>
                            {/* Col entry */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px] w-[200px] ">
                                10 NRGT
                            </div>
                            {/* Col entry */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px] w-[200px] ">
                                $7.88
                            </div>
                        </div>
                        {/* data row */}
                        <div className="flex items-center justify-between gap-[13%] w-[90%] mt-[33px]">
                            {/* Col entry */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px] w-[200px] ">
                                0x4df...efa
                            </div>
                            {/* Col entry */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px] w-[200px] ">
                                0x6d7f9...
                            </div>
                            {/* Col entry */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px] w-[200px] ">
                                10 NRGT
                            </div>
                            {/* Col entry */}
                            <div className="font-barlow font-normal text-white text-[24px] leading-[29px] w-[200px] ">
                                $7.88
                            </div>
                        </div>
                    </div>
                    {/* Sales/ Saving Container */}
                    <div className={`${styles.containerGradient} w-[31%] h-[462px] flex flex-col items-center justify-start z-20`}>
                        <div className="font-barlow font-medium text-white text-[40px] leading-[48px] text-center mt-[30px]">
                            {mode == 'Buyer' ? 'Latest Data' : mode == 'Seller' && 'Total Sales'}
                        </div>

                        {mode == 'Buyer' ?
                            <>
                                <div className="font-barlow font-normal font-light text-[36px] leading-[43px] text-center text-white mt-[50px]">
                                    Units Consumed: <span style={{ color: 'rgba(127, 253, 132, 0.950781)' }}
                                        className="font-barlow font-bold text-white text-[30px] leading-[76.8px] text-center mt-[45px]"> {energyData[energyData.length - 1]?.units_consumed}</span>
                                </div>

                                <div className="font-barlow font-normal font-light text-[36px] leading-[43px] text-center text-white mb-[50px]">
                                    Time: <span style={{ color: 'rgba(127, 253, 132, 0.950781)' }}
                                        className="font-barlow font-bold text-white text-[30px] leading-[76.8px] text-center mt-[45px]">  {(new Date(energyData[energyData.length - 1]?.timestamp * 1000)).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false
                                        })}</span>
                                </div>

                                {refresh ? <Spinner /> :
                                    <button

                                        className="text-white border hover:text-green-500 font-poppins font-normal font-semibold text-[32px] leading-[48px] text-center px-4 py-2 transition-colors duration-300"
                                        onClick={() => setRefresh(true)} type="button">
                                        Refresh
                                    </button>
                                }
                            </>
                            :
                            <>
                                <div
                                    style={{ color: 'rgba(127, 253, 132, 0.950781)' }}
                                    className="font-barlow font-bold text-white text-[64px] leading-[76.8px] text-center mt-[45px]">
                                    23
                                </div>
                                <div className="font-barlow font-normal font-light text-[36px] leading-[43px] text-center text-white mt-[50px]">
                                    this month
                                </div>
                            </>
                        }
                    </div>
                </div>

                {/* Thankyou text */}
                <div className="font-barlow font-medium text-white text-[36px] leading-[43px] text-center my-[60px] z-20">Thank you, Nevan, for using EnergySwap and saving the planet!</div>

                <div className={styles.bgPatch1}></div>
                <div className={styles.bgPatch2}></div>
            </main>
        </div>
    )
}