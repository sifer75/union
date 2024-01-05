import { getServerSession } from "next-auth";
import { authOptions } from "../src/pages/api/auth/[...nextauth]";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if(!session) {
    return<><div>no session found</div></>
  }
  return <>{JSON.stringify(session.user.image)}</>;
}
