import React from 'react';
import { Container, Grid,  } from 'semantic-ui-react'
import { history } from '../../../../../library/routing'

import VERIFY_EMAIL from '../../../graphql/mutations/authentication/verifyByEmail'

import VerifyEmailFailurePage from './VerifyEmailFailurePage'
import MutationOnMount from '../../common/MutationOnMount'

const VerifyEmailPageContent = (verified, message) => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <Grid.Column mobile={14} tablet={8} computer={6}>
        <Container textAlign="center">
          <VerifyEmailFailurePage verified={verified} message={message} />
        </Container>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

const VerifyEmailPage = ({match}) => {
  const { email, emailVerificationString } = match.params

  const onCompleted = (data) => {
    const { verified , message } = data.verifyByEmail

    console.log("data, verified , message", data, verified , message)

    if (verified)
      history.replace('/login')
    else {
      history.replace('/verify-email/failure')
    }
  }

  return (   
    <Container textAlign="center">
      {/* <MutationOnMount variables={{ email: email, emailVerificationString: emailVerificationString }}
                        onCompleted={onCompleted} mutation={VERIFY_EMAIL} render={data => (
                          <VerifyEmailPageContent data={data} />
                        )} /> */}
      <MutationOnMount variables={{ email: email, emailVerificationString: emailVerificationString }}
                      onCompleted={onCompleted} mutation={VERIFY_EMAIL}  />
    </Container>      
  )
}
  
export default VerifyEmailPage;