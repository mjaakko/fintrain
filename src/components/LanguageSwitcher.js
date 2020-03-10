import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import './LanguageSwitcher.css';

const languages = [
  {
    code: 'en-US',
    flag: 'gb',
    name: 'English',
  },
  {
    code: 'fi-FI',
    flag: 'fi',
    name: 'Suomi',
  },
];

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (_, { value }) => i18n.changeLanguage(value);

  return (
    <Dropdown item text={t('common.language')} className="languageswitcher">
      <Dropdown.Menu>
        {languages.map(language => (
          <Dropdown.Item
            key={language.code}
            value={language.code}
            flag={language.flag}
            text={language.name}
            active={i18n.language === language.code}
            onClick={changeLanguage}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
