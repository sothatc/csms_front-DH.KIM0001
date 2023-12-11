// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   modalType: '',
//   isOpen   : false,
//   data     : {},
// };

// export const modalSlice = createSlice({
//   name: "modal",
//   initialState,
//   reducers: {
//     openModal: (state, action) => {
//       const { modalType, data } = action.payload;

//       state.modalType = modalType;
//       state.isOpen    = true;
//       state.data      = data;
//     },
//     closeModal: (state, action) => {
//       const data = action?.payload;

//       state.isOpen = false;
//       state.data   = data;
//     },
//     initModal: (state) => {
//       state.modalType = '';
//       state.isOpen = false;
//       state.data = {};
//     },
//   },
// });

// export const { openModal, closeModal, initModal } = modalSlice.actions;
// export const selectModal = (state) => state.modal;

// export default modalSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: [], // 모달 스택으로 변경
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { modalType, data } = action.payload;
      state.modals.push({ modalType, isOpen: true, data });
    },
    // closeModal: (state) => {
    //   state.modals.pop(); // 현재 열린 모달 닫기
    // },
    closeModal: (state, action) => {
      const { modalTypeToClose, data } = action.payload;
      const index = state.modals.findIndex(modal => modal.modalType === modalTypeToClose);
      if (index !== -1) {
        state.modals.splice(index, 1);
        state.data = data;
      }
    },
    initModal: (state) => {
      state.modals = []; // 모달 스택 초기화
    },
  },
});

export const { openModal, closeModal, initModal } = modalSlice.actions;
export const selectModals = (state) => state.modal.modals; // modals 선택자

export default modalSlice.reducer;