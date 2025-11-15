// third party
import { useDispatch, useSelector } from "react-redux";

// this project
import {
  clearTransferDetail,
  fetchAccountInformation,
  updateAccountInformation,
  updateTransferDetail,
} from "../redux/slices/TransferSlices";

export const useTransfer = () => {
  const dispatch = useDispatch();
  const { transfer, accountInformation } = useSelector(
    (state: any) => state.transfer
  );

  const fetchAccountInformationData = () => {
    dispatch(fetchAccountInformation());
  };

  const updateTransferDetailData = (payload: {}) => {
    dispatch(updateTransferDetail(payload));
  };

  const clearTransferDetailData = () => {
    dispatch(clearTransferDetail());
  };

  const updateAccountInformationData = (payload: {}) => {
    dispatch(updateAccountInformation(payload));
  };

  return {
    transfer,
    accountInformation,
    fetchAccountInformationData,
    updateTransferDetailData,
    clearTransferDetailData,
    updateAccountInformationData,
  };
};
