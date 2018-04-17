import React from 'react';
import { Flag } from 'semantic-ui-react'

const SUPPOER_LOCALES = [
    {
        text: <span>English <Flag name="gb"/></span>,
        value: "en-GB",
        name: "English",
        flagid: "gb"
    },
    {
        text: <span>日本語 <Flag name="jp"/></span>,
        value: "ja-JP",
        name: "日本語",
        flagid: "jp"
    }
];

module.exports = SUPPOER_LOCALES;