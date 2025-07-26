import camelcaseKeys from 'camelcase-keys';

export function pageReturn<T>(
  data: T,
  total: number,
  page: number,
  limit: number,
  msg?: string,
) {
  return camelcaseKeys(
    {
      msg: msg ? [msg] : [],
      data,
      total,
      page,
      limit,
      totalPage: Math.ceil(total / limit),
    },
    { deep: true },
  );
}
