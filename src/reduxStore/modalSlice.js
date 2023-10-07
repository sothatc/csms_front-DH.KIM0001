import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  // modalType : "",
  isOpen : false,
}

export const modalSlice = createSlice({
  name: "modal",   // slice의 이름
  initialState,       // 초기 값
  reducers: {      // state 바꾸는 함수
    openModal: (state) => {
      // const { modalType } = action.payload;

      // state.modalType = modalType;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;