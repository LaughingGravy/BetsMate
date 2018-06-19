import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { history } from '../../../../library/routing';

import { Segment } from 'semantic-ui-react'
import intl from 'react-intl-universal';
import axios from 'axios';

import TopNavBar from './TopNavBar';
import SideNavBar from './SideNavBar';

import SUPPOER_LOCALES from './locales';

import UserContextUpdater from '../contexts/UserContextUpdater'
import { DefaultUser } from '../contexts/userContext'

import CURRENT_USER from '../../graphql/queries/authentication/currentUser';
import { Query } from 'react-apollo';

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

        return (
            <Query query={CURRENT_USER}>
            {({ loading, error, data: { user }}) => {
                if (loading) {
                    return <div>loading...</div>;
                }
        
                if (error) {
                    return <div>Error: {error}</div>;
                }

                if (user == null) {
                    user = DefaultUser
                }
               
                return (
                    this.state.initDone && 
                        <UserContextUpdater input={user}>             
                            <SideNavBar visible={this.state.toggleSideBarVisibility} 
                                        onToggleSideBarVisibility={this.onToggleSideBarVisibility}
                                        onLogoutRequested={this.onLogoutRequested}
                                        >
                                <TopNavBar locales={SUPPOER_LOCALES} 
                                        defaultLocale={this.state.currentLocale}
                                        onSelectLocale={this.onSelectLocale} 
                                        onToggleSideBarVisibility={this.onToggleSideBarVisibility}
                                        onLogoutRequested={this.onLogoutRequested}
                                        />
                                    <Segment basic padded>
                                        {React.Children.map(this.props.children, 
                                        child => React.cloneElement(child, {currentLocale: this.state.currentLocale}))}
                                    </Segment>
                            </SideNavBar>
                        </UserContextUpdater>
                )   
            }}
            </Query>         
        )        
    }
}

export default Layout;