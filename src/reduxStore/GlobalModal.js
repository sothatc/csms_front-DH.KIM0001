import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModal } from "./modalSlice";
import { CustAddModal } from "components/organisms/Dialog/CustAddModal/CustAddModal";
import { CustListModal } from "components/organisms/Dialog/CustListModal/CustListModal";
import { SearchEntpModal } from "components/organisms/Dialog/SearchEntpModal/SearchEntpModal";
import { SearchTaskMembModal } from "components/organisms/Dialog/SearchTaskMembModal/SearchTaskMembModal";
import { AtchFileListModal } from "components/organisms/Dialog/AtchFileListModal/AtchFileListModal";
import { InsertTaskScheduleModal } from "components/organisms/Dialog/InsertTaskScheduleModal/InsertTaskScheduleModal";
import { SearchCustModal } from "components/organisms/Dialog/SearchMembModal/SearchCustModal";

const MODAL_TYPES = {
  CustListModal           : 'CustListModal',
  CustAddModal            : 'CustAddModal',
  SearchEntpModal         : 'SearchEntpModal',
  SearchCustModal         : 'SearchCustModal',
  SearchTaskMembModal     : 'SearchTaskMembModal',
  AtchFileListModal       : 'AtchFileListModal',
  InsertTaskScheduleModal : 'InsertTaskScheduleModal',
};

const MODAL_COMPONENTS = [
  {
    type : MODAL_TYPES.CustListModal,
    component : <CustListModal />,
  },
  {
    type : MODAL_TYPES.CustAddModal,
    component : <CustAddModal />,
  },
  {
    type : MODAL_TYPES.SearchEntpModal,
    component : <SearchEntpModal />,
  },
  {
    type : MODAL_TYPES.SearchCustModal,
    component : <SearchCustModal />
  },
  {
    type : MODAL_TYPES.SearchTaskMembModal,
    component : <SearchTaskMembModal />
  },
  {
    type : MODAL_TYPES.AtchFileListModal,
    component : <AtchFileListModal />
  },
  {
    type : MODAL_TYPES.InsertTaskScheduleModal,
    component : <InsertTaskScheduleModal />
  },
];

export function GlobalModal() {
  const { modalType, isOpen, data } = useSelector(selectModal);

  const dispatch = useDispatch();

  if(!isOpen) return;

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  })

  const renderModal = () => {
    if (findModal) {
      return React.cloneElement(findModal.component, { data });
    }
    return null;
  }

  return (
    <div>
      <div onClick={ () => dispatch(closeModal()) }></div>
      {renderModal()}
    </div>
  );
}