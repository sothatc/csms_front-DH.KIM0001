import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalType: '',
  isOpen   : false,
  // data     : [],
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
      // state.data.push(data);
      state.data      =  data;
    },
    closeModal: (state, action) => {
      const data = action?.payload;

      state.isOpen = false;
      // state.data.push(data);
      state.data   = data;
    },
    initModal: (state) => {
      state.modalType = '';
      state.isOpen = false;
      state.data = {};
      // state.data = [];
    },
  },
});

export const { openModal, closeModal, initModal } = modalSlice.actions;
export const selectModal = (state) => state.modal;

export default modalSlice.reducer;