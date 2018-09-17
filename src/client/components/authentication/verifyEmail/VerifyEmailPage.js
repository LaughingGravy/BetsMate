import React from 'react';
import intl from 'react-intl-universal'
import { Container } from 'semantic-ui-react'
import { history } from '../../../../../library/routing'

import VERIFY_EMAIL from '../../../graphql/mutations/authentication/verifyByEmail'

import VerifyEmailFailurePage from './VerifyEmailFailurePage'
import MutationOnMount from '../../common/MutationOnMount'

const VerifyEmailPage = ({match}) => {
  const { email, emailVerificationString } = match.params

  const onCompleted = (data) => {
    const { verified } = data

    if (verified)
      history.replace('/login')
  }

  return (   
    <Container textAlign="center">
      <MutationOnMount variable={{ email: email, emailVerificationString: emailVerificationString }}
                        onCompleted={onCompleted} mutation={VERIFY_EMAIL} render={data => (
                          <VerifyEmailFailurePage verified={data.verified} message={data.message} />
                        )} />
    </Container>      
  )
}
  
export default VerifyEmailPage;