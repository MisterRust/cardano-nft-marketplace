import styled from "styled-components";

export const JPGAssetsNote = styled.div`
    position: relative;
    display: flex;
    max-width: 624px;
    width: 100%;
    padding: 12px 0px;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    border-radius: 3px;
    background: var(--glass-white, linear-gradient(102deg, rgba(255, 255, 255, 0.58) 3.82%, rgba(255, 255, 255, 0.70) 96.56%));
    margin: auto;
    margin-bottom: 32px;
    .topic{
        color: #000;
        text-align: center;
        /* 💻Desktop/Body small-bold */
        font-family: Open Sans;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
    .content{
        color: var(--true-black, #000);
        /* 💻Desktop/Body small-regular */
        font-family: Open Sans;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        display: flex;
        align-items: center;
        gap: 4px;
    }
    @media screen and (max-width: 550px) {
        gap: 8px;
        .topic{
            font-size: 14px;
        }
        .content{
            font-size: 14px;
        }

    }
`

export const Question_Image = styled.img`
    width: 24px;
    height: 24px;
    @media screen and (max-width: 550px) {
        width: 22px;
        height: 22px;
    }
`

export const JPGAssetsNoteHover= styled.div`
    display: flex;
    max-width: 392px;
    width: 100%;
    box-shadow: 5px 10px 18px #888888;
    padding: 12px;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border-radius: 3px;
    background-color: white;
    border: 1.5px solid #F73737;
    color: black;
    font-family: Open Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 62px;
    margin-top: 10px;
    @media screen and (max-width: 550px) {
        font-size: 12px;
        max-width: 328px;
    }
`

