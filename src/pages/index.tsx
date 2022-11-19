import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import RegisterForm from "../components/Registerform";
import LoginForm from "../components/Loginform";
import Mainpage from "../components/Mainpage";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  console.log("session: ", session);
  console.log("status: ", status);
  //const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      {/* <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <main>
        {session ? (
          <Mainpage />
        ) : (
          <div>
            <LoginForm />
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
