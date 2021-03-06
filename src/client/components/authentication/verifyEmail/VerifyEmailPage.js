import React from 'react';
import { Container, Grid,  } from 'semantic-ui-react'
import { compose } from 'recompose'
import { history } from '../../../../../library/routing'
import VERIFY_EMAIL from '../../../graphql/mutations/authentication/verifyByEmail'

import VerifyEmailFailurePage from './VerifyEmailFailurePage'
import MutationOnMount from '../../common/controls/MutationOnMount'
import { renderForLoading, VerifyingDisplay, hideIfNoData, hideIfNoProp } from '../../common/ConditionalRender'

const EnhancedVerifyEmailFailurePage = compose(
  hideIfNoProp("message")
)(VerifyEmailFailurePage)

const vanillaVerifyEmailPageContent = ({data}) => {
  const { message } = data.verifyByEmail

  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
        <Container textAlign="center">
          <EnhancedVerifyEmailFailurePage message={message}  /> 
        </Container>
      </Grid.Row>
    </Grid>
  )
}

const VerifyEmailPageContent = compose(
  renderForLoading(VerifyingDisplay),
  hideIfNoData("verifyByEmail")
)(vanillaVerifyEmailPageContent)

const VerifyEmailPage = ({match}) => {
  const { email, emailVerificationString } = match.params

  const onCompleted = (data) => {
    const { verifyByEmail: { verified } } = data
    
    if (verified) {
      history.replace('/verify-email/success')
    }
  }

  return (   
    <Container textAlign="center">
      <MutationOnMount variables={{ email: email, emailVerificationString: decodeURIComponent(emailVerificationString) }}
                        onCompleted={onCompleted} mutation={VERIFY_EMAIL}>
                        <VerifyEmailPageContent />
      </MutationOnMount>
    </Container>
  )
}
  
export default VerifyEmailPage