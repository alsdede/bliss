import Button from 'components/Button'
import * as S from './styles'
import { useHealth } from 'hooks/useHealth'

const RetryHealthCard = () => {
  const { getHealthStatus } = useHealth()

  return (
    <S.Wrapper>
      <Button onClick={() => getHealthStatus()}>Retry Action</Button>
    </S.Wrapper>
  )
}

export default RetryHealthCard
