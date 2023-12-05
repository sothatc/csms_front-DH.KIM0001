import React from 'react';
import Logo from 'assets/images/logo.png';
import Calendar from 'assets/images/common/Calendar.svg';
import AtchFileIcon from 'assets/images/common/AtchFileIcon.svg';
import ArrowLeft from 'assets/images/common/ArrowLeft.svg';
import ArrowRight from 'assets/images/common/ArrowRight.svg';

const isDiscernIcon = ({ icon }) => {
    switch (icon) {
      case 'LOGO'        :
        return Logo;
      case 'CALENDAR'    :
        return Calendar;
      case 'ATCHFILEICON':
        return AtchFileIcon;
      case 'ARROW-LEFT'  :
        return ArrowLeft;
      case 'ARROW-RIGHT' :
        return ArrowRight;
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