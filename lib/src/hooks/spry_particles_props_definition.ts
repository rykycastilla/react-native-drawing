import { SpryParticlesProps } from '../shared/utils/types/SpryParticlesProps'
import { useMemo } from 'react'

const AMOUNT = 100
const SCALE = 1

interface OptionalSpryParticles {
  amount?: number
  scale?: number
}

type NullSpryParticlesProps = OptionalSpryParticles | undefined

export function useSpryParticlesPropsDefinition( spryParticles:NullSpryParticlesProps ): SpryParticlesProps {

  const optionalSpryParticles: OptionalSpryParticles = spryParticles ?? {}
  const amount: number = optionalSpryParticles.amount ?? AMOUNT
  const scale: number = optionalSpryParticles.scale ?? SCALE

  return useMemo( () => {
    return { amount, scale }
  }, [ amount, scale ] )

}
