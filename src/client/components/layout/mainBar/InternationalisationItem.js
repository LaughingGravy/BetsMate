import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Flag } from 'semantic-ui-react'

const InternationalisationItem = ({ locales, onSelectLocale, defaultLocale }) => (
  <Menu.Item>
      <Dropdown trigger={<Flag name={locales.find(locale => locale.value === defaultLocale).flagid} />}
                options={locales} compact
                onChange={onSelectLocale} floating
                key="locales" value={defaultLocale} />
  </Menu.Item>
)

InternationalisationItem.propTypes = {
  locales: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectLocale: PropTypes.func.isRequired,
  defaultLocale: PropTypes.string
};

export default InternationalisationItem