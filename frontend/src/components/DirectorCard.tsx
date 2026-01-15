import { Link } from "react-router-dom";

export default function DirectorCard({ director }: any) {
  return <Link to={`/directors/${director.id}`}>{director.name}</Link>;
}
