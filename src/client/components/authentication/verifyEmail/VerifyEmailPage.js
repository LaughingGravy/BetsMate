import React from 'react';
import { Container, Grid,  } from 'semantic-ui-react'
import { compose } from 'recompose'
import { history } from '../../../../../library/routing'
import VERIFY_EMAIL from '../../../graphql/mutations/authentication/verifyByEmail'

import VerifyEmailFailurePage from './VerifyEmailFailurePage'
import MutationOnMount from '../../common/MutationOnMount'
import { renderForLoading, VerifyingDisplay, hideIfNoData } from '../../common/ConditionalRender'

//const vanillaVerifyEmailPageContent = ({data}) => {
  const vanillaVerifyEmailPageContent = () => {
  // const { message } = data.verifyByEmail

  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
        <Container textAlign="center">
          {/* <VerifyEmailFailurePage message={message}  /> */}
        </Container>
      </Grid.Row>
    </Grid>
  )
}

// const VerifyEmailPageContent = compose(
//   renderForLoading(VerifyingDisplay),
//   hideIfNoData("verifyByEmail")
// )(vanillaVerifyEmailPageContent)

const VerifyEmailPageContent = vanillaVerifyEmailPageContent;

//const VerifyEmailPage = ({match}) => {
  const VerifyEmailPage = () => {
  //const { email, emailVerificationString } = props.match.params

  // const onCompleted = (data) => {
  //   const { verifyByEmail: { verified } } = data
    
  //   if (verified) {
  //     console.log("onCompleted verified", verified)
  //     history.replace('/verify-email/success')
  //   }
  // }

  console.log("VerifyEmailPage render")
  //console.log("VerifyEmailPage match", match)

  return (   
    <Container textAlign="center">
      {/* <MutationOnMount variables={{ email: email, emailVerificationString: decodeURIComponent(emailVerificationString) }}
                        onCompleted={onCompleted} mutation={VERIFY_EMAIL}>
          <VerifyEmailPageContent /> 
      </MutationOnMount> */}
    </Container>      
  )
}
  
export default VerifyEmailPage;