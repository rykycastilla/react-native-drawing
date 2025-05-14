import { SprayParticlesProps } from '../shared/utils/types/SprayParticlesProps'
import { useMemo } from 'react'

const AMOUNT = 100
const SCALE = 1

interface OptionalSprayParticles {
  amount?: number
  scale?: number
}

type NullSprayParticlesProps = OptionalSprayParticles | undefined

export function useSprayParticlesPropsDefinition( sprayParticles:NullSprayParticlesProps ): SprayParticlesProps {

  const optionalSprayParticles: OptionalSprayParticles = sprayParticles ?? {}
  const amount: number = optionalSprayParticles.amount ?? AMOUNT
  const scale: number = optionalSprayParticles.scale ?? SCALE

  return useMemo( () => {
    return { amount, scale }
  }, [ amount, scale ] )

}
