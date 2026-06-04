'use client';

import { Empty } from 'antd';

export default function SharedEmpty({ description }: { readonly description?: string }) {
  return (
    <Empty
      className='font-semibold'
      description={description ?? "Sorry, we couldn't find the data you're looking for."}
    />
  );
}
