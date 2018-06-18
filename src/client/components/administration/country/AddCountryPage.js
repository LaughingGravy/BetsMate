import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { decorate, observable, configure, action } from "mobx"
import { observer } from "mobx-react"
import GraphQLErrorDisplay from '../../common/GraphQLErrorDisplay'

configure({ enforceActions: true })

class store {
  countryName = ""
  onChange = (e, { name, value }) => {
    this.countryName = value
  }
}

decorate(store, {
  countryName: observable,
  onChange: action
})

class AddCountry extends React.Component {
  constructor(props) {
    super(props);

    this.updateProperty = this.updateProperty.bind(this)
  }

  updateProperty (key, value) {
    this.props.store[key] = value
  }

  render() {

    const { onChange } = this.props

    return (
      <Container>
        <Grid columns={1} centered>
          <Grid.Row centered>
            <h1>{intl.get("add-country-page-title")}</h1>
          </Grid.Row>

          {/* <Mutation mutation={ADD_COUNTRY}
            onCompleted={this.onSavedCountry}>
            {(login, { loading, error, data }) => ( */}
              <Grid.Row centered>
                <GridColumn mobile={16} tablet={8} computer={4}>
                  <Form className='segment' onSubmit={e => {
                    e.preventDefault;
                    // login({ variables: { email, password } })
                  }}>
                    <Form.Field required>
                      <Form.Input name='country' label={intl.get("country-name-label")} 
                              placeholder={intl.get("country-name-placeholder")} onChange={onChange} />
                    </Form.Field>

                    <Container textAlign='center'>
                      <Form.Button primary loading={loading}>{intl.get("save-button-label")}</Form.Button>
                    </Container>
                  </Form>
                  {error && <GraphQLErrorDisplay error={error} />}
                </GridColumn>
              </Grid.Row>
            {/* )}
          </Mutation> */}

        </Grid>
      </Container>
    )
  }
}

AddCountry = observer(AddCountry)

AddCountry.propTypes = {
  store: PropTypes.shape({
    countryName: PropTypes.string,
    onChange: PropTypes.func.isRequired
  })
}

export default AddCountry