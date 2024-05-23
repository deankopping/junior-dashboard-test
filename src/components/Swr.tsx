import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Swr = () => {
  const { data, error, isLoading } = useSWR(
    "https://j5l5hqnix6.execute-api.af-south-1.amazonaws.com/dev/stats",
    fetcher,
    { refreshInterval: 1000 }
  );

  return { data, error, isLoading };
};
