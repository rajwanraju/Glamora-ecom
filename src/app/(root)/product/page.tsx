import MainLayout from '@components/layout/MainLayout';
import { ProductDetails } from '@components/shared/ProductDetails';

export const metadata = {
  title: 'Product Details',
};

export default function ProductDetailPage() {
  return (
    <MainLayout>
      <ProductDetails />
    </MainLayout>
  );
}
