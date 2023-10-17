import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalType: '',
  isOpen   : false,
  data     : {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { modalType, data } = action.payload;

      state.modalType = modalType;
      state.isOpen    = true;
      state.data      = data;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.data   = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state) => state.modal;

export default modalSlice.reducer;