import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'semantic-ui-react'
import { getFlag } from '../../../../../static/flags/flagHelper'

const InternationalisationItem = ({ locales, onSelectLocale, defaultLocale }) => {
  return (
    <Menu.Item>
        <Dropdown trigger={getFlag(locales.find(locale => locale.value === defaultLocale).flag, 21, 28)}
                  options={locales.map(locale => ({text: <span> {locale.text}</span>, key: locale.value, value: locale.value, image: getFlag(locale.flag, 16, 12)} ))}
                  compact onChange={onSelectLocale} floating
                  key="locales" value={defaultLocale} />
    </Menu.Item>
  )
}

InternationalisationItem.propTypes = {
  locales: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectLocale: PropTypes.func.isRequired,
  defaultLocale: PropTypes.string
};

export default InternationalisationItem