import React from 'react';


const ImgBox = ({property}) => {
    const { index, picture, picture2, picture3 } = property;
    return (
        <div id={`image-${index}`} className="image">
            <img
              src={picture}
                 srcset={picture+' 480w, '+picture2+' 760w, '+picture3 +' 1920w'}
              alt={index} />
            <div className="details">
                <span className="index">{index+1}</span>
            </div>
        </div>
    )
}



export default ImgBox;
