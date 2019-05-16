import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, Label, Grid, Pagination } from 'semantic-ui-react'
import { SVG, ICONS } from '../../../../../../static/svgHelper'

function CountrySearch() {
  const [ searchName, setSearchName ] = useState('')
  const [ skip, setSkip ] = useState(0)
  const [ limit, setLimit ] = useState(5)

 const searchIcon = <SVG path={ICONS.SEARCH.path} width="18" height="18" viewBox={ICONS.SEARCH.viewBox}/>

  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Input placeholder="Search..." icon={searchIcon} />
        </Grid.Column>

        <Grid.Column>
          <Input type="number">
            <Label basic>Page Size</Label>
             <input />
          </Input>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column colSpan={2}>
          <Pagination
                    defaultActivePage={1}
                    firstItem={null}
                    lastItem={null}
                    pointing
                    secondary
                    totalPages={3} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default CountrySearch