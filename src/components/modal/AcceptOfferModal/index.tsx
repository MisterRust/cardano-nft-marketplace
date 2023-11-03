import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import CustomImage from 'components/common/CustomImage';
import { VERIFIED_ICON_IMAGE } from 'constants/image.constants';
import { device } from 'styles/Breakpoints';
import { FlexBox } from 'components/common/FlexBox';
import CustomButton from 'components/common/CustomButton';
import CustomText from 'components/common/CustomText';
import { H3, H8 } from 'components/typography';
import { getExactImageFormat } from 'hooks/function';
import CustomInput from 'components/common/CustomInput';
import { useEffect, useState } from 'react';
import { COLLECTION_DATA, TOKEN_ARRAY } from 'constants/document';
import SelectCurrencyBox from 'components/select/SelectCurrencyBox';
import SelectNFTBox from 'components/select/SelectNFTBox';
import CustomBorderButton from 'components/common/CustomBorderButton';
import { getNFTDetailByAsset } from 'api/api';
import { useGlobalContext } from 'context/GlobalContext';

const StyledModal = styled(Modal)`
  .modal-dialog{
    margin: auto;
    max-width: 620px;
    width: 100%;
    background: transparent;
    border-radius: 16px;
    @media screen and (max-width: 550px) {
      max-width: 100%;
      height: 100vh;
    }
  }
  .modal-header{
    border-bottom: none;
  }
  .connect-success-content {
    background: #e7e7e7;
    border-radius: 3px;
    width: 100%;
    overflow: hidden;
    border: none;
    @media screen and (max-width: 550px) {
      height: 100%;
    }
  }
`;

const ModalBody = styled(Modal.Body)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 66px;
  padding-right: 66px;
  padding-bottom: 72px;
  @media ${device.sm} {
    padding-top: 148px;
  }
  &.modal-body{
  }
`


interface Props {
    show: boolean;
    onClose: () => void;
    data: any;
    acceptOffer: (listingUtxoValue: string, offerUtxoValue: string, assetValue: string) => Promise<void>;
}
const AcceptOfferModal = ({ show, onClose, data, acceptOffer }: Props) => {
    const [inputPrice, setInputPrice] = useState<number>(3)
    const [formData, setFormData] = useState({
        currency: 'ADA',
        selectedNFTs: []
    })
    const [nftData, setNFTData] = useState<any>();
    const [nftUxo, setNftUtxo] = useState<string>();
    const [offerType, setOfferType] = useState<string>('')
    const [offerOption, setOfferOption] = useState<number>(0);

    const { listedAllNFTs, myBalance } = useGlobalContext()

    const handleOfferTypeChange = (e) => {
        setOfferOption(Number(e.target.value));
    };

    function getUtxoByAsset(data: ListedNFTList, asset: string) {
        for (let key in data) {
            if (data[key].nfts.hasOwnProperty(asset)) {
                return key;
            }
        }
        return null; // return null if tokenId does not exist in any nft object
    }


    const getNFTData = async () => {
        const response = await getNFTDetailByAsset(data.unit)
        console.log("response", response)
        setNFTData({
            name: response.onchain_metadata.name,
            asset: response.asset,
            image: response.onchain_metadata.image
        })
    }
    useEffect(() => {
        console.log("what?")
        if (Object.keys(data.offer).length === 1) {
            console.log("ada")
            setOfferType("ada")
        }
        if (Object.keys(data.offer).length > 1) {
            if (Object.keys(TOKEN_ARRAY).includes(Object.keys(data.offer)[1])) {
                console.log("token")
                setOfferType("token")
            } else {
                console.log("nft")
                setOfferType("nft")
            }
        }
    }, [data])

    useEffect(() => {
        if (data.unit !== '' && listedAllNFTs) {
            getNFTData()
            const utxo = getUtxoByAsset(listedAllNFTs, data.unit)
            setNftUtxo(utxo)
        }
    }, [data.unit, listedAllNFTs])


    return (
        <StyledModal show={show} onHide={onClose} centered contentClassName="connect-success-content">
            <Modal.Header closeButton>
            </Modal.Header>
            <ModalBody>
                <FlexBox direction='column' borderBottom='1px #cecece solid'
                    padding='12px 25px'
                >
                    <H3>
                        Accept this offer?
                    </H3>
                    <CustomText
                        text={`Please review all information before accepting.`}
                        fontFamily='Open Sans'
                        fontWeight='400'
                        fontSize='16px'
                        marginTop='12px'
                    />
                    <CustomText
                        text={`<strong>*</strong>Please note that there is a service fee of 1.99% to accept an NFT offer.`}
                        fontFamily='Open Sans'
                        fontWeight='400'
                        fontSize='14px'
                        display='block'
                        marginTop='20px'
                    />

                </FlexBox>
                <FlexBox marginTop='32px' paddingLeft='25px' paddingRight='25px' direction='column'>
                    {

                        <CustomText
                            text={`Item`}
                            fontFamily='Open Sans'
                            fontWeight='600'
                            fontSize='16px'
                            marginBottom='23px'
                        />
                    }
                    {
                        nftData ?
                            <FlexBox justifyContent='start' gap='28px' alignItems='center'>
                                <CustomImage
                                    image={
                                        nftData && getExactImageFormat(nftData.image)}
                                    width='100px'
                                    height='100px'
                                    borderRadius='2.4px'
                                />
                                <FlexBox direction='column' gap='8px'>
                                    <CustomText
                                        text={
                                            nftData && nftData.name
                                        }
                                        fontWeight='700'
                                        fontSize='21px'
                                        maxWidth='250px'
                                        display='block'
                                        className='three-dots'
                                    />
                                    <FlexBox justifyContent='start' gap='10px' alignItems='center'>

                                        <CustomText
                                            fontSize='14px'
                                            fontWeight='400'
                                            color='#f73737'
                                            maxWidth='250px'
                                            className='three-dots'
                                            display='block'
                                            text={nftData && (COLLECTION_DATA.hasOwnProperty(nftData.asset.slice(0, 56)) ? COLLECTION_DATA[nftData.asset.slice(0, 56)].name : nftData.asset.slice(0, 56))}
                                        />
                                        {
                                            nftData && COLLECTION_DATA.hasOwnProperty(nftData.asset.slice(0, 56)) &&
                                            <CustomImage
                                                image={VERIFIED_ICON_IMAGE}
                                                width='22px'
                                                height='21px'
                                            />
                                        }
                                    </FlexBox>

                                </FlexBox>
                            </FlexBox>
                            :
                            ''
                    }

                    {

                        <>
                            {/*** ADA Offer */}
                            {
                                offerType && offerType === 'ada' &&
                                <>
                                    <FlexBox marginTop='32.5px' paddingTop='32.5px' paddingBottom='30px' direction='column' borderTop='#cecece 1px solid' gap="12px">
                                        <FlexBox justifyContent='start' alignItems='center'>
                                            <CustomText
                                                text={`Offer Type:`}
                                                fontFamily='Open Sans'
                                                fontWeight='600'
                                                fontSize='16px'
                                            />
                                            &nbsp;
                                            <CustomText
                                                text={` Currency(₳)`}
                                                fontFamily='Open Sans'
                                                fontWeight='600'
                                                fontSize='16px'
                                                color='#6073F6'
                                            />
                                        </FlexBox>
                                        <FlexBox justifyContent='space-between' alignItems='center'>
                                            <CustomText
                                                text={`Offer Amount:`}
                                                fontFamily='Open Sans'
                                                fontWeight='600'
                                                fontSize='16px'
                                            />
                                            <CustomText
                                                text={`₳${parseInt(data.offer.lovelace) / 1000000}`}
                                                fontFamily='Open Sans'
                                                fontWeight='600'
                                                fontSize='16px'
                                                color='#6073F6'
                                            />
                                        </FlexBox>
                                    </FlexBox>
                                    <FlexBox justifyContent='space-between' alignItems='center' gap="12px" paddingTop='12px'
                                        borderTop='#cecece 1px solid'
                                    >
                                        <CustomText
                                            text={`Total Earnings:`}
                                            fontFamily='Open Sans'
                                            fontWeight='600'
                                            fontSize='16px'
                                        />
                                        <CustomText
                                            text={
                                                `₳${parseInt(data.offer.lovelace) / 1000000}
                                        `}
                                            fontFamily='Open Sans'
                                            fontWeight='700'
                                            fontSize='28px'
                                            color='#6073F6'
                                        />
                                    </FlexBox>
                                </>
                            }
                            {/*** NFT Offer */}
                            {
                                offerType && offerType === 'nft' &&
                                <>
                                    <FlexBox marginTop='32.5px' paddingTop='32.5px' paddingBottom='30px' direction='column' borderTop='#cecece 1px solid' gap="12px">
                                        <FlexBox justifyContent='start' alignItems='center'>
                                            <CustomText
                                                text={`Offer Type:`}
                                                fontFamily='Open Sans'
                                                fontWeight='600'
                                                fontSize='16px'
                                            />
                                            &nbsp;
                                            <CustomText
                                                text={` NFT(s)`}
                                                fontFamily='Open Sans'
                                                fontWeight='600'
                                                fontSize='16px'
                                                color='#6073F6'
                                            />
                                        </FlexBox>
                                        <FlexBox justifyContent='space-between' alignItems='center'>
                                            <CustomText
                                                text={`Offer Amount:`}
                                                fontFamily='Open Sans'
                                                fontWeight='600'
                                                fontSize='16px'
                                            />
                                            <CustomText
                                                text={`₳${parseInt(data.offer.lovelace) / 1000000}`}
                                                fontFamily='Open Sans'
                                                fontWeight='600'
                                                fontSize='16px'
                                                color='#6073F6'
                                            />
                                        </FlexBox>
                                    </FlexBox>
                                    <FlexBox justifyContent='space-between' alignItems='center' gap="12px" paddingTop='12px'
                                        borderTop='#cecece 1px solid'
                                    >
                                        <CustomText
                                            text={`Service Fee(flat rate):`}
                                            fontFamily='Open Sans'
                                            fontWeight='600'
                                            fontSize='16px'
                                        />
                                        <CustomText
                                            text={
                                                // @ts-ignore
                                                `₳5`
                                            }
                                            fontFamily='Open Sans'
                                            fontWeight='700'
                                            fontSize='28px'
                                            color='#6073F6'
                                        />
                                    </FlexBox>
                                </>
                            }
                            {/*** Token Offer */}
                            {
                                offerType && offerType === 'token' &&
                                <>
                                    <FlexBox marginTop='32.5px' paddingTop='32.5px' paddingBottom='30px' direction='column' borderTop='#cecece 1px solid' gap="12px">
                                        <FlexBox justifyContent='start' alignItems='center'>
                                            <CustomText
                                                text={`Offer Type:`}
                                                fontFamily='Open Sans'
                                                fontWeight='600'
                                                fontSize='16px'
                                            />
                                            &nbsp;
                                            <CustomText
                                                text={` Currency(${TOKEN_ARRAY[Object.keys(data.offer)[1]].symbol})`}
                                                fontFamily='Open Sans'
                                                fontWeight='600'
                                                fontSize='16px'
                                                color='#6073F6'
                                            />
                                        </FlexBox>
                                        <FlexBox justifyContent='space-between' alignItems='center'>
                                            <CustomText
                                                text={`Offer Amount:`}
                                                fontFamily='Open Sans'
                                                fontWeight='600'
                                                fontSize='16px'
                                            />
                                            <CustomText
                                                text={
                                                    // @ts-ignore
                                                    `${parseInt(Object.values(data.offer)[1]) / Math.pow(10, TOKEN_ARRAY[Object.keys(data.offer)[1]].decimals)}
                                                    ${TOKEN_ARRAY[Object.keys(data.offer)[1]].symbol}`
                                                }
                                                fontFamily='Open Sans'
                                                fontWeight='600'
                                                fontSize='16px'
                                                color='#6073F6'
                                            />
                                        </FlexBox>
                                    </FlexBox>
                                    <FlexBox justifyContent='space-between' alignItems='center' gap="12px" paddingTop='12px'
                                        borderTop='#cecece 1px solid'
                                    >
                                        <CustomText
                                            text={`Total Earnings:`}
                                            fontFamily='Open Sans'
                                            fontWeight='600'
                                            fontSize='16px'
                                        />
                                        <CustomText
                                            text={
                                                // @ts-ignore
                                                `${parseInt(Object.values(data.offer)[1])/ Math.pow(10, TOKEN_ARRAY[Object.keys(data.offer)[1]].decimals)}
                                                ${TOKEN_ARRAY[Object.keys(data.offer)[1]].symbol}
                                        `}
                                            fontFamily='Open Sans'
                                            fontWeight='700'
                                            fontSize='28px'
                                            color='#6073F6'
                                        />
                                    </FlexBox>
                                </>
                            }






                            <FlexBox marginTop='56px' justifyContent='space-between' smJustifyContent='space-between'>
                                <CustomBorderButton
                                    text="Decline Offer"
                                    onClick={() => {
                                        onClose()
                                    }}
                                />
                                <CustomButton
                                    text='Accept Offer'
                                    width='268px'
                                    height='48px'
                                    disabled={!nftUxo && nftUxo === ''}
                                    onClick={() => {
                                        acceptOffer(nftUxo, data.utxo, data.unit)
                                    }}
                                />
                            </FlexBox>
                        </>
                    }

                </FlexBox>
            </ModalBody>
        </StyledModal>
    )
}

export default AcceptOfferModal