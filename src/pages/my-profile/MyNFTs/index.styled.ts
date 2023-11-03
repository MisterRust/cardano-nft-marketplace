import styled from "styled-components";

export const CustomCheckbox = styled.input`
  width: 22px;
  height: 22px;
`

export const NFTFlex = styled.div`
  display: flex;
  margin-top: 32px;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 52px 70px;
  @media screen and (max-width: 768px) {
    align-items: center;
    gap: 22px;
  }
`