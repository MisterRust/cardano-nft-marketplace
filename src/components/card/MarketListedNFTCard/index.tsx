import CustomBorderButton from 'components/common/CustomBorderButton'
import CustomImage from 'components/common/CustomImage'
import CustomText from 'components/common/CustomText'
import { FlexBox } from 'components/common/FlexBox'
import { BundleBadge, ListedBadge, MarketListedNFTCardStyle } from './index.styled'
import { useCallback, useEffect, useState } from 'react'
import { getNFTDetailByAsset } from 'api/api'
import { getExactImageFormat } from 'hooks/function'

const MarketListedNFTCard = ({
  data,
  isBundle,
  isListed,
  search
}: MarketListedNFTCardType) => {
  const [listedNFTs, setListedNFTs] = useState<NFTDataProps[]>()
  const [activeNFT, setActiveNFT] = useState<number>(0)
  const [show, setShow] = useState<boolean>(true)

  // get nfts data from their asset
  const getNFTData = useCallback(async () => {
    const assetKeys = Object.keys(data.nfts);

    // Map asset keys to an array of promises
    const nftPromises = assetKeys.map(async (assetKey) => {
      const response = await getNFTDetailByAsset(assetKey);
      return {
        name: response.onchain_metadata.name,
        asset: response.asset,
        image: response.onchain_metadata.image
      };
    });

    // Use Promise.all to await all responses
    const nfts = await Promise.all(nftPromises);
    console.log("nfts", nfts)

    setListedNFTs(nfts);
  }, [data]);

  useEffect(() => {
    if (listedNFTs && listedNFTs.length > 0) {
      const names = listedNFTs.map((item) => item.name);
      console.log("names", names, search)
      // const result = names.some(element => element.toLocaleUpperCase().includes(search.toLocaleLowerCase()));
      
      const result = names.some(element => element.toLowerCase().includes(search.toLowerCase()));

      console.log("result", result)
      if (result) {
        setShow(true)
      } else {
        setShow(false)
      }
    }


  }, [search, listedNFTs])


  useEffect(() => {
    getNFTData()
  }, [])

  useEffect(() => {
    // in case of bundle nfts, change display nft name image every second
    if (listedNFTs && listedNFTs.length > 1) {
      const interval = setInterval(() => {
        // Move to the next nft
        setActiveNFT((nft) => (nft + 1) % listedNFTs.length);
      }, 500); // Change slides every 1 (adjust as needed)

      return () => {
        // Cleanup the interval when the component unmounts
        clearInterval(interval);
      };
    }
  }, [listedNFTs])

  return (
    <>
      {
        !show
          ?
          <></>
          :
          <MarketListedNFTCardStyle to={`/nfts/${Object.keys(data.nfts)[0]}`}>
            {
              isListed &&
              <ListedBadge>Listed</ListedBadge>
            }
            {
              isBundle &&
              <BundleBadge>Bundle of {Object.keys(data.nfts).length}</BundleBadge>
            }
            <CustomImage
              image={listedNFTs && getExactImageFormat(listedNFTs[activeNFT].image)}
              width='256px'
              height='256px'
              smWidth='156px'
              smHeight='156px'
              borderRadius='3px 3px 0px 0px'
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
                text={listedNFTs && listedNFTs[0].name ? listedNFTs[activeNFT].name : ''}
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
              />
            </FlexBox>
          </MarketListedNFTCardStyle>
      }
    </>
  )
}

export default MarketListedNFTCard