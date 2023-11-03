import CustomButton from 'components/common/CustomButton'
import CustomLinkButton from 'components/common/CustomLinkButton'
import CustomText from 'components/common/CustomText'
import { FlexBox } from 'components/common/FlexBox'
import React from 'react'
import { Container, PageWrapper } from 'styles/GlobalStyles'

const NotFound = () => {
  return (
    <PageWrapper>
      <Container >
        <FlexBox direction='column' width='350px' className='mx-auto' justifyContent='center' 
        alignItems='center'
        smGap='12px'
        >
          <CustomText
            text="Uh-Oh!"
            fontSize='28px'
            fontWeight='700'
            fontFamily='Inconsolata'
            marginTop='164px'
            smMarginTop='84px'
            smFontSize='21px'
          />
          <CustomText
            text="404"
            fontSize='180px'
            fontWeight='700'
            fontFamily='Inconsolata'
            smFontSize='128px'
          />
          <CustomText
            text="Page Not Found"
            fontSize='28px'
            fontWeight='700'
            fontFamily='Inconsolata'
          />
          <CustomLinkButton
            text='Back to Home'
            link="/"
            marginTop='49px'
            smMarginTop='66px'
          />
        </FlexBox>
      </Container>
    </PageWrapper>
  )
}

export default NotFound