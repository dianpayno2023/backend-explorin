import * as camelCaseKeys from 'camelcase-keys';

export function pageReturn<T>(
  data: T,
  total: number,
  page: number,
  limit: number,
  msg?: string,
) {
  return camelCaseKeys(
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
