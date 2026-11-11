'use client';

import LandingWrapper from '@/components/LandingPage/LandingWrapper';
import LandingHeader from '@/components/LandingPage/LandingHeader';
import LandingSubHeader from '@/components/LandingPage/LandingSubHeader';
import CTAButtons from '@/components/LandingPage/CTAButtons';
import LandingImage from '@/components/LandingPage/LandingImage';

export default function Home() {
  return (
    <LandingWrapper>
      <LandingHeader />
      <LandingSubHeader />
      <CTAButtons />
      <LandingImage />
    </LandingWrapper>
  );
}
