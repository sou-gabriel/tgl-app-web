import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'
import axios from 'axios'

import { Header } from 'components/Header'
import { Spinner } from 'components/Spinner'
import { MainContent } from 'components/MainContent'
import { GameChoiceButton } from 'components/GameChoiceButton'
import { RecentGamesList } from 'components/RecentGamesList'
import { RootState } from 'store/modules/rootReducer'
import { createActionToSetGameOptions } from 'store/modules/gameOptions/action'
import { createActionToSetMinimumCartValue } from 'store/modules/minCartValue/actions'
import { IGameOptions } from 'store/modules/gameOptions/types'
import { createActionToSetActiveGameOption } from 'store/modules/activeGameOption/actions'
import {
  Container,
  InnerContainer,
  NavigationLink,
  Section,
  Heading,
  Title,
  FiltersContainer,
  Subtitle,
  GameChoiceButtonContainer,
} from './styles'

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const gameOptions = useSelector((state: RootState) => state.gameOptions)
  const activeGameOption = useSelector(
    (state: RootState) => state.activeGameOption,
  )

  console.log(gameOptions)

  const storeGameOptions = useCallback(
    (gameOptions: IGameOptions) => {
      dispatch(createActionToSetMinimumCartValue(gameOptions.min_cart_value))
      dispatch(createActionToSetGameOptions(gameOptions.types))
    },
    [dispatch],
  )

  useEffect(() => {
    const userToken = localStorage.getItem('token')

    if (!userToken) {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    const fetchGameOptions = async () => {
      try {
        const response = await axios.get<IGameOptions>(
          'http://127.0.0.1:3333/cart_games',
        )

        if (response.status !== 200) {
          throw new Error('Um erro de conexão ocorreu. Tente novamente!')
        }

        const gameOptions = response.data

        storeGameOptions(gameOptions)
      } catch (error) {
        console.log(error)
      }
    }

    fetchGameOptions()
  }, [dispatch, storeGameOptions])

  useEffect(() => {
    const areGameOptionsAvailable = gameOptions
    let timerId: ReturnType<typeof setTimeout>

    if (areGameOptionsAvailable) {
      const defaultGame = gameOptions[0]

      timerId = setTimeout(() => {
        setIsLoading(false)
        dispatch(createActionToSetActiveGameOption(defaultGame))
      }, 500)
    }

    return () => clearTimeout(timerId)
  }, [gameOptions, dispatch])

  return (
    <>
      <Header />
      <Container>
        {isLoading && <Spinner />}
        {!isLoading && (
          <MainContent>
            <InnerContainer>
              <Section>
                <Heading>
                  <Title>Recent games</Title>
                  <FiltersContainer>
                    <Subtitle>Filters</Subtitle>
                    <GameChoiceButtonContainer>
                      {gameOptions.map((gameOption) => (
                        <GameChoiceButton
                          key={gameOption.id}
                          value={gameOption.id}
                          theme={gameOption.color}
                          isActive={activeGameOption?.id === gameOption.id}
                        >
                          {gameOption.type}
                        </GameChoiceButton>
                      ))}
                    </GameChoiceButtonContainer>
                  </FiltersContainer>
                </Heading>
                <RecentGamesList />
              </Section>

              <NavigationLink to='/dashboard'>
                New Bet <AiOutlineArrowRight />
              </NavigationLink>
            </InnerContainer>
          </MainContent>
        )}
      </Container>
    </>
  )
}
