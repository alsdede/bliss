import Loader from 'components/Loader'
import * as S from './styles'

const LoaderContainer = () => {
  return (
    <S.ContainerLoader>
      <S.Loading>
        <Loader />
      </S.Loading>
    </S.ContainerLoader>
  )
}

export default LoaderContainer
