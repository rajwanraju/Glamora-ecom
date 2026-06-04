import MainLayout from '@components/layout/MainLayout';
import { HeroBanner } from '@components/shared/HeroBanner';
import { CategoryStrip } from '@components/shared/CategoryStrip';
import { FeaturedProducts } from '@components/shared/FeaturedProducts';
import { PromoSection } from '@components/shared/PromoSection';
import { ShopByConcern } from '@components/shared/ShopByConcern';
import { BestSellers } from '@components/shared/BestSellers';
import { BrandLogos } from '@components/shared/BrandLogos';
import { Testimonials } from '@components/shared/Testimonials';
import { NewsletterBanner } from '@components/shared/NewsletterBanner';

export const metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <MainLayout>
      <HeroBanner />
      <CategoryStrip />
      <FeaturedProducts />
      <PromoSection />
      <ShopByConcern />
      <BestSellers />
      <BrandLogos />
      <Testimonials />
      <NewsletterBanner />
    </MainLayout>
  );
}
