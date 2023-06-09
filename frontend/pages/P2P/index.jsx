import Head from "next/head";
import styles from "../../styles/P2P.module.css";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import styled, { keyframes, css } from 'styled-components'
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
    useBalance,
    useNetwork
} from 'wagmi'
import Spinner from "../../components/Spinner";

let scaleZ = keyframes`
  0% {
      opacity: 0;
      transform: scale(0);
  }

  80% {
      transform: scale(1.07);
  }

  100% {
      opacity: 1;
      transform: scale(1);
  }
`
const DropDownItem = styled.div`
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding-left: 15px;
  padding-right: 15px;
  cursor: pointer;

  &:hover {
      background: #E9E9E9;
  }

  ${props => props.active && css`
  background: #C2FFED;
  `}

  transform-origin: top center;
  
  ${props => props.index && css`
  animation: ${scaleZ} 300ms ${60 * (props.index)}ms ease-in-out forwards;
`}
  `
const paymentMethods = ['EFT Token', 'method 2', 'method 3']


export default function P2P() {

    const [mode, setMode] = useState('Buyer');
    const [paymentMethod, setPaymentMethod] = useState('EFT Token');

    const [pricePerUnitUSD, setPricePerUnitUSD] = useState('');
    const [pricePerUnitMATIC, setPricePerUnitMATIC] = useState('');
    const [pricePerUnitError, setPricePerUnitError] = useState("");
    const [amount, setAmount] = useState('');
    const [amountError, setAmountError] = useState("");

    const [pricePerUnitConversionRate, setPricePerUnitConversionRate] = useState('');

    const [addedListingMessage, setAddedListingMessage] = useState("");
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [toggleDropdown, setToggleDropdown] = useState(false)

    const { address, connector, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })

    useEffect(() => {

        if (mode == 'Seller') {
            setAddedListingMessage("")


            const becomeSeller = async () => {
                try {
                    setLoading(true)
                    const url = 'http://localhost:4000/user/becomeSeller';
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            // Add your request payload here
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Request failed');
                    }

                    const data = await response.json();
                    console.log('Response:', data);
                    setLoading(false)
                } catch (error) {
                    console.error('Error:', error.message);
                    setLoading(false)
                }
            };


            async function getUserRole() {
                try {
                    const response = await fetch('http://localhost:4000/user/role');
                    if (!response.ok) {
                        throw new Error('Failed to fetch user role');
                    }
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error('Error:', error.message);
                    // Handle the error gracefully
                    // Return an appropriate value or rethrow the error
                }
            }

            getUserRole()
                .then(roleResponse => {
                    console.log('User Role:', roleResponse.role);
                    // Handle the user role data
                    if (roleResponse.role != 1) {
                        becomeSeller();
                    }
                })
                .catch(error => {
                    console.error('Error:', error.message);
                    // Handle the error gracefully
                });
        }

        else if (mode === 'Buyer') {

            const fetchListingsData = async () => {
                try {

                    setLoading(true)
                    const response = await fetch('http://localhost:4000/user/listings');
                    const data = await response.json();
                    setListings([...data.listings].reverse());
                    setLoading(false)

                } catch (error) {
                    console.error('Error fetching energy data:', error);
                    setLoading(false)
                }
            };

            fetchListingsData();
        }

        const getConversionRate = async () => {
            const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=MATIC');
            const data = await response.json();

            const maticPriceInUSD = data.MATIC;

            setPricePerUnitConversionRate(maticPriceInUSD)
        }
        getConversionRate()

    }, [mode])



    useEffect(() => {
        if (pricePerUnitUSD == "" || pricePerUnitMATIC == "") {
            setPricePerUnitError("");
        } else if (pricePerUnitUSD <= 0 || pricePerUnitMATIC <= 0) {
            setPricePerUnitError("Price Per Unit should be a positive number > zero!");
        }
        else {
            setPricePerUnitError("");
        }
    }, [pricePerUnitUSD, pricePerUnitMATIC]);


    useEffect(() => {
        if (amount == "") {
            setAmountError("");
        } else if (amount <= 0) {
            setAmountError("Amount should be a positive number > zero !");
        } else {
            setAmountError("");
        }
    }, [amount]);



    const onChangePricePerUnit = (e, currency) => {

        if (currency == 'usd') {
            setPricePerUnitUSD(e.target.value)
            setPricePerUnitMATIC((pricePerUnitConversionRate * e.target.value).toFixed(3))
        }
        else if (currency == 'matic') {
            setPricePerUnitMATIC(e.target.value)
            setPricePerUnitUSD((1 / pricePerUnitConversionRate * e.target.value).toFixed(3))
        }
    }


    async function addListing(units, pricePerUnit) {
        const url = 'http://localhost:4000/user/addListing';
        const data = {
            units: units,
            pricePerUnit: pricePerUnit
        };

        try {
            setLoading(true)
            setAddedListingMessage("")
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                setLoading(false)
                throw new Error('Request failed with status ' + response.status);
            }

            const result = await response.json();
            console.log('Listing added successfully:', result);
            if (result) {
                setLoading(false)
                setAddedListingMessage(result.message)
            }
        } catch (error) {
            setAddedListingMessage(error.message)
            console.error('Error adding listing:', error);
        }
    }


    const createListing = () => {

        if (pricePerUnitUSD == "") {
            setPricePerUnitError("Price Per Unit is empty");
        }
        if (amount == "") {
            setAmountError("Amount is empty");
        }

        if (
            pricePerUnitError == "" &&
            amountError == "" &&
            pricePerUnitUSD != "" &&
            amount != ""
        ) {
            console.log("Create listing !");

            addListing(amount, pricePerUnitUSD);

        } else {
            console.log("Error!");
        }

    }

    console.log('listings', listings)
    console.log('loadin', loading)

    return (
        <div>
            <Head>
                <title>Buyer</title>
                <meta name="description" content="Buy/Sell your renewable energy" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SideBar />
            <main className={`${styles.main} flex flex-col items-center justify-start ml-[8.2%]`}>
                {/* main heading */}
                <div className="font-barlow font-bold text-[56px] leading-[67px] text-white w-[90%] mt-[60px]">
                    {mode == 'Buyer' ? 'Buy renewable energy' : mode == 'Seller' && 'Sell your renewable energy'}
                </div>
                {/* switch btn */}
                <div className="flex items-center justify-end mb-[30px] mt-[24px] w-[90%]"
                    onClick={() => mode == 'Buyer' ? setMode('Seller') : mode == 'Seller' && setMode('Buyer')}
                >
                    <div className="font-montserrat font-bold text-[40px] leading-[120%] underline text-white cursor-pointer hover:text-green-500">
                        {mode == 'Buyer' ? 'Sell' : mode == 'Seller' && 'Buy'}</div>
                </div>

                {mode == 'Buyer' ? (
                    <>
                        {/* Filters Container */}
                        <div className=" z-40 flex items-center justify-between w-[90%] mt-[64px]">
                            {/* left Container */}
                            <div className="flex items-center justify-between gap-[26px]">
                                {/* Amount */}
                                <div className="flex flex-col items-start justify-center gap-[16px]">
                                    {/* text */}
                                    <div className="font-montserrat font-bold text-[24px] leading-[29px] text-white">Amount</div>
                                    {/* field */}
                                    <input
                                        className={`bg-[#F0F0F0] rounded-[10px] h-[44px] pl-[16px] ${styles.amountInput}`}
                                        type="text"
                                        placeholder="Enter Amount"
                                    />
                                </div>

                                {/* Payment Method */}
                                <div className="flex flex-col items-start justify-center gap-[16px]">
                                    {/* text */}
                                    <div className="font-montserrat font-bold text-[24px] leading-[29px] text-white">Payment Method</div>
                                    {/* field */}
                                    <div className={`${styles.userReviewRatingDropDown} ${toggleDropdown == true && styles.selected}`}
                                        onClick={() => setToggleDropdown(!toggleDropdown)}>
                                        <div className={`${styles.userReviewRatingDropDownText} ${toggleDropdown == false && styles.selected}`}>
                                            {paymentMethod}
                                        </div>
                                        <img
                                            src="/images/chevronDown.svg"
                                            alt="chevronDown"
                                            className={`${styles.ReviewRatingDropDownArrow} ${toggleDropdown == true && styles.selectedArrow}`}
                                        />
                                    </div>

                                    {toggleDropdown &&
                                        <div className={`${styles.dropdownRatingMenu}`}>
                                            {paymentMethods?.map((method, index) => {
                                                return (
                                                    <DropDownItem
                                                        key={index}
                                                        index={index + 1}
                                                        onClick={() => {
                                                            setToggleDropdown(!toggleDropdown);
                                                            setPaymentMethod(method);
                                                        }}
                                                        active={method == paymentMethod}
                                                    >
                                                        <div className={styles.optionData}>
                                                            <div className={styles.ratingOptionName}>
                                                                {method}
                                                            </div>
                                                        </div>
                                                        {method == paymentMethod &&
                                                            <img
                                                                src={'images/dropDownOptionSelected.svg'}
                                                                alt={'dropDownOptionSelected'}
                                                                style={{ width: "24px", height: "20px" }}
                                                                className={styles.dropDownSelectedIcon}
                                                            />
                                                        }
                                                    </DropDownItem>
                                                )
                                            })}
                                        </div>
                                    }
                                </div>
                            </div>

                            {/* Right Container */}
                            <div className="flex items-center justify-between gap-[26px]">
                                {/* Search */}
                                <div className="flex flex-col items-start justify-center gap-[16px]">
                                    {/* text */}
                                    <div className="font-montserrat font-bold text-[24px] leading-[29px] text-white">Search</div>
                                    {/* field */}
                                    <input
                                        className={`bg-[#F0F0F0] rounded-[10px] h-[44px] pl-[20px] ${styles.amountInput}`}
                                        type="text"
                                        placeholder="Find Seller or location"
                                    />
                                </div>

                                {/* Location */}
                                <div className="flex flex-col items-start justify-center gap-[16px]">
                                    {/* text */}
                                    <div className="font-montserrat font-bold text-[24px] leading-[29px] text-white">Location</div>
                                    {/* field */}
                                    <input
                                        className={`bg-[#F0F0F0] rounded-[10px] h-[44px] pl-[20px]  w-[234px] ${styles.amountInput}`}
                                        type="text"
                                        placeholder="Bangalore, IN"
                                    />
                                </div>

                            </div>

                        </div>

                        {/* Header Row */}
                        <div className="z-20 flex items-center justify-between w-[90%] mt-[45px] mb-[10px]">
                            <div className="font-montserrat font-bold text-white text-center text-[24px] leading-[29px] pl-[45px] w-[8%]">Wallet<br />Address</div>
                            <div className="font-montserrat font-bold text-white text-center text-[24px] leading-[29px]">Price<br />(per unit)</div>
                            <div className="font-montserrat font-bold text-white text-center text-[24px] leading-[29px]">Available<br />Amount</div>
                            <div className="font-montserrat font-bold text-white text-center text-[24px] leading-[29px]">Payment<br />Method</div>
                            <div className="font-montserrat font-bold text-white text-center text-[24px] leading-[29px]">Total</div>
                            <div className="font-montserrat font-bold text-white text-center text-[24px] leading-[29px] w-[23%]">Action</div>
                        </div>

                        {/* Data Row Container */}
                        {/* <div className={`${styles.dataRowContainer} z-20 flex items-center justify-between w-[90%] mt-[20px] py-[48px]`}> */}
                        {/* Seller */}
                        {/* <div className="flex items-center font-montserrat font-normal text-white text-center text-[24px] leading-[29px] pl-[30px] w-[10%]">{address.slice(0, 4)}....${address.slice(-4)}</div> */}
                        {/* Price */}
                        {/* <div className="flex items-center font-montserrat font-normal text-white text-center text-[24px] leading-[29px]">$0.23</div> */}
                        {/* Available amount */}
                        {/* <div className="flex items-center font-montserrat font-normal text-white text-center text-[24px] leading-[29px]">300 NRGT</div> */}
                        {/* method */}
                        {/* <div className="flex items-center font-montserrat font-normal text-white text-center text-[24px] leading-[29px]">MATIC</div> */}
                        {/* Total */}
                        {/* <div className="flex items-center font-montserrat font-normal text-white text-center text-[24px] leading-[29px]">$69</div> */}
                        {/* action Btn */}
                        {/* <div className="flex items-center justify-end pr-[30px] w-[23%]">
                                <button className={`${styles.placeRequestBtn} px-[20px] py-[5px] hover:bg-green-500 font-poppins font-bold text-[24px] leading-[36px] text-white transition-colors duration-300`}>
                                    Place Request
                                </button>
                            </div> */}
                        {/* </div> */}

                        {/* MAPPING LISTINGS */}
                        {listings && listings.map((listing, index) => {

                            console.log('listing', listing)
                            return (

                                //  Data Row Container 
                                (listing[3]) &&
                                <div key={index} className={`${styles.dataRowContainer} z-20 flex items-center justify-between w-[90%] mt-[20px] py-[48px]`}>
                                    {/* Seller  */}
                                    <div className="flex justify-center items-center font-montserrat font-normal text-white text-center text-[24px] leading-[29px] pl-[45px] w-[10%]">{listing[0]?.slice(0, 4)}....${listing[0]?.slice(-4)}</div>
                                    {/* Price */}
                                    <div className="flex justify-center items-center font-montserrat font-normal text-white text-center text-[24px] leading-[29px] w-[8%]">{(parseInt(listing[2].hex, 16) * pricePerUnitConversionRate).toFixed(3)} MATIC</div>
                                    {/* Available amount */}
                                    <div className="flex justify-center items-center font-montserrat font-normal text-white text-center text-[24px] leading-[29px] w-[8%]">{parseInt(listing[1].hex, 16)}</div>
                                    {/* method */}
                                    <div className="flex justify-center items-center font-montserrat font-normal text-white text-center text-[24px] leading-[29px] w-[8%]">EFT</div>
                                    {/* Total */}
                                    <div className="flex justify-center items-center font-montserrat font-normal text-white text-center text-[24px] leading-[29px] w-[8%]">{(parseInt(listing[2].hex, 16) * pricePerUnitConversionRate * parseInt(listing[1].hex, 16)).toFixed(3)} MATIC</div>
                                    {/* action Btn */}
                                    <div className="flex items-center justify-end pr-[30px] w-[23%]">
                                        <button className={`${styles.placeRequestBtn} px-[20px] py-[5px] hover:bg-green-500 font-poppins font-bold text-[24px] leading-[36px] text-white transition-colors duration-300`}>
                                            Place Request
                                        </button>
                                    </div>
                                </div>

                            )
                        }

                        )}

                        {loading && <Spinner />}


                    </>
                ) : mode == 'Seller' &&
                <>
                    {/* form heading */}
                    <div className="z-20 font-barlow font-medium text-white text-[48px] leading-[58px] w-[90%] pl-[10%] mt-[30px]">Enter details:</div>
                    {/* field row */}
                    {/* <div className="z-20 flex items-center justify-between w-[70%] ml-[6%] mt-[36px]"> */}
                    {/* label */}
                    {/* <div className="font-barlow font-normal text-white text-[36px] leading-[43px]">Seller Name:</div> */}
                    {/* Input */}
                    {/* <div className="flex items-center justify-center w-[60%]  border-[1px] rounded-[5px] py-[10px] font-barlow font-normal text-white text-[32px] leading-[38px]"> {ensName != null ? ensName : 'Seller'}</div> */}
                    {/* </div> */}

                    {/* field row */}
                    <div className="z-20 flex items-center justify-between w-[70%] ml-[6%] mt-[36px]">
                        {/* label */}
                        <div className="font-barlow font-normal text-white text-[36px] leading-[43px]">Price per unit (USD)</div>

                        {/* Input */}
                        <div className="flex items-center justify-between w-[60%] px-[10px]  border-[1px] rounded-[5px] py-[10px] font-barlow font-normal text-white text-[32px] leading-[38px]">
                            <input type="number"
                                placeholder="0"
                                value={pricePerUnitUSD}
                                className={`${styles.pricePerUnitInput} text-right mr-[8px]`}
                                onChange={(e) => onChangePricePerUnit(e, 'usd')}
                            />
                            USD
                            <input type="number"
                                placeholder="0"
                                className={`${styles.pricePerUnitInput} text-right mx-[8px]`}
                                value={pricePerUnitMATIC}
                                onChange={(e) => onChangePricePerUnit(e, 'matic')}
                            />
                            MATIC
                        </div>

                    </div>

                    <div className={`${pricePerUnitError == "" && 'hidden'}  w-[60%] mt-[10px] text-right text-[red]`}>
                        {pricePerUnitError}
                    </div>


                    {/* field row */}
                    <div className="z-20 flex items-center justify-between w-[70%] ml-[6%] mt-[36px]">
                        {/* label */}
                        <div className="font-barlow font-normal text-white text-[36px] leading-[43px]">Amount (NRGT)</div>

                        {/* Input */}
                        <div className="flex items-center justify-center w-[60%]  border-[1px] rounded-[5px] py-[10px] font-barlow font-normal text-white text-[32px] leading-[38px]">
                            <input type="number"
                                placeholder="0"
                                value={amount}
                                className={`${styles.amountInputSeller} text-center`}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className={`${amountError == "" && 'hidden'} w-[58%] mt-[10px] text-right text-[red] ml-[5px]`}>
                        {amountError}
                    </div>

                    {/* field row */}
                    <div className="z-20 flex items-center justify-between w-[70%] ml-[6%] mt-[36px]">
                        {/* label */}
                        <div className="font-barlow font-normal text-white text-[36px] leading-[43px]">Total Price</div>
                        {/* Input */}
                        <div className="flex items-center justify-center w-[60%]  border-[1px] rounded-[5px] py-[10px] font-barlow font-normal text-white text-[32px] leading-[38px]">
                            {(pricePerUnitUSD * amount).toFixed(2)} USD&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;{(pricePerUnitMATIC * amount).toFixed(2)} MATIC
                        </div>
                    </div>

                    {/* field row */}
                    <div className="z-20 flex items-center justify-between w-[70%] ml-[6%] mt-[36px]">
                        {/* label */}
                        <div className="font-barlow font-normal text-white text-[36px] leading-[43px]">Wallet Address</div>
                        {/* Input */}
                        <div className="flex items-center justify-center w-[60%]  border-[1px] rounded-[5px] py-[10px] font-barlow font-normal text-white text-[32px] leading-[38px]">
                            {address.slice(0, 10)}....${address.slice(-8)}
                        </div>
                    </div>


                    {/* creat listing btn */}

                    {loading ? <Spinner /> :

                        <button

                            onClick={createListing}
                            className={`${styles.placeRequestBtn} z-20 flex items-center justify-center mt-[40px] w-[287px] h-[52px] px-[20px] py-[5px] hover:bg-green-500 font-poppins font-bold text-[32px] leading-[48px] text-white transition-colors duration-300`}>
                            Create Listing
                        </button>
                    }

                    <div className={`${addedListingMessage == "" && 'hidden'} mt-[10px] text-right text-[green]`}>
                        {addedListingMessage}
                    </div>
                </>
                }

                <div className={styles.bgPatch1}></div>
                <div className={styles.patch2Container}>
                    <div className={styles.bgPatch2}></div>
                </div>
            </main>
        </div>
    )
}