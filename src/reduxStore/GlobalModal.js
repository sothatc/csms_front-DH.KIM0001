import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModal } from "./modalSlice";
import { CustAddModal } from "components/organisms/Dialog/CustAddModal/CustAddModal";
import { CustListModal } from "components/organisms/Dialog/CustListModal/CustListModal";
import { SearchEntpModal } from "components/organisms/Dialog/SearchEntpModal/SearchEntpModal";
import { SearchMembModal } from "components/organisms/Dialog/SearchMembModal/SearchMembModal";

const MODAL_TYPES = {
  CustListModal   : 'CustListModal',
  CustAddModal    : 'CustAddModal',
  SearchEntpModal : 'SearchEntpModal',
  SearchMembModal : 'SearchMembModal',
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
    type : MODAL_TYPES.SearchMembModal,
    component : <SearchMembModal />
  },
];

export function GlobalModal() {
  const { modalType, isOpen, data } = useSelector(selectModal);

  const dispatch = useDispatch();

  if(!isOpen) return;

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  })

  // const renderModal = () => {
  //   return findModal.component;
  // }

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