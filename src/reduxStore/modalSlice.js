import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: [],
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {

    openModal: (state, action) => {
      const { modalType, data } = action.payload;
      state.modals.push({ modalType, isOpen: true, data });
    },

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