import useSWR from "swr";
import { ring } from "ldrs";

ring.register();

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Swr = () => {
  const { data, error, isLoading } = useSWR(
    "https://j5l5hqnix6.execute-api.af-south-1.amazonaws.com/dev/stats",
    fetcher
  );

  if (error) {
    return error;
  } else if (isLoading) {
    return <div>Loading</div>;
  } else return data;
};
