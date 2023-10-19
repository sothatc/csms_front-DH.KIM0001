import { CustAddModal } from "components/organisms/Dialog/CustAddModal/CustAddModal";
import { CustListModal } from "components/organisms/Dialog/CustListModal/CustListModal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModal } from "./modalSlice";
import React from "react";
import { SearchEntpModal } from "components/organisms/Dialog/SearchEntpModal/SearchEntpModal";
import { SearchCustModal } from "components/organisms/Dialog/SearchCustModal/SearchCustModal";

const MODAL_TYPES = {
  CustListModal   : 'CustListModal',
  CustAddModal    : 'CustAddModal',
  SearchEntpModal : 'SearchEntpModal',
  SearchCustModal : 'SearchCustModal',
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