import React from "react";

import Chat from "../../components/Chat/Chat";
import Posts from "../../components/Posts/Posts";
import HomeNavBar from "../../components/Navbars/HomeNavBar";

function Home() {
  return (
    <div class="home-page-container">
      <HomeNavBar />
      <main>
        <Posts />
        <Chat />
      </main>
    </div>
  );
}

export default Home;
