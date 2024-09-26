import Card from "@/assets/images/Card.png";
import Pix from "@/assets/images/pix.png";
import splash from "@/assets/images/splashPagamento.jpg";
import { useNavigation } from "expo-router";
import {
  Button,
  GroupButtons,
  Image,
  ImageBackground,
  TextButton,
  ViewRoot,
} from "./styled";

import React, { useState } from "react";

export default function OptionsPayment() {
  const navigation = useNavigation();
  const [modalLanguage, setModalLanguage] = useState(false);

  return (
    <ViewRoot>
      {/* <Header>
        <HeaderTitle>
          <ImageHeader source={Logo} resizeMode="contain" />
        </HeaderTitle>
        <HeaderContent>
          <IconClose onPress={() => navigation.goBack()}>
            <Icon name="x" size={26} />
          </IconClose>
          <TextHeader>Opções de pagamento</TextHeader>
          <IconLanguage>
            <ButtonLanguage
              fill="#000000"
              height={50}
              stroke={5}
              width={60}
              modalVisible={modalLanguage}
            />
          </IconLanguage>
        </HeaderContent>
      </Header> */}
      <GroupButtons>
        <Button>
          <Image resizeMode="contain" source={Pix} />
          <TextButton>PIX</TextButton>
        </Button>
        <Button>
          <Image resizeMode="contain" source={Card} />
          <TextButton>CRÉDITO</TextButton>
        </Button>
        <Button>
          <Image resizeMode="contain" source={Card} />
          <TextButton>DÉBITO</TextButton>
        </Button>
      </GroupButtons>
      <ImageBackground source={splash} />
    </ViewRoot>
  );
}
