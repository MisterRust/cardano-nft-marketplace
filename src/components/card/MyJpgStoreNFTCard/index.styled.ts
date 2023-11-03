
import styled from 'styled-components'
export const MyJpgStoreNFTCardStyle = styled.div`
  position: relative;
  border-radius: 3px;
  max-width: 256px;
  width: 100%;
  @media screen and (max-width: 768px) {
    max-width: 156px;
  }
`

export const JpgStoreBadge = styled.img`
  position: absolute;
  left: 0px;
  z-index: 10;
  top: 8px;
  background: #8896f8;
  /* width: 32px;
  height: 32px; */
  font-size: 16px;
  color: white;
  font-weight: 600;
  font-family: 'Open Sans';
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border: none;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`

export const BundleBadge = styled.div`
  position: absolute;
  right: 0px;
  z-index: 10;
  top: 8px;
  background: #8896f8;
  width: 110px;
  height: 26px;
  font-size: 16px;
  color: white;
  font-weight: 600;
  font-family: 'Open Sans';
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Open Sans';
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`