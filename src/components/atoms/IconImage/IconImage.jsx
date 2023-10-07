import React from 'react';
import Logo from 'assets/images/logo.png';

const isDiscernIcon = ({ icon }) => {
    switch (icon) {
        case 'LOGO' :
            return Logo;
        
        default:
            break;
    }    
}

const IconImage = React.memo(({ id, icon, onClickEvent}) => {
    const Icon = isDiscernIcon({ icon });
    const onClickHandler = () => {
        onClickEvent && onClickEvent(id);
    }
    return (
        <>
            <img id={id} src={Icon} alt="아이콘" onClick={onClickHandler} />
        </>
    )
});

export { IconImage };