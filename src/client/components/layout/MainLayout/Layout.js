import React from 'react';
import { history } from '../../../../../library/routing';
import intl from 'react-intl-universal';
import axios from 'axios';

import SUPPOER_LOCALES from './locales';
import LayoutContent from './LayoutContent';

class Layout extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = { 
            initDone: false,
            currentLocale: "",
            toggleSideBarVisibility: false
        };

        this.onSelectLocale = this.onSelectLocale.bind(this);
        this.onToggleSideBarVisibility = this.onToggleSideBarVisibility.bind(this);
    }
 
    componentDidMount() {
        this.loadLocales();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (!!prevState.currentLocale && prevState.currentLocale !== this.state.currentLocale) {
            this.loadLocales();
        }
    }

    onSelectLocale(e, data) {
        console.log("onSelectLocale", data)
        let lang = data.value;
        let pathname = history.location["pathname"];
        this.setState({currentLocale: data.value}); 
        history.push(`${pathname}?lang=${lang}`);
    }

    onToggleSideBarVisibility(e, data) {
        this.setState( { 
            toggleSideBarVisibility: !this.state.toggleSideBarVisibility 
        })
    }

    loadLocales() {   
        let currentLocale = intl.determineLocale({
            urlLocaleKey: "lang",
            cookieLocaleKey: "lang"
        });

        if (currentLocale == undefined || !SUPPOER_LOCALES.find(locale => locale.value === currentLocale)) {
            currentLocale = SUPPOER_LOCALES[0].value;
        }

        axios
          .get(`/static/locales/${currentLocale}.json`, { headers: {'Accept': 'application/json'}} )
          .then(res => {
            // init method will load CLDR locale data according to currentLocale
            return intl.init({
              currentLocale,
              locales: {
                [currentLocale]: res.data
              }
            });
          })
          .then(() => {
            // After loading CLDR locale data, start to render
            this.setState(
              { 
                initDone: true,
                currentLocale: currentLocale
              });
        });
    }
    
    render() { 
      const { initDone, currentLocale, toggleSideBarVisibility } = this.state

      return (
        initDone && <LayoutContent currentLocale={currentLocale} toggleSideBarVisibility={toggleSideBarVisibility} 
                                    locales={SUPPOER_LOCALES} onSelectLocale={this.onSelectLocale}
                                    onToggleSideBarVisibility={this.onToggleSideBarVisibility} {...this.props}
                    />                           
      )        
    }
}

export default Layout