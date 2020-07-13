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
            <footer className='bg-light text-center py-2'>
                <a rel="noopener noreferrer" target='_blank' className='github' href="https://github.com/frixaco/portfolio-project-1-social">
                    <i class="fab fa-github fa-3x"></i>
                </a>
            </footer>
        </div >
    )
}

export default Home
