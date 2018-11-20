import React from 'react';
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { Query } from 'react-apollo'
import { Segment } from 'semantic-ui-react'

import CURRENT_USER from '../../../graphql/queries/authentication/currentUser'

import { renderForLoading, renderForError, QueryErrorDisplay } from '../../common/ConditionalRender'
import UserContextUpdater from '../../contexts/UserContextUpdater'
import { DefaultUser } from '../../contexts/userContext'

// import SportsNavBar from '../sportsNavBar/SportsNavBar'
import SideNavBar from '../sideBar/SideNavBar'
import MainBar from '../mainBar/MainBar'

const vanillaLayoutContent = (props) => {
  const { user, toggleSideBarVisibility, onToggleSideBarVisibility, currentLocale, onSelectLocale, locales } = props

  return (
        <UserContextUpdater input={user}>             
          <SideNavBar visible={toggleSideBarVisibility} 
                      onToggleSideBarVisibility={onToggleSideBarVisibility}>

            <Segment basic clearing>
              <MainBar locales={locales} 
                        defaultLocale={currentLocale}
                        onSelectLocale={onSelectLocale}
                        onToggleSideBarVisibility={onToggleSideBarVisibility} />
              {/* <SportsNavBar onToggleSideBarVisibility={onToggleSideBarVisibility} /> */}
            </Segment>
            <Segment basic>
                {React.Children.map(props.children, 
                child => React.cloneElement(child, {currentLocale: currentLocale}))}
            </Segment>                 
          </SideNavBar>
        </UserContextUpdater>
  )   
}

vanillaLayoutContent.propTypes = {
  user: PropTypes.object.isRequired,
  onToggleSideBarVisibility: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  onSelectLocale: PropTypes.func.isRequired,
  locales: PropTypes.arrayOf(PropTypes.object).isRequired
}

const EnhancedLayoutContent = compose(
  renderForLoading(vanillaLayoutContent),
  renderForError(QueryErrorDisplay),
)(vanillaLayoutContent)

const LayoutContent = (props) =>{
  return (
    <Query query={CURRENT_USER}>
      {({ loading, error, data }) => {

        let { user } = data

        console.log("LayoutContent CURRENT_USER", { loading, error, data })

        if (user == null) {
            user = DefaultUser
        }

        return (
          <EnhancedLayoutContent loading={loading} error={error} user={user} {...props} />
        )
    }}
    </Query> 
  )
}

LayoutContent.propTypes = {
  onToggleSideBarVisibility: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  onSelectLocale: PropTypes.func.isRequired,
  locales: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default LayoutContent