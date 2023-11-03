import React, { useEffect, useState } from 'react';
import CustomText from 'components/common/CustomText';
import CustomSearchInput from 'components/common/CustomSearchInput';
import CustomButton from 'components/common/CustomButton';
import AcceptOfferModal from 'components/modal/AcceptOfferModal';
import SuccessModal from 'components/modal/SuccessModal';
import { useWalletConnect } from 'context/WalletConnect';
import styled from 'styled-components';
import { FlexBox } from 'components/common/FlexBox';
import { getMyOffering } from 'api/marketplace/getMyOffering';
import { acceptAnOffer } from 'api/marketplace/acceptAnOffer';

const Buyer = styled.span`
  color: #6073F6;
  font-family: Open Sans;
  font-size: 21px;
  font-weight: 600;
  line-height: normal;
`;

const CommonText = styled.span`
  color: #9E9E9E;
  font-family: Open Sans;
  font-size: 21px;
  font-weight: 400;
  line-height: normal;
`;

const NFTName = styled.span`
  color: #6073F6;
  font-family: Open Sans;
  font-size: 21px;
  font-weight: 600;
  line-height: normal;
`;

const MyActivity = () => {
  const [search, setSearch] = useState<string>('');
  const [activities, setActivities] = useState<any>();
  const [activeData, setActiveData] = useState<any>();
  const [showOfferModal, setShowOfferModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const { myWalletAddress, lucid } = useWalletConnect();

  const getOfferingData = async () => {
    try {
      const response = await getMyOffering(myWalletAddress);
      if (response) {
        setActivities(response);
      }
    } catch (err) {
      console.log("Error fetching offering data:", err);
    }
  };

  const acceptOffer = async (
    listingUtxoValue: string, offerUtxoValue: string, assetValue: string
  ) => {
    try {
      const result = await acceptAnOffer(myWalletAddress, lucid, listingUtxoValue, offerUtxoValue, assetValue);
      if (result) {
        setShowSuccessModal(true);
      } else {
        console.log("Failed to accept the offer.");
      }
    } catch (err) {
      console.log("Error accepting the offer:", err);
    }
  }

  useEffect(() => {
    if (myWalletAddress !== '') {
      getOfferingData();
    }
  }, [myWalletAddress]);

  return (
    <FlexBox direction='column' gap="24px">
      <CustomText
        text={`All Account Activity`}
        fontSize='28px'
        fontWeight='700'
      />
      <CustomSearchInput
        input={search}
        setInput={setSearch}
        placeholder='Search Activity'
      />
      <FlexBox direction='column' gap='2px'>
        {activities &&
          Object.values(activities).map((activity: any, index: number) => {
            if (Object.values(activity.offer).length > 0) {
              if(Object.keys(activity.offer)[0] === "message")  return;
              return Object.values(activity.offer).map((item: any, j: number) => (
                <FlexBox justifyContent='space-between' alignItems='center' key={j} padding='16px 54px 16px 16px' bgColor='rgba(255, 255, 255, 0.50)'>
                  <FlexBox justifyContent='start' width='auto'>
                    <Buyer>{item?.buyer.slice(0, 10) + "..."}</Buyer>
                    <CommonText>&nbsp;made an offer on&nbsp;</CommonText>
                    <NFTName>{item?.unit.slice(0, 10) + "..."}</NFTName>
                  </FlexBox>
                  <CustomButton
                    text='View Offer'
                    onClick={() => {
                      setActiveData(item);
                      setShowOfferModal(true);
                    }}
                  />
                </FlexBox>
              ));
            }
            return null; // Added to satisfy map function return requirement
          })}
      </FlexBox>
      {showOfferModal && (
        <AcceptOfferModal
          show={showOfferModal}
          onClose={() => {
            setShowOfferModal(false);
          }}
          data={activeData}
          acceptOffer={acceptOffer}
        />
      )}
      {showSuccessModal && (
        <SuccessModal
          show={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
          }}
          message='You have successfully accepted this offer.'
        />
      )
      }
    </FlexBox>
  );
};

export default MyActivity;
