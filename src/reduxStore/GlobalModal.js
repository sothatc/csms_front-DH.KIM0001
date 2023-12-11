import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModals } from "./modalSlice";
import { CustListModal } from "components/organisms/Dialog/CustListModal/CustListModal";
import { CustAddModal } from "components/organisms/Dialog/CustAddModal/CustAddModal";
import { SearchEntpModal } from "components/organisms/Dialog/SearchEntpModal/SearchEntpModal";
import { SearchCustModal } from "components/organisms/Dialog/SearchMembModal/SearchCustModal";
import { SearchTaskMembModal } from "components/organisms/Dialog/SearchTaskMembModal/SearchTaskMembModal";
import { AtchFileListModal } from "components/organisms/Dialog/AtchFileListModal/AtchFileListModal";
import { InsertTaskScheduleModal } from "components/organisms/Dialog/InsertTaskScheduleModal/InsertTaskScheduleModal";
import { ScheduleDtlModal } from "components/organisms/Dialog/ScheduleDtlModal/ScheduleDtlModal";

export function GlobalModal() {
  const modals = useSelector(selectModals); // 모달 상태 가져오기
  const dispatch = useDispatch();

  const renderModal = (modal, index) => {

    switch (modal.modalType) {
      case 'CustListModal':
        return <CustListModal key={index} data={modal.data} />;
      case 'CustAddModal':
        return <CustAddModal key={index} data={modal.data} />;
      case 'SearchCustModal':
        return <SearchCustModal key={index} data={modal.data} />;
      case 'SearchEntpModal':
        return <SearchEntpModal key={index} data={modal.data} />;
      case 'SearchTaskMembModal':
        return <SearchTaskMembModal key={index} data={modal.data} />;
      case 'AtchFileListModal':
        return <AtchFileListModal key={index} data={modal.data} />;
      case 'InsertTaskScheduleModal':
        return <InsertTaskScheduleModal key={index} data={modal.data} />;
      case 'ScheduleDtlModal' :
        return <ScheduleDtlModal key={index} data={modal.data} />
      default:
        return null;
    }
  };

  return (
    <div>
      <div onClick={() => dispatch(closeModal())}></div>
      {modals.map((modal, index) => renderModal(modal, index))}
    </div>
  );
}