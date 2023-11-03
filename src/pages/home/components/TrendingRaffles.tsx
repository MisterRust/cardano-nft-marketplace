
import { FlexBox } from 'components/common/FlexBox';
import CustomRouterLinkButton from 'components/common/CustomRouterLinkButton';
import RaffleCard from 'components/card/RaffleCard';
import { useGlobalContext } from 'context/GlobalContext';
import RaffleDetailModal from 'components/modal/RaffleDetailModal';
import { useState } from 'react';
import styled from 'styled-components';

const restrictedRaffles = [
  "00000000000000000000000100011698685912702",
  "000000000000000000000000000100011698742825243"
]

const TrendingRafflesText = styled.div`
  color: #000;
  font-family: Inconsolata;
  font-size: 50px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`

const TrendingRaffles = () => {
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false)
  const [raffleDetailData, setRaffleDetailData] = useState({})
  const { raffleData, featuredRaffles, floorPriceList } = useGlobalContext()
  return (
    <FlexBox direction='column' gap="32px">
      <FlexBox smDirection='row' justifyContent='space-between' alignItems='center' smJustifyContent='space-between'>
        <TrendingRafflesText>
          Trending Raffles
        </TrendingRafflesText>

        <CustomRouterLinkButton
          text="View All"
          link="/raffle"
          fontFamily={`Open Sans`}
          fontSize='18px'
          fontWeight='600'
          color='#6073F6'
          width='auto'
          padding='8px 16px'
          smWidth='93px'
        />
      </FlexBox>
      <FlexBox flexWrap='wrap' gap="68px 90px" smAlignItems='center'
        smJustifyContent='center' smGap='16px' smDirection='row'
      >
        {
          raffleData && Object.values(raffleData).length > 0 &&
          featuredRaffles &&
          featuredRaffles.length > 0 && floorPriceList &&
          featuredRaffles.map((item, index) => {
            if (!restrictedRaffles.includes(item.id)) {
              if (!item.floorprice) {
                return;
              }
              if (!raffleData[item.id]) {
                return;
              }
              return (
                <RaffleCard
                  item={
                    raffleData[item.id]
                  }
                  onClick={() => {
                    setRaffleDetailData(raffleData[item.id]);
                    setShowDetailModal(true);
                  }}

                  key={index}
                  floorPrice={floorPriceList[item.id] ? floorPriceList[item.id].floorprice : -1}
                />
              );
            }

          })
        }
      </FlexBox>
      {
        showDetailModal &&
        <RaffleDetailModal
          show={showDetailModal}
          onClose={() => { setShowDetailModal(false) }}
          raffleDetailData={raffleDetailData}
        />
      }
    </FlexBox>
  )
}

export default TrendingRaffles