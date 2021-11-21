import Button from 'components/Button'
import * as S from './styles'
import { useHealth } from 'hooks/useHealth'

import { Container } from 'components/Container'

type RetryCardProps = {
  hasInternet: boolean
}

const RetryCard = ({ hasInternet }: RetryCardProps) => {
  const { getHealthStatus, isHealthStatus } = useHealth()

  return (
    <Container>
      <S.Wrapper>
        {!hasInternet && (
          <S.Title>Ops... check your internet connection</S.Title>
        )}
        {hasInternet && !isHealthStatus && (
          <S.Title>Ops... check your server status</S.Title>
        )}
        <Button onClick={() => getHealthStatus()}>Retry Action</Button>
      </S.Wrapper>
    </Container>
  )
}

export default RetryCard
