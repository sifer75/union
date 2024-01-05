import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { LoginButton } from "../auth/LoginButton";
import { LogoutButton } from "../auth/LogoutButton";

export default async function AuthButton() {
  const session = await getServerSession(authOptions);
  const user = session?.user
  if (user) return <LogoutButton user={user} />
  else return <LoginButton />;
}
