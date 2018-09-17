
import intl from 'react-intl-universal'
import { Container } from 'semantic-ui-react'
import { history } from '../../../../../library/routing'

import VERIFY_PASSWORD_TOKEN from '../../../graphql/mutations/authentication/verifyPasswordResetToken'

import MutationOnMount from '../../common/MutationOnMount'
import VerifyResetFailurePage from './VerifyResetFailurePage'

const VerifyPasswordResetPage = ({match}) => {
  const { email, token } = match.params

  const onCompleted = (data) => {
    const { verified } = data

    if (verified)
      history.replace('/change-password')
  }

  return (   
    <Container textAlign="center">
      <MutationOnMount variable={{ email: email, token: token }}
                        onCompleted={onCompleted} mutation={VERIFY_PASSWORD_TOKEN} 
                        render={data => (
                          <VerifyResetFailurePage verified={data.verified} message={data.message} />
                        )} />
    </Container>      
  )
}
  
export default VerifyPasswordResetPage;;