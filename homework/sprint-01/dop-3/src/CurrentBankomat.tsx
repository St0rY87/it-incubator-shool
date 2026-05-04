import {MoneyType} from "./App";
import styled from "styled-components";

type CurrentBankomatPropsType = {
    money: MoneyType
}

export const CurrentBankomat = ({money}:CurrentBankomatPropsType) => {
    // с деструктуризацией пожалуйста
    return (
        <div>
          {/* {money.banknote==='USD'
            ? <BanknoteGreen> <Name>{money.banknote}</Name>
                <Nominal>{money.nominal}</Nominal></BanknoteGreen>
            : <BanknoteBlue><Name>{money.banknote}</Name>
                <Nominal>{money.nominal}</Nominal></BanknoteBlue>} */}
                
            <Banknote $color={money.banknote==='USD' ? 'aquamarine' : 'lightskyblue'}>
                <Name>{money.banknote}</Name>
                <Nominal>{money.nominal}</Nominal>
             </Banknote>
        </div>
        // ВНАЧАЛЕ НАПИШЕМ СОВСЕМ НЕКРАСИВО
        // props.money.banknote==='USD'
        //     ? ЗЕЛЕНАЯ
        //     : СИНЯЯ


        // А ТЕПЕРЬ КРАСИВО
        //         <Banknote color={ТЕРНАРНЫЙ ОПЕРАТОР}>
        //         <Name>{money.banknote}</Name>
        //         <Nominal>{money.nominal}</Nominal>
        //     </Banknote>


    );
};


const BanknoteGreen = styled.div`
  background-color: aquamarine;
  width: 300px;
  height: 150px;
  margin: 10px;
`

const BanknoteBlue = styled.div`
  background-color: lightskyblue;
  width: 300px;
  height: 150px;
  margin: 10px;
`

const Banknote = styled.div<{$color: string}>`
  background-color: ${props => props.$color};
  width: 200px;
  height: 100px;
  margin: 5px;
`


const Name = styled.span`
  display: flex;
  justify-content: center;
  font-size: 15px;
`

const Nominal = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  font-size: 45px;
`
