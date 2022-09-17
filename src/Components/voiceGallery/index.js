import React, { Fragment } from 'react';
import { notNull, arrayNotNull } from '../../utilities/utilities';
import { Spring } from 'react-spring/renderprops';
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import "./voiceGallery.css"

const VoiceGallery = props => (
    < Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {springProps => (
            <div style={springProps}>
                <div className='white-bx-style  m-b-30'>
                    <div className='GalleryBack'>
                        <ul className='GalleryList-back'>
                            {props.gallery && arrayNotNull(props.gallery) ? (
                                <Fragment>
                                    {arrayNotNull(props.gallery) ? (
                                        props.gallery.map((image, index) => (
                                            <li key={`${index}`}>
                                                <figure className="imageWrpVideos" >
                                                    {/* onPlay={e => console.log("onPlay")} */}
                                                    <AudioPlayer src={notNull(image.image) && image.image.name === undefined ? image.image : URL.createObjectURL(image.image)} />
                                                    <span
                                                        className='removeImg'
                                                        onClick={(e) => props.handleDeleteGalleryImg(e, index)}>
                                                        <i className="fa fa-times-circle" style={{ fontSize: "23px" }} aria-hidden="true"></i>
                                                    </span>
                                                </figure>
                                            </li>
                                        ))
                                    ) : (
                                            <Fragment />
                                        )}{' '}
                                </Fragment>
                            ) : (
                                    <Fragment />
                                )}

                            <div className="addMedia-New-Videos BlueBG">
                                <input
                                    type='file'
                                    id='imageUpload'
                                    multiple
                                    // accept='.png, .jpg, .jpeg'
                                    style={{
                                        opacity: 0,
                                        width: '100%',
                                        display: 'block',
                                        height: '100%',
                                        zIndex: 99999
                                    }}
                                    onChange={(e) => props.handleUploadGallery(e)}
                                />
                                <span className='pluse-icon'>
                                    <img src='/assets/images/white-plus.png' alt='' />
                                </span>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        )}
    </Spring >
);

export default VoiceGallery;