import React from 'react'
import intl from 'react-intl-universal'
import { Container, Grid } from 'semantic-ui-react'
import { compose } from 'recompose'

import { hideIfNoProp, hideIfNoData, renderForLoading, VerifyingDisplay } from '../../common/ConditionalRender'
import { history } from '../../../../../library/routing'

import VERIFY_PASSWORD_TOKEN from '../../../graphql/mutations/authentication/verifyPasswordResetToken'

import MutationOnMount from '../../common/MutationOnMount'
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
  const { email, emailVerificationString } = match.params

  const onCompleted = (data) => {
    const { verified } = data

    if (verified) {
      console.log("verified")
      history.replace(`/reset/change-password${email}/${token}`)
    }
  }

  return (   
    <Container textAlign="center">
      <MutationOnMount variables={{ email: email, token: emailVerificationString }}
                        onCompleted={onCompleted} mutation={VERIFY_PASSWORD_TOKEN}>
        <VerifyResetPageContent />
      </MutationOnMount>
    </Container>      
  )
}
  
export default VerifyPasswordResetPage;;