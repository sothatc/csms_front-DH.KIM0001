import ArrowLeft from 'assets/images/common/ArrowLeft.svg';
import ArrowRight from 'assets/images/common/ArrowRight.svg';
import AtchFileIcon from 'assets/images/common/AtchFileIcon.svg';
import Calendar from 'assets/images/common/Calendar.svg';
import Edit from 'assets/images/common/Edit.svg';
import Enterprise from 'assets/images/common/Enterprise.svg';
import Time from 'assets/images/common/Time.svg';
import Logo from 'assets/images/logo.png';
import Admin from 'assets/images/user/Admin.svg';
import NomalUser from 'assets/images/user/NomalUser.svg';
import Wifi from 'assets/images/task/Wifi.svg';
import Walk from 'assets/images/task/Walk.svg';
import ErrorIcon from 'assets/images/task/ErrorIcon.svg';
import Check from 'assets/images/task/Check.svg';
import React from 'react';

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

      case 'NOMAL-USER'  :
        return NomalUser;

      case 'ADMIN'       :
        return Admin;

      case 'ENTERPRISE'  :
        return Enterprise;

      case 'TIME'        :
        return Time;

      case 'EDIT'        :
        return Edit;

      case 'WIFI'        :
        return Wifi;

      case 'WALK'        :
        return Walk;

      case 'CHECK'       :
        return Check;

      case 'ERRORICON'       :
        return ErrorIcon;

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
