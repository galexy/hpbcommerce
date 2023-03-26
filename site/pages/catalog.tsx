import type { Product } from '@commerce/types/product'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Container } from '@components/ui'
import commerce from '@lib/api/commerce'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const { products } = await productsPromise

  return {
    props: {
      products,
    },
    // revalidate: 60,
  }
}

export default function Catalog({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-3 mb-20">
        <div className="col-span-12 order-3 lg:order-none">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product: Product) => (
              <ProductCard
                variant="simple"
                key={product.path}
                className="animated fadeIn"
                product={product}
                imgProps={{
                  width: 480,
                  height: 480,
                  alt: product.name,
                }}
              />
            ))}
          </div>
          )
        </div>
      </div>
    </Container>
  )
}

Catalog.Layout = Layout
