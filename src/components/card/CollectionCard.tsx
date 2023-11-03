import CustomImage from 'components/common/CustomImage'
import { FlexBox } from 'components/common/FlexBox'
import { VERIFIED_ICON_IMAGE } from 'constants/image.constants'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface CollectionCardProps {
  hero: string;
  name: string;
  policyId: string;
}

const CollectionCardStyle = styled(Link)`
  border-radius: 3px;
  background-color: white;
  cursor: pointer;
  transition: transform .3s;
  text-decoration: none;
  max-width: 256px;
  width: 100%;
  &:hover {
    -ms-transform: scale(1.02); /* IE 9 */
    -webkit-transform: scale(1.02); /* Safari 3-8 */
    transform: scale(1.02); 
  }
  @media screen and (max-width: 768px) {
    max-width: 156px;
    width: 100%;
  }
`

const CollectionName = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
  font-size: 16px;
  line-height: 100%;
  font-weight: 700;
  font-family: Inconsolata;
  @media screen and (max-width: 768px) {
    display: flex;
    -webkit-line-clamp: 1;
    white-space: nowrap;
    overflow: hidden!important;
    text-overflow: ellipsis;
    max-width: 120px;
    display: block;
  }
`

const CollectionCard = ({
  hero, name, policyId
}: CollectionCardProps) => {
  return (
    <CollectionCardStyle to={"/collections/" + policyId}>
      <CustomImage
        image={hero}
        width='256px'
        height='256px'
        borderRadius='3px 3px 0px 0px'
        smWidth='156px'
        smHeight='156px'
      />
      <FlexBox
        padding='12px 24px'
        gap='6px'
        bgColor='white'
        borderRadius='0px 0px 3px 3px'
        maxWidth='256px'
        height='58px'
        alignItems='center'
        smDirection='row'
        smHeight='41px'
        smPadding='12px 10px'
      >
        <CollectionName>
          {name}
        </CollectionName>
       
        <CustomImage
          image={VERIFIED_ICON_IMAGE}
          width='21.5px'
          height='19.9px'
        />
      </FlexBox>
    </CollectionCardStyle>
  )
}

export default CollectionCard