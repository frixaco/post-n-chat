import React from 'react'

import Chat from '../../components/Chat/Chat';
import Posts from '../../components/Posts/Posts';
import HomeNavBar from '../../components/Navbars/HomeNavBar';

function Home() {
    return (
        <div className='home-container'>
            <HomeNavBar />
            <div className='posts-chat-container'>
                <Posts />
                <Chat />
            </div>
        </div >
    )
}

export default Home
