import styled from "styled-components"

export const HistoryTableHeader = styled.div`
  padding: 10px 24px;
  color: rgba(0, 0, 0, 0.25);
  font-size: 21px;
  font-family: Inconsolata;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.68px;
  display: flex;
  max-width: 1210px;
  width: 100%;
  div:nth-child(1){
    width: 15%;
  }
  div:nth-child(2){
    width: 10%;
  }
  div:nth-child(3){
    width: 30%;
  }
  div:nth-child(4){
    width: 30%;
  }
  div:nth-child(5){
    width: 15%;
  }
`

export const HistoryTableRow = styled.div`
  padding: 6px 24px;
  max-width: 1210px;
  width: 100%;
  border-bottom: #7a7a7a 1px solid;
  background-color: white;
  display: flex;
  align-items: center;
  &.active{
    background-color: #d9d9d9;
  }
  div:nth-child(1){
    color: black;
    font-size: 21px;
    font-family: Open Sans;
    font-weight: 400;
    width: 15%;
    background-color: #b6b6b6;
  }
  div:nth-child(2){
    color: black;
    font-size: 21px;
    font-family: Open Sans;
    font-weight: 600;
    width: 10%;
  }
  div:nth-child(3){
    color: #6073F6;
    font-size: 21px;
    font-family: Open Sans;
    font-weight: 600;
    width: 30%;
    white-space: nowrap;
    overflow: hidden!important;
    text-overflow: ellipsis;
  }
  div:nth-child(4){
    color: #6073F6;
    font-size: 21px;
    font-family: Open Sans;
    font-weight: 600;
    width: 30%;
    white-space: nowrap;
    overflow: hidden!important;
    text-overflow: ellipsis;
  }
  div:nth-child(5){
    color: black;
    font-size: 21px;
    font-family: Open Sans;
    font-weight: 600;
    width: 15%;
    white-space: nowrap;
    overflow: hidden!important;
    text-overflow: ellipsis;
  }
`

export const ComingSoonTableHeader = styled.div`
  padding: 10px 28px;
  color: rgba(0, 0, 0, 0.25);
  font-size: 21px;
  font-family: Inconsolata;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.68px;
  display: flex;
  margin-top: 24px;
  max-width: 1210px;
  width: 100%;
  letter-spacing: 1.12px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
  }
  div:nth-child(1){
    width: 16%;
    margin: 12px 24px;
    @media screen and (max-width: 768px) {
      margin: 9px 10px;
      width: 35%;
    }
  }
  div:nth-child(2){
    width: 16%;
    margin: 12px 24px;
    @media screen and (max-width: 768px) {
      margin: 9px 10px;
      width: 20%;
    }
  }
  div:nth-child(3){
    width: 26%;
    margin: 12px 24px;
    @media screen and (max-width: 768px) {
      margin: 9px 10px;
      width: 45%;
    }
    
  }
  div:nth-child(4){
    width: 26%;
    margin: 12px 24px;
  }
  div:nth-child(5){
    width: 16%;
    margin: 12px 24px;
    
    
  }
`

export const ComingSoonTableRow = styled.div`
  padding: 10px 28px;
  color: rgba(0, 0, 0, 0.25);
  font-size: 21px;
  font-family: Inconsolata;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.68px;
  display: flex;
  max-width: 1210px;
  width: 100%;
  &.active{
    background-color: #d9d9d9;
  }
  @media screen and (max-width: 768px) {
    padding: 10px;
  }
  div:nth-child(1){
    width: 16%;
    margin: 12px 24px;
    background-color: #b6b6b6;
    height: 19px;
    border-radius: 3px;
    @media screen and (max-width: 768px) {
      margin: 9px 10px;
      height: 12px;
      width: 35%;
    }
  }
  div:nth-child(2){
    width: 16%;
    margin: 12px 24px;
    background-color: #b6b6b6;
    height: 19px;
    border-radius: 3px;
    @media screen and (max-width: 768px) {
      margin: 9px 10px;
      height: 12px;
      width: 20%;
    }
  }
  div:nth-child(3){
    width: 26%;
    margin: 12px 24px;
    background-color: #b6b6b6;
    height: 19px;
    border-radius: 3px;
    @media screen and (max-width: 768px) {
      margin: 9px 10px !important;
      height: 12px !important;
      width: 45%;
    }
  }
  div:nth-child(4){
    width: 26%;
    margin: 12px 24px;
    background-color: #b6b6b6;
    height: 19px;
    border-radius: 3px;
  }
  div:nth-child(5){
    width: 16%;
    margin: 12px 24px;
    background-color: #b6b6b6;
    height: 19px;
    border-radius: 3px;
    @media screen and (max-width: 768px) {
      margin: 9px 10px !important;
      height: 12px !important;
      width: 50%;
    }
  }
`

export const SelectButtonGroup = styled.div`
  display: flex;
  width: 240px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 3px;
  border: 1px solid var(--periwinkle-500, #6073F6);
  background: var(--periwinkle-100, linear-gradient(0deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.88) 100%), #6073F6);
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

export const SelectButton = styled.div`
  display: flex;
  height: 48px;
  padding: 8px 16px;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  box-shadow: 0px 1px 4px -2px rgba(255, 255, 255, 0.50);
  color: var(--periwinkle-500, #6073F6);
  font-family: Open Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  :not(:last-child) {
    border-bottom: 1px solid var(--periwinkle-300, #6073F6);
  }
  &:hover{
    background-color: #eeeeee;
  }
  @media screen and (max-width: 768px) {
    height: 42px;
    width: 100%;
  }

`

