import { Link } from "react-router-dom";

export default function ActorCard({ actor }: any) {
  return <Link to={`/actors/${actor.id}`}>{actor.name}</Link>;
}
