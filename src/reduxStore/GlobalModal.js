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





// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { closeModal, selectModals } from "./modalSlice";
// import { CustListModal } from "components/organisms/Dialog/CustListModal/CustListModal";
// import { CustAddModal } from "components/organisms/Dialog/CustAddModal/CustAddModal";
// import { SearchEntpModal } from "components/organisms/Dialog/SearchEntpModal/SearchEntpModal";
// import { SearchCustModal } from "components/organisms/Dialog/SearchMembModal/SearchCustModal";
// import { SearchTaskMembModal } from "components/organisms/Dialog/SearchTaskMembModal/SearchTaskMembModal";
// import { AtchFileListModal } from "components/organisms/Dialog/AtchFileListModal/AtchFileListModal";
// import { InsertTaskScheduleModal } from "components/organisms/Dialog/InsertTaskScheduleModal/InsertTaskScheduleModal";

// export function GlobalModal() {
//   const modals = useSelector(selectModals); // 모달 상태 가져오기
//   const dispatch = useDispatch();

//   const renderModal = (modal, index) => {
//     // 모달 타입에 따라 다른 모달을 렌더링하는 로직
//     switch (modal.modalType) {
//       case 'CustListModal':
//         return <CustListModal key={index} data={modal.data} />;
//       case 'CustAddModal':
//         return <CustAddModal key={index} data={modal.data} />;
//       case 'SearchCustModal':
//         return <SearchCustModal key={index} data={modal.data} />;
//       case 'SearchEntpModal':
//         return <SearchEntpModal key={index} data={modal.data} />;
//       case 'SearchTaskMembModal':
//         return <SearchTaskMembModal key={index} data={modal.data} />;
//       case 'AtchFileListModal':
//         return <AtchFileListModal key={index} data={modal.data} />;
//       case 'InsertTaskScheduleModal':
//         return <InsertTaskScheduleModal key={index} data={modal.data} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <div onClick={() => dispatch(closeModal())}></div>
//       {modals.map((modal, index) => renderModal(modal, index))}
//     </div>
//   );
// }