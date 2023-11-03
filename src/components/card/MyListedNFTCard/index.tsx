import CustomBorderButton from 'components/common/CustomBorderButton'
import CustomImage from 'components/common/CustomImage'
import CustomText from 'components/common/CustomText'
import { FlexBox } from 'components/common/FlexBox'
import { BundleBadge, ListedBadge, MyListedNFTCardStyle } from './index.styled'
import { useCallback, useEffect, useState } from 'react'
import { getNFTDetailByAsset } from 'api/api'
import { getExactImageFormat } from 'hooks/function'

const MyListedNFTCard = ({
  data,
  isBundle,
  isListed,
  setActiveRemoveListingID,
  setShowRemoveListingModal,
  setActiveEditData,
  setShowEditModal
}: MyListedNFTCardType) => {
  // console.log("listed data", data)
  const [listedNFTs, setListedNFTs] = useState<NFTDataProps[]>()
  const [activeNFT, setActiveNFT] = useState<number>(0)

  // get nfts data from their asset
  const getNFTData = useCallback(async () => {
    const nfts = [];
    for (let i = 0; i < Object.keys(data.nfts).length; i++) {
      // get detail data of one specific nft
      const response = await getNFTDetailByAsset(Object.keys(data.nfts)[i])
      if(response){
        nfts.push({
          name: response?.onchain_metadata?.name,
          asset: response?.asset,
          image: response?.onchain_metadata?.image
        })
      }
    }
    setListedNFTs(nfts)
  }, [data])

  useEffect(() => {
    getNFTData()
  }, [])

  // useEffect(() => {
  //   // in case of bundle nfts, change display nft name image every second
  //   if (listedNFTs && listedNFTs.length > 1) {
  //     const interval = setInterval(() => {
  //       // Move to the next nft
  //       setActiveNFT((nft) => (nft + 1) % listedNFTs.length);
  //     }, 300); // Change slides every 1 (adjust as needed)

  //     return () => {
  //       // Cleanup the interval when the component unmounts
  //       clearInterval(interval);
  //     };
  //   }
  // }, [listedNFTs])

  return (
    <MyListedNFTCardStyle>
      {
        isListed &&
        <ListedBadge>Listed</ListedBadge>
      }
      {
        isBundle &&
        <BundleBadge>Bundle of {Object.keys(data.nfts).length}</BundleBadge>
      }
      <CustomImage
        image={listedNFTs && listedNFTs.length > 0 && listedNFTs[activeNFT].image ? getExactImageFormat(listedNFTs[activeNFT].image) : ''}
        width='256px'
        height='256px'
        borderRadius='3px 3px 0px 0px'
        smWidth='156px'
        smHeight='156px'
      />
      <FlexBox
        bgColor='white'
        borderRadius='0px 0px 3px 3px'
        padding='10px'
        direction='column'
        alignItems='center'
        gap='4px'
        width='256px'
        height='79px'
        smWidth='156px'
        smHeight='59px'
      >
        <CustomText
          text={listedNFTs && listedNFTs.length > 0 && listedNFTs[0].name ? listedNFTs[activeNFT].name : ''}
          fontSize='21px'
          fontWeight='700'
          maxWidth='236px'
          className='three-dots'
          display='block'
          smFontSize='16px'
          smMaxWidth='139px'
          smDisplay='block'
        />
        <CustomText
          text={`₳${parseInt(data.amount) / 1000000}`}
          fontSize='28px'
          fontWeight='600'
          color='#6073F6'
          fontFamily='Open Sans'
          smFontSize='16px'
          smMaxWidth='139px'
        />
      </FlexBox>


      <CustomBorderButton
        text='Edit Listing'
        fontSize='18px'
        fontWeight='600'
        fontFamily='Open Sans'
        width='100%'
        marginTop='24px'
        height='48px'
        smWidth='100%'
        onClick={() => {
          console.log("setShowEditModal")
          setActiveEditData({
            assets: listedNFTs,
            data: data
          })
          setShowEditModal(true)
        }}
      />
      <CustomBorderButton
        text='Remove Listing'
        fontSize='18px'
        fontWeight='600'
        fontFamily='Open Sans'
        width='100%'
        marginTop='8px'
        height='48px'
        border='none'
        hoverBorder='none'
        smWidth='100%'
        onClick={() => {
          setActiveRemoveListingID(data.utxo);
          setShowRemoveListingModal(true);
        }}
      />


    </MyListedNFTCardStyle>
  )
}

export default MyListedNFTCard