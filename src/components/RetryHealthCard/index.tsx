import Button from 'components/Button'
import * as S from './styles'
import { useHealth } from 'hooks/useHealth'
import { Container } from 'components/Container'

const RetryHealthCard = () => {
  const { getHealthStatus } = useHealth()

  return (
    <Container>
      <S.Wrapper>
        <Button onClick={() => getHealthStatus()}>Retry Action</Button>
      </S.Wrapper>
    </Container>
  )
}

export default RetryHealthCard
