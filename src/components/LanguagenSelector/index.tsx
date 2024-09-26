import {IconOutline as Icon} from '@ant-design/icons-react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, View} from 'react-native';
import {
  CloseButton,
  ImageText,
  ModalContainer,
  ModalContent,
  ModalTitle,
  TextButton,
  TouchableOpacity,
} from './styled';
import {useLanguage} from '/context/LanguageContext';

interface Props {
  children?: React.ReactNode;
}

const LanguageSelector = (props: Props) => {
  const {children} = props;
  const [isModalVisible, setModalVisible] = useState(false);
  const {i18n, t} = useTranslation();

  const {setCurrentLanguage, currentLanguage} = useLanguage();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const changeLanguage = async (v: string) => {
    i18n.changeLanguage(v).then(() => setCurrentLanguage(v));
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>{children}</TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}>
        <ModalContainer>
          <ModalContent>
            <ModalTitle>{t('modalLng.title')}</ModalTitle>

            <TouchableOpacity onPress={() => changeLanguage('en')}>
              <ImageText source={require('../../assets/images/us.png')} />
              <TextButton>English</TextButton>
              {currentLanguage === 'en' && (
                <Icon name="check" color="green" size={22} />
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => changeLanguage('pt')}>
              <ImageText source={require('../../assets/images/br.png')} />
              <TextButton>Português</TextButton>
              {currentLanguage === 'pt' && (
                <Icon name="check" color="green" size={22} />
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => changeLanguage('es')}>
              <ImageText source={require('../../assets/images/es.png')} />
              <TextButton>Español</TextButton>
              {currentLanguage === 'es' && (
                <Icon name="check" color="green" size={22} />
              )}
            </TouchableOpacity>

            <CloseButton onPress={toggleModal}>
              <TextButton>{t('modalLng.buttonClose')}</TextButton>
            </CloseButton>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </View>
  );
};

export default LanguageSelector;
