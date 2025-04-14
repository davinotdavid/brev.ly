import { useParams } from "react-router";

export function Slug() {
  const params = useParams();

  console.log(params);

  return <h1>hey</h1>;
}
