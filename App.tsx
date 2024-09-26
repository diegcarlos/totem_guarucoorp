import {Views} from 'index';
import React from 'react';
import {I18nextProvider} from 'react-i18next';
import i18n from '/translations/i18n';

function App(): React.JSX.Element {
  return (
    <I18nextProvider i18n={i18n}>
      <Views />
    </I18nextProvider>
  );
}

export default App;
