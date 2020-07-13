import React from 'react'
import { connect } from 'react-redux'

import { updateUserAsync } from '../../redux/user/userActions'

import logo1 from '../../profile-logos/logo1.jpg'
import logo2 from '../../profile-logos/logo2.jpg'
import logo3 from '../../profile-logos/logo3.jpg'
import logo4 from '../../profile-logos/logo4.jpg'
import logo5 from '../../profile-logos/logo5.jpg'
import logo6 from '../../profile-logos/logo6.jpg'
import logo7 from '../../profile-logos/logo7.jpg'
import logo8 from '../../profile-logos/logo8.jpg'

const logosArray = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8]

function AvatarSelection({ logoTitle, updateUserAsync }) {
    const myLogo = require('../../profile-logos/' + logoTitle)

    const handleAvatarUpdate = e => {
        const newLogo = e.target.currentSrc.match(/logo[0-9]/g)[0] + '.jpg'
        updateUserAsync({
            key: 'logoTitle',
            value: myLogo
        })
    }

    return (
        <div className='avatar-section'>
            <div
                className="profile-pic"
                style={{
                    backgroundImage: `url(${myLogo})`,
                }}>
            </div>
            <div className="avatar-options">
                {logosArray.map((logo, idx) => (
                    <img onClick={handleAvatarUpdate} key={idx} className='option' src={logo} alt="pic" width='100' height='100' />
                ))}
            </div>
            {/* <div className="edit-pic btn btn-sm btn-secondary">Edit</div> */}
        </div>
    )
}

const mapStateToProps = state => ({ logoTitle: state.user.logoTitle })

export default connect(mapStateToProps, { updateUserAsync })(AvatarSelection)
