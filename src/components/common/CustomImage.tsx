import React from 'react'
import styled from 'styled-components';
import { LazyLoadImage } from "react-lazy-load-image-component";
interface CustomImageStyleType {
  width?: string;
  height?: string;
  image?: string;
  smWidth?: string;
  smHeight?: string;
  onClick?: any;
  cursor?: string;
  borderRadius?: string;
  position?: string;
  marginTop?: string;
  border?: string;
  smMarginTop?: string;
  alt?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: any;
  smBorderRadius?: string;
}



const CustomImageStyle = styled(LazyLoadImage) <CustomImageStyleType>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 4px;
  cursor: ${(props) => props.cursor};
  border-radius: ${(props) => props.borderRadius};
  position: ${(props) => props.position};
  margin-top: ${(props) => props.marginTop};
  border: ${(props) => props.border};
  @media screen and (max-width: 768px) {
    width: ${(props) => props.smWidth};
    height: ${(props) => props.smHeight};
    margin-top: ${(props) => props.smMarginTop};
    border-radius: ${(props) => props.smBorderRadius};
  }
`

const CustomImage = (
  {
    width,
    height,
    image,
    smWidth,
    smHeight,
    onClick,
    cursor,
    borderRadius,
    position,
    marginTop,
    border,
    smMarginTop,
    alt,
    onMouseEnter,
    onMouseLeave,
    smBorderRadius,
    style
  }: CustomImageStyleType
) => {
  return (
    <CustomImageStyle
      width={width}
      height={height}
      src={image}
      smHeight={smHeight}
      smWidth={smWidth}
      onClick={onClick}
      cursor={cursor}
      borderRadius={borderRadius}
      position={position}
      marginTop={marginTop}
      border={border}
      smMarginTop={smMarginTop}
      alt={alt}
      onMouseEnter= {onMouseEnter}
      onMouseLeave= {onMouseLeave}
      smBorderRadius = {smBorderRadius}
      style = {style}
    ></CustomImageStyle>
  )
}

export default CustomImage