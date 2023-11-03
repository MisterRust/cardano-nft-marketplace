import styled from 'styled-components'
import { device } from 'styles/Breakpoints';

interface BlackHeaderBannerProps{
  height?: string;
  smHeight?: string;
}

const BlackHeaderBannerImage = styled.div<BlackHeaderBannerProps>`
  width: 100vw;
  height: ${props => props.height ? props.height : '294px'};
  background: #202020;
  @media ${device.sm} {
    height: ${props => props.smHeight ? props.smHeight : '220px'};
  }
`

const BlackHeaderBanner = (
  {
    height,
    smHeight
  }: BlackHeaderBannerProps
) => {
  return (
    <BlackHeaderBannerImage height={height} smHeight = {smHeight}>

    </BlackHeaderBannerImage>
  )
}

export default BlackHeaderBanner