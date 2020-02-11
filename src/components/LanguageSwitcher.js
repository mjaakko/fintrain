import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

const languages = [
  {
    code: 'en',
    flag: 'gb',
    name: 'English',
  },
  {
    code: 'fi',
    flag: 'fi',
    name: 'Suomi',
  },
];

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const activeLanguage = i18n.language.slice(0, 2);

  const changeLanguage = (_, { value }) => i18n.changeLanguage(value);

  return (
    <Dropdown item text={t('common.language')}>
      <Dropdown.Menu>
        {languages.map(language => (
          <Dropdown.Item
            key={language.code}
            value={language.code}
            flag={language.flag}
            text={language.name}
            active={activeLanguage === language.code}
            onClick={changeLanguage}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
