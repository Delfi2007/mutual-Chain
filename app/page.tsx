import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { Technologies } from '@/components/Technologies'
import { HowItWorks } from '@/components/HowItWorks'
import { Stats } from '@/components/Stats'
import { CTA } from '@/components/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Technologies />
      <CTA />
    </>
  )
}
