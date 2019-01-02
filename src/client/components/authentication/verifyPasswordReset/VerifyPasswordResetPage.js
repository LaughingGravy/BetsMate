import React from 'react'
import intl from 'react-intl-universal'
import { Container, Grid } from 'semantic-ui-react'
import { compose } from 'recompose'

import { hideIfNoProp, hideIfNoData, renderForLoading, VerifyingDisplay } from '../../common/ConditionalRender'
import { history } from '../../../../../library/routing'

import VERIFY_PASSWORD_TOKEN from '../../../graphql/mutations/authentication/verifyPasswordResetToken'

import MutationOnMount from '../../common/controls/MutationOnMount'
import VerifyResetFailurePage from './VerifyResetFailurePage'

const EnhancedVerifyResetFailurePage = compose(
  hideIfNoProp("message")
)(VerifyResetFailurePage)

const vanillaVerifyResetPageContent = ({data}) => {
  const { message } = data.verifyPasswordResetToken

  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
        <Container textAlign="center">
          <EnhancedVerifyResetFailurePage message={message}  /> 
        </Container>
      </Grid.Row>
    </Grid>
  )
}

const VerifyResetPageContent = compose(
  renderForLoading(VerifyingDisplay),
  hideIfNoData("verifyPasswordResetToken")
)(vanillaVerifyResetPageContent)

const VerifyPasswordResetPage = ({match}) => {
  const { email, passwordVerificationString } = match.params

  const onCompleted = (data) => {
    const { verifyPasswordResetToken: { verified } } = data

    if (verified) {
      history.replace(`/reset/change-password/${email}/${passwordVerificationString}`)
    }
  }

  return (   
    <Container textAlign="center">
      <MutationOnMount variables={{ email: email, token: decodeURIComponent(passwordVerificationString) }}
                        onCompleted={onCompleted} mutation={VERIFY_PASSWORD_TOKEN}>
        <VerifyResetPageContent />
      </MutationOnMount>
    </Container>      
  )
}
  
export default VerifyPasswordResetPage;;